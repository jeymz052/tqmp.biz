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
      <section className="welcome-shell">
        <Image
          src="/images/pfgmi.jpg"
          alt="TQMP Philippines Factory"
          fill
          priority
          quality={92}
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div className="welcome-overlay" />

        <div className="welcome-grid">
          <div className="welcome-stage">
            <div className="welcome-logo-wrap animate-fade-in delay-100">
              <Image
                src="/images/TQMPLogo-Whitebg.gif"
                alt="TQMP Logo"
                width={620}
                height={280}
                priority
                style={{ width: "100%", height: "auto" }}
              />
            </div>

            <div className="welcome-title-stack">
              <span className="welcome-block welcome-block-large animate-fade-in-up delay-200">
                Philippines
              </span>
              <span className="welcome-block animate-fade-in-up delay-300">
                Your integrated network of
              </span>
              <span className="welcome-block animate-fade-in-up delay-400">
                Glass and aluminum
              </span>
              <span className="welcome-block animate-fade-in-up delay-500">
                Solutions
              </span>
            </div>

            <div className="welcome-actions animate-fade-in-up delay-500">
              <button
                type="button"
                onClick={() => setShowVideoModal(true)}
                className="btn-ghost"
                style={{ minWidth: "230px" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                View Tour
              </button>

              <Link href="/home" className="btn-light" style={{ minWidth: "230px" }}>
                Get Started
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {showVideoModal && (
        <div className="modal-overlay" onClick={() => setShowVideoModal(false)}>
          <div className="modal-panel" onClick={(event) => event.stopPropagation()}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div>
                <p className="eyebrow" style={{ color: "#d7b163", marginBottom: "10px" }}>
                  Video tour
                </p>
                <h2
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    lineHeight: 0.92,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  Explore TQMP in motion
                </h2>
              </div>
              <button
                type="button"
                className="control-button"
                onClick={() => setShowVideoModal(false)}
                aria-label="Close video tour"
              >
                ×
              </button>
            </div>

            <div className="video-tab-row">
              {videos.map((video, index) => (
                <button
                  key={video.id}
                  type="button"
                  className={`video-tab ${activeVideo === index ? "is-active" : ""}`}
                  onClick={() => setActiveVideo(index)}
                >
                  {video.title}
                </button>
              ))}
            </div>

            <div className="embed-frame">
              <iframe
                key={videos[activeVideo].id}
                src={`https://www.youtube.com/embed/${videos[activeVideo].id}?autoplay=1&rel=0`}
                title={videos[activeVideo].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
