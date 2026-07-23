/**
 * CampCraft Packing Checklist Generator
 *
 * Pure TypeScript module that generates a personalized packing checklist
 * based on trip parameters. Adapts to group composition, duration,
 * experience level, and trip style.
 */

import type { ExperienceLevel, TripStyle } from "./itinerary-generator";

// ── Types ──────────────────────────────────────────────────────────────────

export interface PackingItem {
  id: string;
  name: string;
  category: ChecklistCategory;
  essential: boolean;
  tip?: string;
  forBeginners?: boolean;
  requiresKids?: boolean;
  minDays?: number;
  forStyle?: TripStyle | TripStyle[];
  affiliateUrl?: string;
}

// ── Affiliate link registry ──────────────────────────────────────────────

const AFFILIATE_LINKS: Record<string, string> = {
  tent: "https://www.rei.com/c/tents?ir=category%3Atents",
  "sleeping-bag": "https://www.rei.com/c/sleeping-bags?ir=category%3Asleeping-bags",
  stove: "https://www.rei.com/c/camp-stoves?ir=category%3Acamp-stoves",
  headlamp: "https://www.rei.com/c/headlamps?ir=category%3Aheadlamps",
  "water-filter": "https://www.rei.com/c/water-treatment?ir=category%3Awater-treatment",
  "first-aid": "https://www.rei.com/c/first-aid-kits?ir=category%3Afirst-aid-kits",
  "sleeping-pad": "https://www.rei.com/c/sleeping-pads?ir=category%3Asleeping-pads",
  "camp-chair": "https://www.rei.com/c/camp-chairs?ir=category%3Acamp-chairs",
};

export type ChecklistCategory =
  | "shelter"
  | "clothing"
  | "kitchen"
  | "gear"
  | "personal"
  | "extras";

export interface CategoryMeta {
  key: ChecklistCategory;
  emoji: string;
  label: string;
}

export const CATEGORIES: CategoryMeta[] = [
  { key: "shelter", emoji: "🏕️", label: "Shelter & Sleeping" },
  { key: "clothing", emoji: "👕", label: "Clothing" },
  { key: "kitchen", emoji: "🍳", label: "Kitchen & Food" },
  { key: "gear", emoji: "🔦", label: "Gear & Tools" },
  { key: "personal", emoji: "🧴", label: "Personal Care" },
  { key: "extras", emoji: "🎒", label: "Extras & Comfort" },
];

export interface TripParams {
  destination: string;
  adults: number;
  children: number;
  experienceLevel: ExperienceLevel;
  tripStyle?: TripStyle;
  totalDays: number;
}

export interface PackingChecklist {
  params: TripParams;
  items: PackingItem[];
  categories: Map<ChecklistCategory, PackingItem[]>;
}

// ── Item Definitions ───────────────────────────────────────────────────────

/**
 * All packing items with metadata. Items are tagged with conditions
 * that determine whether they appear in a specific checklist.
 */
const ALL_ITEMS: PackingItem[] = [
  // ── Shelter & Sleeping ─────────────────────────────────────────────────
  {
    id: "tent",
    name: "Tent (with rainfly)",
    category: "shelter",
    essential: true,
    tip: "Practice setting it up at home first! Make sure all poles and stakes are in the bag.",
    forBeginners: true,
  },
  {
    id: "tent-footprint",
    name: "Tent footprint / ground tarp",
    category: "shelter",
    essential: true,
    tip: "Protects your tent floor from moisture and sharp objects. A cheap tarp works fine.",
  },
  {
    id: "sleeping-bag",
    name: "Sleeping bag (temperature-rated)",
    category: "shelter",
    essential: true,
    tip: "Check the overnight low and make sure your bag is rated at least 10°F below that.",
    forBeginners: true,
  },
  {
    id: "sleeping-pad",
    name: "Sleeping pad or air mattress",
    category: "shelter",
    essential: true,
    tip: "This isn't just for comfort — it insulates you from the cold ground!",
    forBeginners: true,
  },
  {
    id: "pillow",
    name: "Camp pillow (or stuff sack filled with clothes)",
    category: "shelter",
    essential: false,
  },
  {
    id: "extra-blanket",
    name: "Extra blanket or sleeping bag liner",
    category: "shelter",
    essential: false,
    tip: "Great for cold sleepers or unexpectedly chilly nights.",
  },
  {
    id: "hammock",
    name: "Hammock & straps",
    category: "shelter",
    essential: false,
    forStyle: ["relaxed"],
    tip: "Perfect for afternoon naps between the trees.",
  },
  {
    id: "tent-repair",
    name: "Tent repair kit (duct tape, extra stakes)",
    category: "shelter",
    essential: false,
    tip: "A small roll of duct tape can fix almost anything in a pinch.",
    forBeginners: true,
  },
  {
    id: "mallet",
    name: "Mallet or hammer (for stakes)",
    category: "shelter",
    essential: false,
    tip: "Hard ground can bend stakes — a mallet saves your hands.",
  },
  {
    id: "kids-sleeping-bag",
    name: "Kids' sleeping bag",
    category: "shelter",
    essential: true,
    requiresKids: true,
    tip: "Kid-sized bags keep little ones warmer than adult bags.",
  },
  {
    id: "kids-blanket",
    name: "Favorite blanket or stuffed animal",
    category: "shelter",
    essential: false,
    requiresKids: true,
    tip: "A familiar comfort item helps kids sleep better in a new environment.",
  },
  {
    id: "nightlight",
    name: "Small nightlight or glow stick (for kids)",
    category: "shelter",
    essential: false,
    requiresKids: true,
    tip: "Helps little ones who are afraid of the dark feel safe in the tent.",
  },

  // ── Clothing ────────────────────────────────────────────────────────────
  {
    id: "base-layers",
    name: "Moisture-wicking base layers (top & bottom)",
    category: "clothing",
    essential: true,
    tip: "Avoid cotton — it stays wet and makes you cold. Synthetics or merino wool are best.",
    forBeginners: true,
  },
  {
    id: "mid-layer",
    name: "Insulating mid-layer (fleece or puffy jacket)",
    category: "clothing",
    essential: true,
  },
  {
    id: "rain-jacket",
    name: "Rain jacket or waterproof shell",
    category: "clothing",
    essential: true,
    tip: "Even if rain isn't forecast, mountain weather can change in minutes.",
    forBeginners: true,
  },
  {
    id: "rain-pants",
    name: "Rain pants",
    category: "clothing",
    essential: false,
    forStyle: ["adventure"],
    tip: "Essential for staying dry on rainy hikes.",
  },
  {
    id: "hiking-pants",
    name: "Hiking pants or shorts (2 pairs)",
    category: "clothing",
    essential: true,
  },
  {
    id: "t-shirts",
    name: "T-shirts (1 per day, quick-dry preferred)",
    category: "clothing",
    essential: true,
  },
  {
    id: "extra-socks",
    name: "Extra socks (wool or synthetic, 2+ extra pairs)",
    category: "clothing",
    essential: true,
    tip: "Fresh socks are a morale booster. Wool stays warm even when damp.",
    forBeginners: true,
  },
  {
    id: "underwear",
    name: "Underwear (1 per day + 1 extra)",
    category: "clothing",
    essential: true,
  },
  {
    id: "camp-shoes",
    name: "Camp shoes (sandals, crocs, or slip-ons)",
    category: "clothing",
    essential: false,
    tip: "Your feet will thank you after a long day in hiking boots.",
  },
  {
    id: "hiking-boots",
    name: "Hiking boots or sturdy trail shoes",
    category: "clothing",
    essential: true,
    tip: "Break them in before your trip — blisters can ruin a great hike!",
    forBeginners: true,
  },
  {
    id: "hat",
    name: "Wide-brimmed hat or cap",
    category: "clothing",
    essential: true,
    tip: "Sun protection for your face and neck.",
  },
  {
    id: "beanie",
    name: "Warm beanie (for cold nights)",
    category: "clothing",
    essential: false,
    tip: "A lot of body heat escapes through your head — a beanie at night makes a big difference.",
  },
  {
    id: "gloves",
    name: "Light gloves",
    category: "clothing",
    essential: false,
    tip: "Mornings and evenings can be surprisingly chilly, even in summer.",
  },
  {
    id: "swimwear",
    name: "Swimsuit",
    category: "clothing",
    essential: false,
    forStyle: ["relaxed", "family"],
  },
  {
    id: "kids-extra-clothes",
    name: "Extra set of clothes for each child",
    category: "clothing",
    essential: true,
    requiresKids: true,
    tip: "Kids get dirty, wet, and messy — plan for at least one full outfit change per day.",
  },
  {
    id: "kids-rain-gear",
    name: "Kids' rain jacket & rain boots",
    category: "clothing",
    essential: false,
    requiresKids: true,
    tip: "Puddle jumping is a core camping activity!",
  },

  // ── Kitchen & Food ──────────────────────────────────────────────────────
  {
    id: "stove",
    name: "Camp stove & fuel canisters",
    category: "kitchen",
    essential: true,
    tip: "Double-check your fuel level before leaving. Cold weather uses more fuel.",
    forBeginners: true,
  },
  {
    id: "lighter",
    name: "Lighter or waterproof matches (2+ sources)",
    category: "kitchen",
    essential: true,
    tip: "Always have a backup — a simple lighter can fail when damp.",
    forBeginners: true,
  },
  {
    id: "cookware",
    name: "Pot, pan, and cooking utensils",
    category: "kitchen",
    essential: true,
  },
  {
    id: "plates-cups",
    name: "Plates, bowls, cups, and sporks",
    category: "kitchen",
    essential: true,
    tip: "Reusable is better for the environment. One set per person.",
  },
  {
    id: "cooler",
    name: "Cooler with ice or ice packs",
    category: "kitchen",
    essential: true,
    tip: "Block ice lasts longer than cubes. Keep the cooler in the shade.",
  },
  {
    id: "food-storage",
    name: "Food storage containers or bear canister",
    category: "kitchen",
    essential: true,
    tip: "In bear country, use an approved bear canister or hang a bear bag. Never store food in your tent!",
    forBeginners: true,
  },
  {
    id: "water-containers",
    name: "Water containers (1 gallon per person per day)",
    category: "kitchen",
    essential: true,
    tip: "Bring more than you think you'll need. Hydration is critical.",
    forBeginners: true,
  },
  {
    id: "water-filter",
    name: "Water filter or purification tablets",
    category: "kitchen",
    essential: false,
    forStyle: ["adventure"],
    tip: "If you're near a water source, a filter lets you refill without carrying all your water.",
  },
  {
    id: "camp-suds",
    name: "Biodegradable soap & sponge",
    category: "kitchen",
    essential: true,
    tip: "Wash dishes at least 200 feet from water sources. Pack out food scraps.",
  },
  {
    id: "dish-towel",
    name: "Dish towel and paper towels",
    category: "kitchen",
    essential: true,
  },
  {
    id: "trash-bags",
    name: "Trash bags (heavy-duty, extra)",
    category: "kitchen",
    essential: true,
    tip: "Pack it in, pack it out. Bring extra bags — they have many uses.",
    forBeginners: true,
  },
  {
    id: "coffee-maker",
    name: "Coffee maker (french press or pour-over)",
    category: "kitchen",
    essential: false,
    tip: "For many campers, this is non-negotiable.",
  },
  {
    id: "tablecloth",
    name: "Tablecloth & clips",
    category: "kitchen",
    essential: false,
    forStyle: ["family", "relaxed"],
  },
  {
    id: "foil-ziplocs",
    name: "Aluminum foil & ziplock bags",
    category: "kitchen",
    essential: false,
    tip: "Great for foil-packet meals and storing leftovers.",
  },
  {
    id: "kid-cups",
    name: "Kids' cups (spill-proof)",
    category: "kitchen",
    essential: false,
    requiresKids: true,
  },

  // ── Gear & Tools ────────────────────────────────────────────────────────
  {
    id: "headlamp",
    name: "Headlamp or flashlight (with extra batteries)",
    category: "gear",
    essential: true,
    tip: "A headlamp keeps your hands free. Test the batteries before you leave!",
    forBeginners: true,
  },
  {
    id: "first-aid",
    name: "First aid kit (well-stocked)",
    category: "gear",
    essential: true,
    tip: "Include bandages, antiseptic wipes, pain relievers, tweezers, and any personal medications.",
    forBeginners: true,
  },
  {
    id: "multitool",
    name: "Multi-tool or knife",
    category: "gear",
    essential: true,
    tip: "You'll use this more than you expect — opening packages, cutting cord, food prep.",
  },
  {
    id: "fire-starters",
    name: "Fire starters (dryer lint, cotton balls in Vaseline, fire logs)",
    category: "gear",
    essential: false,
    tip: "Natural tinder can be hard to find. Homemade fire starters are cheap and reliable.",
    forBeginners: true,
  },
  {
    id: "navigation",
    name: "Map & compass (or offline GPS app)",
    category: "gear",
    essential: true,
    tip: "Don't rely on cell service — download offline maps before you go.",
    forBeginners: true,
  },
  {
    id: "sunscreen",
    name: "Sunscreen (SPF 30+, broad spectrum)",
    category: "gear",
    essential: true,
    tip: "Reapply every 2 hours, especially if you're sweating or swimming.",
  },
  {
    id: "bug-spray",
    name: "Insect repellent",
    category: "gear",
    essential: true,
    tip: "DEET or picaridin are most effective. Treat clothes with permethrin for ticks.",
  },
  {
    id: "backpack",
    name: "Daypack or hydration pack",
    category: "gear",
    essential: true,
  },
  {
    id: "dry-bags",
    name: "Dry bags or stuff sacks (for organizing & waterproofing)",
    category: "gear",
    essential: false,
    forStyle: ["adventure"],
  },
  {
    id: "paracord",
    name: "Paracord or rope (50 ft)",
    category: "gear",
    essential: false,
    tip: "Useful for bear bags, clothesline, tarp shelters, and a hundred other things.",
  },
  {
    id: "duct-tape",
    name: "Duct tape (small roll or wrapped on trekking pole)",
    category: "gear",
    essential: false,
    tip: "Gear repair, blister prevention, first aid splints — it does everything.",
  },
  {
    id: "trekking-poles",
    name: "Trekking poles",
    category: "gear",
    essential: false,
    forStyle: ["adventure"],
    tip: "Save your knees on descents and help with balance on rough terrain.",
  },
  {
    id: "camp-chair",
    name: "Camp chair",
    category: "gear",
    essential: false,
    forStyle: ["relaxed", "family"],
  },
  {
    id: "lantern",
    name: "Lantern (battery or solar)",
    category: "gear",
    essential: false,
    tip: "Great for lighting the picnic table for evening meals and card games.",
  },
  {
    id: "power-bank",
    name: "Portable power bank",
    category: "gear",
    essential: false,
    tip: "Charge your phone for photos, GPS, and emergencies. Solar chargers are great for longer trips.",
  },
  {
    id: "bear-spray",
    name: "Bear spray (if in bear country)",
    category: "gear",
    essential: false,
    tip: "Know how to use it before you need it. Keep it accessible, not buried in your pack.",
    forBeginners: true,
  },
  {
    id: "whistle",
    name: "Emergency whistle",
    category: "gear",
    essential: false,
    tip: "Three short blasts is the universal distress signal.",
  },

  // ── Personal Care ───────────────────────────────────────────────────────
  {
    id: "toothbrush",
    name: "Toothbrush & toothpaste (biodegradable)",
    category: "personal",
    essential: true,
  },
  {
    id: "toilet-paper",
    name: "Toilet paper & small trowel (for digging cat holes)",
    category: "personal",
    essential: true,
    tip: "If there's no restroom, dig a hole 6-8 inches deep and 200 feet from water. Pack out used TP.",
    forBeginners: true,
  },
  {
    id: "hand-sanitizer",
    name: "Hand sanitizer",
    category: "personal",
    essential: true,
  },
  {
    id: "towel",
    name: "Quick-dry towel (packable)",
    category: "personal",
    essential: true,
    tip: "Regular towels take forever to dry. Microfiber camping towels are lightweight and fast-drying.",
  },
  {
    id: "toiletries",
    name: "Toiletries (soap, deodorant, hair ties, etc.)",
    category: "personal",
    essential: true,
    tip: "Use travel-size containers to save space.",
  },
  {
    id: "medications",
    name: "Personal medications & allergy meds",
    category: "personal",
    essential: true,
    tip: "Bring enough for the trip plus a couple extra days, just in case.",
  },
  {
    id: "lip-balm",
    name: "Lip balm with SPF",
    category: "personal",
    essential: false,
  },
  {
    id: "wet-wipes",
    name: "Biodegradable wet wipes",
    category: "personal",
    essential: false,
    tip: "A quick 'camp shower' when there's no running water. Pack them out!",
  },
  {
    id: "prescription-glasses",
    name: "Prescription glasses / contact lens supplies",
    category: "personal",
    essential: false,
    tip: "Bring a backup pair of glasses if you wear contacts — dry, dusty conditions can be tough.",
  },
  {
    id: "feminine-products",
    name: "Feminine hygiene products",
    category: "personal",
    essential: false,
    tip: "Pack extra — it's better to have them and not need them.",
  },
  {
    id: "kids-sunscreen",
    name: "Kids' sunscreen (SPF 50+, gentle formula)",
    category: "personal",
    essential: true,
    requiresKids: true,
    tip: "Kids' skin is more sensitive. Apply before they start playing.",
  },
  {
    id: "kids-bug-spray",
    name: "Kids' insect repellent (gentle formula)",
    category: "personal",
    essential: false,
    requiresKids: true,
  },
  {
    id: "diapers-wipes",
    name: "Diapers & baby wipes",
    category: "personal",
    essential: false,
    requiresKids: true,
    tip: "Pack more than you think you'll need, and bring sealable bags for disposal.",
  },

  // ── Extras & Comfort ────────────────────────────────────────────────────
  {
    id: "camera",
    name: "Camera or phone (for photos)",
    category: "extras",
    essential: false,
  },
  {
    id: "book",
    name: "Book, e-reader, or journal",
    category: "extras",
    essential: false,
  },
  {
    id: "cards-games",
    name: "Cards or travel games",
    category: "extras",
    essential: false,
    forStyle: ["family", "relaxed"],
  },
  {
    id: "binoculars",
    name: "Binoculars",
    category: "extras",
    essential: false,
    tip: "Great for birdwatching, wildlife spotting, and stargazing.",
  },
  {
    id: "frisbee-ball",
    name: "Frisbee, ball, or outdoor toys",
    category: "extras",
    essential: false,
    forStyle: ["family"],
    tip: "Open space at camp is perfect for catch, frisbee, and running around.",
  },
  {
    id: "glow-sticks",
    name: "Glow sticks",
    category: "extras",
    essential: false,
    requiresKids: true,
    tip: "Kids love them, and they double as a gentle nightlight in the tent.",
  },
  {
    id: "camp-journal",
    name: "Camp journal & pen",
    category: "extras",
    essential: false,
    tip: "Write down your favorite moments — you'll treasure these memories later.",
  },
  {
    id: "star-chart",
    name: "Star chart or stargazing app",
    category: "extras",
    essential: false,
    tip: "Away from city lights, you can see the Milky Way. Identify constellations and planets.",
  },
  {
    id: "guitar-instrument",
    name: "Guitar, ukulele, or harmonica",
    category: "extras",
    essential: false,
    tip: "Campfire songs are a classic for a reason.",
  },
  {
    id: "kids-activity-kit",
    name: "Kids' activity kit (coloring books, nature journal)",
    category: "extras",
    essential: false,
    requiresKids: true,
    tip: "Quiet activities are perfect for rest time or rainy moments.",
  },
  {
    id: "permit-pass",
    name: "Park pass, permit, or reservation confirmation (printed!)",
    category: "extras",
    essential: true,
    tip: "Many parks have no cell service. Print or screenshot your reservations.",
    forBeginners: true,
  },
  {
    id: "cash",
    name: "Cash & ID",
    category: "extras",
    essential: true,
    tip: "Small bills for firewood, campground fees, or an emergency stop at a country store.",
  },
];

// ── Item Registry (for lookup) ─────────────────────────────────────────────

const ITEMS_BY_ID = new Map<string, PackingItem>(
  ALL_ITEMS.map((item) => [item.id, item]),
);

// ── Generator ──────────────────────────────────────────────────────────────

/**
 * Generate a packing checklist filtered by trip parameters.
 */
export function generateChecklist(params: TripParams): PackingChecklist {
  const {
    adults,
    children,
    experienceLevel,
    tripStyle,
    totalDays,
  } = params;

  const isBeginner = experienceLevel === "first-time";
  const hasKids = children > 0;

  const filtered = ALL_ITEMS.filter((item) => {
    // Filter out beginner-only items for non-beginners
    if (item.forBeginners && !isBeginner) return false;

    // Filter out kid items when no kids
    if (item.requiresKids && !hasKids) return false;

    // Filter by minimum days
    if (item.minDays && totalDays < item.minDays) return false;

    // Filter by trip style
    if (item.forStyle && tripStyle) {
      const allowedStyles = Array.isArray(item.forStyle)
        ? item.forStyle
        : [item.forStyle];
      if (!allowedStyles.includes(tripStyle)) return false;
    }

    return true;
  });

  // Attach affiliate links
  const itemsWithAffiliates = filtered.map((item) => ({
    ...item,
    affiliateUrl: AFFILIATE_LINKS[item.id] || item.affiliateUrl,
  }));

  // Group by category
  const categories = new Map<ChecklistCategory, PackingItem[]>();
  for (const cat of CATEGORIES) {
    const catItems = itemsWithAffiliates.filter((item) => item.category === cat.key);
    categories.set(cat.key, catItems);
  }

  return { params, items: itemsWithAffiliates, categories };
}

/**
 * Calculate how many checklist items are for a specific trip.
 * Useful for showing counts before generating.
 */
export function getItemCount(params: TripParams): number {
  return generateChecklist(params).items.length;
}

/**
 * Look up a single item by ID. Useful for the checklist UI
 * if items only need to be rendered after user checks them.
 */
export function getItemById(id: string): PackingItem | undefined {
  return ITEMS_BY_ID.get(id);
}

/**
 * Serialize trip params to URL search params for sharing.
 */
export function serializeTripParams(params: TripParams): URLSearchParams {
  const sp = new URLSearchParams();
  sp.set("destination", params.destination);
  sp.set("adults", String(params.adults));
  sp.set("children", String(params.children));
  sp.set("experienceLevel", params.experienceLevel);
  if (params.tripStyle) sp.set("tripStyle", params.tripStyle);
  sp.set("totalDays", String(params.totalDays));
  return sp;
}

/**
 * Parse trip params from a URL search params or record.
 * Returns null if required fields are missing/invalid.
 */
export function deserializeTripParams(
  raw: Record<string, string | undefined>,
): TripParams | null {
  const destination = raw.destination;
  const adults = parseInt(raw.adults ?? "", 10);
  const children = parseInt(raw.children ?? "0", 10) || 0;
  const experienceLevel = raw.experienceLevel as ExperienceLevel | undefined;
  const totalDays = parseInt(raw.totalDays ?? "", 10);

  if (!destination || isNaN(adults) || adults < 1 || !experienceLevel || isNaN(totalDays) || totalDays < 1) {
    return null;
  }

  const validLevels: ExperienceLevel[] = ["first-time", "been-a-few-times", "pretty-experienced"];
  if (!validLevels.includes(experienceLevel)) return null;

  return {
    destination,
    adults,
    children,
    experienceLevel,
    tripStyle: raw.tripStyle as TripStyle | undefined,
    totalDays,
  };
}
