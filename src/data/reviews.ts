import { Review } from "../types";

export const REVIEWS: Review[] = [
  // Xiaomi 17T
  { id: 1, productId: 1, author: "Alex Rahman", rating: 5, comment: "Absolutely incredible camera quality! The Leica partnership really shows. Night mode photos are indistinguishable from my DSLR.", date: "Aug 28, 2026" },
  { id: 2, productId: 1, author: "Sarah Chen", rating: 5, comment: "The 165Hz display is buttery smooth. Gaming and scrolling feel amazing. Battery easily lasts a full day with heavy use.", date: "Aug 25, 2026" },
  { id: 3, productId: 1, author: "James Park", rating: 4, comment: "Great phone overall. The violet color is stunning in person. Only minor complaint is the phone is a bit heavy.", date: "Aug 20, 2026" },

  // Xiaomi 15T
  { id: 4, productId: 2, author: "Maria Garcia", rating: 5, comment: "Best value flagship I have ever used. The camera is phenomenal for the price and the charging speed is insane.", date: "Jul 15, 2026" },
  { id: 5, productId: 2, author: "David Kim", rating: 4, comment: "Solid phone with great performance. The Rose Gold color is gorgeous. HyperOS is smooth and responsive.", date: "Jul 10, 2026" },

  // Xiaomi 14T
  { id: 6, productId: 3, author: "Emma Wilson", rating: 5, comment: "The Leica Summilux lens produces amazing portraits. Colors are vivid and natural. Fantastic mid-range phone.", date: "Jun 22, 2026" },
  { id: 7, productId: 3, author: "Ryan Lee", rating: 4, comment: "Great display, solid performance, and the 67W charging is fast enough. Camera is excellent for the price point.", date: "Jun 18, 2026" },
  { id: 8, productId: 3, author: "Olivia Brown", rating: 5, comment: "I switched from iPhone and I am very happy. The Lemon Green color is unique and eye-catching!", date: "Jun 10, 2026" },

  // Xiaomi 13T
  { id: 9, productId: 4, author: "Michael Chen", rating: 4, comment: "Still a solid phone in 2026. The Leica camera delivers great results and the IP68 rating gives peace of mind.", date: "May 30, 2026" },
  { id: 10, productId: 4, author: "Lisa Wang", rating: 5, comment: "Alpine Blue color is absolutely beautiful. Performance is smooth for daily tasks and social media.", date: "May 15, 2026" },

  // iPhone 17 Pro Max
  { id: 11, productId: 5, author: "Robert Johnson", rating: 5, comment: "The A19 Pro chip is a beast. Apple Intelligence features are genuinely useful. Best iPhone camera ever.", date: "Sep 1, 2026" },
  { id: 12, productId: 5, author: "Jennifer Liu", rating: 5, comment: "The titanium build is premium. ProMotion display is gorgeous. Camera system is unmatched.", date: "Aug 30, 2026" },

  // iPhone 16 Pro Max
  { id: 13, productId: 6, author: "Tom Anderson", rating: 5, comment: "Camera Control button is a game changer. The desert titanium color is stunning. Best phone I have owned.", date: "Jul 20, 2026" },
  { id: 14, productId: 6, author: "Amy Zhang", rating: 4, comment: "Great phone but expensive. The 6.9-inch display is perfect for media consumption. Battery life is excellent.", date: "Jul 5, 2026" },
  { id: 15, productId: 6, author: "Chris Miller", rating: 5, comment: "Upgraded from 14 Pro Max. The improvements in camera and performance are noticeable. Worth every penny.", date: "Jun 28, 2026" },

  // iPhone 15 Pro Max
  { id: 16, productId: 7, author: "Daniel Torres", rating: 5, comment: "The 5x optical zoom is incredible. Titanium design is both light and durable. USB-C was long overdue.", date: "Apr 15, 2026" },
  { id: 17, productId: 7, author: "Sophie Adams", rating: 4, comment: "Still an excellent phone. A17 Pro handles everything I throw at it. Blue Titanium looks amazing.", date: "Mar 20, 2026" },

  // iPhone 14 Pro Max
  { id: 18, productId: 8, author: "Kevin Nguyen", rating: 4, comment: "Dynamic Island is still one of the coolest features. Deep Purple color is iconic. Great camera system.", date: "Feb 10, 2026" },
  { id: 19, productId: 8, author: "Rachel Kim", rating: 5, comment: "Bought this at the discounted price and it is incredible value. 48MP camera takes stunning photos.", date: "Jan 25, 2026" },

  // iPad Pro M4
  { id: 20, productId: 9, author: "Mark Stevens", rating: 5, comment: "The Tandem OLED display is mind-blowing. M4 chip handles pro workflows effortlessly. Best tablet ever made.", date: "Aug 15, 2026" },
  { id: 21, productId: 9, author: "Diana Patel", rating: 5, comment: "Perfect for digital art with Apple Pencil Pro. So thin and light yet incredibly powerful.", date: "Aug 1, 2026" },

  // Xiaomi Pad 6 Pro
  { id: 22, productId: 10, author: "Lucas Martin", rating: 4, comment: "Incredible value for a tablet. 144Hz display is smooth. Quad speakers sound amazing for movies.", date: "Jul 10, 2026" },
  { id: 23, productId: 10, author: "Nina Shah", rating: 5, comment: "Best budget tablet on the market. Fast charging and great display. Perfect for students.", date: "Jun 20, 2026" },

  // Samsung Galaxy Tab S9 Ultra
  { id: 24, productId: 11, author: "Brandon Lee", rating: 5, comment: "The 14.6-inch screen is massive and beautiful. S Pen integration is flawless. Great for productivity.", date: "Jul 25, 2026" },
  { id: 25, productId: 11, author: "Aisha Khan", rating: 4, comment: "Premium build quality. DeX mode makes it a real laptop replacement. Water resistance is a nice bonus.", date: "Jul 1, 2026" },

  // AirPods Pro 2
  { id: 26, productId: 12, author: "Tyler Brooks", rating: 5, comment: "ANC is phenomenal. The adaptive audio feature is genius. Best wireless earbuds money can buy.", date: "Aug 20, 2026" },
  { id: 27, productId: 12, author: "Grace Lim", rating: 5, comment: "Crystal clear call quality. Spatial Audio with head tracking is amazing for movies.", date: "Aug 5, 2026" },

  // Xiaomi 120W HyperCharge
  { id: 28, productId: 13, author: "Eric Wong", rating: 4, comment: "Charges my Xiaomi 17T from 0 to 100% in about 20 minutes. Compact design is a nice touch.", date: "Sep 2, 2026" },
  { id: 29, productId: 13, author: "Priya Sharma", rating: 5, comment: "Game changer! No more overnight charging. GaN technology keeps it cool during fast charging.", date: "Aug 28, 2026" },

  // Xiaomi FlipBuds Pro
  { id: 30, productId: 14, author: "Jordan Hayes", rating: 4, comment: "40dB ANC is impressive at this price. Sound quality is rich and detailed. Comfortable for long listening.", date: "Aug 10, 2026" },
  { id: 31, productId: 14, author: "Mei Tanaka", rating: 5, comment: "Great alternative to AirPods Pro. LHDC codec support makes a real difference in audio quality.", date: "Aug 3, 2026" },
];
