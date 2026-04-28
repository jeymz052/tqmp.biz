import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #1a1a1a, #111)",
        color: "white",
        padding: "60px 0 0",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "40px",
          marginBottom: "40px",
        }}
      >
        {/* Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <Image
              src="/images/TQMPLogo-Whitebg.gif"
              alt="TQMP"
              width={44}
              height={44}
              style={{ borderRadius: "50%" }}
            />
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "1.1rem" }}>
              TQMP
            </span>
          </div>
          <p style={{ color: "#999", fontSize: "0.85rem", lineHeight: 1.7, maxWidth: "280px" }}>
            Transforming industries with cutting-edge solutions and unwavering commitment to excellence.
          </p>
          <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <a href="tel:+63277178767" style={{ color: "#bbb", textDecoration: "none", fontSize: "0.85rem" }}>
              📞 +632-7-7178767
            </a>
            <a href="mailto:sales@tqmpbiz.com" style={{ color: "#bbb", textDecoration: "none", fontSize: "0.85rem" }}>
              ✉️ sales@tqmpbiz.com
            </a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, marginBottom: "16px", fontSize: "1rem" }}>
            Company
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Link href="/home/about" style={{ color: "#999", textDecoration: "none", fontSize: "0.85rem", transition: "color 0.2s" }}>
              About Us
            </Link>
            <Link href="/home/contact" style={{ color: "#999", textDecoration: "none", fontSize: "0.85rem" }}>
              Contact & Support
            </Link>
            <Link href="/home/about" style={{ color: "#999", textDecoration: "none", fontSize: "0.85rem" }}>
              Success History
            </Link>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, marginBottom: "16px", fontSize: "1rem" }}>
            Our Services
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Link href="/home/bulletproofing" style={{ color: "#999", textDecoration: "none", fontSize: "0.85rem" }}>
              Bullet Proofing
            </Link>
            <Link href="/home/glassmanufacturing" style={{ color: "#999", textDecoration: "none", fontSize: "0.85rem" }}>
              Glass Manufacturing
            </Link>
            <Link href="/home/aluminummanufacturing" style={{ color: "#999", textDecoration: "none", fontSize: "0.85rem" }}>
              Aluminum Manufacturing
            </Link>
            <Link href="/home/glassprocessing" style={{ color: "#999", textDecoration: "none", fontSize: "0.85rem" }}>
              Glass Processing
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, marginBottom: "16px", fontSize: "1rem" }}>
            Quick Links
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Link href="/home/shop" style={{ color: "#999", textDecoration: "none", fontSize: "0.85rem" }}>
              Shop
            </Link>
            <Link href="#" style={{ color: "#999", textDecoration: "none", fontSize: "0.85rem" }}>
              Register
            </Link>
            <Link href="#" style={{ color: "#999", textDecoration: "none", fontSize: "0.85rem" }}>
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "20px 24px",
          textAlign: "center",
        }}
      >
        <p style={{ color: "#666", fontSize: "0.8rem" }}>
          © 2026 Total Quality Management Products. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
