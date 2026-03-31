export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number; // Previous price for strikethrough
  inStock: boolean; // Stock status
  category: "Mobile Phones" | "Tablets" | "Accessories";
  subCategory?: "Protection" | "Energy" | "Audio" | "Connectivity" | "Input" | "Stands";
  brand: string;
  state: "New" | "Used";
  img: string;
  isAccessory: boolean;
  colors?: string[]; // hex codes for quick-select dots
  compatibility?: string[]; // array of model names this is compatible with
  material?: string;
  description?: string;
}

export const ALL_PRODUCTS: Product[] = [
  // ---------------- Phones ----------------
  { 
    id: "1", name: "iPhone 15 Pro Max", price: 13500, oldPrice: 14200, inStock: true,
    category: "Mobile Phones", brand: "Apple", state: "New", img: "/products/iphone-15.png", isAccessory: false,
    description: "Forged in aerospace-grade titanium, featuring the A17 Pro chip and the most powerful camera system ever on an iPhone."
  },
  { 
    id: "2", name: "Samsung Galaxy S24 Ultra", price: 12800, inStock: true,
    category: "Mobile Phones", brand: "Samsung", state: "New", img: "/products/s24-ultra.png", isAccessory: false,
    description: "Meet the Galaxy S24 Ultra, the ultimate form of Galaxy Ultra with a new titanium exterior and a 6.8\" flat display."
  },
  { 
    id: "3", name: "iPhone 14 Pro", price: 9500, oldPrice: 10500, inStock: false,
    category: "Mobile Phones", brand: "Apple", state: "Used", img: "/products/iphone-15.png", isAccessory: false,
    description: "A magical new way to interact with iPhone. Groundbreaking safety features designed to save lives. And an innovative 48MP camera for mind-blowing detail."
  },
  { 
    id: "6", name: "iPhone 13", price: 5800, oldPrice: 6500, inStock: true,
    category: "Mobile Phones", brand: "Apple", state: "Used", img: "/products/iphone-15.png", isAccessory: false 
  },
  { 
    id: "8", name: "Samsung Galaxy A54", price: 3800, inStock: true,
    category: "Mobile Phones", brand: "Samsung", state: "New", img: "/products/s24-ultra.png", isAccessory: false 
  },
  
  // ---------------- Tablets ----------------
  { 
    id: "5", name: "iPad Pro 11\"", price: 10500, inStock: true,
    category: "Tablets", brand: "Apple", state: "New", img: "/products/keyboard.png", isAccessory: false 
  },

  // ---------------- Essential Accessories ----------------

  // Protection
  { 
    id: "a1", name: "Silicone Case with MagSafe", price: 450, oldPrice: 550, inStock: true,
    category: "Accessories", subCategory: "Protection", 
    brand: "Apple", state: "New", img: "/products/silicone-case.png", isAccessory: true, 
    colors: ["#2B2D36", "#CFE2E8", "#F6D2C8"], compatibility: ["iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15", "iPhone 14 Pro"], material: "Silicone",
    description: "Designed by Apple to complement iPhone 15 Pro Max, the Silicone Case with MagSafe is a delightful way to protect your iPhone."
  },
  { 
    id: "a2", name: "Premium Leather Case", price: 650, inStock: true,
    category: "Accessories", subCategory: "Protection", 
    brand: "Apple", state: "New", img: "/products/leather-case.png", isAccessory: true, 
    colors: ["#795548", "#111111"], compatibility: ["iPhone 15 Pro Max", "Samsung Galaxy S24 Ultra"], material: "Leather" 
  },
  { 
    id: "a3", name: "9H Tempered Glass Privacy", price: 150, oldPrice: 200, inStock: true,
    category: "Accessories", subCategory: "Protection", 
    brand: "Belkin", state: "New", img: "/products/tempered-glass.png", isAccessory: true, 
    compatibility: ["iPhone 15 Pro Max", "iPhone 15 Pro", "Samsung Galaxy S24 Ultra", "iPhone 14 Pro", "iPhone 13"], material: "Glass" 
  },

  // Energy
  { 
    id: "a4", name: "20W USB-C Power Adapter", price: 250, inStock: true,
    category: "Accessories", subCategory: "Energy", 
    brand: "Apple", state: "New", img: "/products/charger.png", isAccessory: true, 
    compatibility: ["iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 14 Pro", "iPhone 13", "iPad Pro 11\""]
  },
  { 
    id: "a5", name: "MagSafe Battery Pack", price: 950, inStock: false,
    category: "Accessories", subCategory: "Energy", 
    brand: "Apple", state: "New", img: "/products/magsafe-battery.png", isAccessory: true, 
    compatibility: ["iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 14 Pro", "iPhone 13"]
  },

  // Audio
  { 
    id: "a6", name: "AirPods Pro (2nd Gen)", price: 2500, oldPrice: 2800, inStock: true,
    category: "Accessories", subCategory: "Audio", 
    brand: "Apple", state: "New", img: "/products/airpods-pro.png", isAccessory: true, 
    compatibility: ["iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 14 Pro", "iPhone 13", "iPad Pro 11\""]
  },

  // Connectivity
  { 
    id: "a7", name: "USB-C to USB-C Braided Cable", price: 200, inStock: true,
    category: "Accessories", subCategory: "Connectivity", 
    brand: "Anker", state: "New", img: "/products/charger.png", isAccessory: true, 
    compatibility: ["iPhone 15 Pro Max", "iPhone 15 Pro", "Samsung Galaxy S24 Ultra", "iPad Pro 11\""]
  },

  // iPad Specific
  { 
    id: "a8", name: "Apple Pencil (2nd Gen)", price: 1400, inStock: true,
    category: "Accessories", subCategory: "Input", 
    brand: "Apple", state: "New", img: "/products/pencil.png", isAccessory: true, 
    compatibility: ["iPad Pro 11\""]
  },
  { 
    id: "a9", name: "Magic Keyboard", price: 3500, inStock: true,
    category: "Accessories", subCategory: "Input", 
    brand: "Apple", state: "New", img: "/products/keyboard.png", isAccessory: true, 
    colors: ["#FFFFFF", "#111111"], compatibility: ["iPad Pro 11\""]
  }
];
