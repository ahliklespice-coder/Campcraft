import { createFileRoute } from "@tanstack/react-router";
import { GuideLayout } from "~/components/GuideLayout";
import { ProTip } from "~/components/ProTip";

export const Route = createFileRoute("/guides/tent-setup")({
  component: TentSetupGuide,
});

function TentSetupGuide() {
  return (
    <GuideLayout
      emoji="⛺"
      title="Tent Setup 101"
      readTime="~4 min"
      category="Essential Skills"
      nextGuide={{ to: "/guides/essential-gear", title: "The Essential Gear List" }}
      relatedGuides={[
        {
          to: "/guides/first-trip",
          emoji: "🏕️",
          title: "Your First Camping Trip",
          description: "The full beginner experience",
        },
        {
          to: "/guides/campfire",
          emoji: "🔥",
          title: "Mastering the Campfire",
          description: "Next skill to master at camp",
        },
        {
          to: "/guides/weather",
          emoji: "🌦️",
          title: "Reading the Weather",
          description: "Weatherproof your setup",
        },
      ]}
    >
      <p>
        Your tent is your home in the wilderness. Set it up right, and you'll
        sleep dry, warm, and comfortable. Rush through it — or pick a bad spot —
        and you might wake up in a puddle, on a slope, or tangled in collapsed
        poles. Let's make sure that doesn't happen.
      </p>

      <h2>📍 Step 1: Choose the Right Tent Spot</h2>

      <p>
        This is the single most important decision. A great tent spot is:
      </p>
      <ul>
        <li>
          <strong>Level.</strong> Lie down and test it before you pitch. Even a
          slight slope means you'll slowly slide to one corner all night. Your
          head should be slightly uphill.
        </li>
        <li>
          <strong>Clear of debris.</strong> Remove rocks, sticks, pinecones.
          They'll poke through your tent floor and your sleeping pad. Run your
          hands over the ground — your fingers will find what your eyes miss.
        </li>
        <li>
          <strong>Well-drained.</strong> Avoid depressions or low spots where
          water collects. Look for slightly elevated ground. If rain is expected,
          dig a small trench around the uphill side of the tent to divert water
          (but check campground rules — some prohibit trenching).
        </li>
        <li>
          <strong>Protected from wind.</strong> Natural windbreaks like bushes,
          boulders, or tree lines are your friends. Face the tent door away from
          the prevailing wind.
        </li>
        <li>
          <strong>Safe overhead.</strong> Look up! Dead branches ("widowmakers")
          can fall in wind. Don't pitch under them. Also avoid the tallest tree
          in an open area — lightning risk.
        </li>
        <li>
          <strong>Not on vegetation.</strong> Use established tent pads when
          available. Don't crush wildflowers or fragile plants.
        </li>
      </ul>

      <ProTip>
        <p>
          <strong>Morning sun matters.</strong> If you can, pitch where the
          morning sun will hit your tent. It warms you up gently and dries off
          overnight dew. In hot climates, do the opposite — pitch in afternoon
          shade so you're not baking by 7 AM.
        </p>
      </ProTip>

      <h2>🔧 Step 2: Know Your Tent Before You Go</h2>

      <p>
        Every tent is different. Some have two poles, some have four. Some clip,
        some sleeve. Some are freestanding, some need stakes to stay up. Before
        your trip:
      </p>
      <ul>
        <li>
          <strong>Set it up at home first.</strong> In the backyard, living room,
          or a park. Practice until you can do it without instructions. You'll
          thank yourself when you arrive at camp tired and the sun is setting.
        </li>
        <li>
          <strong>Count your stakes.</strong> Tents usually come with exactly
          enough stakes. Check you have them all — plus a few spares.
        </li>
        <li>
          <strong>Check for a footprint.</strong> Many tents don't include one.
          A footprint (groundsheet) protects your tent floor from punctures and
          moisture. You can buy a manufacturer-specific one or use a cheap tarp
          — just make sure it's slightly smaller than your tent floor so rain
          doesn't pool between the layers.
        </li>
      </ul>

      <h2>🛠️ Step 3: The Step-by-Step Pitch</h2>

      <p>
        Here's the universal process that works for most modern tents:
      </p>
      <ol>
        <li>
          <strong>Lay down the footprint.</strong> Center it on your chosen
          spot. Smooth out wrinkles.
        </li>
        <li>
          <strong>Unfold the tent body on top.</strong> Orient the door in the
          direction you want it to face (ideally away from wind, toward your
          view or campfire).
        </li>
        <li>
          <strong>Assemble the poles.</strong> Most poles are shock-corded and
          snap together. Don't force them — let the cord pull each section into
          the next. Assemble all poles before inserting any.
        </li>
        <li>
          <strong>Insert poles into the tent.</strong> For sleeve tents, feed
          poles through fabric sleeves (one person pushes, one pulls — it's a
          two-person job). For clip tents, lay poles across and clip the tent
          body to them. For hub/pop-up tents, follow the specific instructions.
        </li>
        <li>
          <strong>Raise the tent.</strong> Insert pole ends into the grommets
          or pins at the tent corners. The tent should now be standing.
        </li>
        <li>
          <strong>Stake the corners.</strong> Push stakes through the corner
          loops at a <strong>45° angle away from the tent</strong> — not
          straight down. This gives the best holding power. Push until the
          stake top is flush with the ground (so you don't trip on it).
        </li>
        <li>
          <strong>Attach the rainfly.</strong> Drape the fly over the tent,
          orient it correctly (door openings should align), and secure it to the
          tent corners or poles. Stake out the fly's vestibule(s).
        </li>
        <li>
          <strong>Guy out the fly.</strong> If your tent has guy lines, stake
          them out to pull the fly taut. A taut fly sheds water and doesn't flap
          in the wind. Flapping = noisy night.
        </li>
      </ol>

      <ProTip>
        <p>
          <strong>Tension is everything.</strong> A loose tent flaps, leaks, and
          collects water. After staking, walk around and tighten everything —
          corners, fly, guy lines. The fly should be drum-tight. If it's
          sagging, your stakes may need repositioning.
        </p>
      </ProTip>

      <h2>🌧️ Weatherproofing Your Tent</h2>

      <ul>
        <li>
          <strong>Always use the rainfly.</strong> Even on clear nights, dew
          will soak your tent by morning. The fly keeps you dry and adds warmth.
        </li>
        <li>
          <strong>Seam seal if needed.</strong> Most new tents come with
          factory-sealed seams, but check. If yours didn't, buy seam sealer and
          apply it at home before your trip.
        </li>
        <li>
          <strong>Don't touch the walls.</strong> In rain, anything pressing
          against the tent wall will wick moisture through. Keep sleeping bags
          and gear away from the sides.
        </li>
        <li>
          <strong>Ventilate.</strong> Even in cold weather, crack a vent or
          window slightly. Condensation from your breath will soak the inside
          otherwise. A slightly chilly tent is better than a wet one.
        </li>
      </ul>

      <h2>❌ Common Mistakes (We've All Made Them)</h2>

      <ul>
        <li>
          <strong>Not staking the tent.</strong> "It's not windy." Famous last
          words. Stake it. Always.
        </li>
        <li>
          <strong>Pitching on an anthill or animal trail.</strong> Look for
          ant activity and small paths through the brush before you commit.
        </li>
        <li>
          <strong>Forgetting to zip the door.</strong> Bugs. So many bugs.
          Always zip the mesh layer behind you.
        </li>
        <li>
          <strong>Leaving gear outside the vestibule.</strong> Morning dew and
          unexpected rain will soak your boots and backpack. Tuck everything
          under the fly's vestibule.
        </li>
        <li>
          <strong>Over-tightening poles.</strong> Modern tent poles are
          flexible but not indestructible. If a pole is bowing dramatically,
          something's wrong — don't force it.
        </li>
        <li>
          <strong>Shoes in the tent.</strong> Take them off outside. Dirt,
          mud, and pine needles tracked in make for an uncomfortable sleep.
          Bring camp slippers or flip-flops for midnight bathroom trips.
        </li>
      </ul>

      <h2>😴 Final Thoughts</h2>

      <p>
        Your tent is more than just shelter — it's your cozy little home under
        the stars. Take the time to set it up right, and it will reward you with
        great sleep and dry gear. Rush it, and… well, you'll learn the hard way.
      </p>
      <p>
        Once it's up, step back and admire your work. Crawl inside, fluff your
        sleeping bag, and take a moment. You're camping now. This is your spot.
        Enjoy it. ⛺
      </p>
    </GuideLayout>
  );
}
