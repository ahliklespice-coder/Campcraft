import { Link } from "@tanstack/react-router";

interface RelatedGuide {
  to: string;
  emoji: string;
  title: string;
  description: string;
}

interface GuideLayoutProps {
  emoji: string;
  title: string;
  readTime: string;
  category: string;
  children: React.ReactNode;
  nextGuide?: { to: string; title: string };
  relatedGuides: RelatedGuide[];
}

export function GuideLayout({
  emoji,
  title,
  readTime,
  category,
  children,
  nextGuide,
  relatedGuides,
}: GuideLayoutProps) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          to="/guides"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-bark-light no-underline transition-colors hover:text-forest"
        >
          <span aria-hidden="true">←</span> Back to Guides
        </Link>
      </div>

      {/* Header */}
      <header className="mb-10">
        <span className="inline-block rounded-full bg-forest/10 px-3 py-1 text-xs font-semibold tracking-wide text-forest-dark uppercase">
          {category}
        </span>
        <div className="mt-3 flex items-start gap-4">
          <span className="flex-shrink-0 text-5xl" aria-hidden="true">
            {emoji}
          </span>
          <div>
            <h1 className="text-3xl font-bold text-forest-dark sm:text-4xl">
              {title}
            </h1>
            <p className="mt-1 text-sm text-bark-light">{readTime} read</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <article className="guide-content text-[17px] leading-[1.8]">
        {children}
      </article>

      {/* Next Guide */}
      {nextGuide && (
        <div className="mt-14 border-t border-stone-warm pt-8">
          <p className="mb-2 text-sm font-medium text-bark-light">
            Continue learning →
          </p>
          <Link
            to={nextGuide.to}
            className="inline-flex items-center gap-2 text-lg font-semibold text-forest no-underline transition-colors hover:text-forest-dark"
          >
            {nextGuide.title}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}

      {/* Starter Kit Upsell */}
      <div className="mt-12 rounded-2xl border-2 border-forest/20 bg-gradient-to-br from-forest/5 to-stone-warm/50 p-6 sm:p-8">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
          <span className="flex-shrink-0 text-4xl">📚</span>
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-bold text-forest-dark">
              Want offline access? Get The Complete Camping Starter Kit
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-bark-light">
              All 7 guides in one downloadable, print-friendly PDF —
              perfect for reading at the campsite when there's no cell service.
              $19, one-time purchase, yours forever.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3 sm:justify-start">
              <a
                href="https://buy.stripe.com/14AcN7cytgRPfwbaLNfjG05"
                className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white no-underline shadow-md shadow-forest/20 transition-all hover:bg-forest-dark hover:shadow-lg"
              >
                Get the Full Guide — $19
              </a>
              <Link
                to="/guides"
                className="inline-flex items-center gap-2 rounded-full border border-stone-warm bg-white px-5 py-2.5 text-sm font-medium text-bark no-underline transition-colors hover:bg-stone-warm"
              >
                Browse All Guides
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related Guides */}
      <div className="mt-12 border-t border-stone-warm pt-8">
        <h2 className="mb-5 text-xl font-bold text-forest-dark">
          Related Guides
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {relatedGuides.map((guide) => (
            <Link
              key={guide.to}
              to={guide.to}
              className="flex items-start gap-3 rounded-xl border border-stone-warm/80 bg-white p-4 no-underline shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="flex-shrink-0 text-2xl" aria-hidden="true">
                {guide.emoji}
              </span>
              <div>
                <h3 className="font-semibold text-forest-dark transition-colors hover:text-forest">
                  {guide.title}
                </h3>
                <p className="mt-0.5 text-sm text-bark-light">
                  {guide.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
