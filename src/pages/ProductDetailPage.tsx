import { useState } from "react";
import { Product, ToastData } from "../types";
import { PRODUCTS } from "../data/products";
import { Breadcrumb } from "../components/Breadcrumb";
import { ProductCard } from "../components/ProductCard";
import { REVIEWS } from "../data/reviews";

export function ProductDetailPage({
  productId,
  onAddToCart,
  onNavigateProduct,
  addToast,
  navigate,
  isInWishlist,
  toggleWishlist,
}: {
  productId: string;
  onAddToCart: (product: Product, size?: string, color?: string) => void;
  onNavigateProduct: (id: number) => void;
  addToast: (msg: string, type: ToastData["type"]) => void;
  navigate: (path: string) => void;
  isInWishlist?: (id: number) => boolean;
  toggleWishlist?: (id: number) => void;
}) {
  const product = PRODUCTS.find((p) => p.id === parseInt(productId));
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] ?? "");
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors ? product.colors[0].name : undefined
  );
  const [imgLoaded, setImgLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "reviews">("overview");
  
  const displayImage = product?.colors?.find((c) => c.name === selectedColor)?.img || product?.img;
  const displayAlt = product?.colors?.find((c) => c.name === selectedColor)?.alt || product?.alt;

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 text-center page-enter">
        <h2 className="font-display text-3xl font-light text-[#0f0e0d] mb-4">Product Not Found</h2>
        <p className="text-[14px] text-[#6b6459] mb-8">The product you are looking for does not exist.</p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-3 bg-[#0f0e0d] text-[#f5f2ee] text-[12px] font-medium tracking-widest uppercase px-8 py-4 hover:bg-[#c8a97e] transition-colors duration-300"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const productReviews = REVIEWS.filter((r) => r.productId === product.id);
  const wishlisted = isInWishlist ? isInWishlist(product.id) : false;

  const handleAdd = () => {
    if (!selectedSize) {
      addToast("Please select a size", "error");
      return;
    }
    onAddToCart(product, selectedSize, selectedColor);
    addToast(`${product.name} added to cart`, "success");
  };

  return (
    <div className="page-enter">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
        <Breadcrumb
          items={[
            { label: "Home", path: "/" },
            { label: product.category, path: `/category/${product.category}` },
            { label: product.name },
          ]}
        />

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <div className="relative bg-[#e8e3dc] aspect-[4/5] overflow-hidden">
            <img
              src={displayImage}
              alt={displayAlt}
              className={`w-full h-full object-contain p-8 transition-opacity duration-500 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setImgLoaded(true)}
            />
            {product.tag && (
              <span
                className={`absolute top-4 left-4 text-[11px] font-medium tracking-widest uppercase px-3 py-1.5 ${
                  product.tag === "Sale"
                    ? "bg-[#0f0e0d] text-[#f5f2ee]"
                    : "bg-[#c8a97e] text-white"
                }`}
              >
                {product.tag}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-[#c8a97e] mb-3">
              {product.category}
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-light text-[#0f0e0d] mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={star <= Math.round(product.rating) ? "#c8a97e" : "none"}
                    stroke="#c8a97e"
                    strokeWidth="1.5"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="text-[13px] text-[#6b6459]">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="font-display text-2xl font-light text-[#0f0e0d]">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-[16px] text-[#6b6459] line-through">
                  ${product.originalPrice}
                </span>
              )}
              {product.originalPrice && (
                <span className="text-[12px] font-medium tracking-wide uppercase bg-[#0f0e0d] text-[#f5f2ee] px-2 py-0.5">
                  Save ${product.originalPrice - product.price}
                </span>
              )}
            </div>

            <p className="text-[14px] text-[#6b6459] leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Size Selection */}
            <div className="mb-6">
              <p className="text-[11px] font-medium tracking-widest uppercase text-[#0f0e0d] mb-3">
                Size {selectedSize && `— ${selectedSize}`}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[48px] px-4 py-2.5 text-[13px] font-medium border transition-all duration-200 ${
                      selectedSize === size
                        ? "bg-[#0f0e0d] text-[#f5f2ee] border-[#0f0e0d]"
                        : "bg-transparent text-[#0f0e0d] border-[#0f0e0d]/20 hover:border-[#0f0e0d]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            {product.colors && (
              <div className="mb-8">
                <p className="text-[11px] font-medium tracking-widest uppercase text-[#0f0e0d] mb-3">
                  Color {selectedColor && `— ${selectedColor}`}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`min-w-[48px] px-4 py-2.5 text-[13px] font-medium border transition-all duration-200 ${
                        selectedColor === color.name
                          ? "bg-[#0f0e0d] text-[#f5f2ee] border-[#0f0e0d]"
                          : "bg-transparent text-[#0f0e0d] border-[#0f0e0d]/20 hover:border-[#0f0e0d]"
                      }`}
                    >
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart + Wishlist */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={handleAdd}
                className="flex-1 bg-[#0f0e0d] text-[#f5f2ee] text-[12px] font-medium tracking-widest uppercase py-4.5 hover:bg-[#c8a97e] transition-colors duration-300"
              >
                Add to Cart — ${product.price}
              </button>
              {toggleWishlist && (
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-14 flex items-center justify-center border transition-all duration-200 ${
                    wishlisted
                      ? "bg-[#c8a97e] border-[#c8a97e] text-white"
                      : "border-[#0f0e0d]/20 text-[#0f0e0d] hover:border-[#c8a97e] hover:text-[#c8a97e]"
                  }`}
                  aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              )}
            </div>

            {/* Extra info */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#0f0e0d]/10">
              {[
                { icon: "🚚", text: "Free Shipping" },
                { icon: "↩", text: "30-Day Returns" },
                { icon: "🔒", text: "Secure Checkout" },
              ].map((item) => (
                <div key={item.text} className="text-center">
                  <span className="text-lg block mb-1">{item.icon}</span>
                  <span className="text-[11px] text-[#6b6459] tracking-wide">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs: Specs & Reviews */}
        <div className="mt-16 border-t border-[#0f0e0d]/10 pt-10">
          <div className="flex items-center gap-0 border-b border-[#0f0e0d]/10 mb-8">
            {(["overview", "specs", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-[12px] font-medium tracking-widest uppercase px-6 py-3 transition-colors border-b-2 -mb-px ${
                  activeTab === tab
                    ? "text-[#0f0e0d] border-[#c8a97e]"
                    : "text-[#6b6459] border-transparent hover:text-[#0f0e0d]"
                }`}
              >
                {tab === "reviews" ? `Reviews (${productReviews.length})` : tab}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="max-w-3xl animate-fade-in">
              <p className="text-[15px] text-[#6b6459] leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* Specs Tab */}
          {activeTab === "specs" && product.specs && (
            <div className="max-w-2xl animate-fade-in">
              <div className="divide-y divide-[#0f0e0d]/10">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-[140px_1fr] md:grid-cols-[200px_1fr] gap-4 py-4">
                    <span className="text-[12px] font-medium tracking-widest uppercase text-[#6b6459]">{key}</span>
                    <span className="text-[14px] text-[#0f0e0d]">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div className="max-w-3xl animate-fade-in">
              {productReviews.length === 0 ? (
                <p className="text-[14px] text-[#6b6459]">No reviews yet. Be the first to review this product!</p>
              ) : (
                <div className="space-y-6">
                  {productReviews.map((review) => (
                    <div key={review.id} className="border-b border-[#0f0e0d]/10 pb-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#c8a97e] rounded-full flex items-center justify-center text-white text-[12px] font-semibold">
                            {review.author.charAt(0)}
                          </div>
                          <span className="text-[14px] font-medium text-[#0f0e0d]">{review.author}</span>
                        </div>
                        <span className="text-[12px] text-[#6b6459]">{review.date}</span>
                      </div>
                      <div className="flex items-center gap-0.5 mb-2 ml-11">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill={star <= review.rating ? "#c8a97e" : "none"}
                            stroke="#c8a97e"
                            strokeWidth="1.5"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-[14px] text-[#6b6459] leading-relaxed ml-11">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 mb-10">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-[#c8a97e] mb-2">
                  You May Also Like
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-light text-[#0f0e0d]">
                  Related Pieces
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onNavigate={onNavigateProduct}
                  isInWishlist={isInWishlist}
                  toggleWishlist={toggleWishlist}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
