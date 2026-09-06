import { useState } from "react";
import { Product } from "../types";
import { useCurrency } from "../contexts/CurrencyContext";

export function ProductCard({
  product,
  onNavigate,
  wishlist = [],
  onToggleWishlist,
}: {
  product: Product;
  onNavigate: (id: number) => void;
  wishlist?: number[];
  onToggleWishlist?: (id: number) => void;
}) {
  const { formatPrice } = useCurrency();
  const [hovered, setHovered] = useState(false);
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative overflow-hidden bg-[#e8e3dc] aspect-[4/5] mb-4"
        onClick={() => onNavigate(product.id)}
      >
        <img
          src={product.img}
          alt={product.alt}
          className="w-full h-full object-contain p-4"
          loading="lazy"
        />
        {product.tag && (
          <span
            className={`absolute top-3 left-3 text-[11px] font-medium tracking-widest uppercase px-2.5 py-1 ${
              product.tag === "Sale"
                ? "bg-[#0f0e0d] text-[#f5f2ee]"
                : "bg-[#c8a97e] text-white"
            }`}
          >
            {product.tag}
          </span>
        )}
        {onToggleWishlist && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-[#0f0e0d] hover:bg-[#c8a97e] hover:text-white transition-colors"
            aria-label="Toggle wishlist"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={isWishlisted ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(product.id);
          }}
          className={`absolute bottom-0 left-0 right-0 bg-[#0f0e0d] text-[#f5f2ee] text-[12px] font-medium tracking-widest uppercase py-3.5 transition-all duration-300 ${
            hovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
        >
          View Details
        </button>
      </div>
      <div className="space-y-1.5" onClick={() => onNavigate(product.id)}>
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-medium tracking-widest uppercase text-[#6b6459]">
            {product.category}
          </p>
          {product.rating && (
            <div className="flex items-center gap-1 text-[11px] font-medium text-[#0f0e0d]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#c8a97e" stroke="#c8a97e" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span>{product.rating}</span>
            </div>
          )}
        </div>
        <h3 className="font-display text-[17px] font-light text-[#0f0e0d] leading-snug">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-[15px] font-medium text-[#0f0e0d]">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-[13px] text-[#6b6459] line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
