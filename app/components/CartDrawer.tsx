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

  if (!isCartOpen) {
    return null;
  }

  return (
    <>
      <div
        className="cart-drawer-overlay"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <aside className="cart-drawer" aria-label="Shopping cart">
        <div className="cart-drawer-header">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <div>
              <p className="eyebrow" style={{ marginBottom: "8px" }}>
                Shopping cart
              </p>
              <h2
                style={{
                  margin: 0,
                  fontFamily: "var(--font-heading)",
                  fontSize: "2rem",
                  lineHeight: 0.95,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                {totalItems} item{totalItems === 1 ? "" : "s"}
              </h2>
            </div>
            <button
              type="button"
              className="control-button"
              style={{ color: "var(--tqmp-red)", borderColor: "rgba(23,23,23,0.1)" }}
              onClick={() => setIsCartOpen(false)}
              aria-label="Close cart"
            >
              ×
            </button>
          </div>
        </div>

        <div className="cart-drawer-body">
          {items.length === 0 ? (
            <div
              style={{
                padding: "40px 8px",
                textAlign: "center",
              }}
            >
              <p className="eyebrow" style={{ marginBottom: "12px" }}>
                Nothing added yet
              </p>
              <p style={{ color: "rgba(23,23,23,0.62)", lineHeight: 1.7 }}>
                Configure a product from the shop and it will appear here with
                its selected size, thickness, and finish.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div className="cart-line" key={item.lineId}>
                <div className="cart-thumb" aria-hidden="true" />
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "12px",
                    }}
                  >
                    <div>
                      <p className="pill" style={{ marginBottom: "8px", width: "fit-content" }}>
                        {item.category}
                      </p>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: "1rem",
                          fontWeight: 800,
                        }}
                      >
                        {item.name}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.lineId)}
                      style={{
                        border: 0,
                        background: "transparent",
                        color: "rgba(23,23,23,0.5)",
                        cursor: "pointer",
                        fontSize: "1.2rem",
                        lineHeight: 1,
                      }}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      ×
                    </button>
                  </div>

                  <p
                    style={{
                      margin: "10px 0 12px",
                      color: "rgba(23,23,23,0.62)",
                      fontSize: "0.92rem",
                    }}
                  >
                    {item.size} · {item.thickness} · {item.finish}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "16px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div className="cart-qty">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                        aria-label={`Decrease quantity for ${item.name}`}
                      >
                        −
                      </button>
                      <span
                        style={{
                          minWidth: "36px",
                          textAlign: "center",
                          fontWeight: 800,
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                        aria-label={`Increase quantity for ${item.name}`}
                      >
                        +
                      </button>
                    </div>

                    <strong style={{ color: "var(--tqmp-red)", fontSize: "1rem" }}>
                      PHP {(item.price * item.quantity).toLocaleString()}
                    </strong>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-drawer-footer">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                marginBottom: "16px",
              }}
            >
              <span style={{ color: "rgba(23,23,23,0.68)", fontWeight: 700 }}>Total</span>
              <strong
                style={{
                  color: "var(--tqmp-red)",
                  fontFamily: "var(--font-heading)",
                  fontSize: "2rem",
                  lineHeight: 0.95,
                  letterSpacing: "0.04em",
                }}
              >
                PHP {totalPrice.toLocaleString()}
              </strong>
            </div>

            <button type="button" className="btn-solid" style={{ width: "100%" }}>
              Proceed to Inquiry Checkout
            </button>
            <button
              type="button"
              onClick={clearCart}
              style={{
                width: "100%",
                marginTop: "10px",
                border: 0,
                background: "transparent",
                color: "rgba(23,23,23,0.56)",
                cursor: "pointer",
              }}
            >
              Clear cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
