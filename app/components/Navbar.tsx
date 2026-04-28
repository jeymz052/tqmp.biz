"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";

const navItems = [
  { label: "Home", href: "/home" },
  {
    label: "Protection & Processing",
    href: "#",
    children: [
      { label: "Bullet Proof Armouring", href: "/home/bulletproofing" },
      { label: "Glass Processing", href: "/home/glassprocessing" },
    ],
  },
  {
    label: "Manufacturing",
    href: "#",
    children: [
      { label: "Glass Manufacturing", href: "/home/glassmanufacturing" },
      { label: "Aluminum Manufacturing", href: "/home/aluminummanufacturing" },
    ],
  },
  { label: "Shop", href: "/home/shop" },
  {
    label: "About",
    href: "/home/about",
    children: [
      { label: "Our History", href: "/home/about" },
      { label: "Vision & Mission", href: "/home/about#vision" },
    ],
  },
  { label: "Contact", href: "/home/contact" },
];

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div
        style={{
          background: "linear-gradient(135deg, #8B1A1A, #6B1010)",
          color: "white",
          fontSize: "0.8rem",
          padding: "8px 0",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <span style={{ fontWeight: 600, letterSpacing: "0.5px" }}>
            CREATE AN ACCOUNT AND BECOME A PARTNER TO ACCESS BEST PRICES!
          </span>
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <a
              href="tel:+63277178767"
              style={{
                color: "white",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              📞 +632-7-7178767
            </a>
            <a
              href="mailto:sales@tqmpbiz.com"
              style={{
                color: "white",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              ✉️ sales@tqmpbiz.com
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header
        style={{
          background: "white",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          position: "sticky",
          top: 0,
          zIndex: 50,
          boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "70px",
          }}
        >
          {/* Logo section */}
          <Link
            href="/home"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
            }}
          >
            <Image
              src="/images/TQMPLogo-Whitebg.gif"
              alt="TQMP Logo"
              width={48}
              height={48}
              style={{ borderRadius: "50%" }}
            />
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                color: "#8B1A1A",
                letterSpacing: "0.5px",
              }}
            >
              TQMP GLASS AND ALUMINUM SUPPLIER
            </span>
          </Link>

          {/* Right side: nav + actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {/* Desktop nav */}
            <nav
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2px",
              }}
              className="desktop-nav"
            >
              {navItems.map((item) =>
                item.children ? (
                  <div className="dropdown" key={item.label}>
                    <span
                      className="nav-link"
                      style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}
                    >
                      {item.label}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                    <div className="dropdown-menu">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="dropdown-item"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link key={item.label} href={item.href} className="nav-link">
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              style={{
                position: "relative",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "8px",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(139,26,26,0.06)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B1A1A" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </button>

            {/* Register / Login */}
            <Link
              href="#"
              style={{
                color: "#8B1A1A",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: 500,
                padding: "8px 12px",
              }}
            >
              Register
            </Link>
            <Link
              href="#"
              style={{
                background: "linear-gradient(135deg, #8B1A1A, #A52525)",
                color: "white",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: 600,
                padding: "8px 24px",
                borderRadius: "8px",
                transition: "all 0.2s",
              }}
            >
              Login
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mobile-menu-btn"
              style={{
                display: "none",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B1A1A" strokeWidth="2">
                {mobileOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <>
                    <path d="M3 6h18M3 12h18M3 18h18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            style={{
              background: "white",
              borderTop: "1px solid rgba(0,0,0,0.06)",
              padding: "16px 24px",
            }}
            className="mobile-nav"
          >
            {navItems.map((item) => (
              <div key={item.label} style={{ marginBottom: "8px" }}>
                {item.children ? (
                  <>
                    <span
                      style={{
                        display: "block",
                        padding: "10px 0",
                        fontWeight: 600,
                        color: "#8B1A1A",
                        fontSize: "0.9rem",
                      }}
                    >
                      {item.label}
                    </span>
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        style={{
                          display: "block",
                          padding: "8px 16px",
                          color: "#555",
                          textDecoration: "none",
                          fontSize: "0.875rem",
                        }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "block",
                      padding: "10px 0",
                      color: "#333",
                      textDecoration: "none",
                      fontWeight: 500,
                      fontSize: "0.9rem",
                    }}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </header>

      {/* Responsive styles */}
      <style jsx global>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 901px) {
          .mobile-nav { display: none !important; }
        }
      `}</style>
    </>
  );
}
