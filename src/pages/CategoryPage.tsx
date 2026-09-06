import { useState, useMemo } from "react";
import { Product, ToastData } from "../types";
import { PRODUCTS } from "../data/products";
import { Breadcrumb } from "../components/Breadcrumb";
import { ProductCard } from "../components/ProductCard";

export function CategoryPage({
  categoryName,
  onNavigateProduct,
  addToast,
  navigate,
  isInWishlist,
  toggleWishlist,
}: {
  categoryName: string;
  onNavigateProduct: (id: number) => void;
  addToast: (msg: string, type: ToastData["type"]) => void;
  navigate: (path: string) => void;
  isInWishlist?: (id: number) => boolean;
  toggleWishlist?: (id: number) => void;
}) {
  const [sortBy, setSortBy] = useState("default");
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const decodedName = decodeURIComponent(categoryName);

  // Get base filtered products by category
  let baseFiltered: Product[];
  if (decodedName === "All") {
    baseFiltered = [...PRODUCTS];
  } else if (decodedName === "New Arrivals") {
    baseFiltered = PRODUCTS.filter((p) => p.tag === "New");
  } else if (decodedName === "Sale") {
    baseFiltered = PRODUCTS.filter((p) => p.tag === "Sale");
  } else {
    baseFiltered = PRODUCTS.filter((p) => p.category === decodedName);
  }

  // Available brands in this category
  const availableBrands = useMemo(() => {
    const brands = new Set(baseFiltered.map((p) => p.brand));
    return Array.from(brands).sort();
  }, [decodedName]);

  const maxPrice = useMemo(() => Math.max(...baseFiltered.map((p) => p.price), 100), [decodedName]);

  // Apply advanced filters
  const filtered = useMemo(() => {
    let result = baseFiltered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }
    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }
    // Sort
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }
    return result;
  }, [baseFiltered, priceRange, selectedBrands, minRating, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 2000]);
    setSelectedBrands([]);
    setMinRating(0);
  };

  const hasActiveFilters = selectedBrands.length > 0 || minRating > 0 || priceRange[0] > 0 || priceRange[1] < 2000;

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
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className={`text-[11px] font-medium tracking-widest uppercase px-4 py-2 border transition-colors flex items-center gap-2 ${
              filterOpen || hasActiveFilters
                ? "bg-[#0f0e0d] text-[#f5f2ee] border-[#0f0e0d]"
                : "border-[#6b6459]/30 text-[#6b6459] hover:border-[#0f0e0d] hover:text-[#0f0e0d]"
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
            </svg>
            Filters {hasActiveFilters && `(${selectedBrands.length + (minRating > 0 ? 1 : 0)})`}
          </button>
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
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Filter Panel */}
      {filterOpen && (
        <div className="bg-white border border-[#0f0e0d]/10 p-6 mb-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Price Range */}
            <div>
              <p className="text-[11px] font-medium tracking-widest uppercase text-[#6b6459] mb-3">Price Range</p>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[13px] text-[#0f0e0d]">${priceRange[0]}</span>
                <span className="text-[13px] text-[#6b6459]">—</span>
                <span className="text-[13px] text-[#0f0e0d]">${priceRange[1]}</span>
              </div>
              <input
                type="range"
                min={0}
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full accent-[#c8a97e]"
              />
            </div>

            {/* Brand */}
            <div>
              <p className="text-[11px] font-medium tracking-widest uppercase text-[#6b6459] mb-3">Brand</p>
              <div className="flex flex-wrap gap-2">
                {availableBrands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => toggleBrand(brand)}
                    className={`text-[12px] font-medium px-3 py-1.5 border transition-colors ${
                      selectedBrands.includes(brand)
                        ? "bg-[#0f0e0d] text-[#f5f2ee] border-[#0f0e0d]"
                        : "border-[#0f0e0d]/20 text-[#0f0e0d] hover:border-[#0f0e0d]"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Min Rating */}
            <div>
              <p className="text-[11px] font-medium tracking-widest uppercase text-[#6b6459] mb-3">Minimum Rating</p>
              <div className="flex gap-2">
                {[0, 3, 4, 5].map((r) => (
                  <button
                    key={r}
                    onClick={() => setMinRating(r)}
                    className={`text-[12px] font-medium px-3 py-1.5 border transition-colors flex items-center gap-1 ${
                      minRating === r
                        ? "bg-[#0f0e0d] text-[#f5f2ee] border-[#0f0e0d]"
                        : "border-[#0f0e0d]/20 text-[#0f0e0d] hover:border-[#0f0e0d]"
                    }`}
                  >
                    {r === 0 ? "All" : (
                      <>
                        {r}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#c8a97e" stroke="#c8a97e" strokeWidth="1">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        +
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="mt-4 text-[12px] font-medium tracking-widest uppercase text-[#c8a97e] hover:text-[#a8834e] transition-colors"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-display text-2xl font-light text-[#0f0e0d] mb-2">No products found</p>
          <p className="text-[14px] text-[#6b6459] mb-8">Try a different category or adjust your filters.</p>
          <div className="flex items-center justify-center gap-4">
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-3 border border-[#0f0e0d] text-[#0f0e0d] text-[12px] font-medium tracking-widest uppercase px-8 py-4 hover:bg-[#0f0e0d] hover:text-[#f5f2ee] transition-colors duration-300"
              >
                Clear Filters
              </button>
            )}
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-3 bg-[#0f0e0d] text-[#f5f2ee] text-[12px] font-medium tracking-widest uppercase px-8 py-4 hover:bg-[#c8a97e] transition-colors duration-300"
            >
              Back to Home
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigate={onNavigateProduct}
              isInWishlist={isInWishlist}
              toggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}
