export type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  badges: string[];
  tag: string;
  tagColor: string;
  category: string;
  inStock: boolean;
};

export const products: Product[] = [
  {
    id: 1,
    name: "แผงเบรกเกอร์ 3 เฟส 100A",
    brand: "Schneider Electric",
    price: 4850,
    originalPrice: 6200,
    rating: 4.9,
    reviews: 312,
    image: "/product-switchboard.png",
    badges: ["hot", "sale"],
    tag: "ขายดี",
    tagColor: "from-rose-500 to-orange-500",
    category: "แผงไฟฟ้า",
    inStock: true,
  },
  {
    id: 2,
    name: "หลอด LED Panel 24W ทรงสี่เหลี่ยม",
    brand: "Philips",
    price: 890,
    originalPrice: 1200,
    rating: 4.8,
    reviews: 527,
    image: "/product-led.png",
    badges: ["new", "sale"],
    tag: "ใหม่",
    tagColor: "from-sky-500 to-blue-600",
    category: "หลอดไฟ & LED",
    inStock: true,
  },
  {
    id: 3,
    name: "สายไฟ THW 2.5 sq.mm. (100 เมตร)",
    brand: "Thai Union Cable",
    price: 1250,
    originalPrice: 1580,
    rating: 4.7,
    reviews: 893,
    image: "/product-cable.png",
    badges: ["hot"],
    tag: "ขายดี",
    tagColor: "from-rose-500 to-orange-500",
    category: "สายไฟ",
    inStock: true,
  },
  {
    id: 4,
    name: "สวิตช์ & เต้ารับ พรีเมียม (ชุด 5 ชิ้น)",
    brand: "Panasonic",
    price: 680,
    originalPrice: 950,
    rating: 4.9,
    reviews: 741,
    image: "/product-switch.png",
    badges: ["sale"],
    tag: "ลดราคา",
    tagColor: "from-amber-400 to-orange-500",
    category: "สวิตช์",
    inStock: true,
  },
  {
    id: 5,
    name: "เบรกเกอร์ ELCB 2P 30mA 40A",
    brand: "ABB",
    price: 1890,
    originalPrice: 2400,
    rating: 4.9,
    reviews: 389,
    image: "/product-breaker.png",
    badges: ["hot", "sale"],
    tag: "ขายดี",
    tagColor: "from-rose-500 to-orange-500",
    category: "แผงไฟฟ้า",
    inStock: true,
  },
  {
    id: 6,
    name: "สายเคเบิล NYY 4x10 sq.mm.",
    brand: "Phelps Dodge",
    price: 3650,
    originalPrice: 4200,
    rating: 4.8,
    reviews: 178,
    image: "/product-cable.png",
    badges: ["new"],
    tag: "ใหม่",
    tagColor: "from-sky-500 to-blue-600",
    category: "สายไฟ",
    inStock: true,
  },
  {
    id: 7,
    name: "แผงโซล่าเซลล์ Monocrystalline 550W",
    brand: "Jinko Solar",
    price: 4200,
    originalPrice: 5500,
    rating: 5.0,
    reviews: 142,
    image: "/product-led.png", // fallback image
    badges: ["hot", "sale"],
    tag: "ประหยัดไฟ",
    tagColor: "from-emerald-400 to-green-500",
    category: "แผงโซล่าเซลล์",
    inStock: true,
  },
  {
    id: 8,
    name: "อินเวอร์เตอร์ ออนกริด 5kW",
    brand: "Huawei",
    price: 22500,
    originalPrice: 28000,
    rating: 4.9,
    reviews: 86,
    image: "/product-switchboard.png", // fallback image
    badges: ["new"],
    tag: "รุ่นใหม่",
    tagColor: "from-sky-500 to-blue-600",
    category: "แผงโซล่าเซลล์",
    inStock: true,
  },
];
