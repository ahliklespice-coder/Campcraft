import { createFileRoute } from "@tanstack/react-router";
import { GuideLayout } from "~/components/GuideLayout";
import { ProTip } from "~/components/ProTip";

export const Route = createFileRoute("/guides/campfire")({
  component: CampfireGuide,
});

function CampfireGuide() {
  return (
    <GuideLayout
      emoji="🔥"
      title="Mastering the Campfire"
      readTime="~6 min"
      category="Essential Skills"
      nextGuide={{ to: "/guides/tent-setup", title: "Tent Setup 101" }}
      relatedGuides={[
        {
          to: "/guides/essential-gear",
          emoji: "🎒",
          title: "The Essential Gear List",
          description: "Fire-starting tools to pack",
        },
        {
          to: "/guides/leave-no-trace",
          emoji: "🌿",
          title: "Leave No Trace",
          description: "Minimize your fire's impact",
        },
        {
          to: "/guides/weather",
          emoji: "🌦️",
          title: "Reading the Weather",
          description: "Know when it's safe to burn",
        },
      ]}
    >
      <p>
        There's something primal and deeply satisfying about a campfire. The
        crackle, the warmth, the way everyone naturally gathers around it.
        Building a good fire isn't magic — it's a skill anyone can learn. By
        the end of this guide, you'll be the person everyone wants at their
        campsite.
      </p>

      <h2>🛡️ Fire Safety Basics</h2>

      <p>Before we strike a single match, let's cover the non-negotiables:</p>
      <ul>
        <li>
          <strong>Check fire restrictions.</strong> Always check the campground
          or forest website before your trip. During dry seasons, fires may be
          banned entirely. This isn't optional — it's how we prevent wildfires.
        </li>
        <li>
          <strong>Use existing fire rings.</strong> Most developed campsites
          have a metal or stone ring. Use it. Don't build a new one.
        </li>
        <li>
          <strong>Clear a 10-foot radius.</strong> Remove pine needles, dry
          leaves, and anything flammable from around the fire ring.
        </li>
        <li>
          <strong>Never leave a fire unattended.</strong> Not for one minute. If
          you're leaving camp or going to sleep, the fire must be completely out.
        </li>
        <li>
          <strong>Keep water and a shovel nearby.</strong> Always have a way to
          extinguish the fire quickly.
        </li>
        <li>
          <strong>Tie back loose clothing and hair.</strong> Synthetic fabrics
          melt. Wear cotton or wool around the fire.
        </li>
        <li>
          <strong>No flammable liquids.</strong> Never use gasoline, lighter
          fluid, or alcohol to start or accelerate a fire. It's incredibly
          dangerous.
        </li>
      </ul>

      <h2>🪵 Firewood 101: Choosing the Right Wood</h2>

      <p>Fire-building is really about three sizes of fuel:</p>
      <ul>
        <li>
          <strong>Tinder:</strong> The stuff that catches a spark. Dry leaves,
          pine needles, birch bark, cotton balls with petroleum jelly, dryer
          lint, or commercial fire starters. It should be bone-dry and wispy.
        </li>
        <li>
          <strong>Kindling:</strong> Small twigs and sticks, pencil-thick to
          finger-thick. These catch from the tinder and build the heat needed
          for larger wood. Snap them — if they crack cleanly, they're dry.
        </li>
        <li>
          <strong>Fuel wood:</strong> The main logs, wrist-thick to arm-thick.
          These burn long and hot once the fire is established.
        </li>
      </ul>

      <ProTip>
        <p>
          <strong>Buy firewood locally.</strong> Transporting firewood from home
          can spread invasive insects like the emerald ash borer. Most
          campground stores and nearby gas stations sell bundles. It's a few
          dollars and it protects the forest you're visiting.
        </p>
      </ProTip>

      <h2>🏗️ How to Build a Fire: Two Proven Methods</h2>

      <h3>Method 1: The Teepee</h3>
      <p>The classic, and the one most people picture. Great for quick flames:</p>
      <ol>
        <li>Place a generous pile of tinder in the center of the fire ring.</li>
        <li>
          Arrange kindling sticks in a cone shape around the tinder, leaning
          them against each other like a teepee. Leave a small opening on the
          windward side to light the tinder.
        </li>
        <li>
          Light the tinder through the opening. The flames rise through the
          kindling, igniting it.
        </li>
        <li>
          As the kindling catches, gradually add larger kindling to the teepee
          structure.
        </li>
        <li>
          Once you have a solid base of embers, add fuel logs — still in teepee
          formation, leaning against each other.
        </li>
      </ol>

      <h3>Method 2: The Log Cabin</h3>
      <p>More stable, longer-lasting, better for cooking. Looks impressive too:</p>
      <ol>
        <li>Place tinder in the center of the fire ring.</li>
        <li>
          Build a small teepee of kindling over the tinder (yes, a teepee inside
          the cabin).
        </li>
        <li>
          Place two larger pieces of fuel wood parallel to each other on either
          side of the teepee, about a foot apart.
        </li>
        <li>
          Place two more pieces on top, perpendicular, like you're building
          Lincoln Logs. Stack 2–3 layers high.
        </li>
        <li>
          Light the tinder in the center. The kindling teepee ignites the cabin
          structure from the inside.
        </li>
      </ol>

      <ProTip>
        <p>
          <strong>Air is fuel.</strong> Fire needs oxygen. If your fire is
          struggling, it's usually because the wood is packed too tight. Gently
          blow at the base or fan it with a plate — don't dump more lighter
          fluid on it.
        </p>
      </ProTip>

      <h2>🍳 Cooking Over a Campfire</h2>

      <p>
        Cooking over flames is trickier than it looks. Here's the secret:{" "}
        <strong>cook over coals, not flames.</strong> Flames are uneven, sooty,
        and burn food. A bed of glowing red-orange coals gives steady, even
        heat.
      </p>
      <p>To build a cooking fire:</p>
      <ol>
        <li>
          Start your fire 30–45 minutes before you want to cook. Let it burn
          down to coals.
        </li>
        <li>Spread the coals into an even layer with a stick or shovel.</li>
        <li>Use a campfire grate or place a grill grate over the coals.</li>
        <li>
          For foil packet meals, nestle them directly into the coals at the edge.
        </li>
        <li>
          For skewers (hot dogs, marshmallows), hold them over the coals, not
          in the flames.
        </li>
      </ol>

      <p><strong>Popular campfire foods for beginners:</strong></p>
      <ul>
        <li>Hot dogs and sausages on skewers</li>
        <li>Foil packet dinners (chopped veggies + protein + seasoning)</li>
        <li>Corn on the cob (in the husk, soaked in water, placed on coals)</li>
        <li>Baked potatoes wrapped in foil</li>
        <li>S'mores (graham crackers, marshmallow, chocolate)</li>
        <li>
          Campfire nachos (tortilla chips + cheese + beans in a cast iron
          skillet)
        </li>
      </ul>

      <h2>🧯 Extinguishing Properly</h2>

      <p>
        This is the most important part. A fire that "looks" out can still
        smolder for hours and reignite. Here is the correct method:
      </p>
      <ol>
        <li>
          <strong>Let it burn down.</strong> Stop adding wood 45–60 minutes
          before you plan to go to bed.
        </li>
        <li>
          <strong>Drown it with water.</strong> Pour water slowly and thoroughly
          over all coals, embers, and charred wood. You want to hear hissing.
        </li>
        <li>
          <strong>Stir with a shovel or stick.</strong> Mix the wet ashes and
          any remaining wood to expose hot spots.
        </li>
        <li>
          <strong>Drown again.</strong> Pour more water and stir again. Repeat
          until there is NO steam, smoke, or hissing.
        </li>
        <li>
          <strong>The back-of-hand test.</strong> Hold the back of your hand
          close to the ashes (not touching). If you feel ANY warmth, keep adding
          water and stirring.
        </li>
        <li>
          <strong>Leave only when cold.</strong> The ashes should be cool to the
          touch before you walk away or go to sleep.
        </li>
      </ol>

      <p>
        <strong>
          "If it's too hot to touch, it's too hot to leave."
        </strong>{" "}
        Memorize that. It's a camping mantra for a reason.
      </p>

      <h2>🎉 The Campfire is the Heart of Camp</h2>

      <p>
        Beyond the practical stuff: a campfire is where the magic happens. It's
        where stories are told, marshmallows are toasted (and inevitably
        burned), and conversations drift late into the night. It's where you
        look up and realize the stars are brighter than you've ever seen them.
      </p>
      <p>
        Build it safely, tend it with care, put it out completely — and enjoy
        every moment around it. 🔥
      </p>
    </GuideLayout>
  );
}
