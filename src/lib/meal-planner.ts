/**
 * CampCraft Meal Planner
 *
 * Pure TypeScript module with camping recipes and a meal plan generator
 * that adapts to trip parameters, group size, experience level, and style.
 */

import type { ExperienceLevel, TripStyle } from "./itinerary-generator";

// ── Types ──────────────────────────────────────────────────────────────────

export type MealCategory = "breakfast" | "lunch" | "dinner" | "snack-dessert";
export type RecipeDifficulty = "easy" | "medium";

export interface Recipe {
  name: string;
  category: MealCategory;
  difficulty: RecipeDifficulty;
  prepTime: number; // minutes
  cookTime: number; // minutes
  equipment: string[];
  ingredients: string[];
  instructions: string[];
  servings: number;
  tags: string[];
  forBeginners: boolean;
  emoji: string;
}

export interface MealSlot {
  timeOfDay: "breakfast" | "lunch" | "dinner" | "snack";
  label: string;
  recipe: Recipe;
  scaledServings: number;
  scaledIngredients: string[];
}

export interface MealPlanDay {
  dayNumber: number;
  label: string;
  meals: MealSlot[];
}

export interface MealPlan {
  summary: string;
  days: MealPlanDay[];
  totalDays: number;
  destination: string;
  adults: number;
  children: number;
  experienceLevel: ExperienceLevel;
  tripStyle: TripStyle | null;
  allIngredients: string[]; // deduped for shopping list
}

export interface MealPlanParams {
  destination: string;
  adults: number;
  children: number;
  experienceLevel: ExperienceLevel;
  tripStyle?: TripStyle;
  totalDays: number;
}

// ── Ingredient Category Map (for shopping list grouping) ────────────────────

export type IngredientCategory =
  | "produce"
  | "protein"
  | "pantry"
  | "dairy"
  | "bread-grains"
  | "snacks"
  | "condiments-spices"
  | "other";

export const INGREDIENT_CATEGORIES: { key: IngredientCategory; emoji: string; label: string }[] = [
  { key: "produce", emoji: "🥬", label: "Fresh Produce" },
  { key: "protein", emoji: "🥩", label: "Protein & Meat" },
  { key: "dairy", emoji: "🧀", label: "Dairy & Eggs" },
  { key: "bread-grains", emoji: "🍞", label: "Bread & Grains" },
  { key: "pantry", emoji: "🥫", label: "Pantry Staples" },
  { key: "snacks", emoji: "🍪", label: "Snacks & Treats" },
  { key: "condiments-spices", emoji: "🧂", label: "Condiments & Spices" },
  { key: "other", emoji: "📦", label: "Other" },
];

/**
 * Categorize a single ingredient string into a shopping category.
 * Simple keyword-based matching.
 */
export function categorizeIngredient(ingredient: string): IngredientCategory {
  const lower = ingredient.toLowerCase();

  // Produce
  if (
    /\b(apple|banana|berry|berries|lemon|lime|orange|fruit|avocado|lettuce|spinach|kale|pepper|onion|tomato|potato|carrot|celery|cucumber|zucchini|corn|mushroom|garlic|ginger|herb|cilantro|basil|scallion|green onion|jalapeño|jalapeno|bell pepper)\b/.test(lower)
  ) {
    return "produce";
  }

  // Protein
  if (
    /\b(chicken|beef|steak|ground beef|turkey|sausage|bacon|ham|pork|shrimp|fish|tuna|salmon|tofu|tempeh|egg|protein|jerky)\b/.test(lower)
  ) {
    return "protein";
  }

  // Dairy
  if (
    /\b(milk|cream|butter|cheese|yogurt|sour cream|cream cheese|mozzarella|cheddar|parmesan|dairy)\b/.test(lower)
  ) {
    return "dairy";
  }

  // Bread & Grains
  if (
    /\b(bread|tortilla|wrap|pita|bun|roll|bagel|english muffin|pancake|cereal|granola|oats|oatmeal|rice|pasta|noodle|couscous|quinoa|cracker|flour|biscuit)\b/.test(lower)
  ) {
    return "bread-grains";
  }

  // Snacks
  if (
    /\b(chocolate|marshmallow|candy|chip|cookie|snack|trail mix|granola bar|popcorn|graham cracker|cinnamon roll|brownie|bar)\b/.test(lower)
  ) {
    return "snacks";
  }

  // Condiments & Spices
  if (
    /\b(salt|pepper|oil|vinegar|sauce|salsa|ketchup|mustard|mayo|dressing|spice|cumin|paprika|chili powder|oregano|basil|thyme|rosemary|cinnamon|sugar|syrup|honey|jam|peanut butter|nutella|hummus|soy sauce|hot sauce|marinade)\b/.test(lower)
  ) {
    return "condiments-spices";
  }

  // Pantry
  if (
    /\b(can|canned|bean|chickpea|tomato sauce|diced tomato|broth|stock|bouillon|coconut milk|olive|pickle|nut|seed|dried fruit|raisin|baking powder|baking soda|vanilla|cocoa|chocolate chip)\b/.test(lower)
  ) {
    return "pantry";
  }

  return "other";
}

// ── All Recipes ──────────────────────────────────────────────────────────────

const ALL_RECIPES: Recipe[] = [
  // ══════════════════════════════════════════════════════════════════════════
  // 🌅 BREAKFASTS
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: "Campfire Pancakes",
    emoji: "🥞",
    category: "breakfast",
    difficulty: "easy",
    prepTime: 10,
    cookTime: 15,
    equipment: ["Camp stove or griddle over fire grate", "Mixing bowl", "Whisk or fork", "Spatula", "Measuring cups"],
    ingredients: [
      "Pancake mix (just-add-water kind — easiest!)",
      "Water",
      "Butter or oil for the pan",
      "Maple syrup",
      "Fresh berries or sliced bananas (optional)",
      "Chocolate chips (optional)",
    ],
    instructions: [
      "Fire up your camp stove or get the griddle hot over the fire grate.",
      "Mix the pancake mix with water in a bowl until just combined. A few lumps are okay — don't over-mix!",
      "Add a small pat of butter or drizzle of oil to the hot surface.",
      "Pour about 1/4 cup of batter per pancake. Wait until bubbles form on top and the edges look dry, then flip.",
      "Cook another 1–2 minutes until golden. Top with syrup, berries, or chocolate chips.",
      "Pro tip: Keep cooked pancakes warm on a plate covered with foil while you finish the batch.",
    ],
    servings: 4,
    tags: ["kid-friendly", "beginner", "make-ahead-option"],
    forBeginners: true,
  },

  {
    name: "Camp Breakfast Burritos",
    emoji: "🌯",
    category: "breakfast",
    difficulty: "easy",
    prepTime: 10,
    cookTime: 10,
    equipment: ["Camp stove", "Skillet", "Spatula", "Foil for wrapping"],
    ingredients: [
      "Large flour tortillas",
      "Eggs",
      "Pre-cooked sausage or bacon (make at home!)",
      "Shredded cheese",
      "Salsa or hot sauce",
      "Bell pepper (diced small)",
      "Salt and pepper",
    ],
    instructions: [
      "Pre-cook the sausage or bacon at home and pack it in a cooler. This saves so much time at camp!",
      "Heat the skillet over your camp stove. Add a little oil and sauté the diced bell pepper for 2 minutes.",
      "Crack eggs into the skillet and scramble them with the peppers. Season with salt and pepper.",
      "Warm each tortilla in the skillet for about 20 seconds per side.",
      "Fill each tortilla with scrambled eggs, pre-cooked meat, cheese, and salsa.",
      "Wrap tightly, then wrap in foil to keep warm and make them easy to eat with your hands.",
    ],
    servings: 4,
    tags: ["kid-friendly", "beginner", "high-energy", "make-ahead-option"],
    forBeginners: true,
  },

  {
    name: "Oatmeal Bar",
    emoji: "🥣",
    category: "breakfast",
    difficulty: "easy",
    prepTime: 5,
    cookTime: 5,
    equipment: ["Camp stove", "Small pot", "Spoon", "Bowls"],
    ingredients: [
      "Instant or quick oats",
      "Water or milk",
      "Pinch of salt",
      "Brown sugar or honey",
      "Dried fruit (raisins, cranberries, apricots)",
      "Chopped nuts (almonds, walnuts, pecans)",
      "Peanut butter or nutella (optional)",
      "Fresh banana slices (optional)",
    ],
    instructions: [
      "Bring water or milk to a boil in the pot. Add a pinch of salt.",
      "Stir in the oats, reduce heat, and cook according to package directions (usually 1–5 minutes).",
      "Set up a 'toppings bar' — lay out brown sugar, dried fruit, nuts, and other toppings in small bowls or bags.",
      "Everyone builds their own bowl with their favorite toppings. Kids especially love customizing their oatmeal!",
    ],
    servings: 4,
    tags: ["kid-friendly", "beginner", "gluten-free-option", "no-cook-toppings"],
    forBeginners: true,
  },

  {
    name: "Egg & Bacon Skillet Scramble",
    emoji: "🍳",
    category: "breakfast",
    difficulty: "easy",
    prepTime: 5,
    cookTime: 15,
    equipment: ["Camp stove or fire grate", "Cast iron skillet", "Spatula", "Foil"],
    ingredients: [
      "Eggs",
      "Bacon (or pre-cooked bacon for easier cleanup)",
      "Potatoes (diced small, or use frozen diced hash browns)",
      "Onion (diced)",
      "Shredded cheese",
      "Salt and pepper",
      "Cooking oil",
    ],
    instructions: [
      "Cook the bacon in the skillet until crispy. Set aside on a paper towel or foil, then crumble or chop.",
      "In the same skillet with the bacon grease (flavor!), add a little oil and the diced potatoes and onion. Cook until golden and crispy, about 8–10 minutes, stirring occasionally. Cover with foil to speed it up.",
      "Push the potatoes to one side and crack the eggs into the other side. Scramble them gently.",
      "Mix everything together, sprinkle with cheese and crumbled bacon. Season with salt and pepper.",
      "Serve right from the skillet — fewer dishes!",
    ],
    servings: 4,
    tags: ["high-energy", "kid-friendly"],
    forBeginners: true,
  },

  {
    name: "Campfire French Toast",
    emoji: "🍞",
    category: "breakfast",
    difficulty: "easy",
    prepTime: 5,
    cookTime: 10,
    equipment: ["Camp stove or griddle", "Skillet", "Shallow bowl", "Fork or whisk", "Spatula"],
    ingredients: [
      "Thick-sliced bread (day-old bread works best!)",
      "Eggs",
      "Milk",
      "Cinnamon",
      "Vanilla extract",
      "Butter for the pan",
      "Maple syrup",
      "Powdered sugar (optional)",
    ],
    instructions: [
      "In a shallow bowl, whisk together eggs, milk, a dash of cinnamon, and a splash of vanilla.",
      "Heat butter in the skillet over medium heat until melted and bubbly.",
      "Dip each bread slice into the egg mixture for about 20 seconds per side — don't soak too long or it gets mushy!",
      "Cook each slice for 2–3 minutes per side until golden brown and slightly crispy.",
      "Serve with maple syrup and a dusting of powdered sugar. Add fresh berries if you brought them!",
    ],
    servings: 4,
    tags: ["kid-friendly", "beginner"],
    forBeginners: true,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 🌤️ LUNCHES
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: "Trail Mix Wraps",
    emoji: "🫔",
    category: "lunch",
    difficulty: "easy",
    prepTime: 10,
    cookTime: 0,
    equipment: ["None — no cooking required!", "Knife for spreading (optional)"],
    ingredients: [
      "Large flour tortillas or whole wheat wraps",
      "Peanut butter or almond butter",
      "Honey or jam",
      "Trail mix (nuts, dried fruit, chocolate chips)",
      "Granola",
      "Banana (sliced)",
    ],
    instructions: [
      "Lay the tortilla flat and spread peanut butter all the way to the edges.",
      "Drizzle honey or spread jam over the peanut butter.",
      "Sprinkle trail mix and granola evenly over the surface.",
      "Add banana slices in a line down the middle.",
      "Roll the tortilla tightly, tucking in the sides as you go. Cut in half on a diagonal.",
      "These are great for hiking lunches — wrap in foil and toss in your daypack!",
    ],
    servings: 4,
    tags: ["no-cook", "kid-friendly", "beginner", "high-energy", "make-ahead"],
    forBeginners: true,
  },

  {
    name: "Campfire Nachos",
    emoji: "🧀",
    category: "lunch",
    difficulty: "easy",
    prepTime: 10,
    cookTime: 10,
    equipment: ["Camp stove or campfire coals", "Cast iron skillet or foil pan", "Foil"],
    ingredients: [
      "Tortilla chips",
      "Shredded cheese (cheddar or Mexican blend)",
      "Can of black beans (drained and rinsed)",
      "Jarred salsa",
      "Sour cream",
      "Pre-cooked ground beef or shredded chicken (optional — prep at home!)",
      "Diced avocado or guacamole",
      "Jalapeños (optional)",
    ],
    instructions: [
      "Layer half the chips in a cast iron skillet or foil pan. Sprinkle with cheese, beans, and meat if using.",
      "Add the rest of the chips and top with more cheese.",
      "Cover tightly with foil and place over campfire coals or on a camp stove over low heat.",
      "Cook for 5–10 minutes until the cheese is melted and bubbly. Check after 5 minutes — campfire heat can be intense!",
      "Top with salsa, sour cream, avocado, and jalapeños. Serve right from the skillet.",
    ],
    servings: 4,
    tags: ["kid-friendly", "beginner", "gluten-free-option"],
    forBeginners: true,
  },

  {
    name: "No-Cook Sandwich Bar",
    emoji: "🥪",
    category: "lunch",
    difficulty: "easy",
    prepTime: 10,
    cookTime: 0,
    equipment: ["None — assembly only!", "Cutting board (optional)"],
    ingredients: [
      "Bread, rolls, or wraps",
      "Deli meat (turkey, ham, salami)",
      "Sliced cheese",
      "Lettuce or spinach leaves",
      "Sliced tomatoes",
      "Mustard, mayo, or hummus",
      "Pickles",
      "Chips on the side",
    ],
    instructions: [
      "Lay out all ingredients on a clean surface (picnic table works great!).",
      "Everyone builds their own sandwich exactly how they like it.",
      "Pair with chips, an apple, or trail mix for a complete no-fuss lunch.",
      "Wrap extras in foil for a quick snack later in the day.",
    ],
    servings: 4,
    tags: ["no-cook", "kid-friendly", "beginner", "make-ahead"],
    forBeginners: true,
  },

  {
    name: "Tuna Boats",
    emoji: "🥒",
    category: "lunch",
    difficulty: "easy",
    prepTime: 10,
    cookTime: 0,
    equipment: ["Can opener", "Spoon", "Knife"],
    ingredients: [
      "Canned tuna (or chicken)",
      "Mayo or Greek yogurt",
      "Celery (diced small)",
      "Bell peppers (halved and seeded — these are your 'boats')",
      "Salt and pepper",
      "Lemon juice (optional)",
      "Lettuce leaves (for crunch)",
    ],
    instructions: [
      "Drain the tuna and mix it in a bowl with mayo, diced celery, salt, and pepper. Add a squeeze of lemon if you have it.",
      "Cut bell peppers in half lengthwise and remove the seeds and white membrane.",
      "Line each pepper half with a lettuce leaf, then spoon the tuna mixture inside.",
      "Eat like a crunchy, healthy wrap — no bread needed!",
      "Also great with crackers on the side if you want some crunch.",
    ],
    servings: 4,
    tags: ["no-cook", "gluten-free-option", "high-energy", "beginner"],
    forBeginners: true,
  },

  {
    name: "Hummus & Veggie Pitas",
    emoji: "🥙",
    category: "lunch",
    difficulty: "easy",
    prepTime: 10,
    cookTime: 0,
    equipment: ["Knife", "Cutting board", "Spoon"],
    ingredients: [
      "Pita pockets or flatbread",
      "Hummus (store-bought is perfect)",
      "Cucumber (sliced thin)",
      "Cherry tomatoes (halved)",
      "Shredded carrots",
      "Feta cheese crumbles (optional)",
      "Kalamata olives (optional)",
      "Baby spinach or lettuce",
    ],
    instructions: [
      "Warm the pita pockets over a camp stove for about 30 seconds per side if you want them soft and pliable.",
      "Spread a generous layer of hummus inside each pita.",
      "Stuff with cucumber, tomatoes, carrots, spinach, and any optional toppings.",
      "Wrap the bottom in foil or parchment to catch drips — these can get messy in the best way!",
    ],
    servings: 4,
    tags: ["no-cook", "vegetarian", "beginner", "high-energy"],
    forBeginners: true,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 🌙 DINNERS
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: "Foil Packet Fajitas",
    emoji: "🫑",
    category: "dinner",
    difficulty: "easy",
    prepTime: 15,
    cookTime: 20,
    equipment: ["Heavy-duty aluminum foil", "Campfire or camp stove", "Tongs", "Knife", "Cutting board"],
    ingredients: [
      "Chicken breast or steak (sliced into thin strips)",
      "Bell peppers (sliced — use multiple colors)",
      "Onion (sliced)",
      "Fajita seasoning (pre-mixed packet or homemade blend of cumin, chili powder, garlic powder, salt)",
      "Olive oil",
      "Flour tortillas",
      "Shredded cheese",
      "Sour cream",
      "Salsa",
    ],
    instructions: [
      "Tear off 4 large squares of heavy-duty foil (about 12 inches each).",
      "Divide the sliced meat, peppers, and onion among the foil squares. Drizzle with olive oil and sprinkle generously with fajita seasoning.",
      "Fold the foil into sealed packets: bring the long sides together and fold down, then fold in the sides. Leave a little room for steam.",
      "Place packets on campfire coals or a grill grate. Cook for 15–20 minutes, flipping once halfway through.",
      "Carefully open one packet to check — the meat should be fully cooked and the veggies tender.",
      "Warm the tortillas over the fire for a few seconds. Serve the fajita filling in warm tortillas with cheese, sour cream, and salsa.",
    ],
    servings: 4,
    tags: ["kid-friendly", "beginner", "gluten-free-option"],
    forBeginners: true,
  },

  {
    name: "Campfire Chili",
    emoji: "🍲",
    category: "dinner",
    difficulty: "easy",
    prepTime: 10,
    cookTime: 25,
    equipment: ["Camp stove", "Large pot or Dutch oven", "Wooden spoon", "Can opener"],
    ingredients: [
      "Ground beef or turkey",
      "Onion (diced)",
      "Garlic (minced, or use jarred)",
      "Canned diced tomatoes (2 cans)",
      "Canned kidney beans (drained and rinsed)",
      "Canned black beans (drained and rinsed)",
      "Chili seasoning packet (or mix: chili powder, cumin, paprika, oregano)",
      "Salt and pepper",
      "Shredded cheese and crackers for topping",
    ],
    instructions: [
      "Brown the ground meat in the pot over medium heat, breaking it up with a spoon. Drain excess fat if needed.",
      "Add the diced onion and garlic. Cook for 2–3 minutes until softened.",
      "Pour in the canned tomatoes (with their juice), beans, and chili seasoning. Stir well.",
      "Bring to a simmer, then reduce heat to low. Let it bubble gently for 20–25 minutes, stirring occasionally. The longer it simmers, the better it tastes!",
      "Ladle into bowls and top with shredded cheese. Serve with crackers or crusty bread.",
      "Bonus: Chili tastes even better the next day, so make extra for leftovers!",
    ],
    servings: 6,
    tags: ["kid-friendly", "beginner", "gluten-free-option", "make-ahead", "high-energy"],
    forBeginners: true,
  },

  {
    name: "One-Pot Pasta Primavera",
    emoji: "🍝",
    category: "dinner",
    difficulty: "easy",
    prepTime: 10,
    cookTime: 15,
    equipment: ["Camp stove", "Large pot", "Stirring spoon", "Knife", "Cutting board"],
    ingredients: [
      "Pasta (penne, rotini, or spaghetti work well)",
      "Jarred pasta sauce (marinara or alfredo)",
      "Zucchini (diced)",
      "Cherry tomatoes (halved)",
      "Fresh spinach (a couple handfuls)",
      "Garlic (minced)",
      "Olive oil",
      "Salt and pepper",
      "Grated parmesan (optional)",
    ],
    instructions: [
      "Boil water in the pot and cook pasta according to package directions. Drain, reserving a splash of pasta water.",
      "Wipe the pot and add olive oil. Sauté garlic for 30 seconds, then add zucchini and cook for 3 minutes.",
      "Add the cherry tomatoes and cook for another 2 minutes until softened.",
      "Return the pasta to the pot, add the sauce and spinach. Stir over low heat until spinach wilts and everything is hot.",
      "Season with salt, pepper, and parmesan. Serve straight from the pot!",
    ],
    servings: 4,
    tags: ["kid-friendly", "beginner", "vegetarian-option"],
    forBeginners: true,
  },

  {
    name: "Grilled Skewers",
    emoji: "🍢",
    category: "dinner",
    difficulty: "medium",
    prepTime: 20,
    cookTime: 12,
    equipment: ["Campfire or camp stove with grill grate", "Metal or soaked bamboo skewers", "Knife", "Cutting board", "Tongs"],
    ingredients: [
      "Chicken breast or beef sirloin (cut into 1-inch cubes)",
      "Bell peppers (cut into chunks)",
      "Red onion (cut into chunks)",
      "Zucchini or yellow squash (cut into thick rounds)",
      "Cherry tomatoes",
      "Olive oil",
      "Lemon juice",
      "Italian seasoning or Greek seasoning blend",
      "Salt and pepper",
    ],
    instructions: [
      "If using bamboo skewers, soak them in water for at least 20 minutes so they don't burn on the fire.",
      "Thread the meat and vegetables onto the skewers, alternating colors. Leave a little space between pieces so they cook evenly.",
      "Drizzle skewers with olive oil, lemon juice, and seasoning. Season generously with salt and pepper.",
      "Grill over medium heat, turning every 3–4 minutes, until the meat is cooked through (about 10–12 minutes total).",
      "Let them rest for 2 minutes before serving. Great with pita bread or a simple side salad.",
    ],
    servings: 4,
    tags: ["high-energy", "gluten-free-option", "adventure"],
    forBeginners: false,
  },

  {
    name: "Dutch Oven Mac & Cheese",
    emoji: "🧀",
    category: "dinner",
    difficulty: "medium",
    prepTime: 10,
    cookTime: 25,
    equipment: ["Camp stove or campfire coals", "Dutch oven or heavy pot", "Stirring spoon", "Measuring cups"],
    ingredients: [
      "Elbow macaroni (or any short pasta)",
      "Shredded cheddar cheese",
      "Shredded mozzarella",
      "Milk",
      "Butter",
      "All-purpose flour",
      "Salt and pepper",
      "Breadcrumbs (optional, for topping)",
    ],
    instructions: [
      "Cook the macaroni in the Dutch oven according to package directions. Drain and set aside.",
      "In the same pot, melt butter over medium-low heat. Whisk in flour and cook for 1 minute (this is your roux — it thickens the sauce).",
      "Slowly pour in milk while whisking constantly. Cook until thickened, about 3–5 minutes.",
      "Remove from heat and stir in the shredded cheeses until melted and smooth. Season with salt and pepper.",
      "Add the cooked pasta back in and stir to coat. If you brought breadcrumbs, sprinkle them on top and cover for a few minutes to crisp up.",
      "This is pure camping comfort food. Kids and adults will both be scraping the pot!",
    ],
    servings: 6,
    tags: ["kid-friendly", "comfort-food"],
    forBeginners: false,
  },

  {
    name: "Campfire Baked Potatoes",
    emoji: "🥔",
    category: "dinner",
    difficulty: "easy",
    prepTime: 5,
    cookTime: 45,
    equipment: ["Campfire coals", "Foil", "Tongs", "Knife"],
    ingredients: [
      "Large russet potatoes",
      "Butter",
      "Sour cream",
      "Shredded cheese",
      "Pre-cooked bacon bits (make at home!)",
      "Green onions or chives (chopped)",
      "Salt and pepper",
      "Olive oil",
    ],
    instructions: [
      "Scrub the potatoes clean and pat dry. Poke several holes in each potato with a fork (this lets steam escape!).",
      "Rub each potato with olive oil and sprinkle with salt — this makes the skin crispy and delicious.",
      "Wrap each potato tightly in foil. Place directly in the campfire coals (not in the flames) or on a grill grate.",
      "Cook for 40–50 minutes, turning once halfway through. They're done when a fork slides in easily.",
      "Carefully unwrap (they're hot!), split open, and fluff the inside with a fork.",
      "Set up a topping bar with butter, sour cream, cheese, bacon bits, and green onions. Everyone loads up their own!",
    ],
    servings: 4,
    tags: ["kid-friendly", "beginner", "gluten-free-option"],
    forBeginners: true,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 🔥 DESSERTS & SNACKS
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: "Campfire Banana Boats",
    emoji: "🍌",
    category: "snack-dessert",
    difficulty: "easy",
    prepTime: 5,
    cookTime: 5,
    equipment: ["Campfire coals", "Foil", "Spoon", "Tongs"],
    ingredients: [
      "Bananas (1 per person, unpeeled)",
      "Chocolate chips",
      "Mini marshmallows",
      "Graham cracker crumbs or crushed cookies (optional)",
    ],
    instructions: [
      "Leave the banana peel on. Cut a deep slit lengthwise along the inside curve of each banana (not all the way through — leave the bottom peel intact).",
      "Gently pry the slit open and stuff with chocolate chips and mini marshmallows. Pack them in there!",
      "Wrap each banana in foil, keeping it upright so the filling doesn't spill.",
      "Place on campfire coals for 4–6 minutes. The peel will turn dark — that's fine!",
      "Carefully unwrap and eat with a spoon right from the peel. The banana gets warm, gooey, and tastes like banana pudding.",
      "Sprinkle graham cracker crumbs on top for a banana-s'mores mashup!",
    ],
    servings: 4,
    tags: ["kid-friendly", "beginner", "gluten-free-option"],
    forBeginners: true,
  },

  {
    name: "Classic Campfire S'mores",
    emoji: "🔥",
    category: "snack-dessert",
    difficulty: "easy",
    prepTime: 1,
    cookTime: 2,
    equipment: ["Campfire", "Roasting sticks or skewers"],
    ingredients: [
      "Graham crackers",
      "Large marshmallows",
      "Chocolate bars (Hershey's is classic, but any chocolate works!)",
    ],
    instructions: [
      "Break each graham cracker in half to make two squares. Place a piece of chocolate on one square.",
      "Skewer a marshmallow on your roasting stick. Hold it over the embers (not the flames!) and rotate slowly.",
      "Toast to your preferred doneness: golden brown for soft and melty, or let it catch fire briefly for a crispy, charred outside (blow it out quickly!).",
      "Place the hot marshmallow on top of the chocolate. Use the other graham cracker square to squeeze it down while pulling the stick out.",
      "Wait 30 seconds for the chocolate to soften, then devour. Repeat as needed!",
      "Variation: Swap graham crackers for chocolate chip cookies or use peanut butter cups instead of plain chocolate.",
    ],
    servings: 4,
    tags: ["kid-friendly", "beginner"],
    forBeginners: true,
  },

  {
    name: "Trail Mix Energy Bites",
    emoji: "⚡",
    category: "snack-dessert",
    difficulty: "easy",
    prepTime: 15,
    cookTime: 0,
    equipment: ["Mixing bowl", "Spoon", "Airtight container"],
    ingredients: [
      "Rolled oats",
      "Peanut butter or almond butter",
      "Honey or maple syrup",
      "Mini chocolate chips",
      "Ground flaxseed or chia seeds (optional)",
      "Shredded coconut (optional)",
      "Dried cranberries or raisins",
    ],
    instructions: [
      "Make these at home before your trip! Mix all ingredients in a bowl until well combined. The mixture should hold together when squeezed.",
      "Roll into 1-inch balls with your hands. If the mixture is too dry, add more peanut butter; if too wet, add more oats.",
      "Place on a tray or plate and refrigerate for at least 30 minutes to firm up (or pop in the freezer for 10).",
      "Store in an airtight container in the cooler. They'll keep for the whole trip!",
      "Grab a couple before a hike for quick, lasting energy. No cooking, no mess at camp.",
    ],
    servings: 8,
    tags: ["no-cook", "make-ahead", "kid-friendly", "high-energy", "beginner", "gluten-free-option"],
    forBeginners: true,
  },

  {
    name: "Campfire Cinnamon Rolls",
    emoji: "🍥",
    category: "snack-dessert",
    difficulty: "medium",
    prepTime: 10,
    cookTime: 20,
    equipment: ["Campfire or camp stove", "Dutch oven or cast iron skillet with lid", "Foil", "Tongs"],
    ingredients: [
      "Tube of refrigerated cinnamon rolls (the kind in a can — so easy!)",
      "Butter for greasing",
      "Extra cinnamon sugar (optional)",
      "Chopped pecans (optional)",
    ],
    instructions: [
      "Grease the inside of the Dutch oven or cast iron skillet with butter.",
      "Pop open the cinnamon roll tube and arrange the rolls in a single layer with a little space between them (they'll expand).",
      "Cover with the lid or foil. Place over campfire coals with some coals on top of the lid if using a Dutch oven.",
      "Cook for 15–20 minutes, checking after 15. They're done when golden brown and cooked through.",
      "Drizzle with the icing from the package while still warm.",
      "The smell of cinnamon rolls at camp in the morning is absolutely magical. Worth the extra effort!",
    ],
    servings: 4,
    tags: ["kid-friendly", "special-occasion", "comfort-food"],
    forBeginners: false,
  },

  {
    name: "Apple Crisp Foil Packets",
    emoji: "🍎",
    category: "snack-dessert",
    difficulty: "easy",
    prepTime: 10,
    cookTime: 15,
    equipment: ["Campfire coals", "Foil", "Knife", "Small bowl"],
    ingredients: [
      "Apples (2–3, sliced thin)",
      "Brown sugar",
      "Cinnamon",
      "Butter (cold, cut into small pieces)",
      "Granola or crushed graham crackers",
      "Oats (optional, for more crunch)",
    ],
    instructions: [
      "Tear off 4 squares of foil. Divide the apple slices among them.",
      "Sprinkle apples generously with brown sugar and cinnamon. Dot with butter pieces.",
      "Top with granola or crushed graham crackers for the 'crisp' topping.",
      "Seal the foil packets and place on campfire coals for 10–15 minutes.",
      "Carefully open — the apples should be soft and the topping golden. Let cool slightly before eating.",
      "Tastes like homemade apple pie, but at camp! Amazing with a scoop of vanilla ice cream if you have a good cooler.",
    ],
    servings: 4,
    tags: ["kid-friendly", "beginner", "gluten-free-option"],
    forBeginners: true,
  },

  {
    name: "Campfire Popcorn",
    emoji: "🍿",
    category: "snack-dessert",
    difficulty: "medium",
    prepTime: 2,
    cookTime: 5,
    equipment: ["Campfire or camp stove", "Large pot with lid", "Oven mitts", "Foil (alternative method)"],
    ingredients: [
      "Popcorn kernels (1/4 cup makes about 4 cups popped)",
      "Vegetable oil or coconut oil",
      "Salt",
      "Melted butter (optional)",
      "Seasonings: nutritional yeast, ranch powder, cinnamon sugar, or just salt",
    ],
    instructions: [
      "Heat oil in the large pot over medium-high heat. Add 3–4 test kernels and cover.",
      "When those kernels pop, the oil is hot enough. Add the rest of the kernels in an even layer, cover, and shake the pot gently.",
      "Keep the pot moving occasionally while kernels pop. When popping slows to 2–3 seconds between pops, remove from heat immediately.",
      "Pour into a big bowl and toss with melted butter and salt.",
      "Alternative foil method: Put kernels, oil, and salt in a foil packet (sealed tight but with room to expand). Tie to a long stick and hold over the fire, shaking constantly. It's trickier but very campfire-authentic!",
    ],
    servings: 4,
    tags: ["kid-friendly", "gluten-free-option"],
    forBeginners: false,
  },
];

// ── Index for fast lookup ───────────────────────────────────────────────────

const RECIPES_BY_NAME = new Map<string, Recipe>(
  ALL_RECIPES.map((r) => [r.name, r]),
);

// ── Filter helpers ──────────────────────────────────────────────────────────

function filterByDifficulty(recipes: Recipe[], maxDifficulty: RecipeDifficulty): Recipe[] {
  if (maxDifficulty === "medium") return recipes;
  return recipes.filter((r) => r.difficulty === "easy");
}

function filterByTags(recipes: Recipe[], tags: string[]): Recipe[] {
  return recipes.filter((r) => tags.some((tag) => r.tags.includes(tag)));
}

function filterByCategory(recipes: Recipe[], category: MealCategory): Recipe[] {
  return recipes.filter((r) => r.category === category);
}

// ── Simple seeded shuffle ───────────────────────────────────────────────────

function seededRandom(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return (Math.abs(hash) % 1000) / 1000;
}

function shuffleWithSeed<T>(arr: T[], seed: string): T[] {
  const shuffled = [...arr];
  let currentSeed = seed;
  for (let i = shuffled.length - 1; i > 0; i--) {
    const r = Math.floor(seededRandom(currentSeed) * (i + 1));
    [shuffled[i], shuffled[r]] = [shuffled[r], shuffled[i]];
    currentSeed = `${currentSeed}-${i}`;
  }
  return shuffled;
}

// ── Day Labels ──────────────────────────────────────────────────────────────

const DAY_LABELS: Record<number, string[]> = {
  1: ["Day 1 — Arrival & Settling In", "Welcome to Camp"],
  2: ["Day 2 — Explore & Discover", "Finding Your Groove"],
  3: ["Day 3 — Deep in Adventure", "Nature Immersion"],
  4: ["Day 4 — Wild & Free", "The Heart of the Trip"],
  5: ["Day 5 — Seasoned Explorer", "Living the Camp Life"],
  6: ["Day 6 — Veteran Status", "Mountain Time"],
  7: ["Day 7 — The Grand Finale", "Soak It All In"],
};

function getDayLabel(dayNumber: number, totalDays: number): string {
  if (dayNumber === 1) return DAY_LABELS[1]?.[0] ?? "Day 1 — Arrival";
  if (dayNumber === totalDays) return "Departure Day";
  const options = DAY_LABELS[dayNumber] ?? [`Day ${dayNumber}`, `Day ${dayNumber} Highlights`];
  return options[0];
}

// ── Main Generator ──────────────────────────────────────────────────────────

/**
 * Scale the servings and adjust ingredient lists for group size.
 * Simple linear scaling — for rough camp cooking this is perfectly adequate.
 */
function scaleRecipe(recipe: Recipe, groupSize: number): { scaledServings: number; scaledIngredients: string[] } {
  const ratio = Math.max(1, Math.ceil(groupSize / recipe.servings));
  const scaledServings = recipe.servings * ratio;
  // For ingredient display, we note the scaling factor
  const scaledIngredients = recipe.ingredients.map((ing) => {
    if (ratio === 1) return ing;
    return `${ing} (×${ratio})`;
  });
  return { scaledServings, scaledIngredients };
}

/**
 * Pick a recipe for a meal slot, avoiding repeats and preferring
 * recipes that match the trip context.
 */
function pickRecipe(
  category: MealCategory,
  usedRecipeNames: Set<string>,
  params: MealPlanParams,
  dayNumber: number,
  mealType: "breakfast" | "lunch" | "dinner" | "snack",
): Recipe {
  let pool = filterByCategory(ALL_RECIPES, category);

  // First-time campers: only easy recipes, prefer forBeginners
  if (params.experienceLevel === "first-time") {
    pool = pool.filter((r) => r.forBeginners);
    if (pool.length < 2) {
      // Fallback: use easy recipes if no beginner-flagged ones
      pool = filterByCategory(ALL_RECIPES, category).filter((r) => r.difficulty === "easy");
    }
  }

  // Family trip style: prefer kid-friendly
  if (params.tripStyle === "family") {
    const kidFriendly = pool.filter((r) => r.tags.includes("kid-friendly"));
    if (kidFriendly.length >= 2) pool = kidFriendly;
  }

  // Adventure trip style: prefer high-energy for breakfast and lunch
  if (params.tripStyle === "adventure" && (mealType === "breakfast" || mealType === "lunch")) {
    const highEnergy = pool.filter((r) => r.tags.includes("high-energy"));
    if (highEnergy.length >= 2) pool = highEnergy;
  }

  // Remove already-used recipes
  const available = pool.filter((r) => !usedRecipeNames.has(r.name));
  const finalPool = available.length > 0 ? available : pool.filter((r) => !usedRecipeNames.has(r.name));

  // If everything has been used (unlikely with 20+ recipes but be safe), allow repeats
  const pickFrom = finalPool.length > 0 ? finalPool : pool;

  // Shuffle with a deterministic seed for reproducibility
  const seed = `meal-${category}-${mealType}-day${dayNumber}-${params.destination}-${params.totalDays}`;
  const shuffled = shuffleWithSeed(pickFrom, seed);

  return shuffled[0];
}

/**
 * Generate a complete meal plan for a camping trip.
 */
export function generateMealPlan(params: MealPlanParams): MealPlan {
  const { totalDays, destination, adults, children, experienceLevel, tripStyle } = params;
  const groupSize = adults + children;
  const usedRecipeNames = new Set<string>();

  const days: MealPlanDay[] = [];
  const allIngredientsSet = new Set<string>();

  const mealSlots: { timeOfDay: "breakfast" | "lunch" | "dinner" | "snack"; label: string; category: MealCategory }[] = [
    { timeOfDay: "breakfast", label: "🌅 Breakfast", category: "breakfast" },
    { timeOfDay: "lunch", label: "🌤️ Lunch", category: "lunch" },
    { timeOfDay: "dinner", label: "🌙 Dinner", category: "dinner" },
    { timeOfDay: "snack", label: "🍪 Snack", category: "snack-dessert" },
  ];

  for (let d = 1; d <= totalDays; d++) {
    const label = getDayLabel(d, totalDays);
    const meals: MealSlot[] = [];

    for (const slot of mealSlots) {
      const recipe = pickRecipe(slot.category, usedRecipeNames, params, d, slot.timeOfDay);
      usedRecipeNames.add(recipe.name);

      const { scaledServings, scaledIngredients } = scaleRecipe(recipe, groupSize);

      // Collect ingredients for shopping list
      recipe.ingredients.forEach((ing) => allIngredientsSet.add(ing));

      meals.push({
        timeOfDay: slot.timeOfDay,
        label: slot.label,
        recipe,
        scaledServings,
        scaledIngredients,
      });
    }

    days.push({ dayNumber: d, label, meals });
  }

  // Build summary
  const groupStr = buildGroupString(adults, children);
  const styleLabel = tripStyle ? ` · ${capitalize(tripStyle)}` : "";
  const summary = `${totalDays}-day meal plan for ${groupStr}${styleLabel}`;

  return {
    summary,
    days,
    totalDays,
    destination,
    adults,
    children,
    experienceLevel,
    tripStyle: tripStyle ?? null,
    allIngredients: Array.from(allIngredientsSet).sort(),
  };
}

// ── Serialization helpers (for URL params) ───────────────────────────────────

export function serializeMealParams(params: MealPlanParams): URLSearchParams {
  const sp = new URLSearchParams();
  sp.set("destination", params.destination);
  sp.set("adults", String(params.adults));
  sp.set("children", String(params.children));
  sp.set("experienceLevel", params.experienceLevel);
  if (params.tripStyle) sp.set("tripStyle", params.tripStyle);
  sp.set("totalDays", String(params.totalDays));
  return sp;
}

export function deserializeMealParams(
  raw: Record<string, string | undefined>,
): MealPlanParams | null {
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

// ── Utilities ────────────────────────────────────────────────────────────────

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function buildGroupString(adults: number, children: number): string {
  const parts: string[] = [];
  if (adults > 0) parts.push(`${adults} ${adults === 1 ? "adult" : "adults"}`);
  if (children > 0) parts.push(`${children} ${children === 1 ? "child" : "children"}`);
  return parts.join(", ") || "solo";
}

export function formatMealDifficulty(d: RecipeDifficulty): string {
  return d === "easy" ? "Easy" : "Medium";
}

/**
 * Group a list of ingredients by shopping category.
 */
export function groupIngredientsForShopping(
  ingredients: string[],
): Map<IngredientCategory, string[]> {
  const groups = new Map<IngredientCategory, string[]>();

  for (const ing of ingredients) {
    const cat = categorizeIngredient(ing);
    const existing = groups.get(cat) ?? [];
    existing.push(ing);
    groups.set(cat, existing);
  }

  // Sort ingredients within each group
  for (const [cat, items] of groups) {
    items.sort();
    groups.set(cat, items);
  }

  return groups;
}

/**
 * Get the total number of unique recipes available.
 */
export function getRecipeCount(): number {
  return ALL_RECIPES.length;
}

/**
 * Get a specific recipe by name (useful for bookmarking or sharing).
 */
export function getRecipeByName(name: string): Recipe | undefined {
  return RECIPES_BY_NAME.get(name);
}
