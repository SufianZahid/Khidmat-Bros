"use client";
import Link from "next/link";
import { Wrench, Zap, Sparkles, Paintbrush, Wind, Hammer, Bug, Truck, Refrigerator, TreePine, Shield, Scissors } from "lucide-react";

const iconMap = { Wrench, Zap, Sparkles, Paintbrush, Wind, Hammer, Bug, Truck, Refrigerator, TreePine, Shield, Scissors };

export default function ServiceGrid({ categories }) {
  return (
    <div className="grid-services">
      {categories.map((cat, i) => {
        const Icon = iconMap[cat.icon] || Wrench;
        return (
          <Link href={`/search?service=${cat.name}`} key={cat.id}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
              padding: "20px 12px", borderRadius: "var(--radius-md)", background: "var(--surface)",
              border: "1px solid var(--border-light)", textDecoration: "none",
              transition: "all var(--transition)", animation: `fadeIn 0.3s ease ${i * 0.04}s both`,
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.borderColor = `${cat.color}44`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--border-light)"; }}
          >
            <div style={{
              width: 48, height: 48, borderRadius: "var(--radius-sm)",
              background: `${cat.color}14`, display: "flex", alignItems: "center",
              justifyContent: "center",
            }}>
              <Icon size={24} color={cat.color} strokeWidth={1.5} />
            </div>
            <span style={{
              fontSize: "0.8rem", fontWeight: 500, color: "var(--text-primary)",
              textAlign: "center", lineHeight: 1.2,
            }}>{cat.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
