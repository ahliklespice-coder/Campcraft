import { createFileRoute } from "@tanstack/react-router";
import { GuideLayout } from "~/components/GuideLayout";
import { ProTip } from "~/components/ProTip";

export const Route = createFileRoute("/guides/first-trip")({
  component: FirstTripGuide,
});

function FirstTripGuide() {
  return (
    <GuideLayout
      emoji="🏕️"
      title="Your First Camping Trip"
      readTime="~5 min"
      category="Getting Started"
      nextGuide={{ to: "/guides/family-camping", title: "Camping with Kids" }}
      relatedGuides={[
        {
          to: "/guides/tent-setup",
          emoji: "⛺",
          title: "Tent Setup 101",
          description: "Pitch your tent like a pro",
        },
        {
          to: "/guides/essential-gear",
          emoji: "🎒",
          title: "The Essential Gear List",
          description: "Everything you need to pack",
        },
        {
          to: "/guides/weather",
          emoji: "🌦️",
          title: "Reading the Weather",
          description: "Be prepared for any conditions",
        },
      ]}
    >
      <p>
        So you've decided to go camping! First of all — amazing choice. There's
        nothing quite like falling asleep under the stars, waking up to birdsong,
        and sipping coffee as the sun rises over the trees. And here's the
        secret: <strong>every expert camper was once a complete beginner</strong>,
        fumbling with tent poles and wondering which way the sleeping bag zipper
        goes. You're in good company.
      </p>

      <p>
        This guide will walk you through everything you need to know for your
        very first camping trip — step by step, no jargon, no assumptions.
      </p>

      <h2>🚗 Step 1: Choose Your Campsite Type</h2>

      <p>
        Not all campsites are created equal, and picking the right one makes a
        huge difference. Here are the two main types:
      </p>

      <h3>Developed Campgrounds (Start Here!)</h3>
      <p>
        These are the best choice for first-timers. Think of them as camping with
        training wheels — in a good way! Developed campgrounds typically have:
      </p>
      <ul>
        <li>Designated tent pads or RV spots with picnic tables and fire rings</li>
        <li>Bathrooms with flush toilets (some even have showers!)</li>
        <li>Potable (drinkable) water from a spigot</li>
        <li>Camp hosts or rangers nearby if you need help</li>
        <li>Clear signage and numbered sites</li>
      </ul>

      <h3>Dispersed Camping (Save for Later)</h3>
      <p>
        Also called "primitive" or "backcountry" camping, this means camping
        outside of designated campgrounds — often on public lands like national
        forests. No bathrooms, no water, no help nearby. It's incredible
        once you have some experience, but for your first trip, stick to a
        developed campground.
      </p>

      <ProTip>
        <p>
          Reserve your spot early! Popular campgrounds book up months in advance,
          especially on summer weekends. Check{" "}
          <strong>Recreation.gov</strong> or your state park's website. Many
          campgrounds also keep a handful of first-come, first-served sites — call
          ahead and ask.
        </p>
      </ProTip>

      <h2>📋 Step 2: Make a Reservation (or Find a Walk-Up Site)</h2>

      <p>
        Once you've picked a campground, book your site. When choosing a specific
        site, look for:
      </p>
      <ul>
        <li>
          <strong>Shade</strong> — a site with partial shade keeps your tent
          cooler in the morning
        </li>
        <li>
          <strong>Level ground</strong> — you'll sleep much better on flat ground
          (trust us)
        </li>
        <li>
          <strong>Distance from bathrooms</strong> — close enough for midnight
          trips, far enough to avoid foot traffic and lights
        </li>
        <li>
          <strong>Water access</strong> — being near a water spigot is convenient
          but can mean more bugs
        </li>
      </ul>

      <h2>🎒 Step 3: Pack Smart (But Don't Overpack)</h2>

      <p>
        First-timer mistake #1: bringing way too much stuff. You don't need a
        full kitchen, four changes of clothes per day, or every gadget you own.
        Focus on the essentials:
      </p>
      <ul>
        <li>
          <strong>Shelter:</strong> Tent, sleeping bag, sleeping pad or air
          mattress
        </li>
        <li>
          <strong>Food & water:</strong> Simple meals, snacks, at least 1 gallon
          of water per person per day
        </li>
        <li>
          <strong>Clothing:</strong> Layers! Even summer nights get cool. Bring a
          warm jacket, rain gear, and extra socks
        </li>
        <li>
          <strong>Light:</strong> Headlamp or flashlight (with fresh batteries)
        </li>
        <li>
          <strong>First aid kit:</strong> At minimum: band-aids, antiseptic
          wipes, pain reliever, and any personal meds
        </li>
        <li>
          <strong>Sun & bug protection:</strong> Sunscreen, hat, insect repellent
        </li>
      </ul>

      <ProTip>
        <p>
          Do a "driveway campout" before your trip. Set up your tent in the
          backyard (or even the living room!) and sleep in it for a night. You'll
          learn how your gear works without the pressure of being in the
          wilderness, and you'll discover what you forgot to pack.
        </p>
      </ProTip>

      <h2>📍 Step 4: What to Expect on Arrival</h2>

      <p>
        You've driven to the campground — now what? Here's your arrival
        checklist:
      </p>
      <ol>
        <li>
          <strong>Check in at the entrance station</strong> or campground host
          site. They'll confirm your reservation and give you a tag for your car
          or tent.
        </li>
        <li>
          <strong>Find your site number</strong> and park in the designated spot.
          Don't drive or park on vegetation.
        </li>
        <li>
          <strong>Walk the site before unloading.</strong> Look for the best tent
          spot (flat, no rocks or roots, no overhead dead branches called
          "widowmakers").
        </li>
        <li>
          <strong>Unload and set up shelter first.</strong> Even if it's sunny
          now, you'll want your tent up before anything else — weather changes
          fast.
        </li>
        <li>
          <strong>Organize your camp:</strong> kitchen area on one side, sleeping
          area on the other, trash bag hung or secured away from animals.
        </li>
      </ol>

      <h2>⛺ Step 5: Setting Up Camp — A Walkthrough</h2>

      <p>Here's the order of operations that experienced campers follow:</p>
      <ol>
        <li>
          <strong>Set up your tent</strong> — clear the ground of rocks and
          sticks, lay down a footprint or tarp (slightly smaller than tent
          floor), stake corners at 45° angles
        </li>
        <li>
          <strong>Inflate sleeping pads</strong> and lay out sleeping bags so
          they can "loft" (fluff up) for warmth
        </li>
        <li>
          <strong>Set up the kitchen</strong> — camp stove on a stable surface,
          food in sealed containers, cooler in the shade
        </li>
        <li>
          <strong>Organize your lighting</strong> — headlamp around your neck,
          lantern on the table, spare flashlight in the tent
        </li>
        <li>
          <strong>Collect firewood</strong> if allowed (buy it locally to avoid
          spreading pests — never transport firewood long distances)
        </li>
        <li>
          <strong>Relax!</strong> You've earned it. Crack open a drink, sit
          back, and soak it all in.
        </li>
      </ol>

      <h2>😬 Step 6: Common First-Timer Mistakes (and How to Avoid Them)</h2>

      <p>
        We've all made these. Here's how to skip the learning curve:
      </p>
      <ul>
        <li>
          <strong>Arriving after dark.</strong> Setting up in the dark is no fun.
          Aim to arrive by mid-afternoon — ideally by 3 PM.
        </li>
        <li>
          <strong>Forgetting to stake the rainfly.</strong> Even if it's clear
          skies, dew will soak your tent. Put the fly on.
        </li>
        <li>
          <strong>Leaving food out overnight.</strong> Raccoons, squirrels, and
          bears (depending where you are) will find it. Store food in your car or
          a bear box.
        </li>
        <li>
          <strong>Wearing cotton to bed.</strong> Cotton holds moisture and makes
          you cold. Sleep in wool or synthetic layers.
        </li>
        <li>
          <strong>Underestimating nighttime temperatures.</strong> A 50°F
          forecast can feel like 40°F when you're still and the dew sets in.
          Bring an extra blanket.
        </li>
        <li>
          <strong>Not telling anyone where you're going.</strong> Always share
          your campground name, site number, and expected return with a friend or
          family member.
        </li>
      </ul>

      <h2>🌅 The Most Important Step</h2>

      <p>
        Here's the thing: your first trip won't be perfect. Maybe you'll forget
        the marshmallows. Maybe it'll rain. Maybe the tent will take three tries
        to pitch (we've all been there). That's all part of it.
      </p>
      <p>
        What matters is that you showed up. You tried something new. You stepped
        outside your comfort zone and into the outdoors. And I promise you this —
        when you're sitting by the fire, looking up at stars you never see from
        the city, you'll know it was worth it.
      </p>
      <p>
        <strong>Welcome to camping. You're going to love it here.</strong> 🌲
      </p>
    </GuideLayout>
  );
}
