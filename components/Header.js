"use client";
import Link from "next/link";
import { MapPin, Bell, Search } from "lucide-react";

export default function Header({ location = "Gulberg III, Lahore" }) {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50, background: "var(--surface)",
      borderBottom: "1px solid var(--border-light)", padding: "12px 20px",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 40, height: 40, borderRadius: "var(--radius-sm)",
            background: "var(--primary)", display: "flex", alignItems: "center",
            justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "0.9rem",
          }}>KB</div>
          <div>
            <h4 style={{ fontSize: "0.95rem", margin: 0, lineHeight: 1.2 }}>Khidmaat Bros</h4>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
              <MapPin size={12} color="var(--primary-lighter)" />
              <small style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{location}</small>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          <Link href="/search" className="btn-ghost" style={{ padding: 8, borderRadius: "50%", display: "flex" }}>
            <Search size={20} color="var(--text-secondary)" />
          </Link>
          <button className="btn-ghost" style={{ padding: 8, borderRadius: "50%", position: "relative" }}>
            <Bell size={20} color="var(--text-secondary)" />
            <span style={{
              position: "absolute", top: 6, right: 6, width: 8, height: 8,
              borderRadius: "50%", background: "var(--error)", border: "2px solid var(--surface)",
            }} />
          </button>
        </div>
      </div>
    </header>
  );
}
