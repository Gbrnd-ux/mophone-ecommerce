import { useState, useRef, useEffect, useCallback } from "react";
import { PRODUCTS } from "../data/products";
import { NAV_LINKS } from "../data/categories";

export function SearchOverlay({
  isOpen,
  onClose,
  onNavigate,
  navigate,
}: {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (id: number) => void;
  navigate: (path: string) => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    if (isOpen) setQuery("");
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 250);
  }, [onClose]);

  if (!isOpen && !closing) return null;

  const results = query.length > 0
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-[90]">
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm ${closing ? "animate-fade-out" : "animate-fade-in"}`}
        onClick={handleClose}
      />
      <div className={`absolute top-0 left-0 right-0 bg-[#f5f2ee] shadow-2xl ${closing ? "animate-slide-down" : "animate-slide-up"}`}>
        <div className="max-w-3xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-6">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b6459" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products..."
              className="flex-1 bg-transparent text-[20px] font-display font-light text-[#0f0e0d] placeholder-[#6b6459]/50 focus:outline-none"
            />
            <button onClick={handleClose} className="text-[#6b6459] hover:text-[#0f0e0d] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {query.length > 0 && (
            <div className="border-t border-[#0f0e0d]/10 pt-6">
              {results.length === 0 ? (
                <p className="text-[14px] text-[#6b6459] text-center py-8">
                  No results found for &quot;{query}&quot;
                </p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-[50vh] overflow-y-auto">
                  {results.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => { onNavigate(product.id); handleClose(); }}
                      className="text-left group cursor-pointer"
                    >
                      <div className="aspect-[4/5] bg-[#e8e3dc] overflow-hidden mb-2">
                        <img
                          src={product.img}
                          alt={product.alt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <p className="text-[11px] font-medium tracking-widest uppercase text-[#6b6459]">{product.category}</p>
                      <p className="font-display text-[14px] font-light text-[#0f0e0d]">{product.name}</p>
                      <p className="text-[13px] font-medium text-[#0f0e0d]">${product.price}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {query.length === 0 && (
            <div className="border-t border-[#0f0e0d]/10 pt-6">
              <p className="text-[11px] font-medium tracking-widest uppercase text-[#c8a97e] mb-4">Popular Categories</p>
              <div className="flex flex-wrap gap-2">
                {NAV_LINKS.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { navigate(`/category/${cat}`); handleClose(); }}
                    className="text-[12px] font-medium tracking-widest uppercase px-4 py-2 border border-[#0f0e0d]/20 text-[#0f0e0d] hover:bg-[#0f0e0d] hover:text-[#f5f2ee] transition-colors"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
