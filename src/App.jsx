import React, { useEffect, useMemo, useRef, useState } from "react";
import { usePretextTypography } from "./usePretextTypography.js";

const productImages = {
  bpc157Hero: new URL("../assets/products/bpc-157-hero.png", import.meta.url).href,
  bpc157: new URL("../assets/products/bpc-157.png", import.meta.url).href,
  cjc1295: new URL("../assets/products/cjc-1295.png", import.meta.url).href,
  ghkCu: new URL("../assets/products/ghk-cu.png", import.meta.url).href,
  thymosinAlpha1: new URL("../assets/products/thymosin-alpha-1.png", import.meta.url).href,
  nad: new URL("../assets/products/nad.png", import.meta.url).href,
  glutathione: new URL("../assets/products/glutathione.png", import.meta.url).href,
  pt141: new URL("../assets/products/pt-141.png", import.meta.url).href,
};

const products = [
  {
    id: "bpc-157",
    category: "Rebuild",
    name: "BPC-157",
    code: "PLY-001",
    dose: "500 mcg",
    count: "20 strips",
    price: 179,
    image: productImages.bpc157,
    summary: "Regenerative peptide for everyday recovery support.",
    accent: "#0d93c8",
  },
  {
    id: "cjc-1295",
    category: "Strength",
    name: "CJC-1295",
    code: "PLY-002",
    dose: "150 mcg",
    count: "20 strips",
    price: 139,
    image: productImages.cjc1295,
    summary: "Growth-hormone-supportive peptide for training and recovery.",
    accent: "#0a3b58",
  },
  {
    id: "ghk-cu",
    category: "Beauty",
    name: "GHK-Cu",
    code: "PLY-003",
    dose: "3 mg",
    count: "20 strips",
    price: 139,
    image: productImages.ghkCu,
    summary: "Copper-binding peptide for skin and hair support.",
    accent: "#27c4c5",
  },
  {
    id: "thymosin-alpha-1",
    category: "Immune",
    name: "Thymosin Alpha-1",
    shortName: "Thymosin A-1",
    code: "PLY-004",
    dose: "500 mcg",
    count: "20 strips",
    price: 198,
    image: productImages.thymosinAlpha1,
    summary: "Thymic peptide for year-round immune resilience.",
    accent: "#34ad93",
  },
  {
    id: "nad",
    category: "Energy",
    name: "NAD+",
    code: "PLY-005",
    dose: "100 mg",
    count: "30 strips",
    price: 118,
    image: productImages.nad,
    summary: "Foundational coenzyme for cellular energy support.",
    accent: "#e57233",
  },
  {
    id: "glutathione",
    category: "Vitality",
    name: "Glutathione",
    code: "PLY-006",
    dose: "100 mg",
    count: "30 strips",
    price: 139,
    image: productImages.glutathione,
    summary: "The body's master antioxidant, in an oral strip.",
    accent: "#5bc7ce",
  },
  {
    id: "pt-141",
    category: "Intimacy",
    name: "PT-141+",
    code: "PLY-007",
    dose: "1 mg blend",
    count: "10 strips",
    price: 159,
    image: productImages.pt141,
    summary: "Adult-use peptide blend for intimacy and connection support.",
    accent: "#8c62b5",
    badge: "18+",
  },
];

const bundles = [
  {
    eyebrow: "Daily foundation",
    title: "The everyday stack.",
    description: "Three strips for cellular energy, antioxidant support, and recovery.",
    items: ["NAD+", "Glutathione", "BPC-157"],
    images: [productImages.nad, productImages.glutathione, productImages.bpc157],
    price: "$369",
    compare: "$395",
    save: "Save 7%",
  },
  {
    eyebrow: "Training stack",
    title: "Train, recover, repeat.",
    description: "Growth-hormone support and connective-tissue recovery in one rotation.",
    items: ["CJC-1295", "BPC-157", "NAD+"],
    images: [productImages.cjc1295, productImages.bpc157, productImages.nad],
    price: "$409",
    compare: "$436",
    save: "Save 6%",
    featured: true,
  },
  {
    eyebrow: "Glow stack",
    title: "Skin, hair, radiance.",
    description: "Copper-binding peptides paired with the master antioxidant.",
    items: ["GHK-Cu", "Glutathione", "Thymosin Alpha-1"],
    images: [productImages.ghkCu, productImages.glutathione, productImages.thymosinAlpha1],
    price: "$405",
    compare: "$435",
    save: "Save 7%",
  },
];

const standards = [
  ["01", "Lot-linked COAs", "Every box carries a lot number tied to independently verified HPLC/MS results."],
  ["02", "We manufacture", "Made in an NSF-certified cGMP facility in Salt Lake City. No relabeling."],
  ["03", "Pre-measured dose", "One strip is one dose. No compounding, syringes, or math at the kitchen counter."],
  ["04", "Room-temperature stable", "Pullulan-based film designed for buccal contact. Shelf life: 24 months."],
  ["05", "Same-day fulfillment", "Orders placed by 2pm MT ship the same business day. Free U.S. shipping over $200."],
  ["06", "Clean carriers", "Pullulan, vegetable glycerin, sunflower lecithin, stevia. No animal gelatin."],
];

const heroDetails = {
  "bpc-157": {
    label: "Rebuild routine",
    headline: "Recovery support in the strip format.",
    copy: "BPC-157 is positioned for people who want a pre-measured recovery strip without needles, mixing, or refrigeration.",
    points: ["Everyday recovery", "500 mcg strip", "20-count box"],
  },
  "cjc-1295": {
    label: "Strength routine",
    headline: "Training support without the clinic ritual.",
    copy: "CJC-1295 brings a growth-hormone-supportive peptide into the same daily oral strip system.",
    points: ["Training days", "150 mcg strip", "20-count box"],
  },
  "ghk-cu": {
    label: "Beauty routine",
    headline: "Skin and hair support, stripped down.",
    copy: "GHK-Cu is the copper-binding option for users building a glow-focused routine around the strip format.",
    points: ["Skin and hair", "3 mg strip", "20-count box"],
  },
  "thymosin-alpha-1": {
    label: "Immune routine",
    headline: "Year-round immune resilience in one format.",
    copy: "Thymosin Alpha-1 keeps the same room-temperature strip experience for immune-focused protocols.",
    points: ["Immune support", "500 mcg strip", "20-count box"],
  },
  nad: {
    label: "Energy routine",
    headline: "Cellular energy support for daily use.",
    copy: "NAD+ is the foundational energy strip for users building a broader wellness rotation.",
    points: ["Cellular energy", "100 mg strip", "30-count box"],
  },
  glutathione: {
    label: "Vitality routine",
    headline: "Antioxidant support in a clean strip.",
    copy: "Glutathione brings the master-antioxidant story into the same easy-to-carry oral strip system.",
    points: ["Antioxidant support", "100 mg strip", "30-count box"],
  },
  "pt-141": {
    label: "Intimacy routine",
    headline: "An adult-use strip for connection.",
    copy: "PT-141+ is the as-needed adult option, separated clearly from the daily-use peptide routines.",
    points: ["As needed", "1 mg blend", "10-count box"],
  },
};

function LiquidGlass({
  children,
  className = "",
  as: Tag = "div",
  displacementScale = 42,
  blurAmount = 18,
  saturation = 170,
  aberrationIntensity = 1.8,
  elasticity = 0.18,
  cornerRadius = 24,
  overLight = true,
  interactive = true,
  style,
  ...props
}) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0, active: false });
  const filterId = useMemo(() => `liquid-glass-${Math.random().toString(36).slice(2)}`, []);

  function handlePointerMove(event) {
    if (!interactive) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    setOffset({
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
      active: true,
    });
  }

  function handlePointerLeave() {
    if (!interactive) return;
    setOffset({ x: 0, y: 0, active: false });
  }

  const translateX = offset.x * elasticity * 18;
  const translateY = offset.y * elasticity * 18;
  const scaleX = 1 + Math.abs(offset.x) * elasticity * 0.12;
  const scaleY = 1 + Math.abs(offset.y) * elasticity * 0.12;

  return (
    <Tag
      ref={ref}
      className={`liquid-glass ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        "--glass-radius": `${cornerRadius}px`,
        "--glass-blur": `${blurAmount}px`,
        "--glass-saturation": `${saturation}%`,
        "--glass-x": `${interactive ? offset.x * 50 : 0}%`,
        "--glass-y": `${interactive ? offset.y * 50 : 0}%`,
        "--glass-translate-x": `${translateX}px`,
        "--glass-translate-y": `${translateY}px`,
        "--glass-scale-x": scaleX,
        "--glass-scale-y": scaleY,
        "--glass-filter": `url(#${filterId})`,
        "--glass-shadow": overLight ? "rgba(6, 71, 106, 0.14)" : "rgba(0, 0, 0, 0.2)",
        ...style,
      }}
      {...props}
    >
      <svg className="liquid-filter" aria-hidden="true">
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.018 0.035" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={displacementScale} xChannelSelector="R" yChannelSelector="G" result="bend" />
          <feColorMatrix
            in="bend"
            type="matrix"
            values={`${1 + aberrationIntensity * 0.015} 0 0 0 0  0 ${1 + aberrationIntensity * 0.006} 0 0 0  0 0 ${1 + aberrationIntensity * 0.02} 0 0  0 0 0 1 0`}
          />
        </filter>
      </svg>
      <span className="liquid-backdrop" />
      <span className="liquid-edge" />
      <span className="liquid-highlight" />
      <span className="liquid-content">{children}</span>
    </Tag>
  );
}

function useShortcutLabel() {
  const [shortcut, setShortcut] = useState("Ctrl K");

  useEffect(() => {
    const isMac = /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent);
    setShortcut(isMac ? "Cmd K" : "Ctrl K");
  }, []);

  return shortcut;
}

function App() {
  const [cart, setCart] = useState([{ ...products[0], quantity: 1 }]);
  const [cartOpen, setCartOpen] = useState(false);
  const [heroProductId, setHeroProductId] = useState(products[0].id);
  const [focusedStrip, setFocusedStrip] = useState("");
  const shortcut = useShortcutLabel();

  const heroProduct = products.find((product) => product.id === heroProductId) ?? products[0];
  const cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  usePretextTypography();

  useEffect(() => {
    const revealItems = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -80px" },
    );

    revealItems.forEach((item, index) => {
      item.style.animationDelay = `${Math.min(index * 28, 160)}ms`;
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === "Escape") setCartOpen(false);
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...current, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  }

  function changeQuantity(id, amount) {
    setCart((current) =>
      current
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + amount } : item))
        .filter((item) => item.quantity > 0),
    );
  }

  function removeFromCart(id) {
    setCart((current) => current.filter((item) => item.id !== id));
  }

  return (
    <div className="page-shell">
      <Ambient />
      <TopNote />
      <Header shortcut={shortcut} cartQuantity={cartQuantity} cartOpen={cartOpen} onToggleCart={() => setCartOpen((value) => !value)} />
      <main id="top">
        <Hero activeProduct={heroProduct} onSelectProduct={setHeroProductId} />
        <TrustStrip />
        <CartDrawer
          open={cartOpen}
          cart={cart}
          total={cartTotal}
          onClose={() => setCartOpen(false)}
          onIncrease={(id) => changeQuantity(id, 1)}
          onDecrease={(id) => changeQuantity(id, -1)}
          onRemove={removeFromCart}
        />
        <Catalog focusedStrip={focusedStrip} onAdd={addToCart} />
        <Standard />
        <Bundles />
        <HowToUse />
        <Portal />
        <FinalRow />
        <Footer />
      </main>
    </div>
  );
}

function Ambient() {
  return (
    <div className="ambient" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

function TopNote() {
  return (
    <div className="top-note">
      <span>NSF-certified cGMP facility - Salt Lake City, UT</span>
      <div>
        <a href="#clinician">Talk to a clinician</a>
        <a href="#portal">Practitioners -&gt;</a>
      </div>
    </div>
  );
}

function Header({ shortcut, cartQuantity, cartOpen, onToggleCart }) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Plya Med home">
        <span className="brand-mark">P+</span>
        <span>PLYA MED</span>
      </a>
      <LiquidGlass as="label" className="search liquid-search" cornerRadius={999} blurAmount={18} displacementScale={28} elasticity={0.08} aria-label="Search products">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m21 21-4.3-4.3m1.3-5.2a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z" />
        </svg>
        <input placeholder="Search strips, peptides, ingredients..." />
        <kbd>{shortcut}</kbd>
      </LiquidGlass>
      <nav>
        <a href="#products">Catalog</a>
        <a href="#standard">Standard</a>
        <a href="#bundles">Bundles</a>
        <a href="#how">How it works</a>
        <button
          className="cart-button"
          type="button"
          aria-expanded={cartOpen}
          aria-controls="cart-drawer"
          onClick={onToggleCart}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6h15l-1.5 8.5H8L6 3H3m6 16.5h.01M18 19.5h.01" />
          </svg>
          Cart <span>{cartQuantity}</span>
        </button>
      </nav>
    </header>
  );
}

function Hero({ activeProduct, onSelectProduct }) {
  const detail = heroDetails[activeProduct.id] ?? heroDetails[products[0].id];
  const heroImage = activeProduct.id === "bpc-157" ? productImages.bpc157Hero : activeProduct.image;
  const activeName = activeProduct.shortName ?? activeProduct.name;

  return (
    <section className="hero section-grid">
      <div className="hero-backdrop" aria-hidden="true">
        <span className="beam beam-one" />
        <span className="beam beam-two" />
        <span className="glass-plane plane-one" />
        <span className="glass-plane plane-two" />
      </div>
      <div className="hero-copy reveal">
        <p className="eyebrow">Peptide strips - once daily</p>
        <h1>
          Peptides in a <span className="gradient-phrase">strip</span> that dissolves in your mouth.
        </h1>
        <p className="hero-text">
          Viewing {activeName}: {detail.copy}
        </p>
        <div className="hero-actions">
          <LiquidGlass as="a" className="button primary liquid-cta" href="#products" cornerRadius={999} displacementScale={58} blurAmount={12} saturation={190} elasticity={0.32}>
            <span>Shop the strips</span>
            <i>-&gt;</i>
          </LiquidGlass>
          <LiquidGlass as="a" className="button secondary" href="#standard" cornerRadius={999} displacementScale={36} blurAmount={14} elasticity={0.18}>
            See the standard
          </LiquidGlass>
        </div>
        <LiquidGlass className="hero-product-info glass-panel" cornerRadius={20} blurAmount={20} displacementScale={18} elasticity={0.04} aria-live="polite" aria-label={`${activeName} strip details`}>
          <div className="hero-product-kicker">
            <span>{activeProduct.code}</span>
            <strong>{detail.label}</strong>
          </div>
          <h2>{detail.headline}</h2>
          <p>{activeProduct.summary}</p>
          <dl>
            <div>
              <dt>Dose</dt>
              <dd>{activeProduct.dose}</dd>
            </div>
            <div>
              <dt>Count</dt>
              <dd>{activeProduct.count}</dd>
            </div>
            <div>
              <dt>Box</dt>
              <dd>${activeProduct.price}</dd>
            </div>
          </dl>
          <ul>
            {detail.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </LiquidGlass>
      </div>
      <div className="hero-visual reveal">
        <LiquidGlass as="article" className="product-glass" cornerRadius={26} blurAmount={20} displacementScale={30} saturation={170} elasticity={0} interactive={false}>
          <div className="batch">
            <span>Batch #PLY-2026-04</span>
            <strong>COA verified</strong>
          </div>
          <div className="packshot-stage">
            <img className="product-image hero-packshot-img" src={heroImage} alt={`${activeProduct.name} peptide strip box`} />
          </div>
          <div className="product-meta">
            <div>
              <span>{activeProduct.category}</span>
              <strong>{activeName}</strong>
            </div>
            <div>
              <span>{activeProduct.dose} - {activeProduct.count}</span>
              <strong>${activeProduct.price}</strong>
            </div>
          </div>
          <div className="thumbnail-row" aria-label="Strip thumbnails">
            {products.map((product) => (
              <button
                key={product.id}
                className={product.id === activeProduct.id ? "active" : ""}
                type="button"
                aria-label={`Show ${product.name}`}
                aria-pressed={product.id === activeProduct.id}
                onMouseEnter={() => onSelectProduct(product.id)}
                onFocus={() => onSelectProduct(product.id)}
                onClick={() => onSelectProduct(product.id)}
              >
                <img src={product.image} alt={product.name} />
              </button>
            ))}
          </div>
        </LiquidGlass>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    ["USA made", "Salt Lake City"],
    ["cGMP", "Audited"],
    ["COA tested", "Batch linked"],
    ["No fridge", "Shelf stable"],
    ["Clean carriers", "Pullulan / stevia"],
  ];

  return (
    <section className="trust-strip reveal">
      {items.map(([title, text]) => (
        <article key={title}>
          <span className="icon">+</span>
          <strong>{title}</strong>
          <p>{text}</p>
        </article>
      ))}
    </section>
  );
}

function CartDrawer({ open, cart, total, onClose, onIncrease, onDecrease, onRemove }) {
  return (
    <aside className={`cart-drawer ${open ? "is-open" : ""}`} id="cart-drawer" aria-hidden={!open} aria-label="Shopping cart">
      <LiquidGlass as="div" className="cart-panel" role="dialog" aria-modal="false" aria-labelledby="cart-title" cornerRadius={24} blurAmount={24} displacementScale={36} elasticity={0.12}>
        <header>
          <div>
            <p className="eyebrow">Cart preview</p>
            <h2 id="cart-title">Your strips</h2>
          </div>
          <button className="cart-close" type="button" onClick={onClose} aria-label="Close cart">
            x
          </button>
        </header>
        <div className="cart-lines">
          {cart.length === 0 ? (
            <p className="cart-empty">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <article className="cart-line" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <strong>{item.name}</strong>
                  <span>Qty {item.quantity}</span>
                </div>
                <div className="cart-controls" aria-label={`Adjust ${item.name}`}>
                  <button type="button" onClick={() => onDecrease(item.id)} aria-label={`Decrease ${item.name}`}>
                    -
                  </button>
                  <button type="button" onClick={() => onIncrease(item.id)} aria-label={`Increase ${item.name}`}>
                    +
                  </button>
                </div>
                <b>${(item.price * item.quantity).toLocaleString()}</b>
                <button className="cart-remove" type="button" onClick={() => onRemove(item.id)} aria-label={`Remove ${item.name}`}>
                  x
                </button>
              </article>
            ))
          )}
        </div>
        <div className="cart-summary">
          <span>Total</span>
          <strong>${total.toLocaleString()}</strong>
        </div>
        <button className="checkout-button" type="button">
          Checkout -&gt;
        </button>
        <p className="cart-disclaimer">Supplement disclaimer and physician guidance shown before payment.</p>
      </LiquidGlass>
      <button className="cart-scrim" type="button" onClick={onClose} aria-label="Close cart overlay" />
    </aside>
  );
}

function Catalog({ focusedStrip, onAdd }) {
  return (
    <section className="section products" id="products">
      <div className="section-head reveal">
        <div>
          <p className="eyebrow">The catalog</p>
          <h2>Seven peptides. One format.</h2>
        </div>
        <a href="#products">Browse all -&gt;</a>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} focused={focusedStrip === product.id} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product, focused, onAdd }) {
  return (
    <LiquidGlass
      as="article"
      className={`product-card reveal ${focused ? "is-focused" : ""}`}
      id={product.id}
      data-strip-card={product.id}
      cornerRadius={0}
      blurAmount={14}
      displacementScale={18}
      elasticity={0}
      interactive={false}
      style={{ "--accent": product.accent }}
    >
      <div className="card-top">
        <span>
          <i /> {product.category}
        </span>
        <b>{product.code}</b>
      </div>
      {product.badge ? <em className="age-badge">{product.badge}</em> : null}
      <div className="card-art">
        <img className="product-image" src={product.image} alt={`${product.name} peptide strip box`} />
      </div>
      <div className="card-copy">
        <h3>{product.name}</h3>
        <p>{product.summary}</p>
        <dl>
          <div>
            <dt>Dose</dt>
            <dd>{product.dose}</dd>
          </div>
          <div>
            <dt>Count</dt>
            <dd>{product.count}</dd>
          </div>
        </dl>
      </div>
      <div className="buy-row">
        <strong>
          ${product.price} <span>/ box</span>
        </strong>
        <button type="button" onClick={() => onAdd(product)} aria-label={`Add ${product.name} to cart`}>
          <span>Add</span>
          <i aria-hidden="true">+</i>
        </button>
      </div>
    </LiquidGlass>
  );
}

function Standard() {
  return (
    <section className="section standard" id="standard">
      <div className="section-head split reveal">
        <div>
          <p className="eyebrow">The Plya standard</p>
          <h2>What "made in a real facility" actually looks like.</h2>
        </div>
        <LiquidGlass as="a" className="button secondary" href="#portal" cornerRadius={999} displacementScale={26} blurAmount={14} elasticity={0.12}>
          Read the manufacturing brief -&gt;
        </LiquidGlass>
      </div>
      <div className="standard-grid">
        <article className="maker-card reveal">
          <p className="eyebrow">From the manufacturer</p>
          <h3>Direct oversight from raw synthesis to sealed strip.</h3>
          <blockquote>"We do not hope the peptides are what they claim. We make them, test them, and put the batch number on the box."</blockquote>
          <div className="person">
            <span>JS</span>
            <div>
              <strong>J. Stoker</strong>
              <p>Head of manufacturing - Salt Lake City</p>
            </div>
          </div>
        </article>
        <div className="proof-grid reveal">
          {standards.map(([number, title, text]) => (
            <article key={number}>
              <b>{number}</b>
              <span>+</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Bundles() {
  return (
    <section className="section bundles" id="bundles">
      <div className="section-head split reveal">
        <div>
          <p className="eyebrow">Bundle and save</p>
          <h2>Three rotations built by the people who make the strips.</h2>
        </div>
        <a href="#products">View all bundles -&gt;</a>
      </div>
      <div className="bundle-grid">
        {bundles.map((bundle) => (
          <LiquidGlass
            as="article"
            className={`bundle-card reveal ${bundle.featured ? "featured" : ""}`}
            data-tone={bundle.eyebrow.toLowerCase().replace(/\s+/g, "-")}
            key={bundle.title}
            cornerRadius={18}
            blurAmount={18}
            displacementScale={28}
            elasticity={0.12}
            interactive={false}
          >
            <p className="eyebrow">{bundle.eyebrow}</p>
            <h3>{bundle.title}</h3>
            <p>{bundle.description}</p>
            <div className="bundle-tags">
              {bundle.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="bundle-pack">
              {bundle.images.map((image, index) => (
                <img src={image} alt={bundle.items[index]} key={image} />
              ))}
            </div>
            <div className="price">
              <strong>{bundle.price}</strong>
              <del>{bundle.compare}</del>
              <em>{bundle.save}</em>
            </div>
            <button>Add bundle -&gt;</button>
          </LiquidGlass>
        ))}
      </div>
    </section>
  );
}

function HowToUse() {
  const steps = [
    ["01", "Place", "Put one strip on the tongue.", "Let it adhere to the roof of your mouth. No water, no chewing."],
    ["02", "Dissolve", "About thirty seconds.", "The film dissolves against the buccal mucosa. Do not swallow whole."],
    ["03", "Wait", "Ten to fifteen minutes.", "Wait before eating or drinking. Take in a fasted state when you can."],
  ];

  return (
    <section className="section how" id="how">
      <div className="section-head split reveal">
        <div>
          <p className="eyebrow">How to use</p>
          <h2>Once a day. About thirty seconds.</h2>
        </div>
        <LiquidGlass as="a" className="button secondary" href="#products" cornerRadius={999} displacementScale={26} blurAmount={14} elasticity={0.12}>
          Back to the strips -&gt;
        </LiquidGlass>
      </div>
      <div className="steps reveal">
        {steps.map(([number, label, title, text]) => (
          <article key={number}>
            <div>
              <strong>{number}</strong>
              <span>{label}</span>
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <p className="use-note reveal">
        Manufacturer guidance is one strip per day, five days on, two days off, for the daily-use peptides. PT-141+ is used as needed, 30-45 minutes before activity. Talk to your physician before starting any new supplement.
      </p>
    </section>
  );
}

function Portal() {
  return (
    <section className="portal" id="portal">
      <div className="reveal">
        <p className="eyebrow">For practitioners and founding members</p>
        <h2>The practice portal is open.</h2>
        <p>Case pricing, COA history, and practice billing for teams carrying the full Plya line.</p>
      </div>
      <div className="portal-list reveal">
        <article>
          <strong>01</strong>
          <div>
            <h3>Wholesale case pricing</h3>
            <p>Volume tiers across all seven strips, transparent on every quote.</p>
          </div>
        </article>
        <article>
          <strong>02</strong>
          <div>
            <h3>Lot-linked COA archive</h3>
            <p>Every box your practice has received, every batch analysis, in one place.</p>
          </div>
        </article>
        <article>
          <strong>03</strong>
          <div>
            <h3>One line of credit</h3>
            <p>Purchasing, fulfillment, and reconciliation under a single practice account.</p>
          </div>
        </article>
      </div>
    </section>
  );
}

function FinalRow() {
  return (
    <section className="section final-row" id="clinician">
      <div className="faq reveal">
        <p className="eyebrow">Questions</p>
        <h2>What people ask before their first box.</h2>
        <details open>
          <summary>Are these injections?</summary>
          <p>No. They are oral dissolving strips. Place on the tongue, dissolve, swallow.</p>
        </details>
        <details>
          <summary>Do I need a prescription?</summary>
          <p>This storefront positions the strips as dietary supplements, not prescription peptides. If you are under care, talk to your physician.</p>
        </details>
        <details>
          <summary>Do they need refrigeration?</summary>
          <p>No. Store at room temperature, away from heat and moisture.</p>
        </details>
      </div>
      <LiquidGlass as="form" className="subscribe glass-panel reveal" cornerRadius={24} blurAmount={20} displacementScale={24} elasticity={0.1} interactive={false} onSubmit={(event) => event.preventDefault()}>
        <p className="eyebrow">Be the first to know</p>
        <h2>Quietly useful product notes.</h2>
        <p>New strips, batch COAs, dosing studies. No marketing fluff.</p>
        <div>
          <input type="email" placeholder="you@yourpractice.com" />
          <button type="submit">Subscribe -&gt;</button>
        </div>
        <small>These statements have not been evaluated by the FDA. Products are not intended to diagnose, treat, cure, or prevent disease.</small>
      </LiquidGlass>
    </section>
  );
}

function Footer() {
  const footerColumns = [
    ["Shop", ["Catalog", "Bundles", "How it works", "Batch COAs"]],
    ["Support", ["Talk to a clinician", "Practitioner portal", "Shipping", "Returns"]],
    ["Company", ["Manufacturing", "Quality standard", "Wholesale", "Contact"]],
    ["Legal", ["Privacy policy", "Terms of use", "Supplement facts", "Accessibility"]],
  ];

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <a className="brand" href="#top" aria-label="Plya Med home">
            <span className="brand-mark">P+</span>
            <span>PLYA MED</span>
          </a>
          <p>Oral dissolving peptide strips made for verified, room-temperature routines.</p>
          <address>
            Plya Med Manufacturing<br />
            Salt Lake City, UT<br />
            support@plyamed.com
          </address>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          {footerColumns.map(([title, links]) => (
            <div key={title}>
              <strong>{title}</strong>
              {links.map((link) => (
                <a href="#top" key={link}>{link}</a>
              ))}
            </div>
          ))}
        </nav>
      </div>
      <div className="footer-legal">
        <p>These statements have not been evaluated by the FDA. Products are not intended to diagnose, treat, cure, or prevent disease. Consult a qualified clinician before starting any new supplement routine.</p>
        <span>© 2026 Plya Med. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default App;
