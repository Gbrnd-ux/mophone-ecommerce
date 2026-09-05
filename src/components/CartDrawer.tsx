import { useState, useCallback } from "react";
import { CartItem } from "../types";

export function CartDrawer({
  cart,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemove,
  navigate,
}: {
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (productId: number, size: string, color: string | undefined, qty: number) => void;
  onRemove: (productId: number, size: string, color: string | undefined) => void;
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

  if (!isOpen && !closing) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

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
            Your Cart ({cart.reduce((a, i) => a + i.quantity, 0)})
          </h2>
          <button onClick={handleClose} className="text-[#0f0e0d] hover:text-[#c8a97e] transition-colors" aria-label="Close cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c8a97e" strokeWidth="1" className="mb-4 opacity-50">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <p className="font-display text-lg font-light text-[#0f0e0d] mb-1">Your cart is empty</p>
              <p className="text-[13px] text-[#6b6459]">Discover our curated collection</p>
              <button
                onClick={() => { handleClose(); navigate("/"); }}
                className="mt-6 text-[12px] font-medium tracking-widest uppercase text-[#0f0e0d] border-b border-[#0f0e0d] pb-0.5 hover:text-[#c8a97e] hover:border-[#c8a97e] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-4">
                  <div className="w-20 h-24 bg-[#e8e3dc] flex-shrink-0 overflow-hidden">
                    <img src={item.product.colors?.find(c => c.name === item.color)?.img || item.product.img} alt={item.product.alt} className="w-full h-full object-contain p-2" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium tracking-widest uppercase text-[#6b6459]">{item.product.category}</p>
                    <h4 className="font-display text-[15px] font-light text-[#0f0e0d] truncate">{item.product.name}</h4>
                    <p className="text-[12px] text-[#6b6459] mt-0.5">Size: {item.size}{item.color ? ` · Color: ${item.color}` : ""}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#0f0e0d]/20">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                          className="px-2.5 py-1 text-[13px] text-[#0f0e0d] hover:bg-[#e8e3dc] transition-colors"
                        >
                          −
                        </button>
                        <span className="px-3 py-1 text-[13px] font-medium text-[#0f0e0d] border-x border-[#0f0e0d]/20 min-w-[32px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                          className="px-2.5 py-1 text-[13px] text-[#0f0e0d] hover:bg-[#e8e3dc] transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[14px] font-medium text-[#0f0e0d]">${item.product.price * item.quantity}</span>
                        <button
                          onClick={() => onRemove(item.product.id, item.size, item.color)}
                          className="text-[#6b6459] hover:text-red-600 transition-colors"
                          aria-label="Remove item"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-[#0f0e0d]/10 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-medium tracking-widest uppercase text-[#6b6459]">Subtotal</span>
              <span className="font-display text-xl font-light text-[#0f0e0d]">${subtotal}</span>
            </div>
            <p className="text-[12px] text-[#6b6459]">Shipping & taxes calculated at checkout</p>
            <button
              onClick={() => { handleClose(); navigate("/checkout"); }}
              className="w-full bg-[#0f0e0d] text-[#f5f2ee] text-[12px] font-medium tracking-widest uppercase py-4 hover:bg-[#c8a97e] transition-colors duration-300"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={() => { handleClose(); navigate("/cart"); }}
              className="w-full border border-[#0f0e0d] text-[#0f0e0d] text-[12px] font-medium tracking-widest uppercase py-3.5 hover:bg-[#0f0e0d] hover:text-[#f5f2ee] transition-colors duration-300"
            >
              View Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
