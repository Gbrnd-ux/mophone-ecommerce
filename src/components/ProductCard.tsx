import { useState } from "react";
import { Product } from "../types";

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5 mt-1">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill={star <= Math.round(rating) ? "#c8a97e" : "none"}
            stroke="#c8a97e"
            strokeWidth="1.5"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      <span className="text-[11px] text-[#6b6459]">({count})</span>
    </div>
  );
}

export function ProductCard({
  product,
  onNavigate,
  isInWishlist,
  toggleWishlist,
}: {
  product: Product;
  onNavigate: (id: number) => void;
  isInWishlist?: (id: number) => boolean;
  toggleWishlist?: (id: number) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const wishlisted = isInWishlist ? isInWishlist(product.id) : false;

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
        {/* Wishlist heart */}
        {toggleWishlist && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={wishlisted ? "#c8a97e" : "none"}
              stroke={wishlisted ? "#c8a97e" : "#0f0e0d"}
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
      <div className="space-y-1" onClick={() => onNavigate(product.id)}>
        <p className="text-[11px] font-medium tracking-widest uppercase text-[#6b6459]">
          {product.category}
        </p>
        <h3 className="font-display text-[17px] font-light text-[#0f0e0d] leading-snug">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-[15px] font-medium text-[#0f0e0d]">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-[13px] text-[#6b6459] line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
        <StarRating rating={product.rating} count={product.reviewCount} />
      </div>
    </div>
  );
}
