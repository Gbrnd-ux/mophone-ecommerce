export type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number | null;
  category: string;
  tag: string | null;
  img: string;
  alt: string;
  description: string;
  sizes: string[];
  colors?: { name: string; img: string; alt: string }[];
  rating: number;
  reviewCount: number;
  specs?: Record<string, string>;
};

export type CartItem = {
  product: Product;
  quantity: number;
  size: string;
  color?: string;
};

export type Route = {
  page: "home" | "product" | "cart" | "checkout" | "category" | "account";
  param?: string;
};

export type ToastData = {
  message: string;
  type: "success" | "error" | "info";
  id: number;
};

export type Review = {
  id: number;
  productId: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
};
