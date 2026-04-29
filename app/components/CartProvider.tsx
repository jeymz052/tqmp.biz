"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
  lineId: string;
  id: string;
  name: string;
  category: string;
  size: string;
  thickness: string;
  finish: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const STORAGE_KEY = "tqmp-cart-items";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const storedItems = window.localStorage.getItem(STORAGE_KEY);
      return storedItems ? (JSON.parse(storedItems) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function addToCart(item: CartItem) {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (currentItem) => currentItem.lineId === item.lineId,
      );

      if (existingItem) {
        return currentItems.map((currentItem) =>
          currentItem.lineId === item.lineId
            ? { ...currentItem, quantity: currentItem.quantity + item.quantity }
            : currentItem,
        );
      }

      return [...currentItems, item];
    });
  }

  function removeFromCart(lineId: string) {
    setItems((currentItems) =>
      currentItems.filter((currentItem) => currentItem.lineId !== lineId),
    );
  }

  function updateQuantity(lineId: string, quantity: number) {
    if (quantity < 1) {
      return;
    }

    setItems((currentItems) =>
      currentItems.map((currentItem) =>
        currentItem.lineId === lineId ? { ...currentItem, quantity } : currentItem,
      ),
    );
  }

  function clearCart() {
    setItems([]);
  }

  const totalItems = items.reduce(
    (runningTotal, currentItem) => runningTotal + currentItem.quantity,
    0,
  );
  const totalPrice = items.reduce(
    (runningTotal, currentItem) =>
      runningTotal + currentItem.price * currentItem.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
