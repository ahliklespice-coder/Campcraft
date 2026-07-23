import { createFileRoute } from "@tanstack/react-router";
import { GuideLayout } from "~/components/GuideLayout";
import { ProTip } from "~/components/ProTip";

export const Route = createFileRoute("/guides/weather")({
  component: WeatherGuide,
});

function WeatherGuide() {
  return (
    <GuideLayout
      emoji="🌦️"
      title="Reading the Weather"
      readTime="~4 min"
      category="Safety & Responsibility"
      nextGuide={undefined}
      relatedGuides={[
        {
          to: "/guides/first-trip",
          emoji: "🏕️",
          title: "Your First Camping Trip",
          description: "Apply weather smarts to your trip",
        },
        {
          to: "/guides/tent-setup",
          emoji: "⛺",
          title: "Tent Setup 101",
          description: "Weatherproof your shelter",
        },
        {
          to: "/guides/leave-no-trace",
          emoji: "🌿",
          title: "Leave No Trace",
          description: "Be prepared, protect nature",
        },
      ]}
    >
      <p>
        Weather can make or break a camping trip — but here's the thing: there's
        no such thing as bad weather, only bad preparation. (Okay, maybe
        hailstorms are just bad weather.) With a little knowledge, you can read
        the sky, interpret forecasts the right way, and make smart decisions
        that keep you safe and comfortable.
      </p>

      <h2>📱 How to Check the Forecast (The Right Way)</h2>

      <p>
        Your phone's default weather app isn't enough for camping. Here's what
        you actually need to check:
      </p>

      <h3>Use These Tools</h3>
      <ul>
        <li>
          <strong>Weather.gov (National Weather Service).</strong> Enter the
          nearest town or zip code, then click the map to get a pinpoint
          forecast for your exact camping area. This is the most accurate
          forecast available for the US — and it's free, no ads.
        </li>
        <li>
          <strong>Windy.com.</strong> Incredible visual wind and weather maps.
          See storms moving in real time. Great for understanding wind patterns
          at your campsite.
        </li>
        <li>
          <strong>Mountain-Forecast.com.</strong> If you're camping at elevation,
          this site gives you forecasts at different altitudes. The weather at
          2,000 feet and at 6,000 feet can be completely different.
        </li>
      </ul>

      <h3>What to Look For (Beyond "Sunny, 72°F")</h3>
      <ul>
        <li>
          <strong>Overnight low temperature.</strong> This is the critical
          number for sleeping comfort. Remember: forecast lows are for the
          nearest town, which is usually at a lower elevation. Subtract 5–10°F
          if you're camping higher up or in a valley where cold air settles.
        </li>
        <li>
          <strong>Wind speed and direction.</strong> 10–15 mph is manageable.
          20+ mph means stake everything down, reconsider the campfire, and
          prepare for a noisy tent. Know which direction it's coming from so you
          can pitch accordingly.
        </li>
        <li>
          <strong>Chance of precipitation.</strong> "30% chance of rain" doesn't
          mean it'll rain 30% of the day. It means there's a 30% chance that
          rain will occur at any given point in the forecast area. Anything
          above 20% — pack rain gear.
        </li>
        <li>
          <strong>Humidity and dew point.</strong> High humidity + dropping
          temperature = heavy dew in the morning. Everything outside your tent
          will be wet. Plan accordingly.
        </li>
      </ul>

      <ProTip>
        <p>
          <strong>Check the forecast the morning you leave</strong> — not three
          days before. Mountain and coastal weather changes fast. A forecast
          more than 48 hours out is a guess. The 24-hour forecast from NWS is
          what you should trust.
        </p>
      </ProTip>

      <h2>👀 Signs of Changing Weather (No App Required)</h2>

      <p>
        When you're out of cell range, the sky is your weather report. Here's
        what to watch for:
      </p>

      <h3>Signs That Rain or Storms Are Coming</h3>
      <ul>
        <li>
          <strong>Clouds thickening and lowering.</strong> Cirrus (wispy, high
          clouds) → altostratus (gray sheet) → stratus/nimbostratus (dark,
          low). This progression means rain within 6–12 hours.
        </li>
        <li>
          <strong>Tall, puffy cumulus clouds building upward</strong> into
          cauliflower shapes. If they start growing tall with flat tops (like an
          anvil), thunderstorms are likely within hours.
        </li>
        <li>
          <strong>Sudden drop in temperature</strong> combined with a wind shift.
          A cold front is passing through — expect quick, sometimes intense
          weather changes.
        </li>
        <li>
          <strong>Wind suddenly dying</strong> and the air feeling heavy and
          still. This often precedes a thunderstorm.
        </li>
        <li>
          <strong>Birds and insects go quiet.</strong> Animals sense pressure
          drops and often go silent before storms.
        </li>
        <li>
          <strong>Halo around the sun or moon.</strong> A ring of light is
          caused by ice crystals in high cirrostratus clouds — a reliable sign
          of approaching precipitation within 24 hours.
        </li>
      </ul>

      <h3>Signs the Weather is Improving</h3>
      <ul>
        <li>Clouds lifting and breaking up</li>
        <li>Wind shifting to northwest (in North America)</li>
        <li>Temperature dropping after a warm front passes</li>
        <li>Distant objects becoming clearer (humidity dropping)</li>
      </ul>

      <h2>⚡ Lightning Safety</h2>

      <p>
        Lightning kills more people in the outdoors than most realize. If you
        hear thunder, lightning is close enough to strike you. Here's what to do:
      </p>
      <ul>
        <li>
          <strong>30/30 rule:</strong> If you see lightning and can't count to 30
          before hearing thunder, seek shelter immediately. Stay sheltered for
          30 minutes after the last thunder.
        </li>
        <li>
          <strong>Get out of open areas.</strong> Move away from ridgelines,
          peaks, open meadows, and lakes. You don't want to be the tallest thing.
        </li>
        <li>
          <strong>Avoid isolated trees.</strong> A lone tree in an open area is a
          lightning rod. A forest of uniform-height trees is safer (but still
          not great).
        </li>
        <li>
          <strong>If you're caught in the open:</strong> Crouch low on the balls
          of your feet, feet together, hands off the ground. Don't lie flat —
          you want minimal ground contact. This is called the "lightning crouch"
          and it's your last resort.
        </li>
        <li>
          <strong>Get out of your tent.</strong> Tents offer zero lightning
          protection. Get in your car if possible (the metal frame directs
          current around you, not through you — it's the safest place).
        </li>
        <li>
          <strong>Separate from others.</strong> If in a group, spread out at
          least 20 feet apart so if someone is struck, others can help.
        </li>
      </ul>

      <h2>❄️ Cold Weather Camping Tips</h2>

      <p>You don't need to be winter camping to feel cold. A 50°F night can feel freezing if you're not prepared:</p>
      <ul>
        <li>
          <strong>Insulate from the ground.</strong> The ground pulls heat from
          your body much faster than air. A good sleeping pad (R-value of 3+ for
          cool weather) is more important than a thick sleeping bag.
        </li>
        <li>
          <strong>Wear a hat to bed.</strong> You lose roughly 30% of body heat
          through your head. A warm beanie makes a huge difference.
        </li>
        <li>
          <strong>Change into dry clothes before bed.</strong> The clothes you
          wore all day have moisture in them. Put on fresh, dry base layers —
          especially socks.
        </li>
        <li>
          <strong>Hot water bottle trick.</strong> Boil water, pour it into a
          sturdy water bottle (make sure it won't leak!), wrap it in a sock, and
          toss it in your sleeping bag 10 minutes before bed. Pre-warmed bag =
          instant comfort.
        </li>
        <li>
          <strong>Eat before bed.</strong> Your body generates heat digesting
          food. A snack of cheese, nuts, or chocolate before bed keeps the
          internal furnace running.
        </li>
        <li>
          <strong>Ventilate anyway.</strong> It's tempting to seal the tent
          completely, but condensation from your breath will soak everything.
          Crack a vent — you'll be drier and warmer.
        </li>
      </ul>

      <h2>☀️ Hot Weather Camping Tips</h2>

      <ul>
        <li>
          <strong>Hydrate constantly.</strong> Drink before you're thirsty. In
          hot weather, you need about 1 liter of water per hour during activity.
        </li>
        <li>
          <strong>Pitch for shade.</strong> Look for afternoon shade from trees
          or bring a tarp for a sunshade.
        </li>
        <li>
          <strong>Cool off in water.</strong> A bandana soaked in creek water
          and wrapped around your neck is instant air conditioning.
        </li>
        <li>
          <strong>Rest during peak heat.</strong> 12–3 PM is the hottest part of
          the day. Nap in the shade, read a book, don't push yourself.
        </li>
        <li>
          <strong>Electrolytes matter.</strong> You lose salt when you sweat.
          Bring electrolyte tablets, powder packets, or salty snacks.
        </li>
      </ul>

      <ProTip>
        <p>
          <strong>Learn the signs of heat exhaustion:</strong> heavy sweating,
          weakness, cool/pale/clammy skin, nausea, headache. If you or someone
          with you shows these signs, move to shade, drink cool water, and rest
          immediately. Heat stroke (hot/dry skin, confusion, unconsciousness)
          is a life-threatening emergency — call 911.
        </p>
      </ProTip>

      <h2>🌈 The Right Mindset</h2>

      <p>
        Here's the truth: it might rain. It might be colder than you expected.
        The wind might keep you up for an hour. That's camping. The difference
        between a ruined trip and a memorable one isn't the weather — it's your
        preparation and your attitude.
      </p>
      <p>
        Bring the rain jacket. Pack the extra layer. Check the forecast. And if
        a storm rolls through, sit under your tarp, make some hot chocolate, and
        listen to the rain on the roof. Some of the best camping memories come
        from weather that didn't go to plan.
      </p>
      <p>
        <strong>Be prepared, stay flexible, and enjoy the adventure. 🌦️</strong>
      </p>
    </GuideLayout>
  );
}
