import { useState, useEffect, useCallback } from "react";
import { Product, CartItem, Route, ToastData } from "./types";

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

let toastId = 0;

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const route = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastData[]>([]);

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
  }, []);



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
  }, []);

  const removeFromCart = useCallback((productId: number, size: string, color: string | undefined) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.size === size && item.color === color))
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

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
        onCartClick={() => setCartDrawerOpen(true)}
        onSearchClick={() => setSearchOpen(true)}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        navigate={navigate}
      />

      {/* Page Content */}
      {route.page === "home" && (
        <HomePage
          onNavigateProduct={navigateToProduct}
          addToast={addToast}
          navigate={navigate}
        />
      )}
      {route.page === "product" && route.param && (
        <ProductDetailPage
          productId={route.param}
          onAddToCart={addToCart}
          onNavigateProduct={navigateToProduct}
          addToast={addToast}
          navigate={navigate}
        />
      )}
      {route.page === "cart" && (
        <CartPage
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          navigate={navigate}
        />
      )}
      {route.page === "checkout" && (
        <CheckoutPage
          cart={cart}
          onClearCart={clearCart}
          addToast={addToast}
          navigate={navigate}
        />
      )}
      {route.page === "category" && route.param && (
        <CategoryPage
          categoryName={route.param}
          onNavigateProduct={navigateToProduct}
          addToast={addToast}
          navigate={navigate}
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
