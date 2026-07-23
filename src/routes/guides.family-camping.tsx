import { createFileRoute } from "@tanstack/react-router";
import { GuideLayout } from "~/components/GuideLayout";
import { ProTip } from "~/components/ProTip";

export const Route = createFileRoute("/guides/family-camping")({
  component: FamilyCampingGuide,
});

function FamilyCampingGuide() {
  return (
    <GuideLayout
      emoji="👨‍👩‍👧‍👦"
      title="Camping with Kids"
      readTime="~5 min"
      category="Getting Started"
      nextGuide={{ to: "/guides/campfire", title: "Mastering the Campfire" }}
      relatedGuides={[
        {
          to: "/guides/first-trip",
          emoji: "🏕️",
          title: "Your First Camping Trip",
          description: "Start here if you're brand new",
        },
        {
          to: "/guides/essential-gear",
          emoji: "🎒",
          title: "The Essential Gear List",
          description: "What to pack for everyone",
        },
        {
          to: "/guides/leave-no-trace",
          emoji: "🌿",
          title: "Leave No Trace",
          description: "Teach kids to protect nature",
        },
      ]}
    >
      <p>
        Camping with kids is a whole different adventure — louder, messier, and
        infinitely more magical. Seeing a child's face light up at their first
        campfire, first s'more, or first shooting star is something you'll
        never forget. But it also takes a bit more planning. Here's how to make
        it fun for everyone.
      </p>

      <h2>👶 Age-Appropriate Tips</h2>

      <h3>Toddlers (Ages 1–3)</h3>
      <ul>
        <li>
          <strong>Keep it short.</strong> One night is plenty. A local
          campground close to home reduces driving stress.
        </li>
        <li>
          <strong>Bring a portable playpen or pack-n-play</strong> — it doubles
          as a safe sleep space and a contained play area.
        </li>
        <li>
          <strong>Stick to routines.</strong> Same bedtime, same snacks, same
          comfort items from home. Familiarity is comforting.
        </li>
        <li>
          <strong>Expect mess.</strong> Dirt is inevitable. Bring baby wipes.
          Lots of baby wipes.
        </li>
      </ul>

      <h3>Young Kids (Ages 4–7)</h3>
      <ul>
        <li>
          <strong>Give them a job.</strong> Kids this age love to help. Let them
          collect kindling (small sticks), carry a flashlight, or fill water
          bottles.
        </li>
        <li>
          <strong>Bring their bike or scooter.</strong> Campground loops are
          perfect for riding.
        </li>
        <li>
          <strong>Glow sticks at night.</strong> They'll love it, and you'll be
          able to spot them in the dark.
        </li>
        <li>
          <strong>Prepare for the dark.</strong> Some kids get scared at night
          in a tent. A favorite stuffed animal and a small battery-powered
          lantern solve most fears.
        </li>
      </ul>

      <h3>Older Kids (Ages 8–12)</h3>
      <ul>
        <li>
          <strong>Involve them in planning.</strong> Let them help choose the
          campsite, pick meals, and pack their own bag (with a checklist you
          review).
        </li>
        <li>
          <strong>Teach real skills.</strong> Fire-building, knot-tying, map
          reading — they're ready and eager.
        </li>
        <li>
          <strong>Bring a friend.</strong> If the campground allows, letting
          your child bring a friend can be a game-changer for engagement.
        </li>
      </ul>

      <h3>Teens (Ages 13+)</h3>
      <ul>
        <li>
          <strong>Give them ownership.</strong> Let them set up their own tent
          or be in charge of one meal.
        </li>
        <li>
          <strong>Embrace (limited) tech.</strong> A phone for photos and
          stargazing apps is fine. Set screen-time expectations beforehand.
        </li>
        <li>
          <strong>Challenge them.</strong> A short day hike with a viewpoint
          reward goes a long way.
        </li>
      </ul>

      <ProTip>
        <p>
          The #1 rule for camping with kids: <strong>manage your own
          expectations.</strong> You might not relax as much as you would on a
          solo trip. Things will go off-script. Roll with it — the goal is
          memories, not perfection.
        </p>
      </ProTip>

      <h2>🎯 Keeping Kids Engaged and Safe</h2>

      <h3>Activities That Work</h3>
      <ul>
        <li>
          <strong>Nature scavenger hunt.</strong> Make a list: pinecone, acorn,
          feather, smooth rock, yellow flower, squirrel sighting. First to find
          them all wins.
        </li>
        <li>
          <strong>Campfire stories.</strong> Not scary ones — funny ones.
          "Remember when Dad tripped over the tent stake?"
        </li>
        <li>
          <strong>Cloud watching.</strong> Lie on a blanket and find shapes.
          Simple, timeless, zero equipment needed.
        </li>
        <li>
          <strong>Star gazing.</strong> Download a free app like SkyView or Star
          Walk. Point at the sky and learn constellations together.
        </li>
        <li>
          <strong>Rock skipping.</strong> Find a creek or lake and see who can
          get the most skips.
        </li>
        <li>
          <strong>Shadow puppets.</strong> With a flashlight inside the tent
          before bed — a classic for a reason.
        </li>
      </ul>

      <h3>Safety Essentials</h3>
      <ul>
        <li>
          <strong>Set boundaries early.</strong> "You can play anywhere between
          this tree and that rock, but not past the road." Walk the perimeter
          together.
        </li>
        <li>
          <strong>Whistle on a lanyard.</strong> Each kid gets one. Three
          blasts = "I need help." Practice it.
        </li>
        <li>
          <strong>Bright clothing.</strong> Dress kids in neon or bright colors
          so they're easy to spot.
        </li>
        <li>
          <strong>Water safety.</strong> If there's a lake or river nearby, life
          jackets are non-negotiable for young kids — even if they can swim.
        </li>
        <li>
          <strong>First aid kit accessible.</strong> Keep it where everyone
          knows, not buried in the bottom of a bag.
        </li>
      </ul>

      <h2>🎒 Packing for Little Ones</h2>

      <p>Beyond the standard camping gear, here's your kid-specific list:</p>
      <ul>
        <li>Extra clothes — at least two full changes (they will get wet/dirty)</li>
        <li>Favorite blanket, stuffed animal, and pillow from home</li>
        <li>Kid-sized camp chair (makes them feel included)</li>
        <li>Baby wipes — even for non-babies. The ultimate camping multi-tool</li>
        <li>Easy-to-eat snacks: granola bars, fruit pouches, trail mix</li>
        <li>Kids' headlamp — they LOVE having their own light</li>
        <li>Small backpack so they can carry their own treasures</li>
        <li>Books for quiet time and bedtime wind-down</li>
        <li>Diapers and sealable bags for disposal if needed</li>
      </ul>

      <h2>🍽️ Kid-Friendly Camp Meals</h2>

      <p>Camp food doesn't need to be complicated:</p>
      <ul>
        <li>
          <strong>Foil packet dinners.</strong> Let each kid assemble their own:
          chopped veggies, pre-cooked sausage or chicken, a drizzle of oil,
          wrapped in foil. Cook on coals for 15–20 minutes.
        </li>
        <li>
          <strong>Campfire hot dogs on sticks.</strong> A rite of passage.
        </li>
        <li>
          <strong>S'mores, obviously.</strong> Pro move: use Reese's cups
          instead of plain chocolate.
        </li>
        <li>
          <strong>Pancakes.</strong> Pre-mix the dry ingredients at home in a
          jar. Just add water at camp.
        </li>
        <li>
          <strong>Walking tacos.</strong> Open a small bag of Fritos or Doritos,
          add seasoned ground beef, cheese, lettuce. Eat right from the bag.
        </li>
      </ul>

      <h2>😴 Bedtime Without the Battle</h2>

      <p>
        Getting kids to sleep in a tent can be… challenging. Here's what works:
      </p>
      <ul>
        <li>
          <strong>Stick as close to normal bedtime as possible.</strong>
        </li>
        <li>
          <strong>Do a "tent tour."</strong> Before dark, let them explore the
          tent, arrange their sleeping bag, and set up their stuffed animals.
        </li>
        <li>
          <strong>Wind down with a story.</strong> Read by headlamp or lantern.
        </li>
        <li>
          <strong>White noise.</strong> A battery-powered fan or a white noise
          app on your phone masks unfamiliar outdoor sounds.
        </li>
        <li>
          <strong>Layer up.</strong> Kids wiggle out of sleeping bags. Dress
          them in warm base layers so they stay warm even when uncovered.
        </li>
      </ul>

      <p>
        Camping with kids is a gift — to them and to you. You're giving them
        confidence, independence, and a relationship with nature that will last a
        lifetime. And years from now, they won't remember that you forgot the
        ketchup. They'll remember the time Dad tried to start a fire in the rain,
        or the morning Mom made hot chocolate while the sun rose over the lake.
      </p>
      <p>
        <strong>Those are the moments that matter.</strong> 🏕️
      </p>
    </GuideLayout>
  );
}
