"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const videos = [
  {
    id: "1f1xlzWFzLE",
    title: "TQMP Factory Tour",
  },
  {
    id: "CSU9CCyXG7g",
    title: "Glass Manufacturing Process",
  },
  {
    id: "nDshxId1lFk",
    title: "Aluminum Production Line",
  },
];

export default function WelcomePage() {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [activeVideo, setActiveVideo] = useState(0);

  return (
    <>
      {/* Full-screen Welcome Hero */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Background Image */}
        <Image
          src="/images/pfgmi.jpg"
          alt="TQMP Philippines Factory"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
          quality={90}
        />

        {/* Dark Gradient Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.6) 100%)",
            zIndex: 1,
          }}
        />

        {/* Subtle animated particles overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 20% 80%, rgba(139,26,26,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(212,168,67,0.1) 0%, transparent 50%)",
            zIndex: 2,
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 24px",
          }}
        >
          {/* Logo */}
          <div
            className="animate-fade-in"
            style={{
              marginBottom: "28px",
              borderRadius: "50%",
              overflow: "hidden",
              width: 160,
              height: 160,
              background: "rgba(255,255,255,0.95)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 40px rgba(0,0,0,0.3), 0 0 60px rgba(139,26,26,0.2)",
            }}
          >
            <Image
              src="/images/TQMPLogo-Whitebg.gif"
              alt="TQMP Logo"
              width={140}
              height={140}
              priority
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* Philippines Text */}
          <h2
            className="animate-fade-in-up delay-100"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              color: "white",
              letterSpacing: "6px",
              textTransform: "uppercase",
              marginBottom: "16px",
              textShadow: "0 4px 20px rgba(0,0,0,0.5)",
              opacity: 0,
            }}
          >
            PHILIPPINES
          </h2>

          {/* Tagline - Line 1 */}
          <p
            className="animate-fade-in-up delay-200"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
              fontWeight: 600,
              color: "#E8C547",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "4px",
              textShadow: "0 2px 10px rgba(0,0,0,0.5)",
              opacity: 0,
            }}
          >
            YOUR INTEGRATED NETWORK OF
          </p>

          {/* Tagline - Line 2 */}
          <p
            className="animate-fade-in-up delay-300"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
              fontWeight: 600,
              color: "#E8C547",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "40px",
              textShadow: "0 2px 10px rgba(0,0,0,0.5)",
              opacity: 0,
            }}
          >
            GLASS AND ALUMINUM SOLUTIONS
          </p>

          {/* Divider line */}
          <div
            className="animate-fade-in delay-300"
            style={{
              width: "80px",
              height: "3px",
              background: "linear-gradient(90deg, transparent, #E8C547, transparent)",
              marginBottom: "36px",
              opacity: 0,
            }}
          />

          {/* Buttons */}
          <div
            className="animate-fade-in-up delay-400"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              opacity: 0,
            }}
          >
            {/* Video Tour Button */}
            <button
              onClick={() => setShowVideoModal(true)}
              className="btn-outline"
              style={{ minWidth: "220px", justifyContent: "center" }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              Video Tour
            </button>

            {/* Get Started Button */}
            <Link
              href="/home"
              className="btn-primary"
              style={{ minWidth: "220px", justifyContent: "center" }}
            >
              Get Started
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "120px",
            background: "linear-gradient(transparent, rgba(0,0,0,0.4))",
            zIndex: 3,
          }}
        />

        {/* Scroll indicator */}
        <div
          className="animate-fade-in delay-600"
          style={{
            position: "absolute",
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            opacity: 0,
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.75rem",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
          <div
            className="animate-float"
            style={{
              width: "24px",
              height: "38px",
              border: "2px solid rgba(255,255,255,0.3)",
              borderRadius: "12px",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "4px",
                height: "8px",
                background: "rgba(255,255,255,0.5)",
                borderRadius: "2px",
                position: "absolute",
                top: "6px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Video Tour Modal */}
      {showVideoModal && (
        <div className="modal-overlay" onClick={() => setShowVideoModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "960px" }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <h2
                style={{
                  color: "white",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                🎬 Video Tour
              </h2>
              <button
                onClick={() => setShowVideoModal(false)}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "none",
                  color: "white",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,0.2)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
                }
              >
                ✕
              </button>
            </div>

            {/* Video Tabs */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginBottom: "20px",
                flexWrap: "wrap",
              }}
            >
              {videos.map((v, i) => (
                <button
                  key={v.id}
                  onClick={() => setActiveVideo(i)}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "10px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    transition: "all 0.2s",
                    background:
                      activeVideo === i
                        ? "linear-gradient(135deg, #8B1A1A, #A52525)"
                        : "rgba(255,255,255,0.08)",
                    color: "white",
                  }}
                >
                  {v.title}
                </button>
              ))}
            </div>

            {/* Video Player */}
            <div
              style={{
                position: "relative",
                paddingTop: "56.25%",
                borderRadius: "12px",
                overflow: "hidden",
                background: "#000",
              }}
            >
              <iframe
                key={videos[activeVideo].id}
                src={`https://www.youtube.com/embed/${videos[activeVideo].id}?autoplay=1&rel=0`}
                title={videos[activeVideo].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
