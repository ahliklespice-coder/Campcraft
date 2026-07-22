"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useCallback, useEffect } from "react";
import {
  generateChecklist,
  deserializeTripParams,
  CATEGORIES,
  type PackingItem,
  type ChecklistCategory,
  type TripParams,
  type PackingChecklist,
} from "~/lib/packing-generator";
import { formatExperienceLevel, formatTripStyle } from "~/lib/itinerary-generator";

export const Route = createFileRoute("/checklist")({
  component: ChecklistPage,
  validateSearch: (search: Record<string, string | undefined>) => search,
});

// ── Component ──────────────────────────────────────────────────────────────

function ChecklistPage() {
  const search = Route.useSearch();

  // Parse trip params from URL
  const params = useMemo(() => deserializeTripParams(search), [search]);
  const checklist = useMemo(
    () => (params ? generateChecklist(params) : null),
    [params],
  );

  // Track which items are checked (by item id)
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

  // Reset checked state when checklist changes
  useEffect(() => {
    setCheckedIds(new Set());
  }, [search.destination, search.adults, search.children, search.experienceLevel, search.tripStyle, search.totalDays]);

  const toggleItem = useCallback((id: string) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const checkedCount = checkedIds.size;
  const totalCount = checklist?.items.length ?? 0;
  const progressPercent = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

  // ── No params? Show a form to collect info ──────────────────────────────
  if (!params) {
    return <ChecklistWithoutParams />;
  }

  return (
    <main className="min-h-dvh bg-cream print:bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-forest-dark to-forest px-4 pb-10 pt-10 sm:pb-14 sm:pt-14">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-medium text-white/90">
            🎒 Packing Checklist
          </span>
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Your Packing Checklist
          </h1>
          <p className="mt-2 text-base text-white/75">
            For {params.destination} — {params.totalDays} {params.totalDays === 1 ? "day" : "days"}
            {params.children > 0 ? ` · ${params.adults} adults, ${params.children} children` : ` · ${params.adults} adults`}
          </p>
          {/* Trip badges */}
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm">
            <span className="rounded-full bg-white/15 px-3 py-1">
              {formatExperienceLevel(params.experienceLevel)}
            </span>
            {params.tripStyle && (
              <span className="rounded-full bg-white/15 px-3 py-1">
                {formatTripStyle(params.tripStyle)}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Checklist body */}
      <section className="px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-2xl">
          {/* Progress bar */}
          <div className="mb-8 rounded-2xl border border-stone-warm/80 bg-white p-5 shadow-sm print:hidden">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-bark-light">Packing progress</span>
              <span className="text-sm font-bold text-forest">
                {checkedCount} of {totalCount} items packed
              </span>
            </div>
            {/* Bar */}
            <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-stone-warm">
              <div
                className="h-full rounded-full bg-gradient-to-r from-forest to-forest-light transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            {/* Quick status */}
            {progressPercent === 100 && (
              <p className="mt-3 text-sm font-medium text-forest">
                🎉 All packed! You're ready for your adventure!
              </p>
            )}
          </div>

          {/* Print header (only visible in print) */}
          <div className="mb-6 hidden print:block">
            <h2 className="text-xl font-bold text-bark">
              CampCraft Packing Checklist — {params.destination}
            </h2>
            <p className="text-sm text-bark-light">
              {params.totalDays} days · {params.adults} adults{params.children > 0 ? ` · ${params.children} children` : ""} · {formatExperienceLevel(params.experienceLevel)}
              {params.tripStyle ? ` · ${formatTripStyle(params.tripStyle!)}` : ""}
            </p>
            <div className="mt-1 flex gap-3 text-xs text-bark-light">
              <span>□ = need to pack</span>
              <span>☑ = packed</span>
            </div>
          </div>

          {/* Print button */}
          <div className="mb-6 flex flex-wrap gap-3 print:hidden">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-2 rounded-full border border-stone-warm bg-white px-5 py-2.5 text-sm font-medium text-bark transition-colors hover:bg-stone-warm"
            >
              🖨️ Print Checklist
            </button>
            <Link
              to="/plan"
              className="flex items-center gap-2 rounded-full border border-stone-warm bg-white px-5 py-2.5 text-sm font-medium text-bark transition-colors hover:bg-stone-warm"
            >
              ← Back to Plan
            </Link>
          </div>

          {/* Category sections */}
          <div className="space-y-6">
            {CATEGORIES.map((cat) => {
              const catItems = checklist.categories.get(cat.key) ?? [];
              if (catItems.length === 0) return null;
              return (
                <ChecklistCategorySection
                  key={cat.key}
                  emoji={cat.emoji}
                  label={cat.label}
                  items={catItems}
                  checkedIds={checkedIds}
                  onToggle={toggleItem}
                />
              );
            })}
          </div>

          {/* Bottom actions */}
          <div className="mt-10 flex flex-col items-center gap-3 border-t border-stone-warm/60 pt-8 print:hidden">
            <p className="text-sm text-bark-light">
              Check items off as you pack. You can always come back!
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-semibold text-white shadow-md shadow-amber/20 transition-colors hover:bg-amber-dark"
              >
                🖨️ Print
              </button>
              <button
                type="button"
                onClick={() => setCheckedIds(new Set())}
                className="flex items-center gap-2 rounded-full border border-stone-warm bg-white px-6 py-3 text-sm font-medium text-bark transition-colors hover:bg-stone-warm"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ── Category Section ──────────────────────────────────────────────────────

function ChecklistCategorySection({
  emoji,
  label,
  items,
  checkedIds,
  onToggle,
}: {
  emoji: string;
  label: string;
  items: PackingItem[];
  checkedIds: Set<string>;
  onToggle: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const packedCount = items.filter((item) => checkedIds.has(item.id)).length;

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-warm/80 bg-white shadow-sm print:border print:border-bark/20 print:shadow-none">
      {/* Category header */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-stone-warm/30 print:cursor-default print:hover:bg-transparent"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl" aria-hidden="true">
            {emoji}
          </span>
          <div>
            <h3 className="text-base font-bold text-bark">{label}</h3>
            <p className="text-xs text-bark-light">
              {packedCount} of {items.length} packed
            </p>
          </div>
        </div>
        <span
          className={`text-lg text-bark-light transition-transform duration-200 print:hidden ${
            expanded ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      {/* Items list */}
      {expanded && (
        <div className="divide-y divide-stone-warm/40 border-t border-stone-warm/60">
          {items.map((item) => (
            <ChecklistItemRow
              key={item.id}
              item={item}
              checked={checkedIds.has(item.id)}
              onToggle={() => onToggle(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Item Row ───────────────────────────────────────────────────────────────

function ChecklistItemRow({
  item,
  checked,
  onToggle,
}: {
  item: PackingItem;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 px-5 py-3.5 transition-colors hover:bg-stone-warm/20 print:cursor-default print:hover:bg-transparent ${
        checked ? "bg-stone-warm/30" : ""
      }`}
    >
      {/* Custom checkbox */}
      <div className="relative mt-0.5 flex-shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggle}
          className="sr-only"
        />
        <div
          className={`flex h-6 w-6 items-center justify-center rounded-md border-2 transition-all ${
            checked
              ? "border-forest bg-forest"
              : "border-bark-light/40 bg-white print:border-bark"
          }`}
        >
          {checked && (
            <svg
              className="h-4 w-4 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>

      {/* Item text */}
      <div className="min-w-0 flex-1">
        <p
          className={`text-sm ${
            item.essential ? "font-semibold" : "font-normal"
          } transition-all ${
            checked
              ? "text-bark-light/60 line-through"
              : "text-bark"
          }`}
        >
          {item.name}
          {item.essential && !checked && (
            <span className="ml-1.5 inline-flex items-center rounded-full bg-amber/15 px-2 py-0.5 text-[10px] font-semibold text-amber-dark">
              essential
            </span>
          )}
        </p>
        {item.tip && (
          <p
            className={`mt-0.5 text-xs leading-relaxed transition-all ${
              checked ? "text-bark-light/40" : "text-bark-light"
            }`}
          >
            💡 {item.tip}
          </p>
        )}
      </div>
    </label>
  );
}

// ── No-params form (straight-to-checklist, no itinerary needed) ────────────

function ChecklistWithoutParams() {
  const [destination, setDestination] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [experienceLevel, setExperienceLevel] = useState<"first-time" | "been-a-few-times" | "pretty-experienced">("first-time");
  const [tripStyle, setTripStyle] = useState<"relaxed" | "adventure" | "family" | "">("");
  const [totalDays, setTotalDays] = useState(2);

  const isFormValid = destination.trim().length > 0 && adults > 0 && totalDays >= 1;

  const handleGenerate = () => {
    if (!isFormValid) return;
    const params: TripParams = {
      destination: destination.trim(),
      adults,
      children,
      experienceLevel,
      tripStyle: tripStyle || undefined,
      totalDays,
    };
    const sp = new URLSearchParams();
    sp.set("destination", params.destination);
    sp.set("adults", String(params.adults));
    sp.set("children", String(params.children));
    sp.set("experienceLevel", params.experienceLevel);
    if (params.tripStyle) sp.set("tripStyle", params.tripStyle);
    sp.set("totalDays", String(params.totalDays));
    // Navigate to same route with params
    window.location.search = sp.toString();
  };

  const experienceOptions = [
    { value: "first-time" as const, label: "First time camper", emoji: "🌱" },
    { value: "been-a-few-times" as const, label: "Been a few times", emoji: "🥾" },
    { value: "pretty-experienced" as const, label: "Pretty experienced", emoji: "⛰️" },
  ];

  const styleOptions = [
    { value: "relaxed" as const, label: "Relaxed getaway", emoji: "🌿" },
    { value: "adventure" as const, label: "Adventure packed", emoji: "🧗" },
    { value: "family" as const, label: "Family fun", emoji: "👨‍👩‍👧‍👦" },
  ];

  return (
    <main className="min-h-dvh bg-cream">
      <section className="bg-gradient-to-b from-forest-dark to-forest px-4 pb-10 pt-10 sm:pb-14 sm:pt-14">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-medium text-white/90">
            🎒 Packing Checklist
          </span>
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Build Your Checklist
          </h1>
          <p className="mt-2 text-base text-white/75">
            Tell us about your trip and we'll create a personalized packing list.
          </p>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-stone-warm/80 bg-white p-6 shadow-sm sm:p-8">
            {/* Destination */}
            <div className="mb-6">
              <label htmlFor="dest" className="mb-1.5 block text-sm font-semibold text-bark">
                Where are you headed?
              </label>
              <input
                id="dest"
                type="text"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Yosemite, Big Sur, Shenandoah..."
                className="w-full rounded-xl border border-stone-warm bg-cream px-4 py-3 text-base text-bark placeholder:text-bark-light/50 transition-colors focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
              />
            </div>

            {/* Duration */}
            <div className="mb-6">
              <label htmlFor="totalDays" className="mb-1.5 block text-sm font-semibold text-bark">
                How many days?
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setTotalDays((n) => Math.max(1, n - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-warm bg-cream text-lg font-medium text-bark transition-colors hover:bg-stone-warm"
                >
                  −
                </button>
                <span className="min-w-[4ch] text-center text-xl font-bold text-bark">
                  {totalDays}
                </span>
                <button
                  type="button"
                  onClick={() => setTotalDays((n) => Math.min(21, n + 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-warm bg-cream text-lg font-medium text-bark transition-colors hover:bg-stone-warm"
                >
                  +
                </button>
              </div>
            </div>

            {/* Adults */}
            <div className="mb-6">
              <label htmlFor="adults2" className="mb-1.5 block text-sm font-semibold text-bark">
                Adults
              </label>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setAdults((n) => Math.max(1, n - 1))} className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-warm bg-cream text-lg font-medium text-bark transition-colors hover:bg-stone-warm">−</button>
                <span className="min-w-[2ch] text-center text-xl font-bold text-bark">{adults}</span>
                <button type="button" onClick={() => setAdults((n) => Math.min(12, n + 1))} className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-warm bg-cream text-lg font-medium text-bark transition-colors hover:bg-stone-warm">+</button>
              </div>
            </div>

            {/* Children */}
            <div className="mb-6">
              <label htmlFor="children2" className="mb-1.5 block text-sm font-semibold text-bark">
                Children
              </label>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setChildren((n) => Math.max(0, n - 1))} className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-warm bg-cream text-lg font-medium text-bark transition-colors hover:bg-stone-warm">−</button>
                <span className="min-w-[2ch] text-center text-xl font-bold text-bark">{children}</span>
                <button type="button" onClick={() => setChildren((n) => Math.min(12, n + 1))} className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-warm bg-cream text-lg font-medium text-bark transition-colors hover:bg-stone-warm">+</button>
              </div>
            </div>

            {/* Experience */}
            <fieldset className="mb-6">
              <legend className="mb-3 text-sm font-semibold text-bark">
                How's your camping experience?
              </legend>
              <div className="flex flex-col gap-2 sm:flex-row">
                {experienceOptions.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex flex-1 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all ${
                      experienceLevel === opt.value
                        ? "border-forest bg-forest/5 ring-1 ring-forest/30"
                        : "border-stone-warm bg-cream hover:bg-stone-warm/50"
                    }`}
                  >
                    <input type="radio" name="exp2" value={opt.value} checked={experienceLevel === opt.value} onChange={() => setExperienceLevel(opt.value)} className="sr-only" />
                    <span className="text-xl">{opt.emoji}</span>
                    <span className="text-sm font-medium text-bark">{opt.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Trip style */}
            <fieldset className="mb-8">
              <legend className="mb-3 text-sm font-semibold text-bark">
                What's your vibe? <span className="font-normal text-bark-light">(optional)</span>
              </legend>
              <div className="flex flex-col gap-2 sm:flex-row">
                {styleOptions.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex flex-1 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all ${
                      tripStyle === opt.value
                        ? "border-amber bg-amber/5 ring-1 ring-amber/30"
                        : "border-stone-warm bg-cream hover:bg-stone-warm/50"
                    }`}
                  >
                    <input type="radio" name="style2" value={opt.value} checked={tripStyle === opt.value} onChange={() => setTripStyle(opt.value)} className="sr-only" />
                    <span className="text-xl">{opt.emoji}</span>
                    <span className="text-sm font-medium text-bark">{opt.label}</span>
                  </label>
                ))}
              </div>
              {tripStyle && (
                <button type="button" onClick={() => setTripStyle("")} className="mt-2 text-xs text-bark-light underline underline-offset-2 hover:text-bark">
                  Clear selection
                </button>
              )}
            </fieldset>

            {/* Submit */}
            <button
              type="button"
              disabled={!isFormValid}
              onClick={handleGenerate}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-amber px-8 py-3.5 text-lg font-semibold text-white shadow-md shadow-amber/20 transition-all hover:bg-amber-dark hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
            >
              Generate My Checklist ✨
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
