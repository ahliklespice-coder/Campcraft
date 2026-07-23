import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/guides")({
  component: GuidesHub,
});

interface GuideCard {
  emoji: string;
  title: string;
  description: string;
  readTime: string;
  to: string;
  category: string;
}

const guideCards: GuideCard[] = [
  {
    emoji: "🏕️",
    title: "Your First Camping Trip",
    description:
      "A step-by-step guide for absolute beginners — from choosing a campsite to setting up camp like a pro.",
    readTime: "~5 min",
    to: "/guides/first-trip",
    category: "Getting Started",
  },
  {
    emoji: "👨‍👩‍👧‍👦",
    title: "Camping with Kids",
    description:
      "Age-appropriate tips, family-friendly activities, and packing advice to make camping fun for the whole crew.",
    readTime: "~5 min",
    to: "/guides/family-camping",
    category: "Getting Started",
  },
  {
    emoji: "🔥",
    title: "Mastering the Campfire",
    description:
      "Fire safety, building techniques, firewood selection, and campfire cooking — everything you need to know.",
    readTime: "~6 min",
    to: "/guides/campfire",
    category: "Essential Skills",
  },
  {
    emoji: "⛺",
    title: "Tent Setup 101",
    description:
      "Find the perfect tent spot, pitch it confidently, and weatherproof like a seasoned camper.",
    readTime: "~4 min",
    to: "/guides/tent-setup",
    category: "Essential Skills",
  },
  {
    emoji: "🎒",
    title: "The Essential Gear List",
    description:
      "The 10 camping essentials explained for beginners — what to buy, what to borrow, and how to save money.",
    readTime: "~5 min",
    to: "/guides/essential-gear",
    category: "Gear",
  },
  {
    emoji: "🌿",
    title: "Leave No Trace",
    description:
      "Learn the 7 principles that protect our wild spaces — practical tips every camper should know.",
    readTime: "~5 min",
    to: "/guides/leave-no-trace",
    category: "Safety & Responsibility",
  },
  {
    emoji: "🌦️",
    title: "Reading the Weather",
    description:
      "How to check forecasts, spot changing conditions, and stay safe in lightning, cold, or heat.",
    readTime: "~4 min",
    to: "/guides/weather",
    category: "Safety & Responsibility",
  },
];

const categories = ["Getting Started", "Essential Skills", "Gear", "Safety & Responsibility"];

function GuidesHub() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      {/* Hero */}
      <section className="mb-14 text-center">
        <span className="inline-block rounded-full bg-forest/10 px-4 py-1.5 text-sm font-medium text-forest-dark">
          📖 Educational Guides
        </span>
        <h1 className="mx-auto mt-5 max-w-2xl text-3xl font-extrabold text-forest-dark sm:text-4xl">
          Learn to Camp with Confidence
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-bark-light">
          Friendly, practical guides that walk you through everything — from
          your first night in a tent to campfire cooking and beyond. No
          experience needed, we've all been there!
        </p>
      </section>

      {/* Guides by Category */}
      {categories.map((category) => {
        const cards = guideCards.filter((g) => g.category === category);
        if (cards.length === 0) return null;
        return (
          <section key={category} className="mb-12">
            <h2 className="mb-5 text-xl font-bold text-forest-dark sm:text-2xl">
              {category}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((card) => (
                <Link
                  key={card.to}
                  to={card.to}
                  className="group flex flex-col rounded-2xl border border-stone-warm/80 bg-white p-6 shadow-sm no-underline transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  <span className="mb-3 text-4xl" aria-hidden="true">
                    {card.emoji}
                  </span>
                  <div className="flex-1">
                    <h3 className="mb-1.5 text-lg font-bold text-forest-dark group-hover:text-forest transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-bark-light">
                      {card.description}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-medium text-bark-light">
                      {card.readTime} read
                    </span>
                    <span className="text-sm font-medium text-amber group-hover:translate-x-0.5 transition-transform">
                      Read guide →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      {/* Starter Kit Upsell */}
      <section className="mb-12">
        <div className="overflow-hidden rounded-2xl border-2 border-forest/20 bg-gradient-to-br from-forest/5 to-stone-warm/50 p-6 sm:p-8">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
            <span className="flex-shrink-0 text-4xl">📚</span>
            <div className="text-center sm:text-left">
              <span className="inline-block rounded-full bg-forest/10 px-3 py-1 text-xs font-semibold text-forest-dark">
                Digital Guide
              </span>
              <h3 className="mt-2 text-lg font-bold text-forest-dark">
                Want offline access? Get The Complete Camping Starter Kit
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-bark-light">
                All 7 guides in one downloadable PDF — perfect for reading at
                the campsite when there's no cell service. $19, one-time purchase.
              </p>
              <div className="mt-4">
                <a
                  href="https://buy.stripe.com/14AcN7cytgRPfwbaLNfjG05"
                  className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-2.5 text-sm font-semibold text-white no-underline shadow-md shadow-forest/20 transition-all hover:bg-forest-dark hover:shadow-lg"
                >
                  Buy Now — $19
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mt-8 overflow-hidden rounded-2xl bg-gradient-to-br from-forest to-forest-dark p-8 text-center sm:p-10">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Ready to put it all into practice?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-white/80">
          Plan your first camping trip with our smart trip planner — customized
          for your group and experience level.
        </p>
        <Link
          to="/plan"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-amber/30 no-underline transition-all hover:bg-amber-dark"
        >
          Plan a Trip
          <span aria-hidden="true">🏕️</span>
        </Link>
      </section>
    </main>
  );
}
