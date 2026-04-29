import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer-shell">
      <div className="footer-grid">
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              marginBottom: "18px",
            }}
          >
            <Image
              src="/images/TQMPLogo-Whitebg.gif"
              alt="TQMP"
              width={72}
              height={72}
              style={{ width: "72px", height: "72px", objectFit: "contain" }}
            />
            <div>
              <h3 className="footer-title" style={{ marginBottom: "6px" }}>
                TQMP Philippines
              </h3>
              <span className="footer-note">Integrated glass and aluminum solutions</span>
            </div>
          </div>
          <p className="footer-note" style={{ maxWidth: "340px" }}>
            Built for stronger introductions, better navigation, and cleaner
            product discovery from welcome page to inquiry-ready cart.
          </p>
        </div>

        <div>
          <h3 className="footer-title">Explore</h3>
          <div className="footer-list">
            <Link href="/home#solutions">Protection Solutions</Link>
            <Link href="/home#manufacturing">Manufacturing</Link>
            <Link href="/home#shop">Shop</Link>
            <Link href="/home#about">About</Link>
          </div>
        </div>

        <div>
          <h3 className="footer-title">Specialties</h3>
          <div className="footer-list">
            <Link href="/home#bullet-proofing">Bullet Proofing</Link>
            <Link href="/home#glass-processing">Glass Processing</Link>
            <Link href="/home#glass-manufacturing">Glass MFG</Link>
            <Link href="/home#aluminum-manufacturing">Aluminum MFG</Link>
          </div>
        </div>

        <div>
          <h3 className="footer-title">Contact</h3>
          <div className="footer-list">
            <a href="tel:+63277178767">+632-7-7178767</a>
            <a href="mailto:sales@tqmpbiz.com">sales@tqmpbiz.com</a>
            <span>Meycauayan, Bulacan, Philippines</span>
            <Link href="/home#contact">Request a site visit</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 Total Quality Management Products. All rights reserved.
      </div>
    </footer>
  );
}
