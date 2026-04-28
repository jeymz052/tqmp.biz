"use client";

import { useCart } from "./CartProvider";

export default function CartDrawer() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setIsCartOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(4px)",
          zIndex: 200,
          animation: "fadeIn 0.2s ease",
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "420px",
          maxWidth: "100vw",
          height: "100vh",
          background: "white",
          zIndex: 201,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-8px 0 30px rgba(0,0,0,0.1)",
          animation: "slideInRight 0.3s ease",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #eee",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "1.3rem",
              fontWeight: 700,
              color: "#1a1a1a",
            }}
          >
            Shopping Cart ({totalItems})
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              background: "#f5f5f5",
              border: "none",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {items.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 0",
                color: "#999",
              }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ccc"
                strokeWidth="1.5"
                style={{ margin: "0 auto 16px" }}
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <p style={{ fontWeight: 500 }}>Your cart is empty</p>
              <p style={{ fontSize: "0.85rem", marginTop: "4px" }}>
                Add products to get started
              </p>
            </div>
          ) : (
            items.map((item, idx) => (
              <div
                key={`${item.id}-${item.size}-${idx}`}
                style={{
                  display: "flex",
                  gap: "14px",
                  padding: "16px 0",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                {/* Product image placeholder */}
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #f5f5f5, #eee)",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                  }}
                >
                  🔲
                </div>
                <div style={{ flex: 1 }}>
                  <h4
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "#1a1a1a",
                      marginBottom: "4px",
                    }}
                  >
                    {item.name}
                  </h4>
                  <p style={{ fontSize: "0.75rem", color: "#888", marginBottom: "8px" }}>
                    {item.size} · {item.thickness} · {item.category}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0",
                        border: "1px solid #e0e0e0",
                        borderRadius: "8px",
                        overflow: "hidden",
                      }}
                    >
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        style={{
                          width: "28px",
                          height: "28px",
                          border: "none",
                          background: "#f9f9f9",
                          cursor: "pointer",
                          fontSize: "0.9rem",
                        }}
                      >
                        −
                      </button>
                      <span
                        style={{
                          width: "32px",
                          textAlign: "center",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        style={{
                          width: "28px",
                          height: "28px",
                          border: "none",
                          background: "#f9f9f9",
                          cursor: "pointer",
                          fontSize: "0.9rem",
                        }}
                      >
                        +
                      </button>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{ fontWeight: 700, color: "#8B1A1A", fontSize: "0.9rem" }}>
                        ₱{(item.price * item.quantity).toLocaleString()}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#ccc",
                          fontSize: "1rem",
                        }}
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            style={{
              padding: "20px 24px",
              borderTop: "1px solid #eee",
              background: "#fafafa",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: 500, color: "#555" }}>Total</span>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: "1.2rem",
                  color: "#8B1A1A",
                }}
              >
                ₱{totalPrice.toLocaleString()}
              </span>
            </div>
            <button
              style={{
                width: "100%",
                padding: "14px",
                background: "linear-gradient(135deg, #8B1A1A, #A52525)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontWeight: 700,
                fontSize: "0.95rem",
                cursor: "pointer",
                marginBottom: "8px",
                transition: "all 0.2s",
              }}
            >
              Proceed to Checkout
            </button>
            <button
              onClick={clearCart}
              style={{
                width: "100%",
                padding: "10px",
                background: "none",
                color: "#999",
                border: "none",
                fontSize: "0.8rem",
                cursor: "pointer",
              }}
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
