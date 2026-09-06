import { useState, useEffect, useCallback } from "react";
import { Product, CartItem, Route, ToastData } from "./types";
import { PRODUCTS } from "./data/products";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { SearchOverlay } from "./components/SearchOverlay";
import { ToastContainer } from "./components/Toast";

import { HomePage } from "./pages/HomePage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { CategoryPage } from "./pages/CategoryPage";

// ─── LocalStorage Hook ───────────────────────────────────────────────────────
function useLocalStorage<T>(key: string, initial: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// ─── Routing ─────────────────────────────────────────────────────────────────
function parseHash(hash: string): Route {
  const h = hash.replace("#", "") || "/";
  if (h.startsWith("/product/")) {
    return { page: "product", param: h.replace("/product/", "") };
  }
  if (h === "/cart") return { page: "cart" };
  if (h.startsWith("/checkout")) return { page: "checkout" };
  if (h.startsWith("/category/")) {
    return { page: "category", param: h.replace("/category/", "") };
  }
  return { page: "home" };
}

function navigate(path: string) {
  window.location.hash = path;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function useRouter(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));

  useEffect(() => {
    const handler = () => setRoute(parseHash(window.location.hash));
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  return route;
}

// ─── Promo Codes ─────────────────────────────────────────────────────────────
const PROMO_CODES: Record<string, { type: "flat" | "percent"; value: number; label: string }> = {
  MOPHONE: { type: "flat", value: 15, label: "$15 off" },
  MOPHONE10: { type: "percent", value: 10, label: "10% off" },
};

let toastId = 0;

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const route = useRouter();
  const [cart, setCart] = useLocalStorage<CartItem[]>("mophone-cart", []);
  const [wishlist, setWishlist] = useLocalStorage<number[]>("mophone-wishlist", []);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [wishlistDrawerOpen, setWishlistDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; type: "flat" | "percent"; value: number; label: string } | null>(null);

  const addToast = useCallback((message: string, type: ToastData["type"]) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { message, type, id }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const addToCart = useCallback((product: Product, size?: string, color?: string) => {
    const selectedSize = size || product.sizes[0];
    const selectedColor = color || (product.colors ? product.colors[0].name : undefined);
    
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.size === selectedSize && item.color === selectedColor
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === selectedSize && item.color === selectedColor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, size: selectedSize, color: selectedColor }];
    });
    setCartDrawerOpen(true);
  }, [setCart]);

  const updateQuantity = useCallback((productId: number, size: string, color: string | undefined, qty: number) => {
    if (qty <= 0) {
      setCart((prev) =>
        prev.filter((item) => !(item.product.id === productId && item.size === size && item.color === color))
      );
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.size === size && item.color === color
          ? { ...item, quantity: qty }
          : item
      )
    );
  }, [setCart]);

  const removeFromCart = useCallback((productId: number, size: string, color: string | undefined) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.size === size && item.color === color))
    );
  }, [setCart]);

  const clearCart = useCallback(() => {
    setCart([]);
    setAppliedPromo(null);
    setPromoCode("");
  }, [setCart]);

  // ─── Wishlist ──────────────────────────────────────────────────────────────
  const toggleWishlist = useCallback((productId: number) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      return [...prev, productId];
    });
  }, [setWishlist]);

  const isInWishlist = useCallback((productId: number) => {
    return wishlist.includes(productId);
  }, [wishlist]);

  // ─── Promo ─────────────────────────────────────────────────────────────────
  const applyPromo = useCallback((code: string) => {
    const upper = code.trim().toUpperCase();
    const promo = PROMO_CODES[upper];
    if (!promo) {
      addToast("Invalid promo code", "error");
      return;
    }
    setAppliedPromo({ code: upper, ...promo });
    addToast(`Promo applied: ${promo.label}!`, "success");
  }, [addToast]);

  const removePromo = useCallback(() => {
    setAppliedPromo(null);
    setPromoCode("");
    addToast("Promo code removed", "info");
  }, [addToast]);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const promoDiscount = appliedPromo
    ? appliedPromo.type === "flat"
      ? Math.min(appliedPromo.value, subtotal)
      : Math.round(subtotal * (appliedPromo.value / 100))
    : 0;

  const navigateToProduct = useCallback((id: number) => {
    navigate(`/product/${id}`);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [route.page, route.param]);

  return (
    <div className="min-h-full bg-[#f5f2ee] text-[#0f0e0d]">
      {/* Announcement Bar */}
      <div className="bg-[#0f0e0d] text-[#f5f2ee] text-center text-[11px] tracking-widest uppercase py-2.5 font-medium">
        Free shipping on orders over $150 — Use code{" "}
        <span className="text-[#c8a97e]">MOPHONE</span> at checkout
      </div>

      {/* Header */}
      <Header
        cartItemCount={cartItemCount}
        wishlistCount={wishlist.length}
        onCartClick={() => setCartDrawerOpen(true)}
        onWishlistClick={() => setWishlistDrawerOpen(true)}
        onSearchClick={() => setSearchOpen(true)}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        navigate={navigate}
        currentRoute={route}
      />

      {/* Page Content */}
      {route.page === "home" && (
        <HomePage
          onNavigateProduct={navigateToProduct}
          addToast={addToast}
          navigate={navigate}
          isInWishlist={isInWishlist}
          toggleWishlist={toggleWishlist}
        />
      )}
      {route.page === "product" && route.param && (
        <ProductDetailPage
          productId={route.param}
          onAddToCart={addToCart}
          onNavigateProduct={navigateToProduct}
          addToast={addToast}
          navigate={navigate}
          isInWishlist={isInWishlist}
          toggleWishlist={toggleWishlist}
        />
      )}
      {route.page === "cart" && (
        <CartPage
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          navigate={navigate}
          promoCode={promoCode}
          setPromoCode={setPromoCode}
          appliedPromo={appliedPromo}
          onApplyPromo={applyPromo}
          onRemovePromo={removePromo}
          promoDiscount={promoDiscount}
        />
      )}
      {route.page === "checkout" && (
        <CheckoutPage
          cart={cart}
          onClearCart={clearCart}
          addToast={addToast}
          navigate={navigate}
          promoDiscount={promoDiscount}
          appliedPromo={appliedPromo}
        />
      )}
      {route.page === "category" && route.param && (
        <CategoryPage
          categoryName={route.param}
          onNavigateProduct={navigateToProduct}
          addToast={addToast}
          navigate={navigate}
          isInWishlist={isInWishlist}
          toggleWishlist={toggleWishlist}
        />
      )}

      {/* Footer */}
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer
        cart={cart}
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        navigate={navigate}
      />

      {/* Wishlist Drawer */}
      {wishlistDrawerOpen && (
        <WishlistDrawer
          wishlist={wishlist}
          onClose={() => setWishlistDrawerOpen(false)}
          onRemove={toggleWishlist}
          onAddToCart={addToCart}
          navigate={navigate}
        />
      )}

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={navigateToProduct}
        navigate={navigate}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

// ─── Wishlist Drawer (inline for simplicity) ─────────────────────────────────
function WishlistDrawer({
  wishlist,
  onClose,
  onRemove,
  onAddToCart,
  navigate,
}: {
  wishlist: number[];
  onClose: () => void;
  onRemove: (id: number) => void;
  onAddToCart: (product: Product, size?: string, color?: string) => void;
  navigate: (path: string) => void;
}) {
  const [closing, setClosing] = useState(false);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 300);
  }, [onClose]);

  const wishlistProducts = wishlist
    .map((id: number) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined);

  return (
    <div className="fixed inset-0 z-[80]">
      <div
        className={`absolute inset-0 bg-black/40 ${closing ? "animate-fade-out" : "animate-fade-in"}`}
        onClick={handleClose}
      />
      <div
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-[#f5f2ee] shadow-2xl flex flex-col ${closing ? "animate-slide-out-right" : "animate-slide-in-right"}`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#0f0e0d]/10">
          <h2 className="font-display text-xl font-light text-[#0f0e0d]">
            Wishlist ({wishlist.length})
          </h2>
          <button onClick={handleClose} className="text-[#0f0e0d] hover:text-[#c8a97e] transition-colors" aria-label="Close wishlist">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {wishlistProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c8a97e" strokeWidth="1" className="mb-4 opacity-50">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <p className="font-display text-lg font-light text-[#0f0e0d] mb-1">Your wishlist is empty</p>
              <p className="text-[13px] text-[#6b6459]">Save your favorite items here</p>
              <button
                onClick={() => { handleClose(); navigate("/"); }}
                className="mt-6 text-[12px] font-medium tracking-widest uppercase text-[#0f0e0d] border-b border-[#0f0e0d] pb-0.5 hover:text-[#c8a97e] hover:border-[#c8a97e] transition-colors"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {wishlistProducts.map((product: Product) => (
                <div key={product.id} className="flex gap-4">
                  <div
                    className="w-20 h-24 bg-[#e8e3dc] flex-shrink-0 overflow-hidden cursor-pointer"
                    onClick={() => { handleClose(); navigate(`/product/${product.id}`); }}
                  >
                    <img src={product.img} alt={product.alt} className="w-full h-full object-contain p-2" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium tracking-widest uppercase text-[#6b6459]">{product.category}</p>
                    <h4 className="font-display text-[15px] font-light text-[#0f0e0d] truncate">{product.name}</h4>
                    <p className="text-[14px] font-medium text-[#0f0e0d] mt-0.5">${product.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => { onAddToCart(product); handleClose(); }}
                        className="text-[11px] font-medium tracking-widest uppercase bg-[#0f0e0d] text-[#f5f2ee] px-3 py-1.5 hover:bg-[#c8a97e] transition-colors"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => onRemove(product.id)}
                        className="text-[#6b6459] hover:text-red-600 transition-colors"
                        aria-label="Remove from wishlist"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
