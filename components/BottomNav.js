"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, CalendarDays, MessageCircle, User } from "lucide-react";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/search", icon: Search, label: "Search" },
  { href: "/tracking", icon: CalendarDays, label: "Bookings" },
  { href: "/chat", icon: MessageCircle, label: "Chat" },
  { href: "/provider-dashboard", icon: User, label: "Profile" },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav style={{
      position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
      width: "100%", maxWidth: "var(--max-width)", background: "var(--surface)",
      borderTop: "1px solid var(--border-light)", padding: "8px 0 env(safe-area-inset-bottom, 8px)",
      zIndex: 100, display: "flex", justifyContent: "space-around",
    }}>
      {navItems.map(({ href, icon: Icon, label }) => {
        const active = pathname === href;
        return (
          <Link key={href} href={href} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
            padding: "6px 12px", textDecoration: "none", borderRadius: "var(--radius-sm)",
            transition: "all var(--transition)",
          }}>
            <Icon size={20} color={active ? "var(--primary)" : "var(--text-muted)"}
              strokeWidth={active ? 2.5 : 1.5} />
            <span style={{
              fontSize: "0.6rem", fontWeight: active ? 700 : 500,
              color: active ? "var(--primary)" : "var(--text-muted)",
              letterSpacing: "0.3px",
            }}>{label}</span>
            {active && <span style={{
              width: 4, height: 4, borderRadius: "50%", background: "var(--primary)", marginTop: 1,
            }} />}
          </Link>
        );
      })}
    </nav>
  );
}
