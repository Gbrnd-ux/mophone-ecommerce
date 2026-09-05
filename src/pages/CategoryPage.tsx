import { useState } from "react";
import { Product, ToastData } from "../types";
import { PRODUCTS } from "../data/products";
import { Breadcrumb } from "../components/Breadcrumb";
import { ProductCard } from "../components/ProductCard";

export function CategoryPage({
  categoryName,
  onNavigateProduct,
  addToast,
  navigate,
}: {
  categoryName: string;
  onNavigateProduct: (id: number) => void;
  addToast: (msg: string, type: ToastData["type"]) => void;
  navigate: (path: string) => void;
}) {
  const [sortBy, setSortBy] = useState("default");
  const decodedName = decodeURIComponent(categoryName);

  let filtered: Product[];
  if (decodedName === "All") {
    filtered = [...PRODUCTS];
  } else if (decodedName === "New Arrivals") {
    filtered = PRODUCTS.filter((p) => p.tag === "New");
  } else if (decodedName === "Sale") {
    filtered = PRODUCTS.filter((p) => p.tag === "Sale");
  } else {
    filtered = PRODUCTS.filter((p) => p.category === decodedName);
  }

  if (sortBy === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === "name") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 page-enter">
      <Breadcrumb items={[{ label: "Home", path: "/" }, { label: decodedName }]} />

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-[#c8a97e] mb-2">
            Collection
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-light text-[#0f0e0d]">
            {decodedName}
          </h1>
          <p className="text-[13px] text-[#6b6459] mt-2">{filtered.length} product{filtered.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-medium tracking-widest uppercase text-[#6b6459]">Sort by</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-[12px] font-medium px-3 py-2 bg-white border border-[#0f0e0d]/20 text-[#0f0e0d] focus:outline-none focus:border-[#c8a97e] cursor-pointer"
          >
            <option value="default">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-display text-2xl font-light text-[#0f0e0d] mb-2">No products found</p>
          <p className="text-[14px] text-[#6b6459] mb-8">Try a different category.</p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-3 bg-[#0f0e0d] text-[#f5f2ee] text-[12px] font-medium tracking-widest uppercase px-8 py-4 hover:bg-[#c8a97e] transition-colors duration-300"
          >
            Back to Home
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigate={onNavigateProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
}
