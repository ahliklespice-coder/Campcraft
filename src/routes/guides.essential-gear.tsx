import { createFileRoute } from "@tanstack/react-router";
import { GuideLayout } from "~/components/GuideLayout";
import { ProTip } from "~/components/ProTip";

export const Route = createFileRoute("/guides/essential-gear")({
  component: EssentialGearGuide,
});

function EssentialGearGuide() {
  return (
    <GuideLayout
      emoji="🎒"
      title="The Essential Gear List"
      readTime="~5 min"
      category="Gear"
      nextGuide={{ to: "/guides/leave-no-trace", title: "Leave No Trace" }}
      relatedGuides={[
        {
          to: "/guides/tent-setup",
          emoji: "⛺",
          title: "Tent Setup 101",
          description: "Pitch your shelter right",
        },
        {
          to: "/guides/campfire",
          emoji: "🔥",
          title: "Mastering the Campfire",
          description: "Gear for fire-building",
        },
        {
          to: "/guides/first-trip",
          emoji: "🏕️",
          title: "Your First Camping Trip",
          description: "Put your gear to use",
        },
      ]}
    >
      <p>
        Walking into an outdoor store for the first time is overwhelming. Rows
        of stoves, sleeping bags rated in mysterious temperature numbers,
        tents that cost more than your rent. Here's the truth:{" "}
        <strong>you don't need expensive gear to have a great camping
        trip.</strong> You need the right gear — and a lot of it you probably
        already own or can borrow.
      </p>

      <h2>📋 The 10 Essentials (Explained for Real People)</h2>

      <p>
        Mountaineers came up with "The 10 Essentials" decades ago. They've been
        updated, debated, and refined — but the core idea is simple: these are
        the things that keep you safe and comfortable if something goes wrong.
        Here's what they actually mean for a weekend camper:
      </p>

      <h3>1. Navigation</h3>
      <p>
        Map and compass sound old-school, but phone batteries die. At minimum:
        download offline maps of the area in Google Maps or Gaia GPS before you
        lose service. A physical map of the campground is helpful for exploring.
      </p>

      <h3>2. Headlamp (or Flashlight)</h3>
      <p>
        A headlamp is better than a flashlight — it keeps your hands free for
        cooking, setting up, and midnight bathroom trips. Bring extra batteries.
        Your phone flashlight doesn't count (battery life).
      </p>

      <h3>3. Sun Protection</h3>
      <p>
        Sunscreen (SPF 30+), lip balm with SPF, a wide-brimmed hat, and
        sunglasses. You're outside all day — even on cloudy days, UV exposure
        adds up.
      </p>

      <h3>4. First Aid Kit</h3>
      <p>
        You don't need a paramedic-level kit. Basics: band-aids (various sizes),
        antiseptic wipes, gauze pads, medical tape, tweezers, pain reliever
        (ibuprofen), antihistamine (Benadryl), and any personal medications.
      </p>

      <h3>5. Knife or Multi-Tool</h3>
      <p>
        A simple pocket knife or multi-tool (Leatherman-style) covers cutting
        cord, opening packages, food prep, and a hundred other small tasks. You
        don't need a giant survival knife.
      </p>

      <h3>6. Fire Starter</h3>
      <p>
        Waterproof matches, a butane lighter, or a ferro rod. Bring at least
        two methods. Store matches in a sealed bag. Cotton balls soaked in
        petroleum jelly make excellent homemade fire starters.
      </p>

      <h3>7. Shelter</h3>
      <p>
        Your tent, obviously. But also: an emergency space blanket or bivy sack
        weighs almost nothing and could save you if you get caught out in bad
        weather on a hike.
      </p>

      <h3>8. Extra Food</h3>
      <p>
        Beyond your planned meals, bring a day's worth of no-cook food:
        energy bars, nuts, jerky, dried fruit. Compact, calorie-dense, no
        preparation needed.
      </p>

      <h3>9. Extra Water + Purification</h3>
      <p>
        Carry at least 1 extra liter beyond what you planned. If you're near a
        water source, bring a filter (Sawyer Squeeze, LifeStraw) or
        purification tablets. Boiling works too.
      </p>

      <h3>10. Extra Clothes (Layers!)</h3>
      <p>
        This means a warm insulating layer (fleece or puffy jacket) and a rain
        jacket — even if the forecast is sunny. Mountain weather changes in
        minutes. Extra socks are a must; wet feet are miserable feet.
      </p>

      <h2>💸 What to Buy vs. What to Borrow</h2>

      <p>
        Camping gear gets expensive fast. Here's a smart priority list for
        beginners:
      </p>

      <h3>Buy These First (Worth the Investment)</h3>
      <ul>
        <li>
          <strong>Sleeping bag.</strong> A good one lasts decades. Get a
          synthetic or down bag rated 10–20°F colder than the coldest temps you
          expect. You can always unzip to cool off, but you can't add warmth
          that isn't there.
        </li>
        <li>
          <strong>Sleeping pad.</strong> This isn't just for comfort — it
          insulates you from the cold ground. A basic foam pad ($20–30) works
          fine for summer. Inflatable pads are more comfortable but pricier.
        </li>
        <li>
          <strong>Headlamp.</strong> $20 gets you a reliable one. Don't
          overthink it.
        </li>
        <li>
          <strong>First aid kit.</strong> You can buy a pre-made one or assemble
          your own from a drugstore.
        </li>
      </ul>

      <h3>Borrow or Rent These</h3>
      <ul>
        <li>
          <strong>Tent.</strong> If you're trying camping for the first time,
          borrow one from a friend or rent from REI, Outdoors Geek, or a local
          outdoor shop. Figure out what you like before dropping $200+.
        </li>
        <li>
          <strong>Camp stove.</strong> Borrow one, or cook over the fire.
        </li>
        <li>
          <strong>Cooler.</strong> You probably know someone with a cooler you
          can borrow for a weekend.
        </li>
      </ul>

      <h3>You Probably Already Own These</h3>
      <ul>
        <li>Rain jacket (any kind works — it doesn't need to be Gore-Tex)</li>
        <li>Warm layers (fleece, hoodie, wool socks)</li>
        <li>Water bottles (reuse what you have)</li>
        <li>Backpack or duffel bag (doesn't need to be a "camping" bag)</li>
        <li>Kitchen basics: plates, cups, utensils from home</li>
        <li>Trash bags, ziplock bags, aluminum foil</li>
      </ul>

      <ProTip>
        <p>
          <strong>Rent before you commit.</strong> REI, local outdoor shops, and
          even some universities rent camping gear for cheap. A full weekend
          setup (tent, bag, pad, stove) often rents for $40–60 total. It's the
          best way to try camping without dropping hundreds on gear you might
          use once.
        </p>
      </ProTip>

      <h2>❄️ Seasonal Considerations</h2>

      <h3>Summer Camping</h3>
      <ul>
        <li>Focus on ventilation and shade. A tarp strung up as a sunshade is a game-changer.</li>
        <li>More water than you think. Hot weather = dehydration risk.</li>
        <li>Bug protection: spray, head net, citronella candles.</li>
      </ul>

      <h3>Shoulder Season (Spring / Fall)</h3>
      <ul>
        <li>Layers, layers, layers. 40°F and sunny at noon can be 30°F and windy at 7 PM.</li>
        <li>Bring a warmer sleeping bag than you think you need.</li>
        <li>Hand warmers are $1 and worth their weight in gold.</li>
        <li>Pack a warm hat for sleeping — you lose a ton of heat through your head.</li>
      </ul>

      <h3>Winter Camping</h3>
      <ul>
        <li>
          <strong>Don't start here.</strong> Winter camping is genuinely
          challenging and requires specialized gear. Get a few fair-weather
          trips under your belt first.
        </li>
      </ul>

      <h2>📝 The Bottom Line</h2>

      <p>
        Gear is a tool, not a personality. You don't need the fanciest tent or
        the lightest sleeping bag. You need stuff that works, that you know how
        to use, and that keeps you safe and comfortable. Start simple. Borrow
        what you can. Upgrade piece by piece as you learn what you actually need.
      </p>
      <p>
        <strong>The best gear is the gear that gets you outside.</strong> 🎒
      </p>
    </GuideLayout>
  );
}
