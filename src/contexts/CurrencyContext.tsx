import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Currency = "USD" | "IDR";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (usdPrice: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(() => {
    try {
      const saved = localStorage.getItem("mophone_currency") as Currency;
      return saved === "USD" || saved === "IDR" ? saved : "USD";
    } catch {
      return "USD";
    }
  });

  useEffect(() => {
    localStorage.setItem("mophone_currency", currency);
  }, [currency]);

  const formatPrice = (usdPrice: number) => {
    if (currency === "IDR") {
      // 1 USD = 15,500 IDR
      const idrValue = usdPrice * 15500;
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(idrValue);
    }
    
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(usdPrice);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}