"use client";

import { useState } from "react";
import Image from "next/image";
import BrochureViewer, { type BrochurePage } from "../components/BrochureViewer";
import { useCart } from "../components/CartProvider";

interface Product {
  id: string;
  badge: string;
  category: string;
  name: string;
  description: string;
  price: number;
  sizes: string[];
  thicknesses: string[];
  leadTime: string;
  detail: string;
  subtitle: string;
}

interface ProductSelection {
  size: string;
  thickness: string;
}

const brochurePages: BrochurePage[] = [
  {
    title: "TQMP Philippines",
    subtitle: "Integrated network of solutions",
    body: [
      "A digital brochure experience designed to mirror the feel of a printed spread while staying easy to browse on desktop and mobile.",
      "This opening spread introduces the same logo and facility image used across the welcome page so the transition feels continuous.",
    ],
    bullets: [
      "Bullet proofing and specialist protection systems",
      "Glass processing for commercial and industrial projects",
      "Glass and aluminum manufacturing support",
    ],
    image: "/images/pfgmi.jpg",
  },
  {
    title: "Protection Solutions",
    subtitle: "Safety-first systems",
    body: [
      "From armored glazing packages to high-performance laminated assemblies, TQMP supports projects where reliability matters most.",
    ],
    bullets: [
      "Ballistic-rated glazing packages",
      "Threat-specific framing consultations",
      "Specification support for institutional builds",
    ],
  },
  {
    title: "Processing Expertise",
    subtitle: "Refined glass workflows",
    body: [
      "Precision cutting, tempering, lamination, edgework, and finishing can be coordinated through one supplier experience instead of fragmented requests.",
    ],
    bullets: [
      "Consistent lead-time guidance",
      "Production-ready finish selection",
      "Fabrication planning for project teams",
    ],
  },
  {
    title: "Manufacturing Capacity",
    subtitle: "Built for scale",
    body: [
      "The manufacturing side is presented as a clean continuation of the protection and processing story, helping visitors understand the full network at a glance.",
    ],
    bullets: [
      "Glass manufacturing programs",
      "Aluminum profile and framing systems",
      "Commercial and facade-ready solutions",
    ],
  },
  {
    title: "Product Discovery",
    subtitle: "Shop with configuration controls",
    body: [
      "Visitors can browse product groups first, then open a focused product dialog to choose dimensions and other details before adding to cart.",
    ],
    bullets: [
      "Browse-first product cards like an online marketplace",
      "Product detail popup for configuration before adding to cart",
      "Persistent cart selections between visits",
    ],
  },
  {
    title: "Partnership Experience",
    subtitle: "From entry to inquiry",
    body: [
      "The redesigned flow makes the welcome page clearer, the home page more structured, and the shop more actionable for customers exploring TQMP online.",
    ],
    bullets: [
      "Clearer navigation and page anchors",
      "Brochure and shop paths from the hero",
      "Contact-ready calls to action throughout",
    ],
  },
];

const products: Product[] = [
  {
    id: "pioneer-system",
    badge: "Pioneer",
    category: "Pioneer",
    name: "Pioneer Window and Door System",
    description:
      "One configurable Pioneer product page for standard residential window and door requirements.",
    price: 16800,
    sizes: [
      "900 x 1200 mm",
      "1200 x 1200 mm",
      "1500 x 1200 mm",
      "1800 x 1500 mm",
    ],
    thicknesses: ["1.2 mm frame", "1.5 mm frame", "2.0 mm frame"],
    leadTime: "7 to 12 working days",
    detail:
      "This combines the Pioneer line into one configurable item, so buyers choose only the size and thickness before sending the product to cart.",
    subtitle: "Configurable residential system",
  },
  {
    id: "tempered-glass-panel",
    badge: "Glass",
    category: "Glass Systems",
    name: "Tempered Glass Panel",
    description:
      "Large-format tempered panel option for storefronts, office partitions, and architectural installations.",
    price: 22400,
    sizes: ["1200 x 2400 mm", "1500 x 2400 mm", "1800 x 3000 mm"],
    thicknesses: ["10 mm", "12 mm", "15 mm"],
    leadTime: "2 to 3 weeks",
    detail:
      "Best for commercial glazing and frameless applications where cleaner sightlines and uniform finish matter.",
    subtitle: "Architectural glass panel",
  },
  {
    id: "aluminum-casement-door",
    badge: "Aluminum",
    category: "Aluminum Systems",
    name: "Aluminum Casement Door",
    description:
      "A configurable aluminum door set built for residential and light commercial entries.",
    price: 27600,
    sizes: ["900 x 2100 mm", "1200 x 2100 mm", "1500 x 2400 mm"],
    thicknesses: ["1.5 mm", "2.0 mm", "2.5 mm"],
    leadTime: "8 to 14 working days",
    detail:
      "A cleaner buying flow for aluminum sets, with finish choices shown only after the shopper opens the product.",
    subtitle: "Entry and utility door set",
  },
  {
    id: "armor-lite-panel",
    badge: "Protection",
    category: "Protection",
    name: "ArmorLite Glazed Panel",
    description:
      "A presentation-ready bullet resistant panel option for guardhouses, secure counters, and controlled access areas.",
    price: 74200,
    sizes: ["1200 x 1800 mm", "1500 x 1800 mm", "1800 x 2100 mm"],
    thicknesses: ["21 mm laminated", "24 mm laminated", "32 mm ballistic"],
    leadTime: "3 to 4 weeks",
    detail:
      "Designed for security-focused builds where laminated and ballistic glazing packages need a stronger presentation.",
    subtitle: "Security glazing solution",
  },
  {
    id: "facade-vision-panel",
    badge: "Facade",
    category: "Glass Systems",
    name: "Facade Vision Panel",
    description:
      "Commercial facade glazing package for offices and showrooms that need larger format visual consistency.",
    price: 29800,
    sizes: ["1200 x 2400 mm", "1500 x 2400 mm", "1800 x 3000 mm"],
    thicknesses: ["10 mm tempered", "12 mm tempered", "13.52 mm laminated"],
    leadTime: "2 to 3 weeks",
    detail:
      "Useful for larger storefront and facade schemes where finish, dimension, and glazing build-up need to be selected together.",
    subtitle: "Facade-ready glass system",
  },
];

const categoryOptions = ["All", ...new Set(products.map((product) => product.category))];

function getDefaultSelection(product: Product): ProductSelection {
  return {
    size: product.sizes[0],
    thickness: product.thicknesses[0],
  };
}

export default function HomePage() {
  const { addToCart, setIsCartOpen } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectionDraft, setSelectionDraft] = useState<ProductSelection | null>(null);

  const visibleProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const selectedProduct =
    selectedProductId === null
      ? null
      : products.find((product) => product.id === selectedProductId) ?? null;

  function openProduct(product: Product) {
    setSelectedProductId(product.id);
    setSelectionDraft(getDefaultSelection(product));
  }

  function closeProduct() {
    setSelectedProductId(null);
    setSelectionDraft(null);
  }

  function updateDraft(field: keyof ProductSelection, value: string) {
    setSelectionDraft((currentDraft) =>
      currentDraft ? { ...currentDraft, [field]: value } : currentDraft,
    );
  }

  function handleAddToCart() {
    if (!selectedProduct || !selectionDraft) {
      return;
    }

    addToCart({
      lineId: `${selectedProduct.id}-${selectionDraft.size}-${selectionDraft.thickness}-standard`,
      id: selectedProduct.id,
      name: selectedProduct.name,
      category: selectedProduct.category,
      size: selectionDraft.size,
      thickness: selectionDraft.thickness,
      finish: "Standard",
      price: selectedProduct.price,
      quantity: 1,
      image: selectedProduct.badge,
    });
    setIsCartOpen(true);
    closeProduct();
  }

  return (
    <>
      <div className="site-shell" id="top">
        <section className="site-hero">
          <Image
            src="/images/tqmpnew-edited.jpg"
            alt="TQMP factory"
            fill
            priority
            quality={90}
            style={{ objectFit: "cover", objectPosition: "center" }}
          />

          <div className="site-hero-inner">
            <div className="site-hero-copy">
              <p className="eyebrow" style={{ color: "#d7b163" }}>
                TQMP Philippines
              </p>
              <h2 className="site-hero-title">
                Glass and aluminum solutions that feel easier to explore
              </h2>
              <p>
                The home experience now picks up directly from the welcome page:
                tighter navigation, clearer grouped services, a brochure viewer,
                and a product catalog that guides visitors toward better inquiries.
              </p>

              <div className="site-hero-actions">
                <BrochureViewer pages={brochurePages} title="TQMP Digital Brochure" />
                <a href="#shop" className="btn-ghost">
                  Explore Shop
                </a>
              </div>
            </div>

            <div className="hero-stats">
              <div className="hero-stat-card glass-panel">
                <span className="hero-stat-label">Protection + Processing</span>
                <p className="hero-stat-value">One grouped path</p>
              </div>
              <div className="hero-stat-card glass-panel">
                <span className="hero-stat-label">Glass + Aluminum MFG</span>
                <p className="hero-stat-value">One manufacturing nav</p>
              </div>
              <div className="hero-stat-card glass-panel">
                <span className="hero-stat-label">Brochure experience</span>
                <p className="hero-stat-value">Zoom and fullscreen</p>
              </div>
              <div className="hero-stat-card glass-panel">
                <span className="hero-stat-label">Shop flow</span>
                <p className="hero-stat-value">Click to configure</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell" id="solutions">
          <div className="container-shell">
            <p className="eyebrow">Structured services</p>
            <h2 className="section-title">Grouped navigation that feels cleaner</h2>
            <p className="section-copy" style={{ marginTop: "18px" }}>
              The service architecture now follows the way you described it:
              bullet proofing and glass processing live together, and glass plus
              aluminum manufacturing live together, with their own focused anchors.
            </p>

            <div className="card-grid">
              <article className="feature-card" id="bullet-proofing">
                <p className="pill" style={{ width: "fit-content", marginBottom: "14px" }}>
                  Protection Solutions
                </p>
                <h3>Bullet Proofing</h3>
                <p style={{ marginTop: "14px" }}>
                  Security glazing systems, armored framing considerations, and
                  consultation-ready product stories for high-trust spaces.
                </p>
                <ul className="feature-list">
                  <li>Ballistic glass combinations for controlled environments</li>
                  <li>Consultative framing recommendations for secure applications</li>
                  <li>Presentation-ready content for institutional clients</li>
                </ul>
              </article>

              <article className="feature-card" id="glass-processing">
                <p className="pill" style={{ width: "fit-content", marginBottom: "14px" }}>
                  Protection Solutions
                </p>
                <h3>Glass Processing</h3>
                <p style={{ marginTop: "14px" }}>
                  Tempering, lamination, edgework, and finish-aware fabrication
                  packaged into a page visitors can understand faster.
                </p>
                <ul className="feature-list">
                  <li>Configurable processing routes for commercial projects</li>
                  <li>Better visual hierarchy for fabrication capabilities</li>
                  <li>Clearer handoff from browsing to quotation inquiry</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="section-shell" id="manufacturing">
          <div className="container-shell">
            <p className="eyebrow">Manufacturing</p>
            <h2 className="section-title">Two manufacturing stories under one roof</h2>
            <p className="section-copy" style={{ marginTop: "18px" }}>
              Visitors can move from protection and processing into the broader
              manufacturing side without feeling like they entered a different site.
            </p>

            <div className="capability-grid">
              <article className="feature-card" id="glass-manufacturing">
                <h3>Glass MFG</h3>
                <p style={{ marginTop: "14px" }}>
                  Built for facade, commercial, and project supply conversations
                  where consistency and scale matter.
                </p>
                <ul className="feature-list">
                  <li>Large-format glazing and architectural programs</li>
                  <li>Specification-friendly language for project stakeholders</li>
                  <li>Production cues that connect directly to the shop section</li>
                </ul>
              </article>

              <article className="feature-card" id="aluminum-manufacturing">
                <h3>Aluminum MFG</h3>
                <p style={{ marginTop: "14px" }}>
                  Framing systems, residential sets, and commercial-ready profiles
                  positioned as configurable products instead of static catalog text.
                </p>
                <ul className="feature-list">
                  <li>Window and door systems grouped for easier browsing</li>
                  <li>Profile finishes presented as selectable options</li>
                  <li>Cleaner route from capability pages to product inquiry</li>
                </ul>
              </article>
            </div>

            <div className="spotlight-panel" id="brochure">
              <div className="spotlight-media">
                <Image
                  src="/images/pfgmi.jpg"
                  alt="TQMP brochure preview"
                  fill
                  sizes="(max-width: 1100px) 100vw, 44vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="spotlight-content">
                <div>
                  <p className="eyebrow">Digital brochure</p>
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-heading)",
                      fontSize: "clamp(2rem, 4vw, 3.5rem)",
                      lineHeight: 0.94,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    Fullscreen, zoomable, and designed like a spread
                  </h3>
                </div>
                <p className="section-copy" style={{ maxWidth: "none" }}>
                  Instead of a plain PDF link, the home page now gives users a more
                  guided brochure viewer inspired by the reference you attached.
                </p>
                <ul className="check-list">
                  <li>Spread-style layout with left and right pages</li>
                  <li>Fullscreen mode for presentations and sharing</li>
                  <li>Zoom controls for closer reading on large layouts</li>
                </ul>
                <BrochureViewer pages={brochurePages} title="TQMP Digital Brochure" />
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell" id="shop">
          <div className="container-shell">
            <div className="shop-head">
              <div>
                <p className="eyebrow">Shop</p>
                <h2 className="section-title">Shop Products</h2>
              </div>
              <p className="section-copy" style={{ maxWidth: "520px" }}>
                Browse product cards first, then click one product to open its
                options popup for size and thickness before adding it to cart.
              </p>
            </div>

            <div className="shop-categories" role="tablist" aria-label="Shop categories">
              {categoryOptions.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`category-pill ${selectedCategory === category ? "is-active" : ""}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="shop-shelf">
              {visibleProducts.map((product) => (
                <article
                  className="shop-card"
                  key={product.id}
                >
                  <div
                    className="shop-card-media"
                    aria-hidden="true"
                    onClick={() => openProduct(product)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openProduct(product);
                      }
                    }}
                  >
                    <span className="shop-card-badge">{product.badge}</span>
                    <div className="shop-card-photo-label">Tap to view</div>
                  </div>

                  <div className="shop-card-body">
                    <div className="shop-card-topline">
                      <span className="shop-card-subtitle">{product.subtitle}</span>
                      <span className="shop-card-meta">{product.category}</span>
                    </div>

                    <div className="product-meta shop-card-price-row">
                      <div>
                        <h3 className="product-title">{product.name}</h3>
                      </div>
                      <div className="product-price">
                        PHP {product.price.toLocaleString()}
                      </div>
                    </div>

                    <p style={{ margin: 0, color: "rgba(23,23,23,0.72)", lineHeight: 1.68 }}>
                      {product.description}
                    </p>

                    <div className="shop-card-specs">
                      <span>{product.sizes.length} sizes</span>
                      <span>{product.thicknesses.length} thickness options</span>
                    </div>

                    <div className="shop-card-footer">
                      <div className="shop-card-lead">
                        <span className="shop-card-lead-label">Lead time</span>
                        <span>{product.leadTime}</span>
                      </div>
                      <button
                        type="button"
                        className="shop-card-action"
                        onClick={() => openProduct(product)}
                      >
                        Select Options
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell" id="about">
          <div className="container-shell">
            <p className="eyebrow">About</p>
            <h2 className="section-title">A more useful story for first-time visitors</h2>
            <div className="about-grid">
              <article className="feature-card">
                <h3>Why this redesign works better</h3>
                <p style={{ marginTop: "14px" }}>
                  The welcome page stays familiar, but the home experience is more
                  intentional: service grouping is clearer, calls to action are more
                  focused, and the brochure plus shop paths are easier to discover.
                </p>
              </article>
              <article className="feature-card">
                <h3>Industrial visual direction</h3>
                <p style={{ marginTop: "14px" }}>
                  The styling leans into warm glass, metal, and architectural tones
                  instead of generic startup UI, while still keeping the original
                  brand asset front and center.
                </p>
              </article>
              <article className="feature-card">
                <h3>Ready for expansion</h3>
                <p style={{ marginTop: "14px" }}>
                  Product data, brochure pages, and section anchors are now much
                  easier to grow as more categories, actual images, or live contact
                  flows are added later.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section-shell" id="contact">
          <div className="container-shell">
            <p className="eyebrow">Contact</p>
            <h2 className="section-title">Keep the next step obvious</h2>
            <p className="section-copy" style={{ marginTop: "18px" }}>
              Whether visitors come from the brochure, the service pages, or the
              shop cart, the contact section now gives them a clear way forward.
            </p>

            <div className="contact-grid">
              <article className="contact-card">
                <h3 className="product-title" style={{ fontSize: "1.4rem" }}>
                  Sales desk
                </h3>
                <ul className="contact-list">
                  <li>sales@tqmpbiz.com</li>
                  <li>+632-7-7178767</li>
                  <li>Inquiry support for product and project questions</li>
                </ul>
                <a href="mailto:sales@tqmpbiz.com" className="btn-solid" style={{ marginTop: "22px" }}>
                  Email Sales
                </a>
              </article>

              <article className="contact-card">
                <h3 className="product-title" style={{ fontSize: "1.4rem" }}>
                  Visit planning
                </h3>
                <ul className="contact-list">
                  <li>Meycauayan, Bulacan, Philippines</li>
                  <li>Factory tours and coordinated meetings</li>
                  <li>Ideal follow-up after brochure review</li>
                </ul>
                <a href="tel:+63277178767" className="btn-light" style={{ marginTop: "22px" }}>
                  Call Now
                </a>
              </article>

              <article className="contact-card">
                <h3 className="product-title" style={{ fontSize: "1.4rem" }}>
                  Partnership track
                </h3>
                <ul className="contact-list">
                  <li>Architects, contractors, and dealer partners</li>
                  <li>Support for pricing alignment and material selection</li>
                  <li>Best paired with the request-quote cart flow</li>
                </ul>
                <a href="#shop" className="btn-light" style={{ marginTop: "22px" }}>
                  Build an Inquiry
                </a>
              </article>
            </div>
          </div>
        </section>
      </div>

      {selectedProduct && selectionDraft && (
        <div className="modal-overlay" onClick={closeProduct}>
          <div className="modal-panel shop-modal-panel" onClick={(event) => event.stopPropagation()}>
            <div className="shop-modal-grid">
              <div className="shop-modal-media">
                <span className="shop-card-badge">{selectedProduct.badge}</span>
              </div>

              <div className="shop-modal-content">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "16px",
                  }}
                >
                  <div>
                    <p className="eyebrow" style={{ color: "#d7b163", marginBottom: "10px" }}>
                      {selectedProduct.category}
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
                      {selectedProduct.name}
                    </h2>
                  </div>

                  <button
                    type="button"
                    className="control-button"
                    onClick={closeProduct}
                    aria-label="Close product details"
                  >
                    ×
                  </button>
                </div>

                <p className="shop-modal-copy">{selectedProduct.description}</p>
                <p className="shop-modal-detail">{selectedProduct.detail}</p>

                <div className="shop-modal-price-row">
                  <strong className="shop-modal-price">
                    PHP {selectedProduct.price.toLocaleString()}
                  </strong>
                  <span className="shop-modal-lead">
                    Lead time: {selectedProduct.leadTime}
                  </span>
                </div>

                <div className="catalog-controls shop-modal-controls">
                  <div>
                    <select
                      className="catalog-field"
                      id="modal-size"
                      aria-label="Select size"
                      value={selectionDraft.size}
                      onChange={(event) => updateDraft("size", event.target.value)}
                    >
                      {selectedProduct.sizes.map((size) => (
                        <option key={size} value={size}>
                          {`Selected Size: ${size}`}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <select
                      className="catalog-field"
                      id="modal-thickness"
                      aria-label="Select thickness"
                      value={selectionDraft.thickness}
                      onChange={(event) => updateDraft("thickness", event.target.value)}
                    >
                      {selectedProduct.thicknesses.map((thickness) => (
                        <option key={thickness} value={thickness}>
                          {`Selected Thickness: ${thickness}`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="shop-modal-actions">
                  <button type="button" className="btn-solid" onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                  <button type="button" className="btn-ghost" onClick={closeProduct}>
                    Keep Browsing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
