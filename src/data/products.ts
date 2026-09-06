import { Product } from "../types";


export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Xiaomi 17T",
    price: 799,
    originalPrice: 899,
    category: "Smartphones",
    tag: "New",
    img: "/image/Xioami 17T/Xiaomi17T.png",
    alt: "Xiaomi 17T Black",
    description: "The futuristic Xiaomi 17T pushes the boundaries of innovation with a revolutionary next-gen Leica camera, a stunning 165Hz AMOLED display, and blazing-fast hypercharge capabilities.",
    sizes: ["256GB", "512GB"],
    colors: [
      { name: "Black", img: "/image/Xioami 17T/Black.png", alt: "Xiaomi 17T Black" },
      { name: "Opal White", img: "/image/Xioami 17T/Opal White.png", alt: "Xiaomi 17T Opal White" },
      { name: "Blue", img: "/image/Xioami 17T/blue.png", alt: "Xiaomi 17T Blue" },
      { name: "Violet", img: "/image/Xioami 17T/violet.png", alt: "Xiaomi 17T Violet" },
    ],
    rating: 4.9,
    reviewsCount: 124,
    specs: {
      "display": "6.73\" 165Hz AMOLED",
      "chipset": "Snapdragon 8 Gen 3",
      "battery": "5000mAh, 120W HyperCharge",
      "camera": "50MP Leica Main + 50MP Ultrawide",
      "os": "HyperOS"
    }
  },
  {
    id: 2,
    name: "Xiaomi 15T",
    price: 649,
    originalPrice: 749,
    category: "Smartphones",
    tag: null,
    img: "/image/Xiaomi 15T/Xiaomi15T.png",
    alt: "Xiaomi 15T",
    description: "Step into the future with the Xiaomi 15T. Powered by a next-gen processor and featuring an upgraded Leica optical lens system, it delivers stunning low-light photography and extreme gaming performance.",
    sizes: ["256GB", "512GB"],
    colors: [
      { name: "Black", img: "/image/Xiaomi 15T/Black.png", alt: "Xiaomi 15T Black" },
      { name: "Gray", img: "/image/Xiaomi 15T/Gray.png", alt: "Xiaomi 15T Gray" },
      { name: "Rose Gold", img: "/image/Xiaomi 15T/Rose Gold.png", alt: "Xiaomi 15T Rose Gold" },
    ],
    rating: 4.8,
    reviewsCount: 89,
    specs: {
      "display": "6.67\" 144Hz AMOLED",
      "chipset": "Dimensity 9200+",
      "battery": "5000mAh, 120W",
      "camera": "50MP Leica Main + 12MP Ultrawide",
      "os": "HyperOS"
    }
  },
   {
    id: 3,
    name: "Xiaomi 14T",
    price: 499,
    originalPrice: 599,
    category: "Smartphones",
    tag: null,
    img: "/image/Xiaomi 14T/Xiaomi14T.png",
    alt: "Xiaomi 14T",
    description: "The Xiaomi 14T masters light and shadow with its co-engineered Leica Summilux lens. Enjoy an ultra-smooth 144Hz CrystalRes display, MediaTek Dimensity 8300-Ultra chip, and all-day battery life.",
    sizes: ["256GB", "512GB"],
    colors: [
      { name: "Titan Black", img: "/image/Xiaomi 14T/Titan Black.png", alt: "Xiaomi 14T Titan Black" },
      { name: "Titan Gray", img: "/image/Xiaomi 14T/Titan Gray.png", alt: "Xiaomi 14T Titan Gray" },
      { name: "Lemon Green", img: "/image/Xiaomi 14T/Lemon Green.png", alt: "Xiaomi 14T Lemon Green" },
      { name: "Titan Blue", img: "/image/Xiaomi 14T/Titan Blue.png", alt: "Xiaomi 14T Titan Blue"}
    ],
    rating: 4.7,
    reviewsCount: 215,
    specs: {
      "display": "6.67\" 144Hz CrystalRes",
      "chipset": "Dimensity 8300-Ultra",
      "battery": "5000mAh, 67W",
      "camera": "50MP Leica Main + 12MP",
      "os": "HyperOS"
    }
  },
  {
    id: 4,
    name: "Xiaomi 13T",
    price: 399,
    originalPrice: 499,
    category: "Smartphones",
    tag: null,
    img: "/image/Xiaomi 13T/Xiaomi13T.png",
    alt: "Xiaomi 13T",
    description: "Capture authentic Leica style with the Xiaomi 13T. Designed with premium IP68 water resistance, a professional 50MP camera system, and the reliable Dimensity 8200-Ultra for seamless daily performance.",
    sizes: ["256GB", "512GB"],
    colors: [
      { name: "Alpine Blue", img: "/image/Xiaomi 13T/Alpine Blue.png", alt: "Xiaomi 13T Alpine Blue" },
      { name: "Black", img: "/image/Xiaomi 13T/Black.png", alt: "Xiaomi 13T Black" },
      { name: "Meadow Green", img: "/image/Xiaomi 13T/Meadow Green.png", alt: "Xiaomi 13T Meadow Green"}
    ],
    rating: 4.6,
    reviewsCount: 342,
    specs: {
      "display": "6.67\" 144Hz AMOLED",
      "chipset": "Dimensity 8200-Ultra",
      "battery": "5000mAh, 67W",
      "camera": "50MP Leica Main",
      "os": "MIUI 14"
    }
  },

    {
    id: 5,
    name: "Iphone 17 Pro Max",
    price: 1299,
    originalPrice: 1399,
    category: "Smartphones",
    tag: "New",
    img: "/image/Iphone 17 Pro Max/Iphone 17 Pro Max.png",
    alt: "Iphone 17 Pro Max",
    description: "The ultimate iPhone 17 Pro Max redefines premium. Crafted with an ultra-tough titanium chassis, an advanced A19 Pro chip, and revolutionary AI-powered computational photography for unmatched imaging.",
    sizes: ["256GB", "512GB"],
    colors: [
      { name: "Deep Blue", img: "/image/Iphone 17 Pro Max/Deep Blue.png", alt: "Iphone 17 Pro Max Deep Blue" },
      { name: "Silver", img: "/image/Iphone 17 Pro Max/Silver.png", alt: "Iphone 17 Pro Max Silver" },
      { name: "Cosmic Orange", img: "/image/Iphone 17 Pro Max/Cosmic Orange.png", alt: "Iphone 17 Pro Max Cosmic Orange"}
    ],
    rating: 4.9,
    reviewsCount: 56,
    specs: {
      "display": "6.9\" Super Retina XDR, 120Hz",
      "chipset": "A19 Pro chip",
      "battery": "Up to 30 hours video",
      "camera": "48MP Main + 48MP Ultrawide",
      "os": "iOS 18"
    }
  },
 {
    id: 6,
    name: "Iphone 16 Pro Max",
    price: 1199,
    originalPrice: 1299,
    category: "Smartphones",
    tag: null,
    img: "/image/Iphone 16 Pro Max/Iphone 16 Pro Max.png",
    alt: "Iphone 16 Pro Max",
    description: "Meet the iPhone 16 Pro Max. Experience the massive 6.9-inch Super Retina XDR display, the incredibly powerful A18 Pro chip, and the brand-new Camera Control button for professional-grade videography.",
    sizes: ["256GB", "512GB"],
    colors: [
      { name: "Black Titanium", img: "/image/Iphone 16 Pro Max/Black Titanium.png", alt: "Iphone 16 Pro Max Black Titanium" },
      { name: "White Titanium", img: "/image/Iphone 16 Pro Max/White Titanium.png", alt: "Iphone 16 Pro Max White Titanium" },
      { name: "Natural Titanium", img: "/image/Iphone 16 Pro Max/Natural Titanium.png", alt: "Iphone 16 Pro Max Natural Titanium"},
      { name: "Desert Titanium", img: "/image/Iphone 16 Pro Max/Desert Titanium.png", alt: "Iphone 16 Pro Max Desert Titanium"}
    ],
    rating: 4.8,
    reviewsCount: 412,
    specs: {
      "display": "6.9\" Super Retina XDR, 120Hz",
      "chipset": "A18 Pro chip",
      "battery": "Up to 29 hours video",
      "camera": "48MP Main + 48MP Ultrawide",
      "os": "iOS 17"
    }
  },
  {
    id: 7,
    name: "Iphone 15 Pro Max",
    price: 999,
    originalPrice: 1099,
    category: "Smartphones",
    tag: null,
    img: "/image/Iphone 15 Pro Max/Iphone 15 Pro Max.png",
    alt: "Iphone 15 Pro Max",
    description: "Experience the enduring excellence of the iPhone 15 Pro Max. This device masterfully blends the robust Titanium design with the lightning-fast A17 Pro chip, delivering sustained professional performance and an unforgettable imaging experience.",
    sizes: ["256GB", "512GB"],
    colors: [
      { name: "Black Titanium", img: "/image/Iphone 15 Pro Max/Black Titanium.png", alt: "Iphone 15 Pro Max Black Titanium" },
      { name: "White Titanium", img: "/image/Iphone 15 Pro Max/White Titanium.png", alt: "Iphone 15 Pro Max White Titanium" },
      { name: "Natural Titanium", img: "/image/Iphone 15 Pro Max/Natural Titanium.png", alt: "Iphone 15 Pro Max Natural Titanium"},
      { name: "Blue Titanium", img: "/image/Iphone 15 Pro Max/Blue Titanium.png", alt: "Iphone 15 Pro Max Blue Titanium"}
    ],
    rating: 4.9,
    reviewsCount: 893,
    specs: {
      "display": "6.7\" Super Retina XDR, 120Hz",
      "chipset": "A17 Pro chip",
      "battery": "Up to 29 hours video",
      "camera": "48MP Main + 12MP Ultrawide",
      "os": "iOS 17"
    }
  },
  {
    id: 8,
    name: "Iphone 14 Pro Max",
    price: 899,
    originalPrice: 999,
    category: "Smartphones",
    tag: null,
    img: "/image/Iphone 14 Pro Max/Iphone 14 Pro Max.png",
    alt: "Iphone 14 Pro Max",
    description: "Experience the enduring excellence of the iPhone 14 Pro Max. This device masterfully blends the robust Stainless Steel design with the lightning-fast A16 Bionic chip, delivering sustained professional performance and an unforgettable imaging experience.",
    sizes: ["256GB", "512GB"],
    colors: [
      { name: "Deep Purple", img: "/image/Iphone 14 Pro Max/Deep Purple.png", alt: "Iphone 14 Pro Max Deep Purple" },
      { name: "Silver", img: "/image/Iphone 14 Pro Max/Silver.png", alt: "Iphone 14 Pro Max Silver" },
      { name: "Gold", img: "/image/Iphone 14 Pro Max/Gold.png", alt: "Iphone 14 Pro Max Gold"},
      { name: "Space Black", img: "/image/Iphone 14 Pro Max/Space Black.png", alt: "Iphone 14 Pro Max Space Black"}
    ],
    rating: 4.8,
    reviewsCount: 1045,
    specs: {
      "display": "6.7\" Super Retina XDR, 120Hz",
      "chipset": "A16 Bionic",
      "battery": "Up to 29 hours video",
      "camera": "48MP Main + 12MP Ultrawide",
      "os": "iOS 16"
    }
  },
  {
    id: 9,
    name: "iPad Pro 13",
    price: 1299,
    originalPrice: null,
    category: "Tablets",
    tag: "New",
    img: "/image/Ipad 13 Pro/Ipad 13 Pro.png",
    alt: "Ipad Pro 13",
    description: "The ultimate iPad experience with the most advanced display, M4 chip, and Apple Pencil Pro support.",
    sizes: ["256GB", "512GB", "1TB"],
    colors: [
      { name: "Space Black", img: "/image/Ipad 13 Pro/Space Black.png", alt: "Ipad 13 Pro Space Black" },
      { name: "Silver", img: "/image/Ipad 13 Pro/Silver.png", alt: "Ipad 13 Pro Silver" }
    ],
    rating: 4.9,
    reviewsCount: 156,
    specs: {
      "display": "13\" Ultra Retina XDR",
      "chipset": "Apple M4 chip",
      "battery": "Up to 10 hours web",
      "camera": "12MP Wide camera",
      "os": "iPadOS 17"
    }
  },
  {
    id: 10,
    name: "Xiaomi Pad 6",
    price: 399,
    originalPrice: 449,
    category: "Tablets",
    tag: "Sale",
    img: "/image/Xiaomi Pad 6/Xiaomi Pad 6.png",
    alt: "Xiaomi Pad 6",
    description: "Built for work, designed for ease. Featuring a 144Hz WQHD+ display and Snapdragon 870.",
    sizes: ["128GB", "256GB"],
    colors: [
      { name: "Blue", img: "/image/Xiaomi Pad 6/Blue.png", alt: "Xiaomi Pad 6 Blue" },
      { name: "Black", img: "/image/Xiaomi Pad 6/Black.png", alt: "Xiaomi Pad 6 Black" },
      { name: "Gold", img: "/image/Xiaomi Pad 6/Gold.png", alt: "Xiaomi Pad 6 Gold" },
    ],
    rating: 4.6,
    reviewsCount: 201,
    specs: {
      "display": "11\" WQHD+ 144Hz",
      "chipset": "Snapdragon 870",
      "battery": "8840mAh, 33W",
      "camera": "13MP Rear + 8MP Front",
      "os": "MIUI Pad 14"
    }
  },
  {
    id: 11,
    name: "AirPods Pro 2",
    price: 249,
    originalPrice: null,
    category: "Accessories",
    tag: "New",
    img: "https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?w=800&h=1000&fit=crop&auto=format",
    alt: "AirPods Pro",
    description: "Rich, high-quality audio and magical active noise cancellation.",
    sizes: ["One Size"],
    rating: 4.9,
    reviewsCount: 3042,
    specs: {
      "display": "N/A",
      "chipset": "Apple H2 chip",
      "battery": "Up to 6 hours",
      "camera": "N/A",
      "os": "iOS/macOS"
    }
  },
  {
    id: 12,
    name: "Mophone 120W HyperCharger",
    price: 49,
    originalPrice: 69,
    category: "Accessories",
    tag: "Sale",
    img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&h=1000&fit=crop&auto=format",
    alt: "120W Charger",
    description: "Charge your compatible devices from 0 to 100% in just 19 minutes with our advanced GaN tech.",
    sizes: ["One Size"],
    rating: 4.8,
    reviewsCount: 154,
    specs: {
      "display": "N/A",
      "chipset": "GaN Tech",
      "battery": "N/A",
      "camera": "N/A",
      "os": "Universal"
    }
  }
];

