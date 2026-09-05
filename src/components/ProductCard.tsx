import { useState } from "react";
import { Product } from "../types";

export function ProductCard({
  product,
  onNavigate,
}: {
  product: Product;
  onNavigate: (id: number) => void;
}) {
  const [hovered, setHovered] = useState(false);

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
      </div>
    </div>
  );
}
