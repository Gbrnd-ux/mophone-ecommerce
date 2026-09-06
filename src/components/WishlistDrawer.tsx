import { useState, useCallback } from "react";
import { PRODUCTS } from "../data/products";
import { useCurrency } from "../contexts/CurrencyContext";

export function WishlistDrawer({
  wishlist,
  isOpen,
  onClose,
  onToggleWishlist,
  navigate,
}: {
  wishlist: number[];
  isOpen: boolean;
  onClose: () => void;
  onToggleWishlist: (id: number) => void;
  navigate: (path: string) => void;
}) {
  const { formatPrice } = useCurrency();
  const [closing, setClosing] = useState(false);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 300);
  }, [onClose]);

  if (!isOpen && !closing) return null;

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-[80]">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 ${closing ? "animate-fade-out" : "animate-fade-in"}`}
        onClick={handleClose}
      />
      {/* Drawer */}
      <div
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-[#f5f2ee] shadow-2xl flex flex-col ${closing ? "animate-slide-out-right" : "animate-slide-in-right"}`}
      >
        {/* Header */}
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

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {wishlistProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c8a97e" strokeWidth="1" className="mb-4 opacity-50">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <p className="font-display text-lg font-light text-[#0f0e0d] mb-1">Your wishlist is empty</p>
              <p className="text-[13px] text-[#6b6459]">Save items you love for later</p>
              <button
                onClick={() => { handleClose(); navigate("/"); }}
                className="mt-6 text-[12px] font-medium tracking-widest uppercase text-[#0f0e0d] border-b border-[#0f0e0d] pb-0.5 hover:text-[#c8a97e] hover:border-[#c8a97e] transition-colors"
              >
                Discover Products
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {wishlistProducts.map((product) => (
                <div key={product.id} className="flex gap-4">
                  <div 
                    className="w-20 h-24 bg-[#e8e3dc] flex-shrink-0 overflow-hidden cursor-pointer"
                    onClick={() => { handleClose(); navigate(`/product/${product.id}`); }}
                  >
                    <img src={product.img} alt={product.alt} className="w-full h-full object-contain p-2 hover:scale-105 transition-transform" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium tracking-widest uppercase text-[#6b6459]">{product.category}</p>
                    <h4 
                      className="font-display text-[15px] font-light text-[#0f0e0d] truncate cursor-pointer hover:text-[#c8a97e] transition-colors"
                      onClick={() => { handleClose(); navigate(`/product/${product.id}`); }}
                    >
                      {product.name}
                    </h4>
                    <span className="text-[14px] font-medium text-[#0f0e0d] mt-1 block">{formatPrice(product.price)}</span>
                    <div className="flex items-center gap-4 mt-3">
                      <button
                        onClick={() => { handleClose(); navigate(`/product/${product.id}`); }}
                        className="text-[11px] font-medium tracking-widest uppercase text-[#0f0e0d] border-b border-[#0f0e0d] pb-0.5 hover:text-[#c8a97e] hover:border-[#c8a97e] transition-colors"
                      >
                        View Product
                      </button>
                      <button
                        onClick={() => onToggleWishlist(product.id)}
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
