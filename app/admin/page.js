"use client";
import { useState } from "react";
import AppShell from "@/components/AppShell";
import StatCard from "@/components/StatCard";
import { adminStats } from "@/services/mockData";
import {
  Users, UserCheck, CalendarDays, DollarSign, Clock, AlertTriangle,
  Star, CheckCircle, XCircle, Eye, Shield, BarChart3
} from "lucide-react";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const pendingProviders = [
    { name: "Hamza Ali", service: "Electrician", area: "Johar Town", date: "May 12", docs: 3 },
    { name: "Zain Ul Abideen", service: "Plumber", area: "Wapda Town", date: "May 11", docs: 2 },
    { name: "Raheel Khan", service: "Carpenter", area: "Cantt", date: "May 10", docs: 4 },
    { name: "Asad Mehmood", service: "AC Repair", area: "Model Town", date: "May 9", docs: 3 },
  ];

  const disputes = [
    { id: "D-401", user: "Ali S.", provider: "Usman T.", issue: "Late arrival — provider was 45 min late", status: "open", date: "May 13" },
    { id: "D-399", user: "Hira M.", provider: "Kamran A.", issue: "Incomplete work — kitchen cabinet not finished", status: "investigating", date: "May 11" },
    { id: "D-395", user: "Saad R.", provider: "Farhan S.", issue: "Overcharging — billed PKR 3,000 extra", status: "open", date: "May 9" },
  ];

  return (
    <AppShell>
      <div className="page-container" style={{ maxWidth: 1100 }}>
        {/* Admin Header */}
        <div className="fade-in" style={{
          display: "flex", alignItems: "center", gap: 16, marginBottom: 28,
          padding: "20px 24px", background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)",
          borderRadius: "var(--radius-md)", color: "#fff",
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Shield size={24} color="#fff" />
          </div>
          <div>
            <h1 style={{ fontSize: "1.4rem", color: "#fff", margin: 0 }}>Admin Dashboard</h1>
            <p style={{ color: "rgba(255,255,255,0.7)", margin: "2px 0 0", fontSize: "0.85rem" }}>Khidmaat Bros Control Panel</p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 24, borderBottom: "1px solid var(--border-light)" }}>
          {["overview", "approvals", "disputes"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{
                padding: "10px 20px", border: "none", background: "none", cursor: "pointer",
                fontSize: "0.85rem", fontWeight: activeTab === tab ? 600 : 400, fontFamily: "inherit",
                color: activeTab === tab ? "var(--primary)" : "var(--text-muted)",
                borderBottom: activeTab === tab ? "2px solid var(--primary)" : "2px solid transparent",
                textTransform: "capitalize", transition: "all var(--transition)",
              }}>
              {tab}
              {tab === "approvals" && (
                <span style={{ marginLeft: 6, background: "var(--error)", color: "#fff", padding: "1px 7px", borderRadius: 10, fontSize: "0.6rem", fontWeight: 700 }}>
                  {adminStats.pendingApprovals}
                </span>
              )}
              {tab === "disputes" && (
                <span style={{ marginLeft: 6, background: "var(--warning)", color: "#fff", padding: "1px 7px", borderRadius: 10, fontSize: "0.6rem", fontWeight: 700 }}>
                  {adminStats.openDisputes}
                </span>
              )}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="fade-in">
            <div className="grid-stats" style={{ marginBottom: 28 }}>
              <StatCard icon={Users} label="Total Users" value={adminStats.totalUsers.toLocaleString()} trend={15} color="#2D6A4F" />
              <StatCard icon={UserCheck} label="Providers" value={adminStats.totalProviders.toString()} trend={8} color="#40916C" />
              <StatCard icon={CalendarDays} label="Active Bookings" value={adminStats.activeBookings.toString()} trend={22} color="#00BCD4" />
              <StatCard icon={DollarSign} label="Revenue" value={adminStats.monthlyRevenue} trend={18} color="#E9C46A" />
            </div>

            <div className="content-row">
              <div>
                <div className="card" style={{ marginBottom: 20 }}>
                  <h3 style={{ fontSize: "1rem", marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
                    <BarChart3 size={18} color="var(--primary)" /> Platform Health
                  </h3>
                  {[
                    { label: "Completion Rate", value: `${adminStats.completionRate}%`, width: adminStats.completionRate, color: "var(--success)" },
                    { label: "Avg Provider Rating", value: `${adminStats.avgRating}/5`, width: (adminStats.avgRating / 5) * 100, color: "var(--warning)" },
                    { label: "User Satisfaction", value: "91%", width: 91, color: "var(--primary-lighter)" },
                  ].map((m, i) => (
                    <div key={i} style={{ marginBottom: 18 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <small style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{m.label}</small>
                        <small style={{ fontSize: "0.8rem", fontWeight: 600 }}>{m.value}</small>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${m.width}%`, background: m.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: "0.9rem", marginBottom: 12 }}>Quick Actions</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { icon: Clock, label: "Pending Approvals", count: adminStats.pendingApprovals, tab: "approvals", color: "var(--error)" },
                    { icon: AlertTriangle, label: "Open Disputes", count: adminStats.openDisputes, tab: "disputes", color: "var(--warning)" },
                  ].map(({ icon: Icon, label, count, tab, color }) => (
                    <button key={tab} className="card card-interactive"
                      onClick={() => setActiveTab(tab)}
                      style={{ display: "flex", alignItems: "center", gap: 14, border: "1px solid var(--border-light)", cursor: "pointer", fontFamily: "inherit", textAlign: "left", width: "100%" }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: "var(--radius-sm)", background: `${color}18`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <Icon size={20} color={color} />
                      </div>
                      <div>
                        <strong style={{ fontSize: "1.2rem" }}>{count}</strong>
                        <br /><small style={{ fontSize: "0.7rem" }}>{label}</small>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "approvals" && (
          <div className="fade-in">
            <p style={{ fontSize: "0.85rem", marginBottom: 18 }}>
              <strong>{pendingProviders.length}</strong> providers awaiting verification
            </p>
            <div className="grid-providers">
              {pendingProviders.map((prov, i) => (
                <div key={i} className="card" style={{ animation: `fadeIn 0.3s ease ${i * 0.08}s both` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 14 }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <div className="avatar avatar-sm" style={{ background: "var(--warning-bg)", color: "#F4A261" }}>
                        {prov.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <h4 style={{ fontSize: "0.85rem", margin: 0 }}>{prov.name}</h4>
                        <small>{prov.service} · {prov.area} · {prov.docs} docs</small>
                      </div>
                    </div>
                    <small style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}>{prov.date}</small>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="btn btn-sm btn-outline" style={{ flex: 1 }}><Eye size={14} /> Review</button>
                    <button className="btn btn-sm btn-primary" style={{ flex: 1 }}><CheckCircle size={14} /> Approve</button>
                    <button className="btn btn-sm" style={{ background: "var(--error-bg)", color: "var(--error)", border: "none", padding: "7px 12px", borderRadius: "var(--radius-sm)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <XCircle size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "disputes" && (
          <div className="fade-in">
            <p style={{ fontSize: "0.85rem", marginBottom: 18 }}>
              <strong>{disputes.length}</strong> disputes requiring attention
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {disputes.map((d, i) => (
                <div key={i} className="card" style={{
                  borderLeft: `3px solid ${d.status === "open" ? "var(--error)" : "var(--warning)"}`,
                  animation: `fadeIn 0.3s ease ${i * 0.08}s both`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-primary)" }}>{d.id}</span>
                      <span className={`badge ${d.status === "open" ? "badge-error" : "badge-warning"}`}>{d.status}</span>
                    </div>
                    <small style={{ color: "var(--text-muted)" }}>{d.date}</small>
                  </div>
                  <p style={{ fontSize: "0.85rem", margin: "0 0 6px", fontWeight: 500 }}>{d.issue}</p>
                  <small style={{ color: "var(--text-muted)" }}>{d.user} vs {d.provider}</small>
                  <div style={{ marginTop: 12 }}>
                    <button className="btn btn-sm btn-outline"><Eye size={14} /> View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
