import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pricing")({
  component: Pricing,
});

const STRIPE_LINKS = {
  monthly: "https://buy.stripe.com/bJe3cx5616dbfwbg67fjG04",
  yearly: "https://buy.stripe.com/3cI8wRdCx9pn1Fl3jlfjG03",
  starterKit: "https://buy.stripe.com/14AcN7cytgRPfwbaLNfjG05",
};

const faqs = [
  {
    q: "Can I cancel anytime?",
    a: "Yes! You can cancel your Premium subscription at any time. Your plan will remain active until the end of your billing period — no partial refunds, no hassle.",
  },
  {
    q: "What do I get with Premium?",
    a: "Premium unlocks unlimited trip plans, the full meal planner with grocery lists, weather-aware packing tips, and priority access to new features. It's designed for campers who want the full experience.",
  },
  {
    q: "Is there a free trial?",
    a: "We don't offer a free trial right now — but the Free tier gives you 3 trip plans and full access to our packing checklists, campsite discovery, and educational guides. Try it out and upgrade when you're ready!",
  },
  {
    q: "What's in the Starter Kit?",
    a: "The Complete Camping Starter Kit ($19, one-time) includes all 7 of our in-depth camping guides in a downloadable, print-friendly PDF. Perfect for offline reading at the campsite — no cell service needed.",
  },
  {
    q: "Do you offer family plans?",
    a: "Not yet — but Premium covers all the features a family needs: unlimited trips, meal planning for groups, and kid-friendly packing lists. One account works for the whole crew.",
  },
  {
    q: "What happens to my saved trips when Premium expires?",
    a: "Your data stays safe. If your Premium subscription ends, you'll still have access to your saved trips — you just won't be able to create new ones beyond the free tier limit until you resubscribe.",
  },
];

const freeFeatures = [
  "Up to 3 trip plans",
  "Smart packing checklist",
  "Campsite discovery",
  "7 in-depth camping guides",
  "Basic itinerary generator",
];

const premiumFeatures = [
  "Unlimited trip plans",
  "Full meal planner with grocery lists",
  "Weather-aware packing tips",
  "Priority access to new features",
  "All Premium-only guide content",
];

function Pricing() {
  return (
    <main className="min-h-dvh bg-cream">
      {/* Hero */}
      <section className="bg-gradient-to-b from-forest-dark to-forest px-4 pb-14 pt-10 sm:pb-18 sm:pt-14">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white/90">
            💎 Pricing
          </span>
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Unlock the Full CampCraft Experience
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/80">
            Start free, upgrade when you're ready. Premium gives you unlimited
            trips, meal planning, and weather-aware features — everything you
            need to camp with total confidence.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            {/* Free Tier */}
            <div className="rounded-2xl border-2 border-stone-warm bg-white p-8 shadow-sm sm:p-10">
              <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-bark-light">
                Free
              </div>
              <div className="mb-4 flex items-baseline gap-1">
                <span className="text-5xl font-extrabold text-forest-dark">
                  $0
                </span>
                <span className="text-lg text-bark-light">forever</span>
              </div>
              <p className="mb-8 leading-relaxed text-bark-light">
                Perfect for trying out camping — get 3 trip plans, packing
                checklists, campsite discovery, and all our educational guides.
              </p>
              <ul className="mb-10 space-y-3">
                {freeFeatures.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-sm text-bark"
                  >
                    <span className="mt-0.5 flex-shrink-0 text-forest">
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="/plan"
                className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-forest bg-white px-6 py-3 text-sm font-semibold text-forest no-underline transition-all hover:bg-forest hover:text-white"
              >
                Start Free
                <span aria-hidden="true">🏕️</span>
              </a>
            </div>

            {/* Premium - best value */}
            <div className="relative rounded-2xl border-2 border-amber/50 bg-gradient-to-b from-amber/5 to-white p-8 shadow-lg sm:p-10">
              <span className="absolute -top-3.5 right-6 rounded-full bg-amber px-4 py-1 text-xs font-bold text-white shadow-md">
                ⭐ Best Value
              </span>
              <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-amber-dark">
                Premium
              </div>
              <div className="mb-4 flex items-baseline gap-1">
                <span className="text-5xl font-extrabold text-forest-dark">
                  $8
                </span>
                <span className="text-lg text-bark-light">/month</span>
              </div>
              <p className="mb-8 leading-relaxed text-bark-light">
                For campers ready to go all-in — unlimited trips, full meal
                planner, weather-aware tips, and priority features.
              </p>
              <ul className="mb-10 space-y-3">
                {premiumFeatures.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-sm font-medium text-bark"
                  >
                    <span className="mt-0.5 flex-shrink-0 text-amber">
                      ✨
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Pricing options side-by-side */}
              <div className="mb-6 grid gap-3 sm:grid-cols-2">
                {/* Monthly */}
                <div className="rounded-xl border border-stone-warm bg-white p-4 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wide text-bark-light">
                    Monthly
                  </p>
                  <p className="mt-1 text-2xl font-extrabold text-forest-dark">
                    $8<span className="text-sm font-normal">/mo</span>
                  </p>
                  <a
                    href={STRIPE_LINKS.monthly}
                    className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full bg-forest px-4 py-2.5 text-xs font-semibold text-white no-underline transition-all hover:bg-forest-dark"
                  >
                    Plan Your Trip
                  </a>
                </div>

                {/* Yearly */}
                <div className="relative rounded-xl border-2 border-amber/40 bg-amber/5 p-4 text-center">
                  <span className="absolute -top-2.5 right-2 rounded-full bg-green-600 px-2 py-0.5 text-[10px] font-bold text-white">
                    Save $46
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-wide text-amber-dark">
                    Yearly
                  </p>
                  <p className="mt-1 text-2xl font-extrabold text-forest-dark">
                    $50<span className="text-sm font-normal">/yr</span>
                  </p>
                  <p className="text-[11px] text-bark-light">
                    Just $4.17/month
                  </p>
                  <a
                    href={STRIPE_LINKS.yearly}
                    className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-amber to-amber-light px-4 py-2.5 text-xs font-semibold text-white no-underline shadow-sm transition-all hover:from-amber-dark hover:to-amber hover:shadow-md"
                  >
                    Go Annual
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Starter Kit Upsell */}
      <section className="bg-stone-warm px-4 py-14 sm:px-6 sm:py-18">
        <div className="mx-auto max-w-3xl">
          <div className="overflow-hidden rounded-2xl border-2 border-forest/20 bg-white p-8 shadow-md sm:p-10">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-8">
              <div className="flex-shrink-0 text-5xl sm:text-6xl">📚</div>
              <div className="text-center sm:text-left">
                <span className="inline-block rounded-full bg-forest/10 px-3 py-1 text-xs font-semibold text-forest-dark">
                  Digital Guide
                </span>
                <h3 className="mt-3 text-2xl font-bold text-forest-dark sm:text-3xl">
                  The Complete Camping Starter Kit
                </h3>
                <p className="mt-3 leading-relaxed text-bark-light">
                  All 7 in-depth camping guides in one beautiful, printable
                  PDF. Perfect for offline reading at the campsite — no phone
                  battery, no cell service, no problem. One-time purchase,
                  yours forever.
                </p>
                <div className="mt-4 mb-5">
                  <span className="text-3xl font-extrabold text-forest-dark">
                    $19
                  </span>
                  <span className="ml-2 text-sm text-bark-light">
                    one-time · lifetime access
                  </span>
                </div>
                <a
                  href={STRIPE_LINKS.starterKit}
                  className="inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3 text-sm font-semibold text-white no-underline shadow-md shadow-forest/20 transition-all hover:bg-forest-dark hover:shadow-lg"
                >
                  Buy Now
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-10 text-center text-3xl font-bold text-forest-dark sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border border-stone-warm/80 bg-white shadow-sm"
              >
                <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-sm font-semibold text-bark transition-colors hover:text-forest-dark">
                  {faq.q}
                  <span
                    className="ml-4 text-lg text-bark-light transition-transform duration-200 group-open:rotate-180"
                    aria-hidden="true"
                  >
                    ▾
                  </span>
                </summary>
                <div className="border-t border-stone-warm/60 px-6 pb-5 pt-3 text-sm leading-relaxed text-bark-light">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-forest px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to unlock the full experience?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/80">
            Join CampCraft Premium and get unlimited trips, meal planning,
            and weather-aware tips. Cancel anytime.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={STRIPE_LINKS.yearly}
              className="inline-flex items-center gap-2 rounded-full bg-amber px-8 py-3.5 text-lg font-semibold text-white shadow-lg shadow-amber/30 no-underline transition-all hover:bg-amber-dark hover:shadow-xl"
            >
              Go Premium — $50/year
              <span aria-hidden="true">✨</span>
            </a>
            <a
              href={STRIPE_LINKS.monthly}
              className="text-sm font-medium text-white/70 no-underline transition-colors hover:text-white"
            >
              Or start monthly at $8/mo →
            </a>
          </div>
        </div>
      </section>

      {/* Footer spacer */}
      <footer className="bg-bark px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-6xl text-center text-sm text-white/50">
          CampCraft — Making the outdoors accessible to everyone
        </div>
      </footer>
    </main>
  );
}
