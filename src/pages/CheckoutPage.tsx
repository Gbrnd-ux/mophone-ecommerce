import { useState } from "react";
import { CartItem, ToastData } from "../types";
import { Breadcrumb } from "../components/Breadcrumb";
import { useCurrency } from "../contexts/CurrencyContext";
import { useAuth } from "../contexts/AuthContext";

export function CheckoutPage({
  cart,
  onClearCart,
  addToast,
  navigate,
}: {
  cart: CartItem[];
  onClearCart: () => void;
  addToast: (msg: string, type: ToastData["type"]) => void;
  navigate: (path: string) => void;
}) {
  const { formatPrice } = useCurrency();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardInfo, setCardInfo] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  });
  const [orderNumber, setOrderNumber] = useState("");

  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = isPromoApplied && promoCode === "MOPHONE" ? Math.round(subtotal * 0.1) : 0;
  const discountedSubtotal = subtotal - discountAmount;
  const shippingCost = discountedSubtotal >= 150 ? 0 : 15;
  const tax = Math.round(discountedSubtotal * 0.08);
  const total = discountedSubtotal + shippingCost + tax;

  const steps = [
    { num: 1, label: "Shipping" },
    { num: 2, label: "Payment" },
    { num: 3, label: "Review" },
    { num: 4, label: "Confirmation" },
  ];

  const validateShipping = () => {
    const { firstName, lastName, email, address, city, zipCode, country } = shipping;
    if (!firstName || !lastName || !email || !address || !city || !zipCode || !country) {
      addToast("Please fill in all required fields", "error");
      return false;
    }
    if (!email.includes("@")) {
      addToast("Please enter a valid email address", "error");
      return false;
    }
    return true;
  };

  const validatePayment = () => {
    if (paymentMethod === "card") {
      if (!cardInfo.number || !cardInfo.name || !cardInfo.expiry || !cardInfo.cvc) {
        addToast("Please fill in all card details", "error");
        return false;
      }
    }
    return true;
  };

  const handlePlaceOrder = () => {
    const num = `MS-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setOrderNumber(num);
    setStep(4);
    onClearCart();
    addToast("Order placed successfully!", "success");
  };

  if (cart.length === 0 && step < 4) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 text-center page-enter">
        <h2 className="font-display text-3xl font-light text-[#0f0e0d] mb-4">Your cart is empty</h2>
        <p className="text-[14px] text-[#6b6459] mb-8">Add some items before checking out.</p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-3 bg-[#0f0e0d] text-[#f5f2ee] text-[12px] font-medium tracking-widest uppercase px-8 py-4 hover:bg-[#c8a97e] transition-colors duration-300"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 text-center page-enter">
        <h2 className="font-display text-3xl font-light text-[#0f0e0d] mb-4">Sign in required</h2>
        <p className="text-[14px] text-[#6b6459] mb-8">Please sign in to your account to securely complete your purchase.</p>
        <button
          onClick={() => navigate("/login")}
          className="inline-flex items-center gap-3 bg-[#0f0e0d] text-[#f5f2ee] text-[12px] font-medium tracking-widest uppercase px-8 py-4 hover:bg-[#c8a97e] transition-colors duration-300"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-10 py-8 page-enter">
      <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Cart", path: "/cart" }, { label: "Checkout" }]} />

      <h1 className="font-display text-4xl md:text-5xl font-light text-[#0f0e0d] mb-8">Checkout</h1>

      {/* Steps Indicator */}
      <div className="flex items-center mb-12">
        {steps.map((s, i) => (
          <div key={s.num} className="flex items-center flex-1">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-semibold transition-colors ${
                  step >= s.num
                    ? "bg-[#0f0e0d] text-[#f5f2ee]"
                    : "bg-[#e8e3dc] text-[#6b6459]"
                }`}
              >
                {step > s.num ? "✓" : s.num}
              </div>
              <span
                className={`text-[11px] font-medium tracking-widest uppercase hidden sm:block ${
                  step >= s.num ? "text-[#0f0e0d]" : "text-[#6b6459]"
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-px mx-3 ${
                  step > s.num ? "bg-[#0f0e0d]" : "bg-[#e8e3dc]"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Shipping */}
      {step === 1 && (
        <div className="animate-fade-in">
          <h2 className="font-display text-2xl font-light text-[#0f0e0d] mb-6">Shipping Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-medium tracking-widest uppercase text-[#6b6459] mb-2">
                First Name *
              </label>
              <input
                type="text"
                value={shipping.firstName}
                onChange={(e) => setShipping({ ...shipping, firstName: e.target.value })}
                className="w-full px-4 py-3 text-[14px] bg-white border border-[#0f0e0d]/20 focus:outline-none focus:border-[#c8a97e] transition-colors"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium tracking-widest uppercase text-[#6b6459] mb-2">
                Last Name *
              </label>
              <input
                type="text"
                value={shipping.lastName}
                onChange={(e) => setShipping({ ...shipping, lastName: e.target.value })}
                className="w-full px-4 py-3 text-[14px] bg-white border border-[#0f0e0d]/20 focus:outline-none focus:border-[#c8a97e] transition-colors"
                placeholder="Doe"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[11px] font-medium tracking-widest uppercase text-[#6b6459] mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={shipping.email}
                onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                className="w-full px-4 py-3 text-[14px] bg-white border border-[#0f0e0d]/20 focus:outline-none focus:border-[#c8a97e] transition-colors"
                placeholder="john.doe@example.com"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[11px] font-medium tracking-widest uppercase text-[#6b6459] mb-2">
                Address *
              </label>
              <input
                type="text"
                value={shipping.address}
                onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                className="w-full px-4 py-3 text-[14px] bg-white border border-[#0f0e0d]/20 focus:outline-none focus:border-[#c8a97e] transition-colors"
                placeholder="123 Main Street"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium tracking-widest uppercase text-[#6b6459] mb-2">
                City *
              </label>
              <input
                type="text"
                value={shipping.city}
                onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                className="w-full px-4 py-3 text-[14px] bg-white border border-[#0f0e0d]/20 focus:outline-none focus:border-[#c8a97e] transition-colors"
                placeholder="New York"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium tracking-widest uppercase text-[#6b6459] mb-2">
                ZIP / Postal Code *
              </label>
              <input
                type="text"
                value={shipping.zipCode}
                onChange={(e) => setShipping({ ...shipping, zipCode: e.target.value })}
                className="w-full px-4 py-3 text-[14px] bg-white border border-[#0f0e0d]/20 focus:outline-none focus:border-[#c8a97e] transition-colors"
                placeholder="10001"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium tracking-widest uppercase text-[#6b6459] mb-2">
                Country *
              </label>
              <select
                value={shipping.country}
                onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
                className="w-full px-4 py-3 text-[14px] bg-white border border-[#0f0e0d]/20 focus:outline-none focus:border-[#c8a97e] transition-colors"
              >
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="ID">Indonesia</option>
                <option value="SG">Singapore</option>
                <option value="JP">Japan</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-medium tracking-widest uppercase text-[#6b6459] mb-2">
                Phone (Optional)
              </label>
              <input
                type="tel"
                value={shipping.phone}
                onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                className="w-full px-4 py-3 text-[14px] bg-white border border-[#0f0e0d]/20 focus:outline-none focus:border-[#c8a97e] transition-colors"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#0f0e0d]/10">
            <button
              onClick={() => navigate("/cart")}
              className="text-[12px] font-medium tracking-widest uppercase text-[#6b6459] hover:text-[#0f0e0d] transition-colors flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Cart
            </button>
            <button
              onClick={() => {
                if (validateShipping()) setStep(2);
              }}
              className="bg-[#0f0e0d] text-[#f5f2ee] text-[12px] font-medium tracking-widest uppercase px-8 py-4 hover:bg-[#c8a97e] transition-colors duration-300"
            >
              Continue to Payment
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Payment */}
      {step === 2 && (
        <div className="animate-fade-in">
          <h2 className="font-display text-2xl font-light text-[#0f0e0d] mb-6">Payment Method</h2>

          {/* Method Selection */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { id: "card", label: "Credit Card", icon: "💳" },
              { id: "paypal", label: "PayPal", icon: "🅿️" },
              { id: "bank", label: "Bank Transfer", icon: "🏦" },
            ].map((method) => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`flex flex-col items-center gap-2 p-4 border transition-all duration-200 ${
                  paymentMethod === method.id
                    ? "border-[#0f0e0d] bg-[#0f0e0d] text-[#f5f2ee]"
                    : "border-[#0f0e0d]/20 text-[#0f0e0d] hover:border-[#0f0e0d]"
                }`}
              >
                <span className="text-xl">{method.icon}</span>
                <span className="text-[11px] font-medium tracking-widest uppercase">{method.label}</span>
              </button>
            ))}
          </div>

          {paymentMethod === "card" && (
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-medium tracking-widest uppercase text-[#6b6459] mb-2">
                  Card Number *
                </label>
                <input
                  type="text"
                  value={cardInfo.number}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").substring(0, 16);
                    const formatted = v.replace(/(.{4})/g, "$1 ").trim();
                    setCardInfo({ ...cardInfo, number: formatted });
                  }}
                  className="w-full px-4 py-3 text-[14px] bg-white border border-[#0f0e0d]/20 focus:outline-none focus:border-[#c8a97e] transition-colors tracking-widest"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium tracking-widest uppercase text-[#6b6459] mb-2">
                  Cardholder Name *
                </label>
                <input
                  type="text"
                  value={cardInfo.name}
                  onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
                  className="w-full px-4 py-3 text-[14px] bg-white border border-[#0f0e0d]/20 focus:outline-none focus:border-[#c8a97e] transition-colors"
                  placeholder="Your Name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-medium tracking-widest uppercase text-[#6b6459] mb-2">
                    Expiry Date *
                  </label>
                  <input
                    type="text"
                    value={cardInfo.expiry}
                    onChange={(e) => {
                      let v = e.target.value.replace(/\D/g, "").substring(0, 4);
                      if (v.length > 2) v = v.substring(0, 2) + "/" + v.substring(2);
                      setCardInfo({ ...cardInfo, expiry: v });
                    }}
                    className="w-full px-4 py-3 text-[14px] bg-white border border-[#0f0e0d]/20 focus:outline-none focus:border-[#c8a97e] transition-colors"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium tracking-widest uppercase text-[#6b6459] mb-2">
                    CVC *
                  </label>
                  <input
                    type="text"
                    value={cardInfo.cvc}
                    onChange={(e) => setCardInfo({ ...cardInfo, cvc: e.target.value.replace(/\D/g, "").substring(0, 4) })}
                    className="w-full px-4 py-3 text-[14px] bg-white border border-[#0f0e0d]/20 focus:outline-none focus:border-[#c8a97e] transition-colors"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "paypal" && (
            <div className="bg-white border border-[#0f0e0d]/10 p-8 text-center">
              <span className="text-4xl block mb-3">🅿️</span>
              <p className="font-display text-lg font-light text-[#0f0e0d] mb-2">PayPal</p>
              <p className="text-[13px] text-[#6b6459]">
                You will be redirected to PayPal to complete your payment after reviewing your order.
              </p>
            </div>
          )}

          {paymentMethod === "bank" && (
            <div className="bg-white border border-[#0f0e0d]/10 p-8 text-center">
              <span className="text-4xl block mb-3">🏦</span>
              <p className="font-display text-lg font-light text-[#0f0e0d] mb-2">Bank Transfer</p>
              <p className="text-[13px] text-[#6b6459]">
                Bank transfer details will be provided after you place your order.
              </p>
            </div>
          )}

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#0f0e0d]/10">
            <button
              onClick={() => setStep(1)}
              className="text-[12px] font-medium tracking-widest uppercase text-[#6b6459] hover:text-[#0f0e0d] transition-colors flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Shipping
            </button>
            <button
              onClick={() => {
                if (validatePayment()) setStep(3);
              }}
              className="bg-[#0f0e0d] text-[#f5f2ee] text-[12px] font-medium tracking-widest uppercase px-8 py-4 hover:bg-[#c8a97e] transition-colors duration-300"
            >
              Review Order
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <div className="animate-fade-in">
          <h2 className="font-display text-2xl font-light text-[#0f0e0d] mb-6">Review Your Order</h2>

          {/* Shipping summary */}
          <div className="bg-white border border-[#0f0e0d]/10 p-6 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[11px] font-medium tracking-widest uppercase text-[#c8a97e]">Shipping Address</h3>
              <button onClick={() => setStep(1)} className="text-[11px] font-medium tracking-widest uppercase text-[#6b6459] hover:text-[#0f0e0d] transition-colors">
                Edit
              </button>
            </div>
            <p className="text-[14px] text-[#0f0e0d]">{shipping.firstName} {shipping.lastName}</p>
            <p className="text-[13px] text-[#6b6459]">{shipping.address}</p>
            <p className="text-[13px] text-[#6b6459]">{shipping.city}, {shipping.zipCode}</p>
            <p className="text-[13px] text-[#6b6459]">{shipping.email}</p>
          </div>

          {/* Payment summary */}
          <div className="bg-white border border-[#0f0e0d]/10 p-6 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[11px] font-medium tracking-widest uppercase text-[#c8a97e]">Payment Method</h3>
              <button onClick={() => setStep(2)} className="text-[11px] font-medium tracking-widest uppercase text-[#6b6459] hover:text-[#0f0e0d] transition-colors">
                Edit
              </button>
            </div>
            <p className="text-[14px] text-[#0f0e0d]">
              {paymentMethod === "card" && `Credit Card ending in ${cardInfo.number.slice(-4)}`}
              {paymentMethod === "paypal" && "PayPal"}
              {paymentMethod === "bank" && "Bank Transfer"}
            </p>
          </div>

          {/* Items */}
          <div className="bg-white border border-[#0f0e0d]/10 p-6 mb-4">
            <h3 className="text-[11px] font-medium tracking-widest uppercase text-[#c8a97e] mb-4">Items ({cart.reduce((a, i) => a + i.quantity, 0)})</h3>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-4 items-center">
                  <div className="w-14 h-16 bg-[#e8e3dc] flex-shrink-0 overflow-hidden">
                    <img src={item.product.colors?.find(c => c.name === item.color)?.img || item.product.img} alt={item.product.alt} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] text-[#0f0e0d] font-medium truncate">{item.product.name}</p>
                    <p className="text-[12px] text-[#6b6459]">Size: {item.size}{item.color ? ` · Color: ${item.color}` : ""} · Qty: {item.quantity}</p>
                  </div>
                  <span className="text-[14px] font-medium text-[#0f0e0d]">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Promo Code */}
          <div className="bg-white border border-[#0f0e0d]/10 p-6 mb-4">
            <h3 className="text-[11px] font-medium tracking-widest uppercase text-[#c8a97e] mb-4">Promo Code</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                className="flex-1 px-4 py-3 text-[14px] bg-white border border-[#0f0e0d]/20 focus:outline-none focus:border-[#c8a97e] transition-colors uppercase"
                placeholder="Enter code (e.g. MOPHONE)"
                disabled={isPromoApplied}
              />
              <button
                onClick={() => {
                  if (isPromoApplied) {
                    setIsPromoApplied(false);
                    setPromoCode("");
                    addToast("Promo code removed", "info");
                  } else if (promoCode === "MOPHONE") {
                    setIsPromoApplied(true);
                    addToast("Promo code applied: 10% off", "success");
                  } else {
                    addToast("Invalid promo code", "error");
                  }
                }}
                className="bg-[#0f0e0d] text-[#f5f2ee] text-[12px] font-medium tracking-widest uppercase px-6 hover:bg-[#c8a97e] transition-colors duration-300"
              >
                {isPromoApplied ? "Remove" : "Apply"}
              </button>
            </div>
          </div>

          {/* Totals */}
          <div className="bg-white border border-[#0f0e0d]/10 p-6">
            <div className="space-y-2 pb-4 border-b border-[#0f0e0d]/10">
              <div className="flex justify-between text-[13px]">
                <span className="text-[#6b6459]">Subtotal</span>
                <span className="text-[#0f0e0d]">{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[13px]">
                  <span className="text-[#c8a97e]">Discount (10%)</span>
                  <span className="text-[#c8a97e]">-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[13px]">
                <span className="text-[#6b6459]">Shipping</span>
                <span className={shippingCost === 0 ? "text-[#c8a97e]" : "text-[#0f0e0d]"}>
                  {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-[#6b6459]">Tax (est.)</span>
                <span className="text-[#0f0e0d]">{formatPrice(tax)}</span>
              </div>
            </div>
            <div className="flex justify-between pt-4">
              <span className="text-[13px] font-medium tracking-widest uppercase text-[#0f0e0d]">Total</span>
              <span className="font-display text-2xl font-light text-[#0f0e0d]">{formatPrice(total)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#0f0e0d]/10">
            <button
              onClick={() => setStep(2)}
              className="text-[12px] font-medium tracking-widest uppercase text-[#6b6459] hover:text-[#0f0e0d] transition-colors flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Payment
            </button>
            <button
              onClick={handlePlaceOrder}
              className="bg-[#c8a97e] text-white text-[12px] font-medium tracking-widest uppercase px-10 py-4 hover:bg-[#a8834e] transition-colors duration-300"
            >
              Place Order — {formatPrice(total)}
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Confirmation */}
      {step === 4 && (
        <div className="text-center py-12 animate-scale-in">
          <div className="w-20 h-20 bg-[#c8a97e] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-light text-[#0f0e0d] mb-3">
            Thank You!
          </h2>
          <p className="text-[15px] text-[#6b6459] mb-2">Your order has been placed successfully.</p>
          <p className="text-[13px] text-[#6b6459] mb-8">
            Order Number: <span className="font-semibold text-[#0f0e0d]">{orderNumber}</span>
          </p>

          <div className="bg-white border border-[#0f0e0d]/10 p-6 max-w-md mx-auto mb-8 text-left">
            <p className="text-[11px] font-medium tracking-widest uppercase text-[#c8a97e] mb-3">
              Order Details
            </p>
            <div className="space-y-2 text-[13px]">
              <div className="flex justify-between">
                <span className="text-[#6b6459]">Shipping to</span>
                <span className="text-[#0f0e0d]">{shipping.firstName} {shipping.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6b6459]">Email</span>
                <span className="text-[#0f0e0d]">{shipping.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6b6459]">Payment</span>
                <span className="text-[#0f0e0d]">
                  {paymentMethod === "card" ? "Credit Card" : paymentMethod === "paypal" ? "PayPal" : "Bank Transfer"}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#0f0e0d]/10">
                <span className="font-medium text-[#0f0e0d]">Total Charged</span>
                <span className="font-medium text-[#0f0e0d]">{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          <p className="text-[13px] text-[#6b6459] mb-8">
            A confirmation email has been sent to <span className="font-medium text-[#0f0e0d]">{shipping.email}</span>
          </p>

          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-3 bg-[#0f0e0d] text-[#f5f2ee] text-[12px] font-medium tracking-widest uppercase px-8 py-4 hover:bg-[#c8a97e] transition-colors duration-300"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}
