"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DELIVERY_FEE,
  VOUCHERS,
  useCart,
  type DeliveryOption,
} from "../../components/CartProvider";

interface AddressForm {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  notes: string;
}

const initialAddress: AddressForm = {
  fullName: "",
  phone: "",
  street: "",
  city: "",
  province: "",
  postalCode: "",
  notes: "",
};

type PaymentMethod = "cod" | "gcash" | "bank";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    totalItems,
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
    clearCart,
  } = useCart();

  const [voucherInput, setVoucherInput] = useState(voucherCode);
  const [address, setAddress] = useState<AddressForm>(initialAddress);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [orderPlaced, setOrderPlaced] = useState<{
    reference: string;
    earned: number;
  } | null>(null);

  const maxRedeemable = Math.min(
    pointsBalance,
    Math.max(0, totals.subtotal - totals.voucherDiscount),
  );

  function handleApplyVoucher() {
    applyVoucher(voucherInput);
  }

  function handleQuickVoucher(code: string) {
    setVoucherInput(code);
    applyVoucher(code);
  }

  function handleRedeemAll() {
    setPointsToRedeem(maxRedeemable);
  }

  function handleAddressChange(field: keyof AddressForm, value: string) {
    setAddress((current) => ({ ...current, [field]: value }));
  }

  function isAddressValid(): boolean {
    if (delivery !== "door") {
      return true;
    }
    return (
      address.fullName.trim().length > 0 &&
      address.phone.trim().length > 0 &&
      address.street.trim().length > 0 &&
      address.city.trim().length > 0 &&
      address.province.trim().length > 0
    );
  }

  function handlePlaceOrder() {
    if (items.length === 0 || !isAddressValid()) {
      return;
    }
    const reference = `TQMP-${Date.now().toString().slice(-8)}`;
    const earned = totals.pointsEarned;
    addPoints(earned - pointsToRedeem);
    setOrderPlaced({ reference, earned });
  }

  if (orderPlaced) {
    return (
      <section className="section-shell">
        <div className="container-shell">
          <div className="checkout-success">
            <p className="eyebrow">Order placed</p>
            <h1 className="section-title">Thank you for your order</h1>
            <p className="section-copy" style={{ marginTop: "18px" }}>
              Your reference number is <strong>{orderPlaced.reference}</strong>.
              Our sales desk will follow up shortly to confirm payment and
              schedule your{" "}
              {delivery === "pickup" ? "pickup" : "door-to-door delivery"}.
            </p>
            <div className="checkout-success-points">
              <span>Points earned</span>
              <strong>+{orderPlaced.earned.toLocaleString()} pts</strong>
            </div>
            <div
              style={{
                display: "flex",
                gap: "14px",
                marginTop: "28px",
                flexWrap: "wrap",
              }}
            >
              <Link href="/home" className="btn-solid">
                Back to shop
              </Link>
              <button
                type="button"
                className="btn-light"
                onClick={() => {
                  clearCart();
                  router.push("/home");
                }}
              >
                Clear cart and exit
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="section-shell">
        <div className="container-shell">
          <p className="eyebrow">Checkout</p>
          <h1 className="section-title">Your cart is empty</h1>
          <p className="section-copy" style={{ marginTop: "18px" }}>
            Add a configured product from the shop to start a payment.
          </p>
          <Link
            href="/home#shop"
            className="btn-solid"
            style={{ marginTop: "28px" }}
          >
            Back to shop
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section-shell">
      <div className="container-shell">
        <div className="checkout-head">
          <p className="eyebrow">Checkout</p>
          <h1 className="section-title">Proceed to Payment</h1>
          <p className="section-copy" style={{ marginTop: "14px" }}>
            Choose your delivery option, apply a voucher or use your TQMP
            points, then confirm your order.
          </p>
        </div>

        <div className="checkout-grid">
          <div className="checkout-main">
            <article className="checkout-card">
              <header className="checkout-card-head">
                <p className="pill">Step 1</p>
                <h2 className="checkout-card-title">Delivery option</h2>
              </header>

              <div className="delivery-options">
                <DeliveryChoice
                  option="pickup"
                  title="Pickup at TQMP"
                  description="Pick up at our Meycauayan, Bulacan facility. No delivery fee."
                  fee={0}
                  active={delivery === "pickup"}
                  onSelect={setDelivery}
                />
                <DeliveryChoice
                  option="door"
                  title="Door-to-Door Delivery"
                  description="We deliver to your address within Metro Manila and select Luzon zones."
                  fee={DELIVERY_FEE}
                  active={delivery === "door"}
                  onSelect={setDelivery}
                />
              </div>

              {delivery === "door" && (
                <div className="address-form">
                  <h3 className="checkout-subtitle">Delivery address</h3>
                  <div className="address-grid">
                    <label className="address-field">
                      <span>Full name</span>
                      <input
                        type="text"
                        value={address.fullName}
                        onChange={(event) =>
                          handleAddressChange("fullName", event.target.value)
                        }
                        placeholder="Juan Dela Cruz"
                      />
                    </label>
                    <label className="address-field">
                      <span>Phone number</span>
                      <input
                        type="tel"
                        value={address.phone}
                        onChange={(event) =>
                          handleAddressChange("phone", event.target.value)
                        }
                        placeholder="09xx xxx xxxx"
                      />
                    </label>
                    <label
                      className="address-field"
                      style={{ gridColumn: "1 / -1" }}
                    >
                      <span>Street, building, unit</span>
                      <input
                        type="text"
                        value={address.street}
                        onChange={(event) =>
                          handleAddressChange("street", event.target.value)
                        }
                        placeholder="123 Sample St., Brgy. Example"
                      />
                    </label>
                    <label className="address-field">
                      <span>City</span>
                      <input
                        type="text"
                        value={address.city}
                        onChange={(event) =>
                          handleAddressChange("city", event.target.value)
                        }
                        placeholder="Quezon City"
                      />
                    </label>
                    <label className="address-field">
                      <span>Province</span>
                      <input
                        type="text"
                        value={address.province}
                        onChange={(event) =>
                          handleAddressChange("province", event.target.value)
                        }
                        placeholder="Metro Manila"
                      />
                    </label>
                    <label className="address-field">
                      <span>Postal code (optional)</span>
                      <input
                        type="text"
                        value={address.postalCode}
                        onChange={(event) =>
                          handleAddressChange("postalCode", event.target.value)
                        }
                        placeholder="1100"
                      />
                    </label>
                    <label
                      className="address-field"
                      style={{ gridColumn: "1 / -1" }}
                    >
                      <span>Delivery notes (optional)</span>
                      <textarea
                        rows={3}
                        value={address.notes}
                        onChange={(event) =>
                          handleAddressChange("notes", event.target.value)
                        }
                        placeholder="Landmarks, gate hours, recipient instructions..."
                      />
                    </label>
                  </div>
                </div>
              )}
            </article>

            <article className="checkout-card">
              <header className="checkout-card-head">
                <p className="pill">Step 2</p>
                <h2 className="checkout-card-title">Voucher / Promo code</h2>
              </header>

              <div className="voucher-row">
                <input
                  type="text"
                  className="voucher-input"
                  placeholder="Enter promo code"
                  value={voucherInput}
                  onChange={(event) =>
                    setVoucherInput(event.target.value.toUpperCase())
                  }
                />
                <button
                  type="button"
                  className="btn-solid voucher-apply"
                  onClick={handleApplyVoucher}
                >
                  Apply
                </button>
              </div>

              {voucherError && (
                <p className="voucher-error">{voucherError}</p>
              )}

              {appliedVoucher && (
                <div className="voucher-applied">
                  <div>
                    <strong>{appliedVoucher.code}</strong>
                    <span> — {appliedVoucher.label}</span>
                  </div>
                  <button
                    type="button"
                    className="voucher-remove"
                    onClick={() => {
                      removeVoucher();
                      setVoucherInput("");
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}

              <div className="voucher-suggestions">
                <p className="checkout-helper">Available vouchers</p>
                <div className="voucher-chip-row">
                  {VOUCHERS.map((voucher) => (
                    <button
                      key={voucher.code}
                      type="button"
                      className={`voucher-chip ${
                        appliedVoucher?.code === voucher.code ? "is-active" : ""
                      }`}
                      onClick={() => handleQuickVoucher(voucher.code)}
                    >
                      <strong>{voucher.code}</strong>
                      <span>{voucher.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </article>

            <article className="checkout-card">
              <header className="checkout-card-head">
                <p className="pill">Step 3</p>
                <h2 className="checkout-card-title">TQMP Points</h2>
              </header>

              <div className="points-summary">
                <div>
                  <p className="checkout-helper">Available balance</p>
                  <strong className="points-value">
                    {pointsBalance.toLocaleString()} pts
                  </strong>
                </div>
                <div>
                  <p className="checkout-helper">1 point = PHP 1 off</p>
                  <span className="checkout-subhelper">
                    Earn 1 point for every PHP 100 spent.
                  </span>
                </div>
              </div>

              <div className="points-redeem">
                <label className="address-field" style={{ flex: 1 }}>
                  <span>Redeem points</span>
                  <input
                    type="number"
                    min={0}
                    max={maxRedeemable}
                    value={pointsToRedeem}
                    onChange={(event) =>
                      setPointsToRedeem(
                        Number.parseInt(event.target.value || "0", 10),
                      )
                    }
                    disabled={maxRedeemable === 0}
                  />
                </label>
                <button
                  type="button"
                  className="btn-light"
                  onClick={handleRedeemAll}
                  disabled={maxRedeemable === 0}
                >
                  Use Max ({maxRedeemable.toLocaleString()})
                </button>
              </div>
              {pointsToRedeem > 0 && (
                <p className="checkout-helper" style={{ marginTop: "10px" }}>
                  -PHP {pointsToRedeem.toLocaleString()} will be deducted from
                  your total.
                </p>
              )}
            </article>

            <article className="checkout-card">
              <header className="checkout-card-head">
                <p className="pill">Step 4</p>
                <h2 className="checkout-card-title">Payment method</h2>
              </header>
              <div className="payment-options">
                <PaymentChoice
                  method="cod"
                  title="Cash on Pickup / Delivery"
                  description="Pay in cash when you pick up or receive your order."
                  active={paymentMethod === "cod"}
                  onSelect={setPaymentMethod}
                />
                <PaymentChoice
                  method="gcash"
                  title="GCash / E-wallet"
                  description="A payment link will be sent to your phone after confirmation."
                  active={paymentMethod === "gcash"}
                  onSelect={setPaymentMethod}
                />
                <PaymentChoice
                  method="bank"
                  title="Bank Transfer"
                  description="Account details will be emailed for direct bank deposit."
                  active={paymentMethod === "bank"}
                  onSelect={setPaymentMethod}
                />
              </div>
            </article>
          </div>

          <aside className="checkout-summary">
            <h2 className="checkout-card-title">Order summary</h2>
            <p className="checkout-helper">
              {totalItems} item{totalItems === 1 ? "" : "s"}
            </p>

            <ul className="summary-lines">
              {items.map((item) => (
                <li key={item.lineId} className="summary-line">
                  <div>
                    <strong>{item.name}</strong>
                    <span className="summary-line-meta">
                      {item.size} · {item.thickness} · x{item.quantity}
                    </span>
                  </div>
                  <span className="summary-line-price">
                    PHP {(item.price * item.quantity).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>

            <dl className="summary-rows">
              <SummaryRow
                label="Subtotal"
                value={`PHP ${totals.subtotal.toLocaleString()}`}
              />
              {totals.voucherDiscount > 0 && (
                <SummaryRow
                  label={`Voucher (${appliedVoucher?.code ?? ""})`}
                  value={`-PHP ${totals.voucherDiscount.toLocaleString()}`}
                  highlight="discount"
                />
              )}
              {totals.pointsDiscount > 0 && (
                <SummaryRow
                  label={`Points (${pointsToRedeem.toLocaleString()} pts)`}
                  value={`-PHP ${totals.pointsDiscount.toLocaleString()}`}
                  highlight="discount"
                />
              )}
              <SummaryRow
                label={
                  delivery === "pickup"
                    ? "Pickup fee"
                    : "Door-to-door delivery"
                }
                value={
                  totals.shippingFee === 0
                    ? "Free"
                    : `PHP ${totals.shippingFee.toLocaleString()}`
                }
              />
              {totals.shippingDiscount > 0 && (
                <SummaryRow
                  label="Shipping voucher"
                  value={`-PHP ${totals.shippingDiscount.toLocaleString()}`}
                  highlight="discount"
                />
              )}
            </dl>

            <div className="summary-total">
              <span>Total to pay</span>
              <strong>PHP {totals.grandTotal.toLocaleString()}</strong>
            </div>

            <div className="summary-points">
              <span>You will earn</span>
              <strong>+{totals.pointsEarned.toLocaleString()} pts</strong>
            </div>

            <button
              type="button"
              className="btn-solid"
              style={{ width: "100%", marginTop: "18px" }}
              onClick={handlePlaceOrder}
              disabled={!isAddressValid()}
            >
              Place Order
            </button>
            {!isAddressValid() && (
              <p className="voucher-error" style={{ marginTop: "10px" }}>
                Fill in the delivery address to place your order.
              </p>
            )}
            <Link
              href="/home#shop"
              className="checkout-back-link"
              style={{ marginTop: "12px" }}
            >
              ← Continue shopping
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}

function DeliveryChoice({
  option,
  title,
  description,
  fee,
  active,
  onSelect,
}: {
  option: DeliveryOption;
  title: string;
  description: string;
  fee: number;
  active: boolean;
  onSelect: (option: DeliveryOption) => void;
}) {
  return (
    <button
      type="button"
      className={`delivery-choice ${active ? "is-active" : ""}`}
      onClick={() => onSelect(option)}
      aria-pressed={active}
    >
      <div className="delivery-choice-head">
        <span className="delivery-choice-title">{title}</span>
        <span className="delivery-choice-fee">
          {fee === 0 ? "Free" : `PHP ${fee.toLocaleString()}`}
        </span>
      </div>
      <p className="delivery-choice-copy">{description}</p>
    </button>
  );
}

function PaymentChoice({
  method,
  title,
  description,
  active,
  onSelect,
}: {
  method: PaymentMethod;
  title: string;
  description: string;
  active: boolean;
  onSelect: (method: PaymentMethod) => void;
}) {
  return (
    <button
      type="button"
      className={`payment-choice ${active ? "is-active" : ""}`}
      onClick={() => onSelect(method)}
      aria-pressed={active}
    >
      <span className="payment-choice-title">{title}</span>
      <p className="payment-choice-copy">{description}</p>
    </button>
  );
}

function SummaryRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: "discount";
}) {
  return (
    <div className={`summary-row ${highlight === "discount" ? "is-discount" : ""}`}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
