"use client";

export default function StatCard({ icon: Icon, label, value, trend, color = "var(--primary)" }) {
  return (
    <div className="card" style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
      <div style={{
        width: 44, height: 44, borderRadius: "var(--radius-sm)",
        background: `${color}14`, display: "flex", alignItems: "center",
        justifyContent: "center", flexShrink: 0,
      }}>
        <Icon size={22} color={color} strokeWidth={1.5} />
      </div>
      <div>
        <small style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          {label}
        </small>
        <h3 style={{ fontSize: "1.25rem", margin: "2px 0 0", lineHeight: 1 }}>{value}</h3>
        {trend && (
          <small style={{ color: trend > 0 ? "var(--success)" : "var(--error)", fontSize: "0.7rem" }}>
            {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}% this month
          </small>
        )}
      </div>
    </div>
  );
}
