/**
 * icon.tsx — Centralized Icon & Contact Channel Config
 *
 * ✅ ใช้ไฟล์นี้เป็น single source of truth สำหรับ:
 *   1. Re-export ไอคอน Tabler ทั้งหมด
 *   2. Config ข้อมูลช่องทางการติดต่อ (แก้ที่นี่ที่เดียว)
 *   3. Component <TopBarIcons />  → ใช้ใน Navbar top bar
 *   4. Component <SocialIcons />  → ใช้ใน Footer
 */

import {
    IconPhone,
    IconBrandLine,
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandYoutube,
} from "@tabler/icons-react";

// ─────────────────────────────────────────────────────────────
// 1. Re-export ไอคอนทั้งหมดที่ใช้ในโปรเจค
//    Import จากไฟล์นี้แทน @tabler/icons-react โดยตรง
// ─────────────────────────────────────────────────────────────
export {
    // Navigation
    IconArrowRight,
    IconChevronDown,
    IconChevronLeft,
    IconChevronRight,
    IconMenu2,
    IconSearch,
    IconX,

    // Electrical
    IconBolt,
    IconBulb,
    IconPlug,
    IconPlugConnected,
    IconSettings,
    IconShieldBolt,
    IconTool,

    // Commerce
    IconShoppingCart,
    IconHeart,
    IconEye,
    IconCreditCard,
    IconPackage,

    // Contact
    IconHeadset,
    IconMail,
    IconMapPin,
    IconPhone,

    // Brand / Social
    IconBrandFacebook,
    IconBrandLine,
    IconBrandInstagram,
    IconBrandYoutube,

    // Rating / Trust
    IconStar,
    IconStarFilled,
    IconMedal,
    IconShieldCheck,

    // Misc
    IconBuildingStore,
    IconCheck,
    IconClock,
    IconQuote,
    IconTruck,
    IconUsers,
} from "@tabler/icons-react";

// ─────────────────────────────────────────────────────────────
// 2. ✏️ CONFIG ช่องทางการติดต่อ — แก้ที่นี่ที่เดียวพอ!
//    ใช้ร่วมกันทั้ง TopBarIcons, FloatingContact, Footer
// ─────────────────────────────────────────────────────────────
export const CONTACT_INFO = {
    phone: "02-XXX-XXXX",
    phoneHref: "tel:02-XXX-XXXX",
    lineHref: "https://line.me/ti/p/~@electromax",
    lineId: "@electromax",
    fbHref: "https://facebook.com/electromax",
    fbName: "ElectroMax Thailand",
    igHref: "https://instagram.com/electromax",
    ytHref: "https://youtube.com/@electromax",
    email: "info@electromax.co.th",
    address: "123 ถ.พระราม 3 แขวงช่องนนทรี เขตยานนาวา กรุงเทพฯ 10120",
    hours: "จันทร์–เสาร์ 8:00–18:00 น.",
} as const;

/** รายการช่องทางที่แสดงเป็นปุ่มกด (ใช้ใน TopBar + FloatingContact) */
export const CHANNEL_LIST = [
    {
        id: "phone",
        Icon: IconPhone,
        label: "โทรหาเรา",
        href: CONTACT_INFO.phoneHref,
        // Top bar styling
        topBarHover: "hover:bg-white/25",
        // Floating contact FAB styling
        fabBg: "bg-sky-500 hover:bg-sky-400",
        fabShadow: "shadow-sky-300/50",
        fabDelay: 0,
    },
    {
        id: "line",
        Icon: IconBrandLine,
        label: "LINE",
        href: CONTACT_INFO.lineHref,
        topBarHover: "hover:bg-green-500/80",
        fabBg: "bg-green-500 hover:bg-green-400",
        fabShadow: "shadow-green-300/50",
        fabDelay: 0.07,
    },
    {
        id: "facebook",
        Icon: IconBrandFacebook,
        label: "Facebook",
        href: CONTACT_INFO.fbHref,
        topBarHover: "hover:bg-blue-500/80",
        fabBg: "bg-blue-600 hover:bg-blue-500",
        fabShadow: "shadow-blue-300/50",
        fabDelay: 0.14,
    },
] as const;

// ─────────────────────────────────────────────────────────────
// 3. <TopBarIcons /> — ไอคอนโซเชียล 3 ปุ่มในแถบด้านบน Navbar
//    ใช้ใน: components/layout/navbar.tsx
// ─────────────────────────────────────────────────────────────
export function TopBarIcons() {
    return (
        <>
            {CHANNEL_LIST.map(({ id, Icon, label, href, topBarHover }) => (
                <a
                    key={id}
                    href={href}
                    target={id === "phone" ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className={`w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center
                      transition-all duration-200 hover:scale-110 ${topBarHover}`}
                >
                    <Icon size={14} stroke={2} />
                </a>
            ))}
        </>
    );
}

// ─────────────────────────────────────────────────────────────
// 4. <SocialIcons /> — ไอคอนโซเชียลสำหรับ Footer (4 ช่องทาง)
//    ใช้ใน: components/layout/footer.tsx
// ─────────────────────────────────────────────────────────────
const FOOTER_SOCIALS = [
    { Icon: IconBrandFacebook, label: "Facebook", href: CONTACT_INFO.fbHref, hover: "hover:text-blue-500 hover:bg-blue-50" },
    { Icon: IconBrandLine, label: "LINE", href: CONTACT_INFO.lineHref, hover: "hover:text-green-500 hover:bg-green-50" },
    { Icon: IconBrandInstagram, label: "Instagram", href: CONTACT_INFO.igHref, hover: "hover:text-rose-500 hover:bg-rose-50" },
    { Icon: IconBrandYoutube, label: "YouTube", href: CONTACT_INFO.ytHref, hover: "hover:text-red-500 hover:bg-red-50" },
];

export function SocialIcons() {
    return (
        <div className="flex gap-2">
            {FOOTER_SOCIALS.map(({ Icon, label, href, hover }) => (
                <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className={`w-9 h-9 rounded-xl bg-slate-800 text-slate-400 flex items-center justify-center transition-all duration-200 ${hover}`}
                >
                    <Icon size={18} />
                </a>
            ))}
        </div>
    );
}

// ─────────────────────────────────────────────────────────────
// 5. <PhoneIcon /> — สำหรับแสดงไอคอนโทรศัพท์พร้อมเบอร์โทร
//    ใช้ใน: components/layout/navbar.tsx
// ─────────────────────────────────────────────────────────────
export function PhoneIcon() {
    return (
        <div className="flex items-center gap-1.5">
            <IconPhone size={12} />
            {CONTACT_INFO.phone}
        </div>
    );
}
