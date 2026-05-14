"use client";
import { useState } from "react";
import AppShell from "@/components/AppShell";
import { chatMessages } from "@/services/mockData";
import { Send, Paperclip, Phone, MoreVertical, BadgeCheck } from "lucide-react";

export default function ChatPage() {
  const [messages, setMessages] = useState(chatMessages);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, {
      id: messages.length + 1, sender: "user", text: input,
      time: new Date().toLocaleTimeString("en", { hour: "numeric", minute: "2-digit" }),
    }]);
    setInput("");
  };

  return (
    <AppShell>
      <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - var(--header-height))" }}>
        {/* Chat Header */}
        <div style={{
          padding: "12px 24px", background: "var(--surface)", borderBottom: "1px solid var(--border-light)",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <div className="avatar" style={{ background: "var(--primary-bg)", color: "var(--primary)" }}>AR</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <h4 style={{ fontSize: "0.95rem", margin: 0 }}>Ahmed Raza</h4>
              <BadgeCheck size={16} color="var(--primary)" fill="var(--primary-bg)" />
            </div>
            <small style={{ color: "var(--success)", fontSize: "0.7rem" }}>● Online</small>
          </div>
          <button className="btn-ghost btn-icon"><Phone size={18} color="var(--text-secondary)" /></button>
          <button className="btn-ghost btn-icon"><MoreVertical size={18} color="var(--text-secondary)" /></button>
        </div>

        {/* Active booking banner */}
        <div style={{ padding: "8px 24px", background: "var(--primary-bg)", textAlign: "center" }}>
          <small style={{ fontSize: "0.7rem", color: "var(--primary)", fontWeight: 500 }}>
            Active Booking: Plumbing Service · KB-1001
          </small>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: "auto", padding: "20px 24px",
          display: "flex", flexDirection: "column", gap: 10, background: "var(--bg)",
        }}>
          <div style={{ textAlign: "center", margin: "8px 0" }}>
            <small style={{ background: "var(--surface-hover)", padding: "4px 14px", borderRadius: 12, fontSize: "0.7rem", color: "var(--text-muted)" }}>Today</small>
          </div>
          {messages.map((msg, i) => (
            <div key={msg.id} style={{
              display: "flex", justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              animation: `fadeIn 0.2s ease ${i * 0.05}s both`,
            }}>
              <div style={{
                maxWidth: "60%", padding: "12px 16px",
                borderRadius: msg.sender === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                background: msg.sender === "user" ? "var(--primary)" : "var(--surface)",
                color: msg.sender === "user" ? "#fff" : "var(--text-primary)",
                boxShadow: "var(--shadow-sm)",
              }}>
                <p style={{ fontSize: "0.85rem", margin: 0, lineHeight: 1.5, color: msg.sender === "user" ? "#fff" : "var(--text-primary)" }}>{msg.text}</p>
                <small style={{ fontSize: "0.65rem", display: "block", textAlign: "right", marginTop: 4, opacity: 0.6, color: msg.sender === "user" ? "#fff" : "var(--text-muted)" }}>{msg.time}</small>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div style={{
          padding: "14px 24px", background: "var(--surface)", borderTop: "1px solid var(--border-light)",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <button style={{ border: "none", background: "none", cursor: "pointer", display: "flex", padding: 4 }}>
            <Paperclip size={20} color="var(--text-muted)" />
          </button>
          <input
            type="text" placeholder="Type a message..."
            value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            style={{
              flex: 1, padding: "10px 18px", borderRadius: 24,
              border: "1.5px solid var(--border)", background: "var(--surface-hover)",
              fontSize: "0.85rem", outline: "none", fontFamily: "inherit",
            }}
          />
          <button onClick={sendMessage}
            style={{
              width: 42, height: 42, borderRadius: "50%", border: "none",
              background: input.trim() ? "var(--primary)" : "var(--surface-hover)",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all var(--transition)",
            }}>
            <Send size={18} color={input.trim() ? "#fff" : "var(--text-muted)"} />
          </button>
        </div>
      </div>
    </AppShell>
  );
}
