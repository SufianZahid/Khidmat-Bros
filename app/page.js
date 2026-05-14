"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import ServiceGrid from "@/components/ServiceGrid";
import ProviderCard from "@/components/ProviderCard";
import { serviceCategories, providers, bookings } from "@/services/mockData";
import { ArrowRight, Clock, Sparkles, TrendingUp } from "lucide-react";

export default function HomePage() {
  const [greeting, setGreeting] = useState("Good Morning");

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? "Good Morning" : h < 17 ? "Good Afternoon" : "Good Evening");
  }, []);

  const activeBooking = bookings.find(b => b.status === "in-progress");
  const topProviders = providers.filter(p => p.verified && p.available).slice(0, 4);

  return (
    <AppShell>
      <div className="page-container">
        {/* Page Header */}
        <div className="page-header fade-in">
          <small style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{greeting} 👋</small>
          <h1 style={{ marginTop: 4 }}>What service do you need today?</h1>
        </div>

        {/* Active Booking Banner */}
        {activeBooking && (
          <Link href="/tracking" style={{ textDecoration: "none" }}>
            <div className="section fade-in" style={{ animationDelay: "0.08s" }}>
              <div style={{
                background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)",
                borderRadius: "var(--radius-md)", padding: "20px 24px", color: "#fff",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <small style={{ opacity: 0.8, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      Active Booking
                    </small>
                    <h4 style={{ color: "#fff", margin: "6px 0 4px", fontSize: "1.05rem" }}>
                      {activeBooking.service} — {activeBooking.provider.name}
                    </h4>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Clock size={13} style={{ opacity: 0.8 }} />
                      <small style={{ opacity: 0.8, fontSize: "0.75rem" }}>{activeBooking.date}</small>
                    </div>
                  </div>
                  <ArrowRight size={22} style={{ opacity: 0.7 }} />
                </div>
                <div style={{
                  marginTop: 14, height: 4, background: "rgba(255,255,255,0.2)",
                  borderRadius: 2, overflow: "hidden",
                }}>
                  <div style={{
                    height: "100%", width: `${(activeBooking.statusStep / 4) * 100}%`,
                    background: "#fff", borderRadius: 2, transition: "width 0.6s ease",
                  }} />
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Service Categories */}
        <div className="section fade-in" style={{ animationDelay: "0.15s" }}>
          <div className="section-header">
            <h3>All Services</h3>
            <Link href="/search" className="section-link">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <ServiceGrid categories={serviceCategories} />
        </div>

        {/* Top Rated Providers */}
        <div className="section fade-in" style={{ animationDelay: "0.25s" }}>
          <div className="section-header">
            <h3>
              <Sparkles size={18} color="var(--warning)" style={{ marginRight: 8, verticalAlign: "middle" }} />
              Top Rated Providers
            </h3>
            <Link href="/search" className="section-link">
              See All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid-providers">
            {topProviders.map((p, i) => <ProviderCard key={p.id} provider={p} index={i} />)}
          </div>
        </div>

        {/* Stats Banner */}
        <div className="section fade-in" style={{ animationDelay: "0.35s" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14,
          }}>
            {[
              { label: "Service Providers", value: "348+", icon: TrendingUp, color: "var(--primary)" },
              { label: "Completed Jobs", value: "12,400+", icon: Sparkles, color: "var(--warning)" },
              { label: "Areas Covered", value: "24 zones", icon: Clock, color: "var(--accent)" },
            ].map(({ label, value, icon: Icon, color }, i) => (
              <div key={i} className="card" style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "var(--radius-sm)",
                  background: `${color}14`, display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={20} color={color} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.15rem", margin: 0, lineHeight: 1 }}>{value}</h3>
                  <small style={{ fontSize: "0.7rem" }}>{label}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
