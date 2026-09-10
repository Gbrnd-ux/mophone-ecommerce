export type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice: number | null;
  category: string;
  tag: string | null;
  img: string;
  alt: string;
  description: string;
  sizes: string[];
  colors?: { name: string; img: string; alt: string }[];
  rating?: number;
  reviewsCount?: number;
  specs?: {
    display?: string;
    chipset?: string;
    battery?: string;
    camera?: string;
    os?: string;
    [key: string]: string | undefined;
  };
};

export type CartItem = {
  product: Product;
  quantity: number;
  size: string;
  color?: string;
};

export type Route = {
  page: "home" | "product" | "cart" | "checkout" | "category" | "info" | "login" | "register";
  param?: string;
};

export type ToastData = {
  message: string;
  type: "success" | "error" | "info";
  id: number;
};
