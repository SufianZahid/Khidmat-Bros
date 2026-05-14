"use client";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import StatusTracker from "@/components/StatusTracker";
import { bookings, statusSteps } from "@/services/mockData";
import { MessageCircle, Phone, MapPin, Clock } from "lucide-react";

export default function TrackingPage() {
  const active = bookings.find(b => b.status === "in-progress") || bookings[0];
  const past = bookings.filter(b => b.status !== "in-progress");

  return (
    <AppShell>
      <div className="page-container">
        <div className="page-header fade-in">
          <h1>My Bookings</h1>
          <p>Track your active and past service bookings</p>
        </div>

        <div className="content-row">
          {/* Active Booking */}
          <div>
            {active && (
              <div className="section fade-in" style={{ animationDelay: "0.05s" }}>
                <small style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 12, display: "block", fontWeight: 600 }}>
                  Active Booking
                </small>
                <div className="card" style={{ borderLeft: "3px solid var(--primary)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 16 }}>
                    <div>
                      <span className="badge badge-success" style={{ marginBottom: 8 }}>In Progress</span>
                      <h3 style={{ fontSize: "1.1rem", margin: "4px 0 2px" }}>{active.service}</h3>
                      <p style={{ fontSize: "0.85rem", margin: 0 }}>{active.provider.name}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <small style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>{active.id}</small>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
                        <Clock size={13} color="var(--text-muted)" />
                        <small>{active.date}</small>
                      </div>
                    </div>
                  </div>

                  <div className="divider" />
                  <StatusTracker steps={statusSteps} currentStep={active.statusStep} />
                  <div className="divider" />

                  <div style={{ display: "flex", gap: 10 }}>
                    <Link href="/chat" className="btn btn-outline btn-sm" style={{ flex: 1, textDecoration: "none" }}>
                      <MessageCircle size={15} /> Chat
                    </Link>
                    <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                      <Phone size={15} /> Call
                    </button>
                    <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                      <MapPin size={15} /> Map
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Past Bookings Sidebar */}
          <div>
            <small style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 12, display: "block", fontWeight: 600 }}>
              Other Bookings
            </small>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {past.map((b, i) => (
                <div key={b.id} className="card" style={{ animation: `fadeIn 0.3s ease ${i * 0.1}s both` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <div className="avatar avatar-sm" style={{ background: "var(--primary-bg)", color: "var(--primary)" }}>
                        {b.provider.avatar}
                      </div>
                      <div>
                        <h4 style={{ fontSize: "0.85rem", margin: 0 }}>{b.service}</h4>
                        <small>{b.provider.name} · {b.date}</small>
                      </div>
                    </div>
                    <span className={`badge ${b.status === "completed" ? "badge-success" : "badge-warning"}`}>
                      {b.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
