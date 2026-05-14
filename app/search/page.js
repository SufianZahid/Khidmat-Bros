"use client";
import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import ProviderCard from "@/components/ProviderCard";
import { providers, serviceCategories } from "@/services/mockData";
import { Search, SlidersHorizontal, X } from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") || "";
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState(initialService);
  const [sortBy, setSortBy] = useState("rating");
  const [showFilters, setShowFilters] = useState(false);

  const filters = ["All", ...serviceCategories.map(c => c.name)];

  const filtered = useMemo(() => {
    let list = [...providers];
    if (activeFilter && activeFilter !== "All") {
      list = list.filter(p => p.service === activeFilter);
    }
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) || p.service.toLowerCase().includes(q) || p.area.toLowerCase().includes(q)
      );
    }
    if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "price") list.sort((a, b) => a.priceNum - b.priceNum);
    else if (sortBy === "reviews") list.sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [activeFilter, query, sortBy]);

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header fade-in">
        <h1>Search Services</h1>
        <p>Find verified service providers in your area</p>
      </div>

      {/* Search + Filters Bar */}
      <div className="section fade-in" style={{ animationDelay: "0.05s" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
          <div className="topbar-search" style={{ flex: 1, maxWidth: "100%" }}>
            <Search size={16} color="var(--text-muted)" />
            <input
              type="text" placeholder="Search services, providers, areas..."
              value={query} onChange={e => setQuery(e.target.value)}
            />
            {query && (
              <button onClick={() => setQuery("")} style={{ border: "none", background: "none", cursor: "pointer", display: "flex" }}>
                <X size={16} color="var(--text-muted)" />
              </button>
            )}
          </div>
          <button className={`btn ${showFilters ? "btn-secondary" : "btn-outline"}`}
            onClick={() => setShowFilters(!showFilters)}
            style={{ flexShrink: 0 }}
          >
            <SlidersHorizontal size={16} /> Filters
          </button>
        </div>

        {/* Category chips */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {filters.map(f => (
            <button key={f}
              className={`chip ${activeFilter === f || (!activeFilter && f === "All") ? "active" : ""}`}
              onClick={() => setActiveFilter(f === "All" ? "" : f)}
            >{f}</button>
          ))}
        </div>
      </div>

      {/* Sort bar */}
      {showFilters && (
        <div className="fade-in" style={{
          display: "flex", alignItems: "center", gap: 10, marginBottom: 20,
          padding: "12px 16px", background: "var(--surface-hover)", borderRadius: "var(--radius-sm)",
        }}>
          <small style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 600 }}>Sort by:</small>
          {["rating", "price", "reviews"].map(s => (
            <button key={s}
              className={`chip ${sortBy === s ? "active" : ""}`}
              onClick={() => setSortBy(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>
          <strong style={{ color: "var(--text-primary)" }}>{filtered.length}</strong> providers found
        </p>
      </div>

      {filtered.length > 0 ? (
        <div className="grid-providers">
          {filtered.map((p, i) => <ProviderCard key={p.id} provider={p} index={i} />)}
        </div>
      ) : (
        <div className="empty-state">
          <Search size={48} />
          <h3>No providers found</h3>
          <p style={{ fontSize: "0.85rem" }}>Try adjusting your filters or search term</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <AppShell>
      <Suspense fallback={<div className="page-container"><p>Loading...</p></div>}>
        <SearchContent />
      </Suspense>
    </AppShell>
  );
}
