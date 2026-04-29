"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

export interface BrochurePage {
  title: string;
  subtitle: string;
  body: string[];
  bullets: string[];
  image?: string;
}

interface BrochureViewerProps {
  pages: BrochurePage[];
  title: string;
}

export default function BrochureViewer({
  pages,
  title,
}: BrochureViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const totalSpreads = Math.ceil(pages.length / 2);
  const currentPages = useMemo(
    () => pages.slice(spreadIndex * 2, spreadIndex * 2 + 2),
    [pages, spreadIndex],
  );

  useEffect(() => {
    function syncFullscreenState() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }

    document.addEventListener("fullscreenchange", syncFullscreenState);

    return () => {
      document.removeEventListener("fullscreenchange", syncFullscreenState);
    };
  }, []);

  function closeViewer() {
    setIsOpen(false);
    setSpreadIndex(0);
    setZoom(1);
  }

  function toggleFullscreen() {
    if (!overlayRef.current) {
      return;
    }

    if (document.fullscreenElement) {
      document.exitFullscreen();
      return;
    }

    overlayRef.current.requestFullscreen?.();
  }

  if (!isOpen) {
    return (
      <button type="button" className="btn-solid brochure-button" onClick={() => setIsOpen(true)}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
        View Brochure
      </button>
    );
  }

  return (
    <div className="brochure-overlay" ref={overlayRef}>
      <div className="brochure-header">
        <div>
          <p className="eyebrow" style={{ color: "#d7b163", marginBottom: "8px" }}>
            Digital brochure
          </p>
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              lineHeight: 0.94,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {title}
          </h2>
        </div>

        <button
          type="button"
          className="control-button"
          onClick={closeViewer}
          aria-label="Close brochure"
        >
          ×
        </button>
      </div>

      <div className="brochure-stage">
        <div className="brochure-spread" style={{ transform: `scale(${zoom})` }}>
          {currentPages.map((page, index) => (
            <article
              className={`brochure-page ${index === 0 ? "is-left" : "is-right"}`}
              key={`${page.title}-${index}`}
            >
              {page.image && (
                <div className="brochure-page-cover">
                  <Image
                    src={page.image}
                    alt={page.title}
                    fill
                    sizes="(max-width: 720px) 82vw, 39vw"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="brochure-cover-copy">
                    <p className="eyebrow" style={{ color: "#fff", marginBottom: "8px" }}>
                      TQMP brochure
                    </p>
                    <h3 style={{ color: "#fff" }}>{page.title}</h3>
                  </div>
                </div>
              )}

              {!page.image && (
                <>
                  <p className="eyebrow" style={{ marginBottom: 0 }}>
                    {page.subtitle}
                  </p>
                  <h3>{page.title}</h3>
                </>
              )}

              {page.image && <p className="eyebrow">{page.subtitle}</p>}

              {page.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              <ul className="check-list">
                {page.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      <div className="brochure-controls">
        <div className="brochure-control-row">
          <button
            type="button"
            className="control-button"
            onClick={() => setSpreadIndex((current) => Math.max(current - 1, 0))}
            disabled={spreadIndex === 0}
            aria-label="Previous spread"
          >
            ‹
          </button>
          <span className="control-chip">
            Spread {spreadIndex + 1} / {totalSpreads}
          </span>
          <button
            type="button"
            className="control-button"
            onClick={() =>
              setSpreadIndex((current) => Math.min(current + 1, totalSpreads - 1))
            }
            disabled={spreadIndex === totalSpreads - 1}
            aria-label="Next spread"
          >
            ›
          </button>
        </div>

        <div className="brochure-control-row">
          <button
            type="button"
            className="control-button"
            onClick={() => setZoom((current) => Math.max(current - 0.15, 0.7))}
            aria-label="Zoom out"
          >
            −
          </button>
          <span className="control-chip">{Math.round(zoom * 100)}%</span>
          <button
            type="button"
            className="control-button"
            onClick={() => setZoom((current) => Math.min(current + 0.15, 1.6))}
            aria-label="Zoom in"
          >
            +
          </button>
          <button type="button" className="control-chip" onClick={toggleFullscreen}>
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </button>
        </div>
      </div>
    </div>
  );
}
