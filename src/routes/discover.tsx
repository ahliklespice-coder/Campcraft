"use client";

import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useCallback } from "react";
import {
  campsites,
  getRegion,
  type Campsite,
  type Region,
} from "~/lib/campsites";

export const Route = createFileRoute("/discover")({
  component: Discover,
});

// ── Types ─────────────────────────────────────────────────────────────────────

type Difficulty = "beginner" | "intermediate" | "advanced";

interface FilterState {
  search: string;
  difficulties: Difficulty[];
  regions: Region[];
  features: string[];
  priceRanges: string[];
}

// ── Constants ─────────────────────────────────────────────────────────────────

const ALL_DIFFICULTIES: { value: Difficulty; label: string }[] = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const ALL_REGIONS: Region[] = ["West", "Mountain", "Midwest", "South", "Northeast"];

const ALL_FEATURES = [
  "Restrooms",
  "Showers",
  "Fire pits",
  "Electric hookups",
  "Bear boxes",
  "Laundry",
  "Camp store",
  "Ranger programs",
];

const ALL_PRICES = ["$", "$$", "$$$"];

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  beginner: "bg-forest text-white",
  intermediate: "bg-amber text-white",
  advanced: "bg-orange-600 text-white",
};

const DIFFICULTY_BORDER: Record<Difficulty, string> = {
  beginner: "border-l-forest",
  intermediate: "border-l-amber",
  advanced: "border-l-orange-600",
};

const PRICE_LABELS: Record<string, string> = {
  $: "Budget",
  $$: "Moderate",
  $$$: "Premium",
};

const RESERVATION_LABELS: Record<string, string> = {
  reservable: "Reservable",
  "first-come": "First Come, First Served",
  permit: "Permit Required",
};

// ── Component ─────────────────────────────────────────────────────────────────

function Discover() {
  // ── State ──
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    difficulties: [],
    regions: [],
    features: [],
    priceRanges: [],
  });
  const [selectedSite, setSelectedSite] = useState<Campsite | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // ── Derived ──
  const filteredSites = useMemo(() => {
    return campsites.filter((site) => {
      // Text search
      if (filters.search.trim()) {
        const q = filters.search.toLowerCase();
        const matchesSearch =
          site.name.toLowerCase().includes(q) ||
          site.parkName.toLowerCase().includes(q) ||
          site.state.toLowerCase().includes(q) ||
          site.features.some((f) => f.toLowerCase().includes(q)) ||
          site.activities.some((a) => a.toLowerCase().includes(q));
        if (!matchesSearch) return false;
      }

      // Difficulty
      if (
        filters.difficulties.length > 0 &&
        !filters.difficulties.includes(site.difficulty)
      ) {
        return false;
      }

      // Region
      if (filters.regions.length > 0) {
        const region = getRegion(site.state);
        if (!filters.regions.includes(region)) return false;
      }

      // Features
      if (filters.features.length > 0) {
        const hasAll = filters.features.every((f) => {
          // Special handling
          if (f === "Electric hookups")
            return site.features.includes("Electric hookups");
          if (f === "Bear boxes")
            return (
              site.features.includes("Bear boxes") ||
              site.features.includes("Food storage lockers")
            );
          return site.features.includes(f);
        });
        if (!hasAll) return false;
      }

      // Price
      if (
        filters.priceRanges.length > 0 &&
        !filters.priceRanges.includes(site.priceRange)
      ) {
        return false;
      }

      return true;
    });
  }, [filters]);

  // ── Handlers ──
  const toggleFilter = useCallback(
    <K extends keyof FilterState>(key: K, value: FilterState[K][number]) => {
      setFilters((prev) => {
        const arr = prev[key] as typeof value[];
        const exists = arr.includes(value);
        return {
          ...prev,
          [key]: exists ? arr.filter((v) => v !== value) : [...arr, value],
        };
      });
    },
    [],
  );

  const clearAllFilters = useCallback(() => {
    setFilters({
      search: "",
      difficulties: [],
      regions: [],
      features: [],
      priceRanges: [],
    });
  }, []);

  const handleAddToTrip = useCallback((site: Campsite) => {
    setToast(`Added ${site.name} to your trip! 🏕️`);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const hasActiveFilters =
    filters.difficulties.length > 0 ||
    filters.regions.length > 0 ||
    filters.features.length > 0 ||
    filters.priceRanges.length > 0;

  // ── Render ──
  return (
    <div className="min-h-dvh bg-cream">
      {/* ── Toast ── */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-bounce rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white shadow-lg">
          {toast}
        </div>
      )}

      {/* ── Hero / Search ── */}
      <section className="bg-gradient-to-b from-forest-dark via-forest to-forest-light px-4 pb-12 pt-16 sm:pb-16 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
            🏞️ Campsite Discovery
          </span>
          <h1 className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            Find Your Perfect Campsite
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Browse popular campgrounds across the US — from family-friendly
            sites to secluded escapes. Search, filter, and find the spot that
            feels like home.
          </p>

          {/* Search bar */}
          <div className="mx-auto mt-8 max-w-lg">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search by name, park, state, or feature..."
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
                className="w-full rounded-full border-2 border-transparent bg-white py-3.5 pl-12 pr-5 text-sm text-bark shadow-lg outline-none transition-all placeholder:text-bark-light/60 focus:border-amber focus:ring-4 focus:ring-amber/20"
              />
              {filters.search && (
                <button
                  type="button"
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, search: "" }))
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-bark-light hover:text-bark"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Filters ── */}
      <section className="sticky top-[57px] z-40 border-b border-stone-warm/80 bg-cream/95 px-4 py-3 backdrop-blur-sm sm:px-6">
        <div className="mx-auto max-w-6xl">
          {/* Mobile: horizontal scroll; Desktop: flex wrap */}
          <div className="flex flex-wrap items-start gap-3">
            {/* Difficulty */}
            <FilterGroup label="Difficulty">
              {ALL_DIFFICULTIES.map((d) => (
                <FilterChip
                  key={d.value}
                  active={filters.difficulties.includes(d.value)}
                  onClick={() => toggleFilter("difficulties", d.value)}
                >
                  {d.label}
                </FilterChip>
              ))}
            </FilterGroup>

            {/* Region */}
            <FilterGroup label="Region">
              {ALL_REGIONS.map((r) => (
                <FilterChip
                  key={r}
                  active={filters.regions.includes(r)}
                  onClick={() => toggleFilter("regions", r)}
                >
                  {r}
                </FilterChip>
              ))}
            </FilterGroup>

            {/* Features */}
            <FilterGroup label="Features">
              {ALL_FEATURES.map((f) => (
                <FilterChip
                  key={f}
                  active={filters.features.includes(f)}
                  onClick={() => toggleFilter("features", f)}
                >
                  {f}
                </FilterChip>
              ))}
            </FilterGroup>

            {/* Price */}
            <FilterGroup label="Price">
              {ALL_PRICES.map((p) => (
                <FilterChip
                  key={p}
                  active={filters.priceRanges.includes(p)}
                  onClick={() => toggleFilter("priceRanges", p)}
                >
                  {p} {PRICE_LABELS[p]}
                </FilterChip>
              ))}
            </FilterGroup>

            {/* Clear */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="mt-5 rounded-full border border-red-300 px-3 py-1.5 text-xs font-medium text-red-500 transition-colors hover:bg-red-50"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Results ── */}
      <section className="px-4 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-6xl">
          {/* Results count */}
          <p className="mb-6 text-sm font-medium text-bark-light">
            {filteredSites.length}{" "}
            {filteredSites.length === 1 ? "campsite" : "campsites"} found
          </p>

          {/* Empty state */}
          {filteredSites.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center">
              <div className="mb-4 text-5xl">🏕️</div>
              <h3 className="mb-2 text-xl font-bold text-forest-dark">
                No campsites match your filters
              </h3>
              <p className="mb-6 max-w-md text-bark-light">
                Try broadening your search! Remove some filters or try a
                different search term to discover more campgrounds.
              </p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="rounded-full bg-amber px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-dark"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            /* Results grid */
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSites.map((site) => (
                <CampsiteCard
                  key={site.id}
                  site={site}
                  onClick={() => setSelectedSite(site)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Detail Modal ── */}
      {selectedSite && (
        <DetailModal
          site={selectedSite}
          onClose={() => setSelectedSite(null)}
          onAddToTrip={handleAddToTrip}
        />
      )}
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="mr-1 text-xs font-bold uppercase tracking-wider text-bark-light">
        {label}:
      </span>
      {children}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-all ${
        active
          ? "border-forest bg-forest text-white shadow-sm"
          : "border-stone-warm bg-white text-bark-light hover:border-forest/40 hover:text-forest"
      }`}
    >
      {children}
    </button>
  );
}

function CampsiteCard({
  site,
  onClick,
}: {
  site: Campsite;
  onClick: () => void;
}) {
  const displayFeatures = site.features.slice(0, 3);

  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      role="button"
      tabIndex={0}
      className={`group cursor-pointer overflow-hidden rounded-2xl border border-stone-warm/80 bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-0.5 border-l-4 ${DIFFICULTY_BORDER[site.difficulty]}`}
    >
      {/* Image area */}
      <div className="flex h-36 items-center justify-center bg-gradient-to-br from-stone-warm to-cream text-5xl sm:text-6xl">
        {site.image}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* State badge */}
        <span className="mb-2 inline-block rounded-full bg-stone-warm px-2.5 py-0.5 text-xs font-medium text-bark-light">
          {site.state}
        </span>

        <h3 className="mb-1 text-lg font-bold text-forest-dark group-hover:text-forest">
          {site.name}
        </h3>
        <p className="mb-3 text-xs font-medium text-bark-light">
          {site.parkName}
        </p>

        {/* Difficulty + Price */}
        <div className="mb-3 flex items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${DIFFICULTY_COLORS[site.difficulty]}`}
          >
            {site.difficulty === "beginner"
              ? "🌱 Beginner"
              : site.difficulty === "intermediate"
                ? "🥾 Intermediate"
                : "⛰️ Advanced"}
          </span>
          <span className="rounded-full border border-stone-warm px-2 py-0.5 text-xs font-medium text-bark-light">
            {PRICE_LABELS[site.priceRange]}
          </span>
        </div>

        {/* Feature tags */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {displayFeatures.map((f) => (
            <span
              key={f}
              className="rounded-full bg-stone-warm/80 px-2 py-0.5 text-xs text-bark-light"
            >
              {f}
            </span>
          ))}
          {site.features.length > 3 && (
            <span className="rounded-full bg-stone-warm/80 px-2 py-0.5 text-xs text-bark-light">
              +{site.features.length - 3} more
            </span>
          )}
        </div>

        {/* View Details button */}
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber transition-colors group-hover:text-amber-dark">
          View Details
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </div>
  );
}

function DetailModal({
  site,
  onClose,
  onAddToTrip,
}: {
  site: Campsite;
  onClose: () => void;
  onAddToTrip: (site: Campsite) => void;
}) {
  const region = getRegion(site.state);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 py-8 sm:py-16">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-bark/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header image */}
        <div className="flex h-48 items-center justify-center bg-gradient-to-br from-forest-dark via-forest to-forest-light text-6xl sm:h-56 sm:text-7xl">
          {site.image}
        </div>

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/40"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {/* Title row */}
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-stone-warm px-2.5 py-0.5 text-xs font-medium text-bark-light">
              {site.state}
            </span>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${DIFFICULTY_COLORS[site.difficulty]}`}
            >
              {site.difficulty === "beginner"
                ? "🌱 Beginner"
                : site.difficulty === "intermediate"
                  ? "🥾 Intermediate"
                  : "⛰️ Advanced"}
            </span>
            <span className="rounded-full border border-stone-warm px-2 py-0.5 text-xs font-medium text-bark-light">
              {PRICE_LABELS[site.priceRange]}
            </span>
          </div>

          <h2 className="mb-1 text-2xl font-bold text-forest-dark">
            {site.name}
          </h2>
          <p className="mb-4 text-sm font-medium text-bark-light">
            {site.parkName} • {region} Region
          </p>

          {/* Description */}
          <p className="mb-6 leading-relaxed text-bark-light">
            {site.description}
          </p>

          {/* Details grid */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            {/* Features */}
            <div>
              <h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-bark">
                🏕️ Amenities
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {site.features.map((f) => (
                  <span
                    key={f}
                    className="rounded-full bg-stone-warm px-2.5 py-1 text-xs text-bark-light"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Activities */}
            <div>
              <h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-bark">
                🎯 Activities
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {site.activities.map((a) => (
                  <span
                    key={a}
                    className="rounded-full bg-cream px-2.5 py-1 text-xs text-bark-light"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* Best season */}
            <div>
              <h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-bark">
                📅 Best Season
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {site.bestSeason.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-stone-warm px-2.5 py-1 text-xs text-bark-light"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Reservation */}
            <div>
              <h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-bark">
                🎫 Reservation
              </h4>
              <p className="mb-1 text-sm font-medium text-bark">
                {RESERVATION_LABELS[site.reservationType]}
              </p>
              {site.reservationUrl && (
                <a
                  href={site.reservationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-amber underline underline-offset-2 transition-colors hover:text-amber-dark"
                >
                  Book on Recreation.gov ↗
                </a>
              )}
            </div>

            {/* Elevation */}
            {site.elevation !== undefined && (
              <div>
                <h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-bark">
                  ⛰️ Elevation
                </h4>
                <p className="text-sm text-bark-light">
                  {site.elevation.toLocaleString()} ft
                </p>
              </div>
            )}

            {/* Site count */}
            {site.siteCount !== undefined && (
              <div>
                <h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-bark">
                  ⛺ Sites
                </h4>
                <p className="text-sm text-bark-light">
                  {site.siteCount} campsites
                </p>
              </div>
            )}

            {/* Family / Pet */}
            <div>
              <h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-bark">
                👥 Good to Know
              </h4>
              <div className="flex flex-wrap gap-2 text-sm text-bark-light">
                {site.familyFriendly && (
                  <span className="flex items-center gap-1 rounded-full bg-stone-warm px-2.5 py-1 text-xs">
                    👨‍👩‍👧‍👦 Family-friendly
                  </span>
                )}
                {site.petFriendly && (
                  <span className="flex items-center gap-1 rounded-full bg-stone-warm px-2.5 py-1 text-xs">
                    🐕 Pet-friendly
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3 border-t border-stone-warm pt-6 sm:flex-row">
            <button
              type="button"
              onClick={() => onAddToTrip(site)}
              className="rounded-full bg-amber px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-dark"
            >
              🏕️ Add to My Trip
            </button>
            {site.reservationUrl && (
              <a
                href={site.reservationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-full border-2 border-forest px-6 py-3 text-sm font-semibold text-forest no-underline transition-colors hover:bg-forest hover:text-white"
              >
                🎫 Reserve a Site ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
