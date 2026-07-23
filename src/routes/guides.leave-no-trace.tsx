import { createFileRoute } from "@tanstack/react-router";
import { GuideLayout } from "~/components/GuideLayout";
import { ProTip } from "~/components/ProTip";

export const Route = createFileRoute("/guides/leave-no-trace")({
  component: LeaveNoTraceGuide,
});

function LeaveNoTraceGuide() {
  return (
    <GuideLayout
      emoji="🌿"
      title="Leave No Trace"
      readTime="~5 min"
      category="Safety & Responsibility"
      nextGuide={{ to: "/guides/weather", title: "Reading the Weather" }}
      relatedGuides={[
        {
          to: "/guides/campfire",
          emoji: "🔥",
          title: "Mastering the Campfire",
          description: "Minimize fire impact",
        },
        {
          to: "/guides/first-trip",
          emoji: "🏕️",
          title: "Your First Camping Trip",
          description: "Practice these on your first trip",
        },
        {
          to: "/guides/tent-setup",
          emoji: "⛺",
          title: "Tent Setup 101",
          description: "Choose a low-impact tent spot",
        },
      ]}
    >
      <p>
        Imagine hiking to a beautiful campsite and finding litter, damaged trees,
        and fire scars. Now imagine being the person who left a place{" "}
        <strong>better</strong> than you found it — so the next camper gets that
        same "wow" moment you did.
      </p>

      <p>
        That's what Leave No Trace is about. It's not a list of restrictions.
        It's a set of principles that make sure the outdoors stays beautiful for
        everyone — including future you. Here are the 7 principles, explained in
        plain English with real examples.
      </p>

      <h2>🌍 Principle 1: Plan Ahead and Prepare</h2>

      <p>
        Good preparation doesn't just make your trip better — it protects the
        environment. When you're prepared, you're less likely to make desperate
        decisions that harm nature.
      </p>
      <ul>
        <li>
          <strong>Know the rules.</strong> Each park, forest, and campground has
          its own regulations. Check them online before you go. Fire rules, food
          storage requirements, group size limits — it's all there.
        </li>
        <li>
          <strong>Check the weather.</strong> If a storm is coming, you can adjust
          plans instead of getting caught and trampling vegetation to find
          emergency shelter.
        </li>
        <li>
          <strong>Pack to minimize waste.</strong> Repackage food into reusable
          containers at home. Leave excess packaging behind. Bring a bag for your
          trash (and pick up any you find).
        </li>
        <li>
          <strong>Eat before you go.</strong> Sounds small, but hungry campers
          make bad choices — like cutting switchbacks on trails or damaging trees
          trying to hang food.
        </li>
      </ul>

      <h2>🥾 Principle 2: Travel and Camp on Durable Surfaces</h2>

      <p>
        In other words: stick to the trail and use established campsites. Plants
        and soil ecosystems are fragile and take years to recover from footsteps.
      </p>
      <ul>
        <li>
          <strong>Stay on the trail.</strong> Even if it's muddy. Walk through
          the mud, not around it — going around widens the trail and damages more
          ground.
        </li>
        <li>
          <strong>Camp in designated spots.</strong> Most developed campgrounds
          have tent pads — use them. In the backcountry, camp on durable surfaces
          like rock, gravel, dry grass, or snow — never on delicate meadow
          vegetation.
        </li>
        <li>
          <strong>Keep campsites small.</strong> Concentrate your activity to the
          area that's already impacted. Don't spread out into untouched areas.
        </li>
        <li>
          <strong>Camp at least 200 feet from water.</strong> This protects
          riparian zones (the sensitive area along lakes and streams) and allows
          wildlife access to water.
        </li>
      </ul>

      <h2>🗑️ Principle 3: Dispose of Waste Properly</h2>

      <p>
        This is the one people think of first — and for good reason. "Pack it in,
        pack it out" means <strong>everything</strong> you brought goes home with
        you.
      </p>
      <ul>
        <li>
          <strong>Trash:</strong> All of it. Food scraps, wrappers, bottle caps,
          orange peels, eggshells — even "biodegradable" things like banana peels
          take months or years to decompose and attract animals in the meantime.
        </li>
        <li>
          <strong>Human waste:</strong> Use campground bathrooms when available.
          In the backcountry, dig a "cathole" 6–8 inches deep, at least 200 feet
          from water, trails, and camp. Pack out toilet paper in a sealed bag —
          don't bury it (animals dig it up).
        </li>
        <li>
          <strong>Dishwater:</strong> Strain food particles out (pack them with
          your trash) and scatter the gray water at least 200 feet from water
          sources. Use biodegradable soap sparingly — even "biodegradable" soap
          pollutes streams.
        </li>
      </ul>

      <ProTip>
        <p>
          <strong>Bring a dedicated trash bag.</strong> A simple grocery bag
          clipped to your camp table makes it easy. At the end of the trip, do a
          "micro-trash sweep" — walk your site slowly and pick up every tiny
          piece of litter: twist ties, bread tags, bits of foil. The goal is to
          leave the site <strong>cleaner</strong> than you found it.
        </p>
      </ProTip>

      <h2>🪨 Principle 4: Leave What You Find</h2>

      <p>
        That cool rock, that perfect pinecone, that artifact-looking thing by
        the river — leave it. These belong to the place and to the next visitor.
      </p>
      <ul>
        <li>
          <strong>No souvenirs.</strong> Take photos, not things. Removing rocks,
          flowers, artifacts, or antlers degrades the experience for everyone
          else and disrupts the ecosystem.
        </li>
        <li>
          <strong>Don't build structures.</strong> No rock cairns, no log
          furniture, no trenches. Natural-looking sites are part of the
          wilderness experience.
        </li>
        <li>
          <strong>Avoid damaging trees.</strong> No carving initials, no hacking
          branches, no hammering nails. If you're hanging a lantern or clothesline,
          use existing structures or bring cord that won't damage bark.
        </li>
        <li>
          <strong>Leave flowers for pollinators.</strong> Picking wildflowers
          means they can't go to seed and won't be there next year.
        </li>
      </ul>

      <h2>🔥 Principle 5: Minimize Campfire Impacts</h2>

      <p>
        Campfires are iconic, but they leave lasting marks on the land. Use them
        thoughtfully:
      </p>
      <ul>
        <li>
          <strong>Use existing fire rings.</strong> Don't build new ones. If
          there's no ring and fires are allowed, use a fire pan or mound fire on
          a durable surface.
        </li>
        <li>
          <strong>Keep fires small.</strong> A small fire is easier to manage,
          uses less wood, and leaves less impact. You don't need a bonfire.
        </li>
        <li>
          <strong>Burn only wood.</strong> No trash, no food scraps, no plastic.
          Burning trash releases toxic chemicals.
        </li>
        <li>
          <strong>Let wood burn completely to ash.</strong> Then extinguish
          thoroughly (see our Campfire Guide for the full method).
        </li>
        <li>
          <strong>Consider a camp stove instead.</strong> For cooking, stoves
          are faster, cleaner, and leave zero trace. Save the fire for ambiance.
        </li>
      </ul>

      <h2>🐻 Principle 6: Respect Wildlife</h2>

      <p>
        You're a guest in their home. Observe from a distance and don't
        interfere:
      </p>
      <ul>
        <li>
          <strong>Never feed animals.</strong> Not on purpose, not by accident.
          Animals that get human food become dependent, aggressive, and often have
          to be euthanized. "A fed bear is a dead bear" is a heartbreaking but
          true saying.
        </li>
        <li>
          <strong>Store food securely.</strong> In bear country: use bear boxes
          or hang food in a bear bag. Elsewhere: store food in your vehicle or
          in sealed containers. Never in your tent.
        </li>
        <li>
          <strong>Keep your distance.</strong> Use binoculars or a zoom lens. If
          an animal changes its behavior because of you, you're too close.
        </li>
        <li>
          <strong>Leash your pets.</strong> Dogs can harass, injure, or be
          injured by wildlife. Plus, it's usually required by campground rules.
        </li>
        <li>
          <strong>Avoid sensitive times.</strong> Mating season, nesting season,
          winter — animals are most vulnerable at certain times. Research the area
          you're visiting.
        </li>
      </ul>

      <h2>🤝 Principle 7: Be Considerate of Others</h2>

      <p>
        Everyone's outdoors for their own reasons. Some want quiet contemplation.
        Others are on a family adventure. Respect all of it:
      </p>
      <ul>
        <li>
          <strong>Keep noise down.</strong> Sound carries far in the woods. No
          loud music — use headphones if you want tunes. Respect quiet hours
          (usually 10 PM to 6 AM).
        </li>
        <li>
          <strong>Yield on trails.</strong> Hikers going uphill have the right
          of way. Step aside for faster hikers and horses. Bikers yield to hikers
          and horses.
        </li>
        <li>
          <strong>Keep your group manageable.</strong> Large groups are louder
          and have more impact. If you're with a big group, split into smaller
          ones when hiking.
        </li>
        <li>
          <strong>Don't blast through others' campsites.</strong> Respect
          campsite boundaries. Walk around, not through, someone else's site.
        </li>
        <li>
          <strong>Keep pets under control.</strong> Not everyone loves dogs. Keep
          yours leashed, quiet, and out of other people's campsites.
        </li>
      </ul>

      <h2>🌟 Why It Matters</h2>

      <p>
        Here's the big picture: public lands belong to all of us. They're one of
        the greatest ideas this country ever had — wild places set aside for
        everyone, forever. But they're not infinite, and they're not
        indestructible. Every year, popular areas get "loved to death" — eroded
        trails, trashed campsites, habituated wildlife.
      </p>
      <p>
        Leave No Trace is how we make sure the next generation gets to
        experience the same magic we do. It's not about being perfect. It's about
        being mindful. Every small choice — packing out that wrapper, staying on
        the trail, putting your fire all the way out — adds up.
      </p>
      <p>
        <strong>
          Be the camper who leaves a place better than they found it. 🌿
        </strong>
      </p>
    </GuideLayout>
  );
}
