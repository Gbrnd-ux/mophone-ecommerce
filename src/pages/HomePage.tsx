import { useState } from "react";
import { Product, ToastData } from "../types";
import { PRODUCTS } from "../data/products";
import { CATEGORIES } from "../data/categories";
import { ProductCard } from "../components/ProductCard";

export function HomePage({
  wishlist,
  onToggleWishlist,
  onNavigateProduct,
  addToast,
  navigate,
}: {
  wishlist: number[];
  onToggleWishlist: (id: number) => void;
  onNavigateProduct: (id: number) => void;
  addToast: (msg: string, type: ToastData["type"]) => void;
  navigate: (path: string) => void;
}) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [email, setEmail] = useState("");

  const filters = ["All", "Smartphones", "Tablets", "Accessories"];
  const filtered =
    activeFilter === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeFilter);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      addToast("Please enter a valid email address", "error");
      return;
    }
    addToast("Welcome to The Mophone Edit! Check your inbox.", "success");
    setEmail("");
  };

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="grid md:grid-cols-2 min-h-[88vh]">
          {/* Text side */}
          <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 md:py-0 order-2 md:order-1 bg-[#f5f2ee]">
            <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-[#c8a97e] mb-6">
              New Collection — Latest Tech
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] text-[#0f0e0d] mb-8">
              The future in
              <br />
              <em className="italic font-light">your</em> hands
              <span className="text-[#c8a97e]">.</span>
            </h1>
            <p className="text-[15px] text-[#6b6459] leading-relaxed mb-10 max-w-sm">
              Discover the latest in mobile technology. Premium smartphones and accessories crafted for the modern era.
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => { const el = document.getElementById("products"); el?.scrollIntoView({ behavior: "smooth" }); }}
                className="inline-flex items-center gap-3 bg-[#0f0e0d] text-[#f5f2ee] text-[12px] font-medium tracking-widest uppercase px-8 py-4 hover:bg-[#c8a97e] transition-colors duration-300"
              >
                Shop Now
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={() => navigate("/category/New Arrivals")}
                className="text-[12px] font-medium tracking-widest uppercase text-[#0f0e0d] border-b border-[#0f0e0d] pb-0.5 hover:text-[#c8a97e] hover:border-[#c8a97e] transition-colors"
              >
                View Lookbook
              </button>
            </div>
          </div>

          {/* Image side */}
          <div className="relative order-1 md:order-2 min-h-[55vw] md:min-h-0 bg-[#e8e3dc]">
            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900&h=1100&fit=crop&auto=format"
              alt="Smartphone in hand"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#f5f2ee]/20 to-transparent" />
            {/* Floating stat */}
            <div className="absolute bottom-8 left-8 bg-[#f5f2ee]/90 backdrop-blur-sm px-6 py-4 hidden md:block">
              <p className="font-display text-3xl font-light text-[#0f0e0d]">240+</p>
              <p className="text-[11px] tracking-widest uppercase text-[#6b6459] mt-0.5">New Arrivals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tiles */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 md:py-24">
        <div className="grid grid-cols-3 gap-3 md:gap-6">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.label}
              href={`#/category/${cat.label}`}
              onClick={(e) => { e.preventDefault(); navigate(`/category/${cat.label}`); }}
              className="relative overflow-hidden group aspect-[3/4] bg-[#e8e3dc] block"
            >
              <img
                src={cat.img}
                alt={cat.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#0f0e0d]/20 group-hover:bg-[#0f0e0d]/35 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-end p-4 md:p-6">
                <div>
                  <h2 className="font-display text-xl md:text-3xl font-light text-white leading-tight">
                    {cat.label}
                  </h2>
                  <span className="text-[11px] tracking-widest uppercase text-white/70 mt-1 block group-hover:text-[#c8a97e] transition-colors">
                    Shop →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-[#c8a97e] mb-2">
              Curated Selection
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#0f0e0d]">
              Featured Pieces
            </h2>
          </div>
          <div className="flex items-center gap-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-[11px] font-medium tracking-widest uppercase px-4 py-2 border transition-colors ${
                  activeFilter === f
                    ? "bg-[#0f0e0d] text-[#f5f2ee] border-[#0f0e0d]"
                    : "bg-transparent text-[#6b6459] border-[#6b6459]/30 hover:border-[#0f0e0d] hover:text-[#0f0e0d]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigate={onNavigateProduct}
              wishlist={wishlist}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>

        <div className="mt-14 text-center">
          <button
            onClick={() => navigate("/category/All")}
            className="inline-flex items-center gap-3 border border-[#0f0e0d] text-[#0f0e0d] text-[12px] font-medium tracking-widest uppercase px-10 py-4 hover:bg-[#0f0e0d] hover:text-[#f5f2ee] transition-colors duration-300"
          >
            View All Products
          </button>
        </div>
      </section>

      {/* Banner Strip */}
      <section className="bg-[#0f0e0d] py-20 px-6 text-center">
        <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-[#c8a97e] mb-5">
          Mophone Philosophy
        </p>
        <h2 className="font-display text-4xl md:text-6xl font-light text-[#f5f2ee] max-w-3xl mx-auto leading-tight">
          &quot;Quality that speaks
          <br />
          <em className="italic">quietly</em>, lasts{" "}
          <em className="italic">forever</em>.&quot;
        </h2>
      </section>

      {/* Trust Signals */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 border-b border-[#0f0e0d]/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: "🚚", label: "Free Shipping", sub: "On orders over $150" },
            { icon: "↩", label: "Easy Returns", sub: "30-day return policy" },
            { icon: "🔒", label: "Secure Payment", sub: "Encrypted checkout" },
            { icon: "✦", label: "Members Club", sub: "Earn points on every order" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2">
              <span className="text-2xl">{item.icon}</span>
              <p className="text-[13px] font-semibold tracking-wide text-[#0f0e0d]">
                {item.label}
              </p>
              <p className="text-[12px] text-[#6b6459]">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 text-center">
        <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-[#c8a97e] mb-3">
          Stay in the loop
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-light text-[#0f0e0d] mb-4">
          The Mophone Edit
        </h2>
        <p className="text-[14px] text-[#6b6459] mb-8 max-w-md mx-auto">
          New arrivals, exclusive offers, and style notes — delivered to your inbox
          every week.
        </p>
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row max-w-md mx-auto gap-0"
        >
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-5 py-3.5 text-[13px] bg-white border border-[#0f0e0d]/20 focus:outline-none focus:border-[#c8a97e] placeholder-[#6b6459]"
          />
          <button
            type="submit"
            className="bg-[#c8a97e] text-white text-[12px] font-medium tracking-widest uppercase px-7 py-3.5 hover:bg-[#a8834e] transition-colors duration-300 whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}
