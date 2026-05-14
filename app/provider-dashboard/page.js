"use client";
import { useState } from "react";
import AppShell from "@/components/AppShell";
import StatCard from "@/components/StatCard";
import { Briefcase, DollarSign, Star, Clock, Upload, FileCheck, Camera, Shield, BadgeCheck } from "lucide-react";

export default function ProviderDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const docs = [
    { name: "CNIC (Front)", status: "verified", date: "Uploaded Jan 12" },
    { name: "CNIC (Back)", status: "verified", date: "Uploaded Jan 12" },
    { name: "Skill Certificate", status: "pending", date: "Uploaded May 10" },
    { name: "Police Clearance", status: "not-uploaded", date: "" },
  ];

  return (
    <AppShell>
      <div className="page-container">
        {/* Provider Header */}
        <div className="card fade-in" style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <div className="avatar avatar-lg" style={{ background: "var(--primary-bg)", color: "var(--primary)" }}>AR</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <h1 style={{ fontSize: "1.4rem", margin: 0 }}>Ahmed Raza</h1>
              <BadgeCheck size={22} color="var(--primary)" fill="var(--primary-bg)" />
            </div>
            <p style={{ margin: "4px 0 0", fontSize: "0.85rem" }}>Plumber · Gulberg III, Lahore</p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 24, borderBottom: "1px solid var(--border-light)", paddingBottom: 0 }}>
          {["overview", "documents", "earnings"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{
                padding: "10px 20px", border: "none", background: "none", cursor: "pointer",
                fontSize: "0.85rem", fontWeight: activeTab === tab ? 600 : 400, fontFamily: "inherit",
                color: activeTab === tab ? "var(--primary)" : "var(--text-muted)",
                borderBottom: activeTab === tab ? "2px solid var(--primary)" : "2px solid transparent",
                textTransform: "capitalize", transition: "all var(--transition)",
              }}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="fade-in">
            <div className="grid-stats" style={{ marginBottom: 28 }}>
              <StatCard icon={Briefcase} label="Total Jobs" value="312" trend={12} color="#2D6A4F" />
              <StatCard icon={Star} label="Rating" value="4.8" trend={3} color="#E9C46A" />
              <StatCard icon={DollarSign} label="This Month" value="PKR 85K" trend={8} color="#40916C" />
              <StatCard icon={Clock} label="Avg Response" value="15 min" trend={-5} color="#00BCD4" />
            </div>

            <h3 style={{ fontSize: "1rem", marginBottom: 14 }}>Recent Bookings</h3>
            <div className="grid-providers">
              {[
                { client: "Saad Ahmed", service: "Leak Repair", status: "completed", amount: "PKR 2,500" },
                { client: "Fatima Khan", service: "Pipe Installation", status: "in-progress", amount: "PKR 4,000" },
                { client: "Omar Riaz", service: "Tap Replacement", status: "upcoming", amount: "PKR 1,200" },
                { client: "Hira Malik", service: "Bathroom Fitting", status: "completed", amount: "PKR 6,500" },
              ].map((b, i) => (
                <div key={i} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h4 style={{ fontSize: "0.85rem", margin: 0 }}>{b.client}</h4>
                    <small>{b.service}</small>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--primary)" }}>{b.amount}</span>
                    <br />
                    <span className={`badge ${b.status === "completed" ? "badge-success" : b.status === "in-progress" ? "badge-warning" : "badge-neutral"}`} style={{ fontSize: "0.55rem" }}>
                      {b.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "documents" && (
          <div className="fade-in">
            <div style={{
              padding: "20px 24px", background: "var(--primary-bg)", borderRadius: "var(--radius-md)",
              marginBottom: 24, display: "flex", alignItems: "center", gap: 14, border: "1px solid #B7E4C7",
            }}>
              <Shield size={28} color="var(--primary)" />
              <div>
                <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--primary)", margin: 0 }}>Documents Vault</p>
                <small style={{ color: "var(--primary-lighter)", fontSize: "0.75rem" }}>Upload your documents for verification. Verified providers get more bookings.</small>
              </div>
            </div>

            <div className="grid-providers">
              {docs.map((doc, i) => (
                <div key={i} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", animation: `fadeIn 0.3s ease ${i * 0.08}s both` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <FileCheck size={20} color={doc.status === "verified" ? "var(--success)" : doc.status === "pending" ? "var(--warning)" : "var(--text-muted)"} />
                    <div>
                      <h4 style={{ fontSize: "0.85rem", margin: 0 }}>{doc.name}</h4>
                      <small>{doc.date || "Not yet uploaded"}</small>
                    </div>
                  </div>
                  {doc.status === "verified" ? (
                    <span className="badge badge-success">Verified</span>
                  ) : doc.status === "pending" ? (
                    <span className="badge badge-warning">Pending</span>
                  ) : (
                    <button className="btn btn-secondary btn-sm"><Upload size={13} /> Upload</button>
                  )}
                </div>
              ))}
            </div>

            <button className="btn btn-outline" style={{ marginTop: 20 }}>
              <Camera size={16} /> Upload New Document
            </button>
          </div>
        )}

        {activeTab === "earnings" && (
          <div className="fade-in">
            <div className="content-row">
              <div>
                <div className="card" style={{ textAlign: "center", padding: 32, marginBottom: 24 }}>
                  <small style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Total Earnings (May)</small>
                  <h1 style={{ fontSize: "2.5rem", color: "var(--primary)", margin: "10px 0" }}>PKR 85,400</h1>
                  <small style={{ color: "var(--success)", fontSize: "0.85rem" }}>↑ 12% from last month</small>
                </div>
              </div>
              <div>
                <div className="card">
                  <h4 style={{ fontSize: "0.9rem", marginBottom: 14 }}>Breakdown</h4>
                  {[
                    { label: "Completed Jobs (18)", amount: "PKR 78,400" },
                    { label: "Tips Received", amount: "PKR 5,000" },
                    { label: "Bonuses", amount: "PKR 2,000" },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--border-light)" }}>
                      <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{item.label}</span>
                      <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>{item.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
