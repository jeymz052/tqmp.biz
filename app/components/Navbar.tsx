"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";

const navItems = [
  { label: "Home", href: "/home#top" },
  {
    label: "Protection Solutions",
    href: "/home#solutions",
    children: [
      { label: "Bullet Proofing", href: "/home#bullet-proofing" },
      { label: "Glass Processing", href: "/home#glass-processing" },
    ],
  },
  {
    label: "Manufacturing",
    href: "/home#manufacturing",
    children: [
      { label: "Glass MFG", href: "/home#glass-manufacturing" },
      { label: "Aluminum MFG", href: "/home#aluminum-manufacturing" },
    ],
  },
  { label: "Shop", href: "/home#shop" },
  { label: "About", href: "/home#about" },
  { label: "Contact", href: "/home#contact" },
];

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="site-topbar">
        <div className="site-topbar-inner">
          <div className="site-topbar-copy">
            Create an account and become a partner to access best prices
          </div>
          <div className="site-topbar-links">
            <a href="tel:+63277178767">+632-7-7178767</a>
            <a href="mailto:sales@tqmpbiz.com">sales@tqmpbiz.com</a>
          </div>
        </div>
      </div>

      <header className="site-navbar">
        <div className="site-navbar-inner">
          <Link href="/home#top" className="brand-link" onClick={() => setMobileOpen(false)}>
            <Image
              src="/images/TQMPLogo-Whitebg.gif"
              alt="TQMP Logo"
              width={72}
              height={72}
              priority
              style={{ width: "72px", height: "72px", objectFit: "contain" }}
            />
            <div>
              <h1 className="brand-name">TQMP Philippines</h1>
              <span className="brand-subtitle">
                Glass and aluminum supplier
              </span>
            </div>
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) =>
              item.children ? (
                <div className="nav-dropdown" key={item.label}>
                  <button type="button" className="nav-trigger">
                    {item.label}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  <div className="nav-menu">
                    {item.children.map((child) => (
                      <Link key={child.label} href={child.href}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={item.label} href={item.href} className="nav-link">
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              className="cart-button"
              onClick={() => setIsCartOpen(true)}
              aria-label="Open shopping cart"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
              </svg>
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </button>

            <Link href="/home#contact" className="btn-light">
              Request Quote
            </Link>

            <button
              type="button"
              className="mobile-menu-button"
              onClick={() => setMobileOpen((currentOpen) => !currentOpen)}
              aria-label="Toggle mobile navigation"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {mobileOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <>
                    <path d="M3 6h18" />
                    <path d="M3 12h18" />
                    <path d="M3 18h18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="mobile-nav">
            <Link href="/home#top" onClick={() => setMobileOpen(false)}>
              Home
            </Link>

            <details open>
              <summary>Protection Solutions</summary>
              <div>
                <Link href="/home#bullet-proofing" onClick={() => setMobileOpen(false)}>
                  Bullet Proofing
                </Link>
                <Link href="/home#glass-processing" onClick={() => setMobileOpen(false)}>
                  Glass Processing
                </Link>
              </div>
            </details>

            <details open>
              <summary>Manufacturing</summary>
              <div>
                <Link href="/home#glass-manufacturing" onClick={() => setMobileOpen(false)}>
                  Glass MFG
                </Link>
                <Link href="/home#aluminum-manufacturing" onClick={() => setMobileOpen(false)}>
                  Aluminum MFG
                </Link>
              </div>
            </details>

            <Link href="/home#shop" onClick={() => setMobileOpen(false)}>
              Shop
            </Link>
            <Link href="/home#about" onClick={() => setMobileOpen(false)}>
              About
            </Link>
            <Link href="/home#contact" onClick={() => setMobileOpen(false)}>
              Contact
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
