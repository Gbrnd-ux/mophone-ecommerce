import { Product } from "../types";


export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Xiaomi 17T",
    price: 799,
    originalPrice: 899,
    category: "Smartphones",
    tag: "Sale",
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
  },

    {
    id: 5,
    name: "Iphone 17 Pro Max",
    price: 1299,
    originalPrice: 1399,
    category: "Smartphones",
    tag: null,
    img: "/image/Iphone 17 Pro Max/Iphone 17 Pro Max.png",
    alt: "Iphone 17 Pro Max",
    description: "The ultimate iPhone 17 Pro Max redefines premium. Crafted with an ultra-tough titanium chassis, an advanced A19 Pro chip, and revolutionary AI-powered computational photography for unmatched imaging.",
    sizes: ["256GB", "512GB"],
    colors: [
      { name: "Deep Blue", img: "/image/Iphone 17 Pro Max/Deep Blue.png", alt: "Iphone 17 Pro Max Deep Blue" },
      { name: "Silver", img: "/image/Iphone 17 Pro Max/Silver.png", alt: "Iphone 17 Pro Max Silver" },
      { name: "Cosmic Orange", img: "/image/Iphone 17 Pro Max/Cosmic Orange.png", alt: "Iphone 17 Pro Max Cosmic Orange"}
    ],
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
    description: "Experience the enduring excellence of the iPhone 14 Pro Max. This device masterfully blends the robust Titanium design with the lightning-fast A17 Pro chip, delivering sustained professional performance and an unforgettable imaging experience.",
    sizes: ["256GB", "512GB"],
    colors: [
      { name: "Deep Purple", img: "/image/Iphone 14 Pro Max/Deep Purple.png", alt: "Iphone 14 Pro Max Deep Purple" },
      { name: "Silver", img: "/image/Iphone 14 Pro Max/Silver.png", alt: "Iphone 14 Pro Max Silver" },
      { name: "Gold", img: "/image/Iphone 14 Pro Max/Gold.png", alt: "Iphone 14 Pro Max Gold"},
      { name: "Space Black", img: "/image/Iphone 14 Pro Max/Space Black.png", alt: "Iphone 14 Pro Max Space Black"}
    ],
  }
];

