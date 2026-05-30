import type { Metadata } from "next";
import { Inter, Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ElectroMax — ศูนย์รวมอุปกรณ์ไฟฟ้าครบวงจร",
  description:
    "จำหน่ายอุปกรณ์ไฟฟ้าคุณภาพสูงครบวงจร สายไฟ สวิตช์ แผงไฟฟ้า LED และอุปกรณ์ช่าง ราคาย่อมเยา ส่งไว ทั่วประเทศ",
  keywords: [
    "อุปกรณ์ไฟฟ้า",
    "สายไฟ",
    "สวิตช์",
    "แผงไฟฟ้า",
    "LED",
    "ไฟฟ้า",
    "ElectroMax",
  ],
  openGraph: {
    title: "ElectroMax — ศูนย์รวมอุปกรณ์ไฟฟ้าครบวงจร",
    description:
      "จำหน่ายอุปกรณ์ไฟฟ้าคุณภาพสูงครบวงจร ราคาย่อมเยา ส่งไวทั่วประเทศ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${inter.variable} ${outfit.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background overflow-x-hidden w-full relative">
        <div className="flex-1 w-full overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
