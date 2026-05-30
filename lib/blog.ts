export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  date: string;
  category: string;
  author: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: "solar-panel-benefits",
    title: "5 เหตุผลทำไมบ้านยุคใหม่ต้องติดแผงโซล่าเซลล์",
    excerpt: "เรียนรู้ประโยชน์ของการติดตั้งระบบโซล่าเซลล์ที่ช่วยลดค่าไฟและรักษาสิ่งแวดล้อม",
    content: "เนื้อหาบทความแบบเต็มจะอยู่ที่นี่...",
    imageUrl: "/product-led.png", // ใช้รูป Placeholder ไปก่อน
    date: "24 พ.ค. 2026",
    category: "พลังงานสะอาด",
    author: "ElectroMax Team"
  },
  {
    id: "choose-led-light",
    title: "วิธีเลือกหลอดไฟ LED ให้เหมาะกับแต่ละห้องในบ้าน",
    excerpt: "ไขข้อข้องใจแสง Warm White vs Daylight ควรเลือกใช้ที่ไหนดีที่สุด?",
    content: "เนื้อหาบทความแบบเต็มจะอยู่ที่นี่...",
    imageUrl: "/product-led.png", // ใช้รูป Placeholder ไปก่อน
    date: "20 พ.ค. 2026",
    category: "เกร็ดความรู้",
    author: "ElectroMax Team"
  },
  {
    id: "safety-first-breaker",
    title: "รู้จักเบรกเกอร์กันไฟดูด (ELCB) อุปกรณ์สำคัญที่ทุกบ้านต้องมี",
    excerpt: "ทำไมเบรกเกอร์ธรรมดาถึงไม่พอ? มาทำความรู้จักกับเบรกเกอร์กันไฟดูดเพื่อความปลอดภัยของครอบครัว",
    content: "เนื้อหาบทความแบบเต็มจะอยู่ที่นี่...",
    imageUrl: "/product-switchboard.png", // ใช้รูป Placeholder ไปก่อน
    date: "15 พ.ค. 2026",
    category: "ความปลอดภัย",
    author: "ElectroMax Team"
  },
  {
    id: "smart-home-switch",
    title: "อัปเกรดบ้านให้ฉลาดด้วย สวิตช์ไฟอัจฉริยะ (Smart Switch)",
    excerpt: "สั่งงานด้วยเสียงและสมาร์ทโฟนได้ง่ายๆ เพียงแค่เปลี่ยนสวิตช์ไฟที่บ้านของคุณ",
    content: "เนื้อหาบทความแบบเต็มจะอยู่ที่นี่...",
    imageUrl: "/product-switch.png", // ใช้รูป Placeholder ไปก่อน
    date: "10 พ.ค. 2026",
    category: "สมาร์ทโฮม",
    author: "ElectroMax Team"
  }
];
