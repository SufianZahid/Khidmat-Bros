"use client";
import { use } from "react";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import { providers } from "@/services/mockData";
import { BadgeCheck, Star, MapPin, Clock, Phone, Briefcase, Calendar, MessageCircle } from "lucide-react";

export default function ProviderProfilePage({ params }) {
  const { id } = use(params);
  const provider = providers.find(p => p.id === parseInt(id)) || providers[0];

  return (
    <AppShell>
      <div className="page-container">
        <div className="content-row">
          {/* Left Column — Main Info */}
          <div>
            {/* Profile Card */}
            <div className="card fade-in" style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 20 }}>
                <div className="avatar avatar-xl" style={{ background: "var(--primary-bg)", color: "var(--primary)" }}>
                  {provider.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <h1 style={{ fontSize: "1.5rem", margin: 0 }}>{provider.name}</h1>
                    {provider.verified && <BadgeCheck size={22} color="var(--primary)" fill="var(--primary-bg)" />}
                  </div>
                  <span className="badge badge-neutral" style={{ marginBottom: 8, display: "inline-flex" }}>{provider.service}</span>
                  <p style={{ fontSize: "0.85rem", margin: 0, lineHeight: 1.6 }}>{provider.bio}</p>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, padding: "16px 0", borderTop: "1px solid var(--border-light)" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                    <Star size={18} fill="var(--warning)" color="var(--warning)" />
                    <strong style={{ fontSize: "1.25rem" }}>{provider.rating}</strong>
                  </div>
                  <small>{provider.reviews} reviews</small>
                </div>
                <div style={{ textAlign: "center", borderLeft: "1px solid var(--border-light)", borderRight: "1px solid var(--border-light)" }}>
                  <strong style={{ fontSize: "1.25rem" }}>{provider.completedJobs}</strong>
                  <br /><small>Jobs completed</small>
                </div>
                <div style={{ textAlign: "center" }}>
                  <strong style={{ fontSize: "1.25rem" }}>{provider.onTimeRate}%</strong>
                  <br /><small>On-time rate</small>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="card fade-in" style={{ marginBottom: 20, animationDelay: "0.1s" }}>
              <h3 style={{ fontSize: "1rem", marginBottom: 14 }}>Details</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { icon: MapPin, label: "Location", value: provider.area },
                  { icon: Briefcase, label: "Experience", value: provider.experience },
                  { icon: Clock, label: "Response Time", value: provider.responseTime },
                  { icon: Phone, label: "Contact", value: provider.phone },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0" }}>
                    <Icon size={16} color="var(--text-muted)" />
                    <div>
                      <small style={{ display: "block", fontSize: "0.7rem", color: "var(--text-muted)" }}>{label}</small>
                      <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="card fade-in" style={{ marginBottom: 20, animationDelay: "0.15s" }}>
              <h3 style={{ fontSize: "1rem", marginBottom: 14 }}>Skills & Services</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {provider.skills.map(s => (
                  <span key={s} className="badge badge-success">{s}</span>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="card fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="section-header" style={{ marginBottom: 14 }}>
                <h3 style={{ fontSize: "1rem" }}>Recent Reviews</h3>
                <span className="section-link" style={{ cursor: "pointer" }}>See All</span>
              </div>
              {[
                { name: "Saad A.", text: "Excellent work! Very professional and on time. Fixed the issue quickly.", rating: 5, date: "2 days ago" },
                { name: "Fatima K.", text: "Good service, fair pricing. Would recommend to friends and family.", rating: 4, date: "1 week ago" },
                { name: "Omar R.", text: "Quick response and very thorough. Will book again for sure.", rating: 5, date: "2 weeks ago" },
              ].map((r, i) => (
                <div key={i} style={{ padding: "14px 0", borderTop: i > 0 ? "1px solid var(--border-light)" : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>{r.name}</span>
                    <div style={{ display: "flex", gap: 2 }}>
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={14} fill={j < r.rating ? "var(--warning)" : "none"} color={j < r.rating ? "var(--warning)" : "var(--border)"} />
                      ))}
                    </div>
                  </div>
                  <p style={{ fontSize: "0.8rem", margin: "0 0 4px", color: "var(--text-secondary)" }}>{r.text}</p>
                  <small>{r.date}</small>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column — Booking Sidebar */}
          <div>
            <div className="card fade-in" style={{ position: "sticky", top: "calc(var(--header-height) + 28px)", animationDelay: "0.1s" }}>
              <h3 style={{ fontSize: "1rem", marginBottom: 16 }}>Book this Provider</h3>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderTop: "1px solid var(--border-light)" }}>
                <span style={{ fontSize: "0.9rem" }}>Starting from</span>
                <span style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--primary)" }}>{provider.price}</span>
              </div>
              <small style={{ color: "var(--text-muted)", fontSize: "0.75rem", display: "block", marginBottom: 20 }}>
                Final price may vary based on the scope of work.
              </small>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Link href={`/booking?provider=${provider.id}`} className="btn btn-primary btn-lg btn-block" style={{ textDecoration: "none" }}>
                  <Calendar size={18} /> Book Now
                </Link>
                <Link href="/chat" className="btn btn-outline btn-block" style={{ textDecoration: "none" }}>
                  <MessageCircle size={18} /> Send Message
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
