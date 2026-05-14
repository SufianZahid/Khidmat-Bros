"use client";
import { CheckCircle, Search, Navigation, Wrench, Star } from "lucide-react";

const iconMap = { CheckCircle, Search, Navigation, Wrench, Star };

export default function StatusTracker({ steps, currentStep }) {
  return (
    <div style={{ padding: "8px 0" }}>
      {steps.map((step, i) => {
        const Icon = iconMap[step.icon] || CheckCircle;
        const done = i <= currentStep;
        const active = i === currentStep;
        return (
          <div key={i} style={{ display: "flex", gap: 14, position: "relative" }}>
            {i < steps.length - 1 && (
              <div style={{
                position: "absolute", left: 17, top: 36, width: 2, height: "calc(100% - 20px)",
                background: done && !active ? "var(--primary)" : "var(--border-light)",
                transition: "background 0.4s ease",
              }} />
            )}
            <div style={{
              width: 36, height: 36, borderRadius: "50%", display: "flex",
              alignItems: "center", justifyContent: "center", flexShrink: 0,
              background: done ? "var(--primary)" : "var(--surface-hover)",
              border: active ? "2px solid var(--primary)" : done ? "none" : "2px solid var(--border)",
              transition: "all 0.3s ease",
              ...(active && { boxShadow: "0 0 0 4px var(--primary-bg)" }),
            }}>
              <Icon size={16} color={done ? "#fff" : "var(--text-muted)"} />
            </div>
            <div style={{ paddingBottom: 24, flex: 1 }}>
              <p style={{
                fontSize: "0.85rem", fontWeight: active ? 600 : 400, margin: 0,
                color: done ? "var(--text-primary)" : "var(--text-muted)",
              }}>{step.label}</p>
              {active && (
                <small style={{
                  color: "var(--primary-lighter)", fontSize: "0.7rem",
                  animation: "pulse 2s infinite",
                }}>In progress...</small>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
