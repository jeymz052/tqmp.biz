"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

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

export type DeliveryOption = "pickup" | "door";

export interface Voucher {
  code: string;
  label: string;
  description: string;
  type: "percent" | "fixed" | "shipping";
  value: number;
  minSpend?: number;
}

export const DELIVERY_FEE = 350;
export const POINTS_PER_PESO = 0.01;
export const PESO_PER_POINT = 1;

export const VOUCHERS: Voucher[] = [
  {
    code: "TQMP10",
    label: "10% Off Site-wide",
    description: "10% discount on the merchandise subtotal.",
    type: "percent",
    value: 10,
  },
  {
    code: "WELCOME500",
    label: "PHP 500 Off",
    description: "PHP 500 off when you spend at least PHP 5,000.",
    type: "fixed",
    value: 500,
    minSpend: 5000,
  },
  {
    code: "FREESHIP",
    label: "Free Door-to-Door",
    description: "Waives the door-to-door delivery fee.",
    type: "shipping",
    value: 0,
  },
  {
    code: "GLASS15",
    label: "15% Off Big Orders",
    description: "15% discount when subtotal is at least PHP 25,000.",
    type: "percent",
    value: 15,
    minSpend: 25000,
  },
];

export interface CartTotals {
  subtotal: number;
  voucherDiscount: number;
  pointsDiscount: number;
  shippingFee: number;
  shippingDiscount: number;
  grandTotal: number;
  pointsEarned: number;
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

  delivery: DeliveryOption;
  setDelivery: (option: DeliveryOption) => void;

  voucherCode: string;
  voucherError: string | null;
  appliedVoucher: Voucher | null;
  applyVoucher: (code: string) => boolean;
  removeVoucher: () => void;

  pointsBalance: number;
  pointsToRedeem: number;
  setPointsToRedeem: (points: number) => void;
  addPoints: (points: number) => void;

  totals: CartTotals;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const STORAGE_KEY = "tqmp-cart-items";
const POINTS_KEY = "tqmp-points-balance";

function readPointsBalance(): number {
  if (typeof window === "undefined") {
    return 0;
  }

  try {
    const stored = window.localStorage.getItem(POINTS_KEY);
    if (stored === null) {
      return 250;
    }
    const parsed = Number.parseInt(stored, 10);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
  } catch {
    return 0;
  }
}

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

  const [delivery, setDelivery] = useState<DeliveryOption>("pickup");
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);
  const [voucherCode, setVoucherCode] = useState<string>("");
  const [voucherError, setVoucherError] = useState<string | null>(null);
  const [pointsBalance, setPointsBalance] = useState<number>(() =>
    readPointsBalance(),
  );
  const [pointsToRedeem, setPointsToRedeemState] = useState<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(POINTS_KEY, String(pointsBalance));
  }, [pointsBalance]);

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
    setAppliedVoucher(null);
    setVoucherCode("");
    setVoucherError(null);
    setPointsToRedeemState(0);
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

  function applyVoucher(code: string): boolean {
    const trimmed = code.trim().toUpperCase();
    setVoucherCode(trimmed);

    if (trimmed.length === 0) {
      setVoucherError("Enter a voucher code first.");
      setAppliedVoucher(null);
      return false;
    }

    const match = VOUCHERS.find((voucher) => voucher.code === trimmed);
    if (!match) {
      setVoucherError("Voucher code is not valid.");
      setAppliedVoucher(null);
      return false;
    }

    if (match.minSpend !== undefined && totalPrice < match.minSpend) {
      setVoucherError(
        `Add PHP ${(match.minSpend - totalPrice).toLocaleString()} more to use this voucher.`,
      );
      setAppliedVoucher(null);
      return false;
    }

    setAppliedVoucher(match);
    setVoucherError(null);
    return true;
  }

  function removeVoucher() {
    setAppliedVoucher(null);
    setVoucherCode("");
    setVoucherError(null);
  }

  function setPointsToRedeem(points: number) {
    const safePoints = Math.max(
      0,
      Math.min(Math.floor(points), pointsBalance),
    );
    setPointsToRedeemState(safePoints);
  }

  function addPoints(points: number) {
    setPointsBalance((current) => Math.max(0, current + Math.floor(points)));
  }

  const totals = useMemo<CartTotals>(() => {
    const subtotal = totalPrice;

    let voucherDiscount = 0;
    let shippingDiscount = 0;
    if (appliedVoucher) {
      if (appliedVoucher.type === "percent") {
        voucherDiscount = Math.floor((subtotal * appliedVoucher.value) / 100);
      } else if (appliedVoucher.type === "fixed") {
        voucherDiscount = Math.min(appliedVoucher.value, subtotal);
      }
    }

    const shippingFee = delivery === "door" ? DELIVERY_FEE : 0;

    if (appliedVoucher?.type === "shipping") {
      shippingDiscount = shippingFee;
    }

    const cappedRedeem = Math.min(
      pointsToRedeem,
      Math.max(0, subtotal - voucherDiscount),
    );
    const pointsDiscount = cappedRedeem * PESO_PER_POINT;

    const grandTotal = Math.max(
      0,
      subtotal - voucherDiscount - pointsDiscount + shippingFee - shippingDiscount,
    );

    const pointsEarned = Math.floor(grandTotal * POINTS_PER_PESO);

    return {
      subtotal,
      voucherDiscount,
      pointsDiscount,
      shippingFee,
      shippingDiscount,
      grandTotal,
      pointsEarned,
    };
  }, [totalPrice, appliedVoucher, delivery, pointsToRedeem]);

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
        delivery,
        setDelivery,
        voucherCode,
        voucherError,
        appliedVoucher,
        applyVoucher,
        removeVoucher,
        pointsBalance,
        pointsToRedeem,
        setPointsToRedeem,
        addPoints,
        totals,
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
