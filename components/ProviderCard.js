"use client";
import Link from "next/link";
import { Star, Clock, MapPin, BadgeCheck } from "lucide-react";

export default function ProviderCard({ provider, index = 0 }) {
  return (
    <Link href={`/provider/${provider.id}`} style={{ textDecoration: "none" }}>
      <div className="card card-interactive" style={{
        display: "flex", gap: 16, animation: `slideUp 0.4s ease ${index * 0.06}s both`,
      }}>
        <div className="avatar" style={{ background: "var(--primary-bg)", color: "var(--primary)" }}>
          {provider.avatar}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <h4 style={{ fontSize: "0.9rem", margin: 0 }}>{provider.name}</h4>
            {provider.verified && <BadgeCheck size={16} color="var(--primary)" fill="var(--primary-bg)" />}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span className="badge badge-neutral" style={{ padding: "2px 8px" }}>{provider.service}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: "0.8rem", color: "var(--warning)" }}>
              <Star size={14} fill="var(--warning)" /> {provider.rating}
              <span style={{ color: "var(--text-muted)" }}>({provider.reviews})</span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: "0.8rem", color: "var(--text-muted)" }}>
              <MapPin size={13} /> {provider.area}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: "0.8rem", color: "var(--text-muted)" }}>
              <Clock size={13} /> {provider.responseTime}
            </span>
          </div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--primary)" }}>{provider.price}</div>
          <small style={{ color: "var(--text-muted)" }}>starting</small>
          <div style={{ marginTop: 8 }}>
            {provider.available ? (
              <span className="badge badge-success" style={{ fontSize: "0.6rem" }}>Available</span>
            ) : (
              <span className="badge badge-neutral" style={{ fontSize: "0.6rem" }}>Busy</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
