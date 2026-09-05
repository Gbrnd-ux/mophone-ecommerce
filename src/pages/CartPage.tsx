import { CartItem } from "../types";
import { Breadcrumb } from "../components/Breadcrumb";

export function CartPage({
  cart,
  onUpdateQuantity,
  onRemove,
  navigate,
}: {
  cart: CartItem[];
  onUpdateQuantity: (productId: number, size: string, color: string | undefined, qty: number) => void;
  onRemove: (productId: number, size: string, color: string | undefined) => void;
  navigate: (path: string) => void;
}) {
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal >= 150 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 page-enter">
      <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Cart" }]} />

      <h1 className="font-display text-4xl md:text-5xl font-light text-[#0f0e0d] mb-10">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#c8a97e" strokeWidth="1" className="mx-auto mb-6 opacity-40">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <h2 className="font-display text-2xl font-light text-[#0f0e0d] mb-2">Your cart is empty</h2>
          <p className="text-[14px] text-[#6b6459] mb-8">Looks like you have not added any items yet.</p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-3 bg-[#0f0e0d] text-[#f5f2ee] text-[12px] font-medium tracking-widest uppercase px-8 py-4 hover:bg-[#c8a97e] transition-colors duration-300"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Items */}
          <div className="lg:col-span-2 space-y-0">
            {/* Table header */}
            <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 pb-4 border-b border-[#0f0e0d]/10 text-[11px] font-medium tracking-widest uppercase text-[#6b6459]">
              <span>Product</span>
              <span className="text-center">Size</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Total</span>
              <span className="w-8" />
            </div>

            {cart.map((item) => (
              <div
                key={`${item.product.id}-${item.size}-${item.color}`}
                className="grid grid-cols-[80px_1fr] md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 py-6 border-b border-[#0f0e0d]/10 items-center"
              >
                {/* Product */}
                <div className="flex gap-4 items-center md:col-span-1 col-span-2">
                  <div
                    className="w-20 h-24 bg-[#e8e3dc] flex-shrink-0 overflow-hidden cursor-pointer"
                    onClick={() => navigate(`/product/${item.product.id}`)}
                  >
                    <img src={item.product.colors?.find(c => c.name === item.color)?.img || item.product.img} alt={item.product.alt} className="w-full h-full object-contain p-2" />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium tracking-widest uppercase text-[#6b6459]">{item.product.category}</p>
                    <h3
                      className="font-display text-[15px] font-light text-[#0f0e0d] cursor-pointer hover:text-[#c8a97e] transition-colors"
                      onClick={() => navigate(`/product/${item.product.id}`)}
                    >
                      {item.product.name}
                    </h3>
                    <p className="text-[14px] font-medium text-[#0f0e0d] mt-0.5">${item.product.price}</p>
                    <p className="text-[12px] text-[#6b6459] md:hidden mt-0.5">Size: {item.size}{item.color ? ` · Color: ${item.color}` : ""}</p>
                  </div>
                </div>

                {/* Size */}
                <div className="hidden md:flex justify-center">
                  <span className="text-[13px] text-[#0f0e0d] flex flex-col items-center gap-1">
                    <span>{item.size}</span>
                    {item.color && <span className="text-[11px] text-[#6b6459]">{item.color}</span>}
                  </span>
                </div>

                {/* Quantity */}
                <div className="flex justify-center col-span-1">
                  <div className="flex items-center border border-[#0f0e0d]/20">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                      className="px-3 py-1.5 text-[13px] text-[#0f0e0d] hover:bg-[#e8e3dc] transition-colors"
                    >
                      −
                    </button>
                    <span className="px-4 py-1.5 text-[13px] font-medium text-[#0f0e0d] border-x border-[#0f0e0d]/20 min-w-[40px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                      className="px-3 py-1.5 text-[13px] text-[#0f0e0d] hover:bg-[#e8e3dc] transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="text-right">
                  <span className="text-[15px] font-medium text-[#0f0e0d]">${item.product.price * item.quantity}</span>
                </div>

                {/* Remove */}
                <button
                  onClick={() => onRemove(item.product.id, item.size, item.color)}
                  className="text-[#6b6459] hover:text-red-600 transition-colors justify-self-end"
                  aria-label="Remove item"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 border border-[#0f0e0d]/10 sticky top-24">
              <h3 className="font-display text-xl font-light text-[#0f0e0d] mb-6">Order Summary</h3>
              <div className="space-y-3 pb-4 border-b border-[#0f0e0d]/10">
                <div className="flex justify-between text-[13px]">
                  <span className="text-[#6b6459]">Subtotal</span>
                  <span className="font-medium text-[#0f0e0d]">${subtotal}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-[#6b6459]">Shipping</span>
                  <span className="font-medium text-[#0f0e0d]">
                    {shipping === 0 ? (
                      <span className="text-[#c8a97e]">Free</span>
                    ) : (
                      `$${shipping}`
                    )}
                  </span>
                </div>
              </div>
              <div className="flex justify-between pt-4 mb-6">
                <span className="text-[13px] font-medium tracking-widest uppercase text-[#0f0e0d]">Total</span>
                <span className="font-display text-2xl font-light text-[#0f0e0d]">${total}</span>
              </div>
              {subtotal < 150 && (
                <p className="text-[12px] text-[#c8a97e] mb-4">
                  Add ${150 - subtotal} more for free shipping!
                </p>
              )}
              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-[#0f0e0d] text-[#f5f2ee] text-[12px] font-medium tracking-widest uppercase py-4 hover:bg-[#c8a97e] transition-colors duration-300 mb-3"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full border border-[#0f0e0d] text-[#0f0e0d] text-[12px] font-medium tracking-widest uppercase py-3.5 hover:bg-[#0f0e0d] hover:text-[#f5f2ee] transition-colors duration-300"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
