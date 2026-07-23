"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useCallback, useEffect } from "react";
import {
  generateMealPlan,
  deserializeMealParams,
  formatMealDifficulty,
  categorizeIngredient,
  groupIngredientsForShopping,
  INGREDIENT_CATEGORIES,
  type MealPlan,
  type MealPlanParams,
  type Recipe,
  type IngredientCategory,
} from "~/lib/meal-planner";
import { formatExperienceLevel, formatTripStyle } from "~/lib/itinerary-generator";

export const Route = createFileRoute("/meals")({
  component: MealsPage,
  validateSearch: (search: Record<string, string | undefined>) => search,
});

// ── Meal plan usage tracker (localStorage) ──────────────────────────────────

const MEAL_COUNT_KEY = "campcraft-meal-count";
const MAX_FREE_MEAL_PLANS = 1;

function getMealPlanCount(): number {
  try {
    return parseInt(localStorage.getItem(MEAL_COUNT_KEY) ?? "0", 10) || 0;
  } catch {
    return 0;
  }
}

function incrementMealPlanCount(): number {
  const current = getMealPlanCount();
  const next = current + 1;
  try {
    localStorage.setItem(MEAL_COUNT_KEY, String(next));
  } catch {}
  return next;
}

// ── Main Component ───────────────────────────────────────────────────────────

function MealsPage() {
  const search = Route.useSearch();

  // Parse trip params from URL
  const params = useMemo(() => deserializeMealParams(search), [search]);
  const mealPlan = useMemo(
    () => (params ? generateMealPlan(params) : null),
    [params],
  );

  // View mode
  const [viewMode, setViewMode] = useState<"quick" | "full">("full");
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [expandedDays, setExpandedDays] = useState<Set<number>>(() => {
    if (params) {
      // Expand day 1 by default
      return new Set([1]);
    }
    return new Set();
  });
  const [expandedRecipes, setExpandedRecipes] = useState<Set<string>>(new Set());
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set());

  // Reset when params change
  useEffect(() => {
    setExpandedDays(new Set([1]));
    setExpandedRecipes(new Set());
    setCheckedIngredients(new Set());
  }, [search.destination, search.adults, search.children, search.experienceLevel, search.tripStyle, search.totalDays]);

  const toggleDay = useCallback((day: number) => {
    setExpandedDays((prev) => {
      const next = new Set(prev);
      if (next.has(day)) {
        next.delete(day);
      } else {
        next.add(day);
      }
      return next;
    });
  }, []);

  const toggleRecipe = useCallback((recipeName: string) => {
    setExpandedRecipes((prev) => {
      const next = new Set(prev);
      if (next.has(recipeName)) {
        next.delete(recipeName);
      } else {
        next.add(recipeName);
      }
      return next;
    });
  }, []);

  const toggleIngredient = useCallback((ingredient: string) => {
    setCheckedIngredients((prev) => {
      const next = new Set(prev);
      if (next.has(ingredient)) {
        next.delete(ingredient);
      } else {
        next.add(ingredient);
      }
      return next;
    });
  }, []);

  // ── No params? Show standalone form ──────────────────────────────────────
  if (!params) {
    return <MealsWithoutParams />;
  }

  // Shopping list view
  if (showShoppingList && mealPlan) {
    return (
      <ShoppingListView
        mealPlan={mealPlan}
        checkedIngredients={checkedIngredients}
        onToggleIngredient={toggleIngredient}
        onBack={() => setShowShoppingList(false)}
      />
    );
  }

  return (
    <main className="min-h-dvh bg-cream">
      {/* Hero */}
      <section className="bg-gradient-to-b from-forest-dark to-forest px-4 pb-10 pt-10 sm:pb-14 sm:pt-14">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-medium text-white/90">
            🍳 Meal Planner
          </span>
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Your Camp Kitchen Plan
          </h1>
          <p className="mt-2 text-base text-white/75">
            {mealPlan?.summary ?? `${params.totalDays}-day plan for ${params.destination}`}
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
            <span className="rounded-full bg-white/15 px-3 py-1">
              {params.totalDays} {params.totalDays === 1 ? "day" : "days"}
            </span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-2xl">
          {/* Action bar */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setViewMode("quick")}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  viewMode === "quick"
                    ? "bg-forest text-white"
                    : "border border-stone-warm bg-white text-bark hover:bg-stone-warm"
                }`}
              >
                Quick View
              </button>
              <button
                type="button"
                onClick={() => setViewMode("full")}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  viewMode === "full"
                    ? "bg-forest text-white"
                    : "border border-stone-warm bg-white text-bark hover:bg-stone-warm"
                }`}
              >
                Full Recipes
              </button>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowShoppingList(true)}
                className="flex items-center gap-2 rounded-full bg-amber px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-amber/20 transition-colors hover:bg-amber-dark"
              >
                🛒 Shopping List
              </button>
              <Link
                to="/plan"
                className="flex items-center gap-2 rounded-full border border-stone-warm bg-white px-5 py-2.5 text-sm font-medium text-bark transition-colors hover:bg-stone-warm"
              >
                ← Back to Plan
              </Link>
            </div>
          </div>

          {/* Beginner tip */}
          {params.experienceLevel === "first-time" && (
            <div className="mb-6 rounded-xl border border-forest/30 bg-forest/5 p-4 text-sm leading-relaxed text-bark">
              💡 <strong>First-time camp cook?</strong> All your recipes are beginner-friendly!
              Read through each one before you leave. Pre-chop veggies and pre-cook meats at home
              to make camp cooking a breeze. And remember — everything tastes better outdoors!
            </div>
          )}

          {/* Day-by-day meal plan */}
          <div className="space-y-4">
            {mealPlan?.days.map((day) => (
              <MealPlanDayCard
                key={day.dayNumber}
                day={day}
                viewMode={viewMode}
                isExpanded={expandedDays.has(day.dayNumber)}
                onToggle={() => toggleDay(day.dayNumber)}
                expandedRecipes={expandedRecipes}
                onToggleRecipe={toggleRecipe}
              />
            ))}
          </div>

          {/* Bottom actions */}
          <div className="mt-10 flex flex-col items-center gap-4 border-t border-stone-warm/60 pt-8">
            <p className="text-sm text-bark-light">
              Happy camp cooking! Adjust portions based on your group's appetite.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowShoppingList(true)}
                className="flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-semibold text-white shadow-md shadow-amber/20 transition-colors hover:bg-amber-dark"
              >
                🛒 View Shopping List
              </button>
              <Link
                to="/plan"
                className="flex items-center gap-2 rounded-full border border-stone-warm bg-white px-6 py-3 text-sm font-medium text-bark transition-colors hover:bg-stone-warm"
              >
                ← Back to Plan
              </Link>
            </div>

            {/* Premium upgrade banner */}
            <div className="mt-4 rounded-xl border border-amber/30 bg-amber/5 p-4 text-center">
              <p className="text-sm font-medium text-bark">
                🍳 Upgrade to Premium for unlimited meal plans
              </p>
              <p className="mt-1 text-xs text-bark-light">
                Get weather-aware recipes, more dietary options, and unlimited
                meal plan generations for every trip.
              </p>
              <a
                href="/pricing"
                className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber to-amber-light px-5 py-2 text-xs font-semibold text-white no-underline shadow-sm transition-all hover:from-amber-dark hover:to-amber"
              >
                Upgrade to Premium ✨
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ── Day Card ─────────────────────────────────────────────────────────────────

function MealPlanDayCard({
  day,
  viewMode,
  isExpanded,
  onToggle,
  expandedRecipes,
  onToggleRecipe,
}: {
  day: MealPlanDay;
  viewMode: "quick" | "full";
  isExpanded: boolean;
  onToggle: () => void;
  expandedRecipes: Set<string>;
  onToggleRecipe: (name: string) => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-stone-warm/80 bg-white shadow-sm">
      {/* Day header */}
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-stone-warm/30"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest text-sm font-bold text-white">
            {day.dayNumber}
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-bark-light">
              Day {day.dayNumber}
            </p>
            <p className="text-base font-bold text-bark">{day.label}</p>
          </div>
        </div>
        <span
          className={`text-lg text-bark-light transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      {/* Meals */}
      {isExpanded && (
        <div className="divide-y divide-stone-warm/40 border-t border-stone-warm/60">
          {day.meals.map((meal) => (
            <MealSlotRow
              key={`${day.dayNumber}-${meal.timeOfDay}`}
              meal={meal}
              viewMode={viewMode}
              isExpanded={expandedRecipes.has(meal.recipe.name)}
              onToggle={() => onToggleRecipe(meal.recipe.name)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Meal Slot Row ────────────────────────────────────────────────────────────

function MealSlotRow({
  meal,
  viewMode,
  isExpanded,
  onToggle,
}: {
  meal: { timeOfDay: string; label: string; recipe: Recipe; scaledServings: number; scaledIngredients: string[] };
  viewMode: "quick" | "full";
  isExpanded: boolean;
  onToggle: () => void;
}) {
  if (viewMode === "quick") {
    return (
      <div className="flex items-center gap-4 px-5 py-3.5">
        <span className="text-2xl flex-shrink-0">{meal.recipe.emoji}</span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-bark-light">{meal.label}</p>
          <p className="text-sm font-semibold text-bark">{meal.recipe.name}</p>
          <p className="mt-0.5 text-xs text-bark-light">
            {meal.recipe.prepTime + meal.recipe.cookTime} min · {formatMealDifficulty(meal.recipe.difficulty)} · serves {meal.scaledServings}
          </p>
        </div>
        <span
          className={`text-sm text-bark-light transition-transform duration-200 flex-shrink-0 ${
            isExpanded ? "rotate-180" : ""
          }`}
        >
          ▾
        </span>
      </div>
    );
  }

  // Full view
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start gap-4 px-5 py-3.5 text-left transition-colors hover:bg-stone-warm/20"
      >
        <span className="mt-0.5 text-2xl flex-shrink-0">{meal.recipe.emoji}</span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-bark-light">{meal.label}</p>
          <p className="text-sm font-bold text-bark">{meal.recipe.name}</p>
          <div className="mt-1 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-stone-warm px-2 py-0.5 text-bark-light">
              ⏱️ {meal.recipe.prepTime + meal.recipe.cookTime} min
            </span>
            <span className="rounded-full bg-stone-warm px-2 py-0.5 text-bark-light">
              {formatMealDifficulty(meal.recipe.difficulty)}
            </span>
            <span className="rounded-full bg-stone-warm px-2 py-0.5 text-bark-light">
              🍽️ serves {meal.scaledServings}
            </span>
            {meal.recipe.forBeginners && (
              <span className="rounded-full bg-forest/10 px-2 py-0.5 text-forest font-medium">
                🌱 Beginner friendly
              </span>
            )}
          </div>
        </div>
        <span
          className={`mt-1 text-sm text-bark-light transition-transform duration-200 flex-shrink-0 ${
            isExpanded ? "rotate-180" : ""
          }`}
        >
          ▾
        </span>
      </button>

      {/* Expanded recipe details */}
      {isExpanded && (
        <div className="border-t border-stone-warm/40 bg-stone-warm/20 px-5 py-4">
          {/* Equipment */}
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-bark-light">
              🧰 Equipment Needed
            </p>
            <ul className="mt-1.5 flex flex-wrap gap-1.5">
              {meal.recipe.equipment.map((item, i) => (
                <li
                  key={i}
                  className="rounded-full bg-white px-2.5 py-0.5 text-xs text-bark-light border border-stone-warm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Ingredients */}
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-bark-light">
              🛒 Ingredients (scaled for {meal.scaledServings} servings)
            </p>
            <ul className="mt-1.5 space-y-1">
              {meal.scaledIngredients.map((ing, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-bark">
                  <span className="mt-1.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber" />
                  {ing}
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-bark-light">
              📋 Step-by-Step
            </p>
            <ol className="mt-1.5 space-y-2">
              {meal.recipe.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-bark">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-forest text-[10px] font-bold text-white">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Tags */}
          {meal.recipe.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {meal.recipe.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-cream px-2.5 py-0.5 text-[11px] font-medium text-bark-light border border-stone-warm/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Shopping List View ───────────────────────────────────────────────────────

function ShoppingListView({
  mealPlan,
  checkedIngredients,
  onToggleIngredient,
  onBack,
}: {
  mealPlan: MealPlan;
  checkedIngredients: Set<string>;
  onToggleIngredient: (ing: string) => void;
  onBack: () => void;
}) {
  const grouped = useMemo(() => groupIngredientsForShopping(mealPlan.allIngredients), [mealPlan.allIngredients]);

  const totalCount = mealPlan.allIngredients.length;
  const checkedCount = mealPlan.allIngredients.filter((i) => checkedIngredients.has(i)).length;
  const progressPercent = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

  return (
    <main className="min-h-dvh bg-cream print:bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-forest-dark to-forest px-4 pb-8 pt-10 sm:pb-10 sm:pt-14">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-medium text-white/90">
            🛒 Shopping List
          </span>
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Your Camp Grocery List
          </h1>
          <p className="mt-2 text-base text-white/75">
            {mealPlan.totalDays}-day trip · {totalCount} unique ingredients
          </p>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-2xl">
          {/* Progress bar */}
          <div className="mb-6 rounded-2xl border border-stone-warm/80 bg-white p-5 shadow-sm print:hidden">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-bark-light">Shopping progress</span>
              <span className="text-sm font-bold text-forest">
                {checkedCount} of {totalCount} checked
              </span>
            </div>
            <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-stone-warm">
              <div
                className="h-full rounded-full bg-gradient-to-r from-forest to-forest-light transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            {progressPercent === 100 && (
              <p className="mt-3 text-sm font-medium text-forest">
                🎉 All checked! You're ready to shop!
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div className="mb-6 flex flex-wrap gap-3 print:hidden">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-2 rounded-full border border-stone-warm bg-white px-5 py-2.5 text-sm font-medium text-bark transition-colors hover:bg-stone-warm"
            >
              ← Back to Meal Plan
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-2 rounded-full bg-amber px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-amber/20 transition-colors hover:bg-amber-dark"
            >
              🖨️ Print List
            </button>
          </div>

          {/* Print header */}
          <div className="mb-6 hidden print:block">
            <h2 className="text-xl font-bold text-bark">
              CampCraft Shopping List — {mealPlan.destination}
            </h2>
            <p className="text-sm text-bark-light">
              {mealPlan.totalDays} days · {mealPlan.adults} adults{mealPlan.children > 0 ? ` · ${mealPlan.children} children` : ""}
            </p>
            <div className="mt-1 flex gap-3 text-xs text-bark-light">
              <span>☐ = need to buy</span>
              <span>☑ = in cart</span>
            </div>
          </div>

          {/* Ingredient categories */}
          <div className="space-y-4">
            {INGREDIENT_CATEGORIES.map((catMeta) => {
              const items = grouped.get(catMeta.key);
              if (!items || items.length === 0) return null;

              const catChecked = items.filter((i) => checkedIngredients.has(i)).length;

              return (
                <ShoppingCategory
                  key={catMeta.key}
                  emoji={catMeta.emoji}
                  label={catMeta.label}
                  items={items}
                  checkedCount={catChecked}
                  totalCount={items.length}
                  checkedIngredients={checkedIngredients}
                  onToggle={onToggleIngredient}
                />
              );
            })}
          </div>

          {/* Bottom actions */}
          <div className="mt-10 flex flex-col items-center gap-3 border-t border-stone-warm/60 pt-8 print:hidden">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-semibold text-white shadow-md shadow-amber/20 transition-colors hover:bg-amber-dark"
            >
              🖨️ Print Shopping List
            </button>
            <button
              type="button"
              onClick={onBack}
              className="text-sm text-bark-light underline underline-offset-2 hover:text-bark"
            >
              ← Back to Meal Plan
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

// ── Shopping Category ────────────────────────────────────────────────────────

function ShoppingCategory({
  emoji,
  label,
  items,
  checkedCount,
  totalCount,
  checkedIngredients,
  onToggle,
}: {
  emoji: string;
  label: string;
  items: string[];
  checkedCount: number;
  totalCount: number;
  checkedIngredients: Set<string>;
  onToggle: (ing: string) => void;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-warm/80 bg-white shadow-sm print:border print:border-bark/20 print:shadow-none">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-stone-warm/30 print:cursor-default print:hover:bg-transparent"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{emoji}</span>
          <div>
            <h3 className="text-base font-bold text-bark">{label}</h3>
            <p className="text-xs text-bark-light">
              {checkedCount} of {totalCount} checked
            </p>
          </div>
        </div>
        <span
          className={`text-lg text-bark-light transition-transform duration-200 print:hidden ${
            expanded ? "rotate-180" : ""
          }`}
        >
          ▾
        </span>
      </button>

      {expanded && (
        <div className="divide-y divide-stone-warm/40 border-t border-stone-warm/60">
          {items.map((item) => {
            const checked = checkedIngredients.has(item);
            return (
              <label
                key={item}
                className={`flex cursor-pointer items-start gap-3 px-5 py-3 transition-colors hover:bg-stone-warm/20 print:cursor-default print:hover:bg-transparent ${
                  checked ? "bg-stone-warm/30" : ""
                }`}
              >
                <div className="relative mt-0.5 flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle(item)}
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
                <span
                  className={`text-sm transition-all ${
                    checked ? "text-bark-light/60 line-through" : "text-bark"
                  }`}
                >
                  {item}
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Standalone Form (no URL params) ──────────────────────────────────────────

function MealsWithoutParams() {
  const [destination, setDestination] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [experienceLevel, setExperienceLevel] = useState<"first-time" | "been-a-few-times" | "pretty-experienced">("first-time");
  const [tripStyle, setTripStyle] = useState<"relaxed" | "adventure" | "family" | "">("");
  const [totalDays, setTotalDays] = useState(2);

  // Meal plan usage tracker
  const [mealCount, setMealCount] = useState(0);

  useEffect(() => {
    setMealCount(getMealPlanCount());
  }, []);

  const mealsRemaining = Math.max(0, MAX_FREE_MEAL_PLANS - mealCount);
  const isLocked = mealsRemaining <= 0 && mealCount > 0;

  const isFormValid = destination.trim().length > 0 && adults > 0 && totalDays >= 1;

  const handleGenerate = () => {
    if (!isFormValid || isLocked) return;
    const params: MealPlanParams = {
      destination: destination.trim(),
      adults,
      children,
      experienceLevel,
      tripStyle: tripStyle || undefined,
      totalDays,
    };
    // Increment meal plan usage
    const newCount = incrementMealPlanCount();
    setMealCount(newCount);

    const sp = new URLSearchParams();
    sp.set("destination", params.destination);
    sp.set("adults", String(params.adults));
    sp.set("children", String(params.children));
    sp.set("experienceLevel", params.experienceLevel);
    if (params.tripStyle) sp.set("tripStyle", params.tripStyle);
    sp.set("totalDays", String(params.totalDays));
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
            🍳 Meal Planner
          </span>
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Plan Your Camp Kitchen
          </h1>
          <p className="mt-2 text-base text-white/75">
            Tell us about your trip and we'll create a day-by-day meal plan with easy,
            delicious campfire recipes.
          </p>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-2xl">
          {/* Premium locked prompt */}
          {isLocked ? (
            <div className="rounded-2xl border-2 border-amber/40 bg-white p-8 text-center shadow-lg sm:p-10">
              <div className="mb-4 text-5xl">🔒</div>
              <h2 className="text-2xl font-bold text-forest-dark">
                You've used your free meal plan!
              </h2>
              <p className="mx-auto mt-3 max-w-md leading-relaxed text-bark-light">
                You've already generated one meal plan — great taste! Upgrade to
                Premium for unlimited meal plans, weather-aware recipes, and
                grocery lists tailored to your trip.
              </p>
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <a
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber to-amber-light px-7 py-3 text-sm font-semibold text-white no-underline shadow-lg shadow-amber/20 transition-all hover:from-amber-dark hover:to-amber hover:shadow-xl"
                >
                  Upgrade to Premium ✨
                </a>
                <button
                  type="button"
                  onClick={() => {
                    try { localStorage.removeItem(MEAL_COUNT_KEY); } catch {}
                    setMealCount(0);
                  }}
                  className="text-sm font-medium text-bark-light underline underline-offset-2 transition-colors hover:text-bark"
                >
                  Reset counter (demo)
                </button>
              </div>
            </div>
          ) : (
          <div className="rounded-2xl border border-stone-warm/80 bg-white p-6 shadow-sm sm:p-8">
            {/* Destination */}
            <div className="mb-6">
              <label htmlFor="meal-dest" className="mb-1.5 block text-sm font-semibold text-bark">
                Where are you headed?
              </label>
              <input
                id="meal-dest"
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
              <label htmlFor="meal-days" className="mb-1.5 block text-sm font-semibold text-bark">
                How many days?
              </label>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setTotalDays((n) => Math.max(1, n - 1))} className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-warm bg-cream text-lg font-medium text-bark transition-colors hover:bg-stone-warm">−</button>
                <span className="min-w-[4ch] text-center text-xl font-bold text-bark">{totalDays}</span>
                <button type="button" onClick={() => setTotalDays((n) => Math.min(21, n + 1))} className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-warm bg-cream text-lg font-medium text-bark transition-colors hover:bg-stone-warm">+</button>
              </div>
            </div>

            {/* Adults */}
            <div className="mb-6">
              <label htmlFor="meal-adults" className="mb-1.5 block text-sm font-semibold text-bark">
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
              <label htmlFor="meal-children" className="mb-1.5 block text-sm font-semibold text-bark">
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
                    <input type="radio" name="meal-exp" value={opt.value} checked={experienceLevel === opt.value} onChange={() => setExperienceLevel(opt.value)} className="sr-only" />
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
                    <input type="radio" name="meal-style" value={opt.value} checked={tripStyle === opt.value} onChange={() => setTripStyle(opt.value)} className="sr-only" />
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
              Generate My Meal Plan ✨
            </button>
          </div>
          )}
        </div>
      </section>
    </main>
  );
}
