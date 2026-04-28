"use client";

import { useState, useRef } from "react";

interface BrochureViewerProps {
  images: string[];
  title: string;
}

export default function BrochureViewer({ images, title }: BrochureViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalPages = images.length;

  const nextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };
  const zoomIn = () => setZoom((z) => Math.min(z + 0.25, 3));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));

  const toggleFullscreen = () => {
    if (!isFullscreen && containerRef.current) {
      containerRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          background: "linear-gradient(135deg, #8B1A1A, #A52525)",
          color: "white",
          padding: "14px 32px",
          borderRadius: "12px",
          border: "none",
          fontWeight: 600,
          fontSize: "1rem",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          transition: "all 0.3s",
          boxShadow: "0 4px 15px rgba(139,26,26,0.3)",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
        View Brochure
      </button>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.92)",
        backdropFilter: "blur(8px)",
        zIndex: 300,
        display: "flex",
        flexDirection: "column",
        animation: "fadeIn 0.3s ease",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <h3 style={{ color: "white", fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "1.1rem" }}>
          📖 {title}
        </h3>
        <button
          onClick={() => { setIsOpen(false); setZoom(1); setCurrentPage(0); }}
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "none",
            color: "white",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "1.1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ✕
        </button>
      </div>

      {/* Viewer area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "auto",
          padding: "20px",
          position: "relative",
        }}
      >
        {/* Prev arrow */}
        {currentPage > 0 && (
          <button
            onClick={prevPage}
            style={{
              position: "absolute",
              left: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.1)",
              border: "none",
              color: "white",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "1.5rem",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s",
            }}
          >
            ‹
          </button>
        )}

        {/* Page display - using spread view */}
        <div
          style={{
            display: "flex",
            gap: "4px",
            transform: `scale(${zoom})`,
            transition: "transform 0.3s ease",
            transformOrigin: "center center",
          }}
        >
          {/* Left page */}
          <div
            style={{
              width: "400px",
              height: "560px",
              background: "linear-gradient(135deg, #f5f5f5, #e8e8e8)",
              borderRadius: "4px 0 0 4px",
              boxShadow: "-4px 0 20px rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
              <p style={{ fontSize: "0.9rem", fontWeight: 500 }}>Page {currentPage * 2 + 1}</p>
              <div
                style={{
                  width: "100%",
                  height: "400px",
                  background: "linear-gradient(180deg, #f0f0f0, #e0e0e0)",
                  borderRadius: "8px",
                  marginTop: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "3rem",
                }}
              >
                📄
              </div>
            </div>
            {/* Page fold effect */}
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: "20px",
                background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.05))",
              }}
            />
          </div>

          {/* Right page */}
          <div
            style={{
              width: "400px",
              height: "560px",
              background: "linear-gradient(135deg, #f8f8f8, #f0f0f0)",
              borderRadius: "0 4px 4px 0",
              boxShadow: "4px 0 20px rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
              <p style={{ fontSize: "0.9rem", fontWeight: 500 }}>Page {currentPage * 2 + 2}</p>
              <div
                style={{
                  width: "100%",
                  height: "400px",
                  background: "linear-gradient(180deg, #f0f0f0, #e0e0e0)",
                  borderRadius: "8px",
                  marginTop: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "3rem",
                }}
              >
                📄
              </div>
            </div>
            {/* Page fold effect */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "20px",
                background: "linear-gradient(270deg, transparent, rgba(0,0,0,0.05))",
              }}
            />
          </div>
        </div>

        {/* Next arrow */}
        {currentPage < totalPages - 1 && (
          <button
            onClick={nextPage}
            style={{
              position: "absolute",
              right: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.1)",
              border: "none",
              color: "white",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "1.5rem",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ›
          </button>
        )}
      </div>

      {/* Controls bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
          padding: "16px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <button onClick={prevPage} disabled={currentPage === 0}
          style={{ background: "rgba(255,255,255,0.1)", border: "none", color: currentPage === 0 ? "#555" : "white", padding: "8px 12px", borderRadius: "8px", cursor: "pointer", fontSize: "1.2rem" }}>
          ‹
        </button>

        <span style={{ color: "white", fontSize: "0.85rem", minWidth: "80px", textAlign: "center" }}>
          {currentPage + 1} / {totalPages}
        </span>

        <button onClick={nextPage} disabled={currentPage === totalPages - 1}
          style={{ background: "rgba(255,255,255,0.1)", border: "none", color: currentPage === totalPages - 1 ? "#555" : "white", padding: "8px 12px", borderRadius: "8px", cursor: "pointer", fontSize: "1.2rem" }}>
          ›
        </button>

        <div style={{ width: "1px", height: "24px", background: "rgba(255,255,255,0.2)" }} />

        <button onClick={zoomOut}
          style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "white", padding: "8px 12px", borderRadius: "8px", cursor: "pointer" }}>
          🔍−
        </button>
        <span style={{ color: "white", fontSize: "0.8rem" }}>{Math.round(zoom * 100)}%</span>
        <button onClick={zoomIn}
          style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "white", padding: "8px 12px", borderRadius: "8px", cursor: "pointer" }}>
          🔍+
        </button>

        <div style={{ width: "1px", height: "24px", background: "rgba(255,255,255,0.2)" }} />

        <button onClick={toggleFullscreen}
          style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "white", padding: "8px 12px", borderRadius: "8px", cursor: "pointer" }}>
          ⛶
        </button>
      </div>
    </div>
  );
}
