"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import { providers, timeSlots } from "@/services/mockData";
import { Calendar, Clock, MapPin, CreditCard, CheckCircle, BadgeCheck } from "lucide-react";

function BookingContent() {
  const searchParams = useSearchParams();
  const providerId = parseInt(searchParams.get("provider") || "1");
  const provider = providers.find(p => p.id === providerId) || providers[0];

  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [address, setAddress] = useState("House 42, Street 5, Gulberg III, Lahore");
  const [notes, setNotes] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() + i);
    return {
      day: d.toLocaleDateString("en", { weekday: "short" }),
      date: d.getDate(),
      month: d.toLocaleDateString("en", { month: "short" }),
      full: d.toISOString().split("T")[0],
    };
  });

  if (confirmed) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", padding: 40, textAlign: "center" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--primary-bg)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }} className="fade-in">
          <CheckCircle size={40} color="var(--primary)" />
        </div>
        <h2 className="fade-in" style={{ marginBottom: 8 }}>Booking Confirmed!</h2>
        <p className="fade-in" style={{ animationDelay: "0.1s", marginBottom: 4 }}>
          Your booking with <strong>{provider.name}</strong> has been confirmed.
        </p>
        <p className="fade-in" style={{ animationDelay: "0.15s", fontSize: "0.85rem" }}>
          Booking ID: <strong>KB-{Math.floor(1000 + Math.random() * 9000)}</strong>
        </p>
        <div className="fade-in" style={{ animationDelay: "0.2s", marginTop: 24, display: "flex", gap: 12 }}>
          <Link href="/tracking" className="btn btn-primary btn-lg" style={{ textDecoration: "none" }}>Track Booking</Link>
          <Link href="/" className="btn btn-outline btn-lg" style={{ textDecoration: "none" }}>Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header fade-in">
        <h1>Book Service</h1>
        <p>Step {step} of 2 — {step === 1 ? "Select date & time" : "Confirm details"}</p>
      </div>

      {/* Progress */}
      <div style={{ marginBottom: 28 }}>
        <div className="progress-bar" style={{ maxWidth: 400 }}>
          <div className="progress-fill" style={{ width: `${step * 50}%` }} />
        </div>
      </div>

      <div className="content-row">
        {/* Main Column */}
        <div>
          {step === 1 && (
            <div className="fade-in">
              {/* Date Selection */}
              <div className="card" style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: "1rem", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
                  <Calendar size={18} color="var(--primary)" /> Select Date
                </h3>
                <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
                  {dates.map(d => (
                    <button key={d.full} onClick={() => setSelectedDate(d.full)}
                      style={{
                        minWidth: 72, padding: "14px 10px", borderRadius: "var(--radius-md)",
                        border: selectedDate === d.full ? "2px solid var(--primary)" : "1.5px solid var(--border)",
                        background: selectedDate === d.full ? "var(--primary-bg)" : "var(--surface)",
                        cursor: "pointer", textAlign: "center", transition: "all var(--transition)", fontFamily: "inherit",
                      }}>
                      <small style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block" }}>{d.day}</small>
                      <strong style={{ fontSize: "1.2rem", display: "block", margin: "4px 0", color: selectedDate === d.full ? "var(--primary)" : "var(--text-primary)" }}>{d.date}</strong>
                      <small style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{d.month}</small>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              <div className="card" style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: "1rem", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
                  <Clock size={18} color="var(--primary)" /> Select Time
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 10 }}>
                  {timeSlots.map(t => (
                    <button key={t} onClick={() => setSelectedTime(t)}
                      className={`chip ${selectedTime === t ? "active" : ""}`}
                      style={{ justifyContent: "center" }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div className="card" style={{ marginBottom: 20 }}>
                <div className="input-group">
                  <label><MapPin size={12} style={{ verticalAlign: "middle", marginRight: 4 }} />Service Address</label>
                  <input className="input" value={address} onChange={e => setAddress(e.target.value)} />
                </div>
              </div>

              <button className="btn btn-primary btn-lg"
                disabled={!selectedDate || !selectedTime}
                onClick={() => setStep(2)}
                style={{ opacity: !selectedDate || !selectedTime ? 0.5 : 1 }}>
                Continue to Confirmation
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="fade-in">
              <div className="card" style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: "1rem", marginBottom: 16 }}>Booking Summary</h3>
                {[
                  { label: "Provider", value: provider.name },
                  { label: "Service", value: provider.service },
                  { label: "Date", value: dates.find(d => d.full === selectedDate)?.day + ", " + dates.find(d => d.full === selectedDate)?.date + " " + dates.find(d => d.full === selectedDate)?.month },
                  { label: "Time", value: selectedTime },
                  { label: "Location", value: address },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border-light)" }}>
                    <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{label}</span>
                    <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>{value}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0 0" }}>
                  <span style={{ fontSize: "1rem", fontWeight: 600 }}>Estimated Cost</span>
                  <span style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--primary)" }}>{provider.price}</span>
                </div>
              </div>

              <div className="card" style={{ marginBottom: 20 }}>
                <div className="input-group">
                  <label>Additional Notes (optional)</label>
                  <textarea className="input" rows={3} value={notes} onChange={e => setNotes(e.target.value)}
                    placeholder="Any special instructions..." style={{ resize: "none", fontFamily: "inherit" }} />
                </div>
              </div>

              <div className="card" style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 14 }}>
                <CreditCard size={22} color="var(--primary)" />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "0.85rem", fontWeight: 600, margin: 0, color: "var(--text-primary)" }}>Cash on Completion</p>
                  <small>Pay after the service is done</small>
                </div>
                <span className="badge badge-success">Default</span>
              </div>

              <div style={{ display: "flex", gap: 12 }}>
                <button className="btn btn-outline btn-lg" onClick={() => setStep(1)}>Back</button>
                <button className="btn btn-primary btn-lg" onClick={() => setConfirmed(true)}>
                  <CheckCircle size={18} /> Confirm Booking
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar — Provider Summary */}
        <div>
          <div className="card" style={{ position: "sticky", top: "calc(var(--header-height) + 28px)" }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 14 }}>
              <div className="avatar" style={{ background: "var(--primary-bg)", color: "var(--primary)" }}>{provider.avatar}</div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <h4 style={{ margin: 0, fontSize: "0.95rem" }}>{provider.name}</h4>
                  {provider.verified && <BadgeCheck size={16} color="var(--primary)" fill="var(--primary-bg)" />}
                </div>
                <small>{provider.service} · {provider.area}</small>
              </div>
            </div>
            <div className="divider" />
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Service Fee</span>
              <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--primary)" }}>{provider.price}</span>
            </div>
            <small style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}>
              Price may vary. You&apos;ll get a quote before the work starts.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <AppShell>
      <Suspense fallback={<div className="page-container"><p>Loading...</p></div>}>
        <BookingContent />
      </Suspense>
    </AppShell>
  );
}
