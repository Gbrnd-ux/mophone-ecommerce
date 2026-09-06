import { useState } from "react";
import { Product, ToastData } from "../types";
import { PRODUCTS } from "../data/products";
import { Breadcrumb } from "../components/Breadcrumb";
import { ProductCard } from "../components/ProductCard";
import { useCurrency } from "../contexts/CurrencyContext";

export function ProductDetailPage({
  productId,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onNavigateProduct,
  addToast,
  navigate,
}: {
  productId: string;
  wishlist: number[];
  onToggleWishlist: (id: number) => void;
  onAddToCart: (product: Product, size?: string, color?: string) => void;
  onNavigateProduct: (id: number) => void;
  addToast: (msg: string, type: ToastData["type"]) => void;
  navigate: (path: string) => void;
}) {
  const { formatPrice } = useCurrency();
  const product = PRODUCTS.find((p) => p.id === parseInt(productId));
  const [selectedSize, setSelectedSize] = useState(product?.sizes ? product.sizes[0] : "");
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description");
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors ? product.colors[0].name : undefined
  );
  const [imgLoaded, setImgLoaded] = useState(false);
  
  const displayImage = product?.colors?.find((c) => c.name === selectedColor)?.img || product?.img;
  const displayAlt = product?.colors?.find((c) => c.name === selectedColor)?.alt || product?.alt;
  const isWishlisted = product ? wishlist.includes(product.id) : false;

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
            <div className="flex items-center gap-3 mb-3">
              <span className="font-display text-2xl font-light text-[#0f0e0d]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-[16px] text-[#6b6459] line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.originalPrice && (
                <span className="text-[12px] font-medium tracking-wide uppercase bg-[#0f0e0d] text-[#f5f2ee] px-2 py-0.5">
                  Save {formatPrice(product.originalPrice - product.price)}
                </span>
              )}
            </div>

            {product.rating && (
              <div className="flex items-center gap-2 mb-6">
                <div className="flex text-[#c8a97e]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} width="14" height="14" viewBox="0 0 24 24" fill={star <= Math.round(product.rating!) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <span className="text-[12px] text-[#6b6459]">{product.rating} ({product.reviewsCount} Reviews)</span>
              </div>
            )}

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

            {/* Actions */}
            <div className="flex gap-4 mb-4">
              <button
                onClick={handleAdd}
                className="flex-1 bg-[#0f0e0d] text-[#f5f2ee] text-[12px] font-medium tracking-widest uppercase py-4.5 hover:bg-[#c8a97e] transition-colors duration-300"
              >
                Add to Cart — {formatPrice(product.price)}
              </button>
              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`flex items-center justify-center w-[54px] border transition-colors ${
                  isWishlisted
                    ? "border-[#c8a97e] text-[#c8a97e]"
                    : "border-[#0f0e0d]/20 text-[#0f0e0d] hover:border-[#0f0e0d]"
                }`}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill={isWishlisted ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
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

        {/* Tabs Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="flex items-center gap-8 border-b border-[#0f0e0d]/10 mb-8">
            {(["description", "specs", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-[12px] font-medium tracking-widest uppercase py-4 border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-[#0f0e0d] text-[#0f0e0d]"
                    : "border-transparent text-[#6b6459] hover:text-[#0f0e0d]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="min-h-[200px]">
            {activeTab === "description" && (
              <div className="animate-fade-in text-[#6b6459] leading-relaxed">
                <p className="mb-4">{product.description}</p>
                <p>Crafted with premium materials and designed to provide an unparalleled experience, this product embodies the core philosophy of Mophone: "Quality that speaks quietly, lasts forever." Every detail has been meticulously engineered for peak performance and aesthetic brilliance.</p>
              </div>
            )}
            
            {activeTab === "specs" && (
              <div className="animate-fade-in">
                {product.specs ? (
                  <div className="grid gap-4">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-[#0f0e0d]/5">
                        <span className="text-[11px] font-medium tracking-widest uppercase text-[#0f0e0d] w-48 mb-1 sm:mb-0">
                          {key}
                        </span>
                        <span className="text-[14px] text-[#6b6459] flex-1">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[#6b6459]">Detailed specifications are not available for this product.</p>
                )}
              </div>
            )}
            
            {activeTab === "reviews" && (
              <div className="animate-fade-in">
                <div className="flex items-center gap-6 mb-10 pb-10 border-b border-[#0f0e0d]/5">
                  <div className="text-center">
                    <span className="font-display text-5xl font-light text-[#0f0e0d]">{product.rating}</span>
                    <div className="flex text-[#c8a97e] justify-center mt-2 mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill={star <= Math.round(product.rating || 0) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-[11px] text-[#6b6459] tracking-wide uppercase">Based on {product.reviewsCount} reviews</span>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center gap-3">
                        <span className="text-[11px] font-medium w-12">{star} Stars</span>
                        <div className="flex-1 h-1.5 bg-[#e8e3dc] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#0f0e0d]" 
                            style={{ width: star === Math.round(product.rating || 0) ? "65%" : star === 5 ? "85%" : star === 4 ? "10%" : "2%" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Dummy reviews */}
                <div className="space-y-8">
                  {[
                    { author: "Michael T.", date: "Oct 24, 2025", title: "Absolutely incredible", content: "The build quality is exactly what you'd expect from a premium device. Battery life is fantastic and the screen is gorgeous." },
                    { author: "Sarah W.", date: "Oct 12, 2025", title: "Best upgrade in years", content: "I upgraded from a 3-year-old device and the difference is night and day. The camera performance in low light is mind-blowing." }
                  ].map((review, i) => (
                    <div key={i}>
                      <div className="flex items-center gap-2 mb-2 text-[#c8a97e]">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                      <h4 className="font-medium text-[15px] text-[#0f0e0d] mb-1">{review.title}</h4>
                      <p className="text-[13px] text-[#6b6459] mb-3">{review.content}</p>
                      <span className="text-[11px] font-medium tracking-wide uppercase text-[#6b6459] opacity-70">{review.author} — {review.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
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
                  wishlist={wishlist}
                  onToggleWishlist={onToggleWishlist}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
