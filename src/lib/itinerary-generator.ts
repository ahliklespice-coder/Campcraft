/**
 * CampCraft Itinerary Generator
 *
 * Pure TypeScript module that generates a personalized day-by-day camping
 * itinerary based on user inputs. No external API calls — all template-based.
 */

// ── Types ──────────────────────────────────────────────────────────────────

export type ExperienceLevel = "first-time" | "been-a-few-times" | "pretty-experienced";
export type TripStyle = "relaxed" | "adventure" | "family";

export interface TripInput {
  destination: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  adults: number;
  children: number;
  experienceLevel: ExperienceLevel;
  tripStyle?: TripStyle;
}

export interface DayPlan {
  dayNumber: number;
  label: string;
  morning: Activity;
  afternoon: Activity;
  evening: Activity;
}

export interface Activity {
  emoji: string;
  title: string;
  description: string;
}

export interface Itinerary {
  summary: string;
  days: DayPlan[];
  weatherReminder: string;
  beginnerTip: string | null;
  totalNights: number;
  totalDays: number;
  destination: string;
  adults: number;
  children: number;
  experienceLevel: ExperienceLevel;
  tripStyle: TripStyle | null;
}

// ── Helpers ────────────────────────────────────────────────────────────────

/** Calculate the number of nights between two ISO date strings */
function calculateNights(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffMs = end.getTime() - start.getTime();
  const diffDays = Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1);
  return Math.max(1, diffDays);
}

/** Parse a date string into a human-readable format like "June 14" */
function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00"); // avoid timezone shifts
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
}

/** Simple seeded pseudo-random number [0, 1) based on a string */
function seededRandom(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return (Math.abs(hash) % 1000) / 1000;
}

/** Pick a random element from an array using a seed for reproducibility */
function pickFrom<T>(arr: readonly T[], seed: string): T {
  const idx = Math.floor(seededRandom(seed) * arr.length);
  return arr[idx];
}

// ── Activity Templates ─────────────────────────────────────────────────────

interface ActivityTemplate {
  title: string;
  description: string;
  emoji: string;
  tags: ExperienceLevel[];
  styles: TripStyle[];
}

const MORNING_ACTIVITIES: ActivityTemplate[] = [
  // First-time friendly
  {
    title: "Wake Up & Coffee at Camp",
    description:
      "Ease into the morning with a hot cup of coffee or cocoa at your campsite. Take your time — no rush! Listen to the birds and enjoy the crisp morning air.",
    emoji: "☕",
    tags: ["first-time", "been-a-few-times", "pretty-experienced"],
    styles: ["relaxed", "adventure", "family"],
  },
  {
    title: "Easy Nature Walk",
    description:
      "A gentle 1–2 mile walk near camp to stretch your legs and spot wildlife. Perfect for warming up and getting comfortable with the trails.",
    emoji: "🚶",
    tags: ["first-time", "been-a-few-times"],
    styles: ["relaxed", "family"],
  },
  {
    title: "Camp Breakfast Cook-Off",
    description:
      "Fire up the camp stove and make a hearty breakfast together — pancakes, bacon, and fresh fruit. A fun way to start the day, especially with kids!",
    emoji: "🥞",
    tags: ["first-time", "been-a-few-times", "pretty-experienced"],
    styles: ["family", "relaxed"],
  },
  // More adventurous
  {
    title: "Sunrise Summit Hike",
    description:
      "Rise before dawn and hike to a viewpoint to catch the sunrise over {destination}. The early start is worth every step — bring a headlamp and a thermos.",
    emoji: "🌄",
    tags: ["pretty-experienced", "been-a-few-times"],
    styles: ["adventure"],
  },
  {
    title: "Morning Fishing Session",
    description:
      "Grab your rod and try your luck at the nearest lake or stream. Early morning is prime time for bites, and the water is beautifully still.",
    emoji: "🎣",
    tags: ["been-a-few-times", "pretty-experienced"],
    styles: ["relaxed", "adventure"],
  },
  {
    title: "Trail Run / Power Hike",
    description:
      "Hit a challenging trail for a 3–5 mile morning hike with elevation gain. Get your heart pumping and earn those campfire calories.",
    emoji: "🏃",
    tags: ["pretty-experienced"],
    styles: ["adventure"],
  },
  {
    title: "Scenic Overlook Breakfast",
    description:
      "Pack a breakfast picnic and drive (or hike) to a nearby scenic overlook. Eating with a view makes everything taste better.",
    emoji: "🥐",
    tags: ["first-time", "been-a-few-times", "pretty-experienced"],
    styles: ["relaxed", "family"],
  },
  {
    title: "Kids' Nature Scavenger Hunt",
    description:
      "Create a list of things to find around camp: a pinecone, a feather, animal tracks, a smooth rock. Kids love exploring with a mission!",
    emoji: "🔍",
    tags: ["first-time", "been-a-few-times"],
    styles: ["family"],
  },
];

const AFTERNOON_ACTIVITIES: ActivityTemplate[] = [
  // Easy / first-time
  {
    title: "Short Scenic Trail",
    description:
      "An easy 2–3 mile loop trail with minimal elevation. Take your time, snap photos, and enjoy being surrounded by nature.",
    emoji: "🥾",
    tags: ["first-time", "been-a-few-times"],
    styles: ["relaxed", "family"],
  },
  {
    title: "Lakeside Picnic & Swim",
    description:
      "Head to the nearest lake or swimming hole for a picnic lunch and a refreshing dip. Don't forget the sunscreen and towels!",
    emoji: "🏊",
    tags: ["first-time", "been-a-few-times", "pretty-experienced"],
    styles: ["relaxed", "family"],
  },
  {
    title: "Visitor Center & Junior Ranger",
    description:
      "Stop by the park visitor center to learn about local wildlife and geology. Kids can pick up a Junior Ranger booklet and earn a badge!",
    emoji: "🏛️",
    tags: ["first-time", "been-a-few-times"],
    styles: ["family"],
  },
  {
    title: "Campground Hangout",
    description:
      "A relaxed afternoon at camp — read a book in the hammock, play cards, or nap in the shade. Some of the best camping memories happen doing nothing at all.",
    emoji: "📖",
    tags: ["first-time", "been-a-few-times", "pretty-experienced"],
    styles: ["relaxed", "family"],
  },
  // Moderate / adventurous
  {
    title: "Backcountry Day Hike",
    description:
      "Tackle a 5–8 mile trail into the backcountry. Pack lunch, plenty of water, and a map. The solitude and views are your reward.",
    emoji: "⛰️",
    tags: ["pretty-experienced", "been-a-few-times"],
    styles: ["adventure"],
  },
  {
    title: "Kayak or Canoe Paddle",
    description:
      "Rent a kayak or canoe and explore the lake from the water. Glide along the shoreline and see the landscape from a whole new perspective.",
    emoji: "🛶",
    tags: ["been-a-few-times", "pretty-experienced"],
    styles: ["adventure", "relaxed"],
  },
  {
    title: "Off-Trail Exploration",
    description:
      "Go off the beaten path with map and compass. Navigate to a hidden waterfall or rock formation — just remember to leave no trace.",
    emoji: "🧭",
    tags: ["pretty-experienced"],
    styles: ["adventure"],
  },
  {
    title: "Nature Photography Walk",
    description:
      "Grab your camera (or phone) and spend the afternoon capturing wildflowers, wildlife, and landscapes. Try to find the perfect shot.",
    emoji: "📸",
    tags: ["first-time", "been-a-few-times", "pretty-experienced"],
    styles: ["relaxed"],
  },
  {
    title: "Family Field Games",
    description:
      "Bring out the frisbee, set up a badminton net, or play capture the flag in an open meadow. Running around in the fresh air is good for everyone.",
    emoji: "🪁",
    tags: ["first-time", "been-a-few-times"],
    styles: ["family"],
  },
];

const EVENING_ACTIVITIES: ActivityTemplate[] = [
  {
    title: "Campfire Dinner",
    description:
      "Cook dinner over the campfire — foil packet meals, hot dogs on a stick, or cast iron chili. Food just tastes better outdoors.",
    emoji: "🔥",
    tags: ["first-time", "been-a-few-times", "pretty-experienced"],
    styles: ["relaxed", "adventure", "family"],
  },
  {
    title: "S'mores & Storytelling",
    description:
      "No camping trip is complete without s'mores! Gather around the fire, toast marshmallows, and share your favorite stories or campfire tales.",
    emoji: "🍫",
    tags: ["first-time", "been-a-few-times", "pretty-experienced"],
    styles: ["relaxed", "adventure", "family"],
  },
  {
    title: "Stargazing Session",
    description:
      "Once it's fully dark, lay out a blanket and look up. Away from city lights, you'll see more stars than you imagined. Try a stargazing app to identify constellations.",
    emoji: "⭐",
    tags: ["first-time", "been-a-few-times", "pretty-experienced"],
    styles: ["relaxed", "family"],
  },
  {
    title: "Sunset at the Overlook",
    description:
      "Hike or drive to a west-facing overlook for golden hour. Bring a snack, sit quietly, and watch the sky transform into brilliant oranges and pinks.",
    emoji: "🌅",
    tags: ["first-time", "been-a-few-times", "pretty-experienced"],
    styles: ["relaxed", "adventure"],
  },
  {
    title: "Night Hike",
    description:
      "Explore a familiar trail by headlamp — it's a completely different world after dark. Listen for owls, watch for bats, and enjoy the silence.",
    emoji: "🔦",
    tags: ["been-a-few-times", "pretty-experienced"],
    styles: ["adventure"],
  },
  {
    title: "Campfire Games & Cards",
    description:
      "Break out the deck of cards or a board game by lantern light. Go Fish, Uno, or a camping-themed trivia challenge keeps everyone entertained.",
    emoji: "🃏",
    tags: ["first-time", "been-a-few-times"],
    styles: ["family"],
  },
  {
    title: "Glow Stick Dance Party",
    description:
      "Crack open some glow sticks and have a mini dance party at camp. Kids absolutely love this, and honestly, so do adults.",
    emoji: "💃",
    tags: ["first-time", "been-a-few-times"],
    styles: ["family"],
  },
  {
    title: "Quiet Campfire Reflection",
    description:
      "Wind down with a quiet moment by the fire. Journal about your day, sketch the landscape, or just sit and be present. Some days that's enough.",
    emoji: "📓",
    tags: ["first-time", "been-a-few-times", "pretty-experienced"],
    styles: ["relaxed"],
  },
];

// ── Day Labels ─────────────────────────────────────────────────────────────

const DAY_LABELS: Record<number, string[]> = {
  1: ["Arrival & Settling In", "Welcome to Camp", "First Day Magic"],
  2: ["Explore & Discover", "Into the Wild", "Finding Your Groove"],
  3: ["Deep in Adventure", "Peak Experience", "Nature Immersion"],
  4: ["Wild & Free", "Off the Beaten Path", "The Heart of the Trip"],
  5: ["Seasoned Explorer", "Living the Camp Life", "Total Immersion"],
  6: ["Veteran Status", "Mountain Time", "In the Rhythm of Nature"],
  7: ["The Grand Finale", "Last Full Day", "Soak It All In"],
};

function getDayLabel(dayNumber: number, totalDays: number): string {
  if (dayNumber === totalDays) return "Departure Day";
  if (dayNumber === totalDays - 1 && totalDays > 2) return DAY_LABELS[7]?.[0] ?? "Winding Down";
  const options = DAY_LABELS[dayNumber] ?? [
    `Day ${dayNumber} Adventures`,
    `Day ${dayNumber} — More to Explore`,
    `Day ${dayNumber} Highlights`,
  ];
  return pickFrom(options, `label-${dayNumber}`);
}

// ── Generator ──────────────────────────────────────────────────────────────

/**
 * Filter activity templates to those matching the given experience level and trip style.
 */
function filterActivities(
  activities: readonly ActivityTemplate[],
  experience: ExperienceLevel,
  style: TripStyle | undefined,
): ActivityTemplate[] {
  return activities.filter((a) => {
    const expMatch = a.tags.includes(experience);
    const styleMatch = !style || a.styles.includes(style);
    return expMatch && styleMatch;
  });
}

/**
 * Build a single activity from a template, filling in the destination.
 */
function buildActivity(template: ActivityTemplate, destination: string): Activity {
  return {
    emoji: template.emoji,
    title: template.title,
    description: template.description.replace("{destination}", destination),
  };
}

/**
 * Generate a day-by-day itinerary from trip inputs.
 */
export function generateItinerary(input: TripInput): Itinerary {
  const totalDays = calculateNights(input.startDate, input.endDate);
  const totalNights = totalDays - 1;
  const { destination, adults, children, experienceLevel, tripStyle } = input;

  // Filter activity pools
  const mornings = filterActivities(MORNING_ACTIVITIES, experienceLevel, tripStyle);
  const afternoons = filterActivities(AFTERNOON_ACTIVITIES, experienceLevel, tripStyle);
  const evenings = filterActivities(EVENING_ACTIVITIES, experienceLevel, tripStyle);

  // Fallback: if no activities match (shouldn't happen but be safe), use all
  const safeMornings = mornings.length > 0 ? mornings : MORNING_ACTIVITIES;
  const safeAfternoons = afternoons.length > 0 ? afternoons : AFTERNOON_ACTIVITIES;
  const safeEvenings = evenings.length > 0 ? evenings : EVENING_ACTIVITIES;

  const days: DayPlan[] = [];

  for (let d = 1; d <= totalDays; d++) {
    const label = getDayLabel(d, totalDays);

    // Use different seeds per slot to avoid same activity across slots
    const morningSeed = `morning-${d}-${destination}`;
    const afternoonSeed = `afternoon-${d}-${destination}`;
    const eveningSeed = `evening-${d}-${destination}`;

    // Pick activities, trying to avoid duplicates within the same day
    const morningPick = pickFrom(safeMornings, morningSeed);
    let afternoonPick = pickFrom(safeAfternoons, afternoonSeed);
    let eveningPick = pickFrom(safeEvenings, eveningSeed);

    // Simple dedup: if afternoon title matches morning, pick next
    let retries = 0;
    while (afternoonPick.title === morningPick.title && retries < 5) {
      afternoonPick = pickFrom(safeAfternoons, `${afternoonSeed}-retry-${retries}`);
      retries++;
    }
    retries = 0;
    while (
      (eveningPick.title === morningPick.title || eveningPick.title === afternoonPick.title) &&
      retries < 5
    ) {
      eveningPick = pickFrom(safeEvenings, `${eveningSeed}-retry-${retries}`);
      retries++;
    }

    days.push({
      dayNumber: d,
      label,
      morning: buildActivity(morningPick, destination),
      afternoon: buildActivity(afternoonPick, destination),
      evening: buildActivity(eveningPick, destination),
    });
  }

  // ── Summary ──
  const startFormatted = formatDate(input.startDate);
  const endFormatted = formatDate(input.endDate);
  const groupStr = buildGroupString(adults, children);
  const styleLabel = tripStyle ? ` · ${capitalize(tripStyle)}` : "";

  const summary = `Your ${destination} getaway${styleLabel} — ${totalDays} ${totalDays === 1 ? "day" : "days"}, ${groupStr}, ${startFormatted} to ${endFormatted}`;

  // ── Weather reminder ──
  const weatherReminder = `🌦️ Don't forget to check the weather for ${destination} around ${startFormatted}! Mountain and forest weather can change quickly — pack layers and rain gear just in case.`;

  // ── Beginner tip ──
  const beginnerTip =
    experienceLevel === "first-time"
      ? `💡 First-time camper tip: Lay out all your gear at home before you leave. Practice setting up your tent in the backyard or living room — it's way easier than figuring it out in the dark at camp! And remember: every experienced camper started exactly where you are now. You've got this! 🏕️`
      : null;

  return {
    summary,
    days,
    weatherReminder,
    beginnerTip,
    totalNights: Math.max(0, totalNights),
    totalDays,
    destination,
    adults,
    children,
    experienceLevel,
    tripStyle: tripStyle ?? null,
  };
}

// ── String helpers ──

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function buildGroupString(adults: number, children: number): string {
  const parts: string[] = [];
  if (adults > 0) parts.push(`${adults} ${adults === 1 ? "adult" : "adults"}`);
  if (children > 0) parts.push(`${children} ${children === 1 ? "child" : "children"}`);
  return parts.join(", ") || "solo";
}

/**
 * Format experience level for display.
 */
export function formatExperienceLevel(level: ExperienceLevel): string {
  switch (level) {
    case "first-time":
      return "First time camper";
    case "been-a-few-times":
      return "Been a few times";
    case "pretty-experienced":
      return "Pretty experienced";
  }
}

/**
 * Format trip style for display.
 */
export function formatTripStyle(style: TripStyle): string {
  switch (style) {
    case "relaxed":
      return "Relaxed getaway";
    case "adventure":
      return "Adventure packed";
    case "family":
      return "Family fun";
  }
}
