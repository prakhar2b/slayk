// Mock Data for SLAYK Home Decor Store

export const categories = [
  {
    id: 1,
    name: "Bedsheets",
    slug: "bedsheets",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop",
    count: 245
  },
  {
    id: 2,
    name: "Curtains",
    slug: "curtains",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&h=400&fit=crop",
    count: 189
  },
  {
    id: 3,
    name: "Cushion Covers",
    slug: "cushion-covers",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    count: 312
  },
  {
    id: 4,
    name: "Rugs & Carpets",
    slug: "rugs-carpets",
    image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=400&h=400&fit=crop",
    count: 156
  },
  {
    id: 5,
    name: "Wall Decor",
    slug: "wall-decor",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&h=400&fit=crop",
    count: 278
  },
  {
    id: 6,
    name: "Kitchen",
    slug: "kitchen",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    count: 423
  },
  {
    id: 7,
    name: "Lighting",
    slug: "lighting",
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=400&fit=crop",
    count: 167
  },
  {
    id: 8,
    name: "Bath",
    slug: "bath",
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&h=400&fit=crop",
    count: 198
  }
];

export const products = [
  {
    id: 1,
    name: "Botanical Dreams Cotton Bedsheet Set",
    slug: "botanical-dreams-bedsheet",
    category: "bedsheets",
    price: 2499,
    originalPrice: 4999,
    discount: 50,
    rating: 4.8,
    reviews: 1247,
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&h=600&fit=crop"
    ],
    description: "Transform your bedroom into a serene botanical paradise with our premium cotton bedsheet set. Features delicate floral prints on soft 300 thread count cotton.",
    features: ["100% Premium Cotton", "300 Thread Count", "Machine Washable", "Includes 1 Bedsheet + 2 Pillow Covers"],
    colors: ["Sage Green", "Dusty Rose", "Sky Blue"],
    sizes: ["Single", "Double", "King"],
    inStock: true,
    isNew: true,
    isBestSeller: true
  },
  {
    id: 2,
    name: "Velvet Luxe Cushion Cover Set of 5",
    slug: "velvet-luxe-cushion",
    category: "cushion-covers",
    price: 1299,
    originalPrice: 2599,
    discount: 50,
    rating: 4.6,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop"
    ],
    description: "Elevate your living space with our luxurious velvet cushion covers. Rich textures and elegant colors that complement any decor style.",
    features: ["Premium Velvet Fabric", "Hidden Zipper", "Set of 5 Covers", "16x16 inches"],
    colors: ["Emerald", "Navy", "Burgundy", "Mustard"],
    sizes: ["16x16", "18x18", "20x20"],
    inStock: true,
    isNew: false,
    isBestSeller: true
  },
  {
    id: 3,
    name: "Handwoven Jute Area Rug",
    slug: "handwoven-jute-rug",
    category: "rugs-carpets",
    price: 3999,
    originalPrice: 7999,
    discount: 50,
    rating: 4.9,
    reviews: 567,
    image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600166898405-da9535204843?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop"
    ],
    description: "Bring natural warmth to your floors with our handwoven jute rug. Each piece is crafted by skilled artisans using sustainable materials.",
    features: ["100% Natural Jute", "Handwoven", "Anti-slip Backing", "Easy to Clean"],
    colors: ["Natural", "Charcoal", "Ivory"],
    sizes: ["4x6 ft", "5x7 ft", "6x9 ft", "8x10 ft"],
    inStock: true,
    isNew: true,
    isBestSeller: false
  },
  {
    id: 4,
    name: "Sheer Elegance Curtains Pair",
    slug: "sheer-elegance-curtains",
    category: "curtains",
    price: 1899,
    originalPrice: 3799,
    discount: 50,
    rating: 4.7,
    reviews: 1034,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&h=600&fit=crop"
    ],
    description: "Let natural light filter through beautifully with our sheer curtains. Perfect for creating an airy, elegant atmosphere in any room.",
    features: ["Light Filtering", "Rod Pocket Design", "Machine Washable", "Set of 2 Panels"],
    colors: ["White", "Ivory", "Light Grey", "Blush"],
    sizes: ["5 ft", "7 ft", "9 ft"],
    inStock: true,
    isNew: false,
    isBestSeller: true
  },
  {
    id: 5,
    name: "Boho Macrame Wall Hanging",
    slug: "boho-macrame-wall",
    category: "wall-decor",
    price: 999,
    originalPrice: 1999,
    discount: 50,
    rating: 4.5,
    reviews: 678,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&h=600&fit=crop"
    ],
    description: "Add bohemian charm to your walls with this handcrafted macrame piece. Made from 100% cotton rope with intricate knotwork patterns.",
    features: ["Handcrafted", "100% Cotton Rope", "Ready to Hang", "Wooden Dowel Included"],
    colors: ["Natural", "White", "Cream"],
    sizes: ["Small", "Medium", "Large"],
    inStock: true,
    isNew: true,
    isBestSeller: false
  },
  {
    id: 6,
    name: "Ceramic Dinner Set 24 Pcs",
    slug: "ceramic-dinner-set",
    category: "kitchen",
    price: 4999,
    originalPrice: 9999,
    discount: 50,
    rating: 4.8,
    reviews: 445,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop"
    ],
    description: "Elevate your dining experience with our elegant ceramic dinner set. Includes plates, bowls, and serving pieces in a timeless design.",
    features: ["Premium Ceramic", "Microwave Safe", "Dishwasher Safe", "24 Piece Set"],
    colors: ["White Gold", "Blue Floral", "Green Leaf"],
    sizes: ["24 Pcs", "32 Pcs"],
    inStock: true,
    isNew: false,
    isBestSeller: true
  },
  {
    id: 7,
    name: "Turkish Cotton Bath Towel Set",
    slug: "turkish-bath-towels",
    category: "bath",
    price: 1799,
    originalPrice: 3599,
    discount: 50,
    rating: 4.9,
    reviews: 1567,
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&h=600&fit=crop"
    ],
    description: "Wrap yourself in luxury with our Turkish cotton towels. Ultra-absorbent, quick-drying, and incredibly soft against your skin.",
    features: ["100% Turkish Cotton", "600 GSM", "Set of 6 Towels", "Quick Dry"],
    colors: ["White", "Grey", "Navy", "Sage"],
    sizes: ["Set of 4", "Set of 6", "Set of 8"],
    inStock: true,
    isNew: false,
    isBestSeller: true
  },
  {
    id: 8,
    name: "Minimalist Pendant Light",
    slug: "minimalist-pendant-light",
    category: "lighting",
    price: 2999,
    originalPrice: 5999,
    discount: 50,
    rating: 4.6,
    reviews: 334,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop"
    ],
    description: "Make a statement with our minimalist pendant light. Clean lines and quality materials create the perfect focal point for any room.",
    features: ["E27 Bulb Compatible", "Adjustable Height", "Easy Installation", "Metal + Glass"],
    colors: ["Black", "Gold", "White"],
    sizes: ["Small", "Medium", "Large"],
    inStock: true,
    isNew: true,
    isBestSeller: false
  },
  {
    id: 9,
    name: "Embroidered Table Runner",
    slug: "embroidered-table-runner",
    category: "kitchen",
    price: 799,
    originalPrice: 1599,
    discount: 50,
    rating: 4.4,
    reviews: 223,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop"
    ],
    description: "Add elegance to your dining table with our hand-embroidered runner. Features intricate traditional patterns on premium cotton.",
    features: ["Hand Embroidered", "100% Cotton", "Machine Washable", "72 inches Long"],
    colors: ["Ivory", "Blue", "Red"],
    sizes: ["60 inch", "72 inch", "90 inch"],
    inStock: true,
    isNew: false,
    isBestSeller: false
  },
  {
    id: 10,
    name: "Geometric Print Duvet Cover",
    slug: "geometric-duvet-cover",
    category: "bedsheets",
    price: 3499,
    originalPrice: 6999,
    discount: 50,
    rating: 4.7,
    reviews: 876,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=600&fit=crop"
    ],
    description: "Modern geometric patterns meet supreme comfort in our duvet cover set. Made from breathable cotton for year-round use.",
    features: ["300 TC Cotton", "Hidden Zipper", "Corner Ties", "Includes 2 Pillow Shams"],
    colors: ["Terracotta", "Charcoal", "Navy"],
    sizes: ["Single", "Double", "King", "Super King"],
    inStock: true,
    isNew: true,
    isBestSeller: true
  },
  {
    id: 11,
    name: "Woven Storage Baskets Set",
    slug: "woven-storage-baskets",
    category: "wall-decor",
    price: 1499,
    originalPrice: 2999,
    discount: 50,
    rating: 4.5,
    reviews: 445,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop"
    ],
    description: "Organize in style with our handwoven storage baskets. Perfect for decluttering while adding natural texture to your space.",
    features: ["Handwoven Seagrass", "Set of 3 Sizes", "Sturdy Handles", "Stackable"],
    colors: ["Natural", "Black Accent", "White Accent"],
    sizes: ["Set of 3"],
    inStock: true,
    isNew: false,
    isBestSeller: false
  },
  {
    id: 12,
    name: "Blackout Curtains Premium",
    slug: "blackout-curtains-premium",
    category: "curtains",
    price: 2499,
    originalPrice: 4999,
    discount: 50,
    rating: 4.8,
    reviews: 1234,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&h=600&fit=crop"
    ],
    description: "Sleep better with our premium blackout curtains. Block 99% of light and reduce noise for the perfect night's rest.",
    features: ["99% Blackout", "Thermal Insulated", "Noise Reducing", "Grommet Top"],
    colors: ["Charcoal", "Navy", "Burgundy", "Forest Green"],
    sizes: ["5 ft", "7 ft", "9 ft"],
    inStock: true,
    isNew: false,
    isBestSeller: true
  }
];

export const heroSlides = [
  {
    id: 1,
    title: "Summer Sale",
    subtitle: "Up to 60% Off on Bedding",
    description: "Transform your bedroom into a cozy retreat with our premium cotton bedsheets.",
    cta: "Shop Now",
    image: "https://images.unsplash.com/photo-1616627561839-074385245ff6?w=1920&h=800&fit=crop",
    link: "/category/bedsheets"
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Discover the Latest Trends",
    description: "Explore our curated collection of modern home decor pieces.",
    cta: "Explore Collection",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=800&fit=crop",
    link: "/new-arrivals"
  },
  {
    id: 3,
    title: "Handcrafted with Love",
    subtitle: "Artisan Collection",
    description: "Support local artisans with our handmade home decor items.",
    cta: "View Artisan Collection",
    image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=1920&h=800&fit=crop",
    link: "/artisan"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "Absolutely love the quality! The bedsheets are so soft and the colors are exactly as shown. Will definitely order again.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    product: "Botanical Dreams Bedsheet"
  },
  {
    id: 2,
    name: "Rahul Mehta",
    location: "Delhi",
    rating: 5,
    text: "Fast delivery and excellent packaging. The cushion covers transformed my living room completely!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    product: "Velvet Luxe Cushions"
  },
  {
    id: 3,
    name: "Anita Desai",
    location: "Bangalore",
    rating: 5,
    text: "The jute rug is stunning! Great quality at this price point. Customer service was very helpful too.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    product: "Handwoven Jute Rug"
  },
  {
    id: 4,
    name: "Vikram Singh",
    location: "Jaipur",
    rating: 4,
    text: "Beautiful curtains that look much more expensive than they are. Perfect for my new apartment.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    product: "Sheer Elegance Curtains"
  }
];

export const collections = [
  {
    id: 1,
    name: "Monsoon Refresh",
    description: "Brighten your home this monsoon",
    image: "https://images.unsplash.com/photo-1616627561839-074385245ff6?w=600&h=400&fit=crop",
    link: "/collection/monsoon"
  },
  {
    id: 2,
    name: "Minimalist Living",
    description: "Less is more",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
    link: "/collection/minimalist"
  },
  {
    id: 3,
    name: "Bohemian Dreams",
    description: "Free-spirited decor for free spirits",
    image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=600&h=400&fit=crop",
    link: "/collection/boho"
  }
];

export const navCategories = [
  {
    name: "Furnishings",
    subcategories: [
      { name: "Bedsheets", link: "/category/bedsheets" },
      { name: "Curtains", link: "/category/curtains" },
      { name: "Cushion Covers", link: "/category/cushion-covers" },
      { name: "Blankets & Throws", link: "/category/blankets" },
      { name: "Table Linen", link: "/category/table-linen" }
    ]
  },
  {
    name: "Decor",
    subcategories: [
      { name: "Wall Decor", link: "/category/wall-decor" },
      { name: "Showpieces", link: "/category/showpieces" },
      { name: "Vases", link: "/category/vases" },
      { name: "Photo Frames", link: "/category/frames" },
      { name: "Mirrors", link: "/category/mirrors" }
    ]
  },
  {
    name: "Kitchen",
    subcategories: [
      { name: "Dinnerware", link: "/category/dinnerware" },
      { name: "Cookware", link: "/category/cookware" },
      { name: "Storage", link: "/category/storage" },
      { name: "Kitchen Tools", link: "/category/tools" }
    ]
  },
  {
    name: "Rugs",
    subcategories: [
      { name: "Area Rugs", link: "/category/area-rugs" },
      { name: "Runners", link: "/category/runners" },
      { name: "Doormats", link: "/category/doormats" },
      { name: "Bath Mats", link: "/category/bath-mats" }
    ]
  },
  {
    name: "Lighting",
    subcategories: [
      { name: "Table Lamps", link: "/category/table-lamps" },
      { name: "Floor Lamps", link: "/category/floor-lamps" },
      { name: "Pendant Lights", link: "/category/pendant-lights" },
      { name: "String Lights", link: "/category/string-lights" }
    ]
  },
  {
    name: "Bath",
    subcategories: [
      { name: "Towels", link: "/category/towels" },
      { name: "Bath Accessories", link: "/category/bath-accessories" },
      { name: "Shower Curtains", link: "/category/shower-curtains" }
    ]
  }
];

export const trustBadges = [
  {
    id: 1,
    icon: "Truck",
    title: "Free Shipping",
    description: "On orders above ₹999"
  },
  {
    id: 2,
    icon: "RotateCcw",
    title: "Easy Returns",
    description: "15 days return policy"
  },
  {
    id: 3,
    icon: "Shield",
    title: "Secure Payment",
    description: "100% secure checkout"
  },
  {
    id: 4,
    icon: "Award",
    title: "Quality Assured",
    description: "Premium products only"
  }
];
