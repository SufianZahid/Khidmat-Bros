"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, Search, CalendarDays, MessageCircle, User, Shield,
  LayoutDashboard, MapPin, Menu, Bell, Sun, Moon
} from "lucide-react";

const mainNav = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/search", icon: Search, label: "Search Services" },
  { href: "/tracking", icon: CalendarDays, label: "My Bookings" },
  { href: "/chat", icon: MessageCircle, label: "Messages" },
];

const accountNav = [
  { href: "/provider-dashboard", icon: LayoutDashboard, label: "Provider Panel" },
  { href: "/admin", icon: Shield, label: "Admin Dashboard", badge: "5" },
];

const mobileNav = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/search", icon: Search, label: "Search" },
  { href: "/tracking", icon: CalendarDays, label: "Bookings" },
  { href: "/chat", icon: MessageCircle, label: "Chat" },
  { href: "/provider-dashboard", icon: User, label: "Profile" },
];

export default function AppShell({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("kb-theme");
    if (stored) {
      setDarkMode(stored === "dark");
      document.documentElement.setAttribute("data-theme", stored);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefersDark);
      document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
    }
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    const theme = next ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("kb-theme", theme);
  };

  // Prevent hydration mismatch flash
  if (!mounted) {
    return (
      <div className="app-layout">
        <div className="main-content" style={{ marginLeft: 0 }}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="app-layout">
      {/* Sidebar Overlay (mobile) */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "visible" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          <div className="sidebar-brand-logo">KB</div>
          <div className="sidebar-brand-text">
            <h3>Khidmaat Bros</h3>
            <small>Service Aggregator · Lahore</small>
          </div>
        </div>

        <nav className="sidebar-nav">
          <span className="sidebar-section-label">Main</span>
          {mainNav.map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href}
              className={`sidebar-link ${pathname === href ? "active" : ""}`}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon size={18} strokeWidth={pathname === href ? 2.2 : 1.5} />
              {label}
            </Link>
          ))}

          <span className="sidebar-section-label" style={{ marginTop: 8 }}>Management</span>
          {accountNav.map(({ href, icon: Icon, label, badge }) => (
            <Link key={href} href={href}
              className={`sidebar-link ${pathname === href ? "active" : ""}`}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon size={18} strokeWidth={pathname === href ? 2.2 : 1.5} />
              {label}
              {badge && <span className="link-badge">{badge}</span>}
            </Link>
          ))}

          <span className="sidebar-section-label" style={{ marginTop: 8 }}>Preferences</span>
          {/* Dark Mode Toggle */}
          <button className="theme-toggle" onClick={toggleTheme}>
            {darkMode ? <Moon size={18} /> : <Sun size={18} />}
            {darkMode ? "Dark Mode" : "Light Mode"}
            <div className={`theme-toggle-track ${darkMode ? "active" : ""}`}>
              <div className="theme-toggle-thumb" />
            </div>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className="avatar avatar-sm">SZ</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: "0.8rem", fontWeight: 600, margin: 0, lineHeight: 1.2 }}>Sufian Zahid</p>
              <small style={{ fontSize: "0.65rem" }}>Gulberg III, Lahore</small>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Bar */}
        <header className="topbar">
          <button className="topbar-menu-btn" onClick={() => setSidebarOpen(true)}>
            <Menu size={22} color="var(--text-primary)" />
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <MapPin size={16} color="var(--primary-lighter)" />
            <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Gulberg III, Lahore</span>
          </div>

          <div className="topbar-actions">
            {/* Topbar theme toggle (icon only) */}
            <button className="btn-ghost btn-icon" onClick={toggleTheme}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
              {darkMode
                ? <Sun size={20} color="var(--warning)" />
                : <Moon size={20} color="var(--text-secondary)" />
              }
            </button>

            <button className="btn-ghost btn-icon" style={{ position: "relative" }}>
              <Bell size={20} color="var(--text-secondary)" />
              <span style={{
                position: "absolute", top: 6, right: 6, width: 8, height: 8,
                borderRadius: "50%", background: "var(--error)", border: "2px solid var(--surface)",
              }} />
            </button>
            <div className="avatar avatar-sm" style={{ cursor: "pointer" }}>SZ</div>
          </div>
        </header>

        {children}
      </div>

      {/* Bottom Nav (mobile) */}
      <nav className="bottom-nav">
        {mobileNav.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} className="bottom-nav-item">
              <Icon size={20} color={active ? "var(--primary)" : "var(--text-muted)"} strokeWidth={active ? 2.5 : 1.5} />
              <span className="bottom-nav-label" style={{
                fontWeight: active ? 700 : 500,
                color: active ? "var(--primary)" : "var(--text-muted)",
              }}>{label}</span>
              {active && <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--primary)" }} />}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
