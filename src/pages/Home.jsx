import { useState } from "react";
import Layout from "../components/Layout";
import { routePlans } from "../data/routeOptions";

const mapsUrl = (query) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const stays = [
  {
    id: "sep26",
    dates: "Sat 26 Sep",
    nights: "1 night",
    place: "Spirit of Tasmania",
    shortPlace: "Spirit",
    visualLabel: "Geelong → Devonport",
    visualIcon: "⛴️",
    theme: "ferry",
    mapQuery: "Spirit of Tasmania Geelong Terminal",
    status: "Booked",
    note: "Scott & Jane drive Sydney → Geelong and go straight onto the boat. No hotel stop.",
    things: [
      { name: "Spirit of Tasmania Geelong Terminal", mapQuery: "Spirit of Tasmania Geelong Terminal", distance: "Destination" },
      { name: "Dinner onboard", distance: "Onboard" },
      { name: "2-bed porthole cabin", distance: "Onboard" },
    ],
  },
  {
    id: "hadspen",
    dates: "Sun 27 – Mon 28 Sep",
    nights: "2 nights",
    place: "Discovery Parks Hadspen",
    shortPlace: "Hadspen",
    visualLabel: "Meander Valley",
    visualIcon: "🌿",
    theme: "valley",
    mapQuery: "Discovery Parks Hadspen Tasmania",
    status: "Booked",
    note: "Scott & Jane first night. Family together from Monday afternoon.",
    things: [
      { name: "Launceston", mapQuery: "Launceston Tasmania", distance: "12 km • ~10 min" },
      { name: "Launceston Airport", mapQuery: "Launceston Airport Tasmania", distance: "19 km • ~14 min" },
      { name: "Family dinner", mapQuery: "family restaurants Launceston Tasmania", distance: "~12 km to Launceston" },
    ],
  },
  {
    id: "lulworth",
    dates: "Tue 29 – Wed 30 Sep",
    nights: "2 nights",
    place: "Lulworth",
    shortPlace: "Lulworth",
    visualLabel: "North-east coast",
    visualIcon: "🌊",
    theme: "coast",
    mapQuery: "Lulworth Tasmania Australia",
    status: "Booked",
    note: "Relaxed coast stay for all five of us.",
    things: [
      { name: "Lulworth Beach", mapQuery: "Lulworth Beach Tasmania", distance: "Local" },
      { name: "Local exploring", mapQuery: "Lulworth Tasmania", distance: "Local" },
      { name: "Good pub", mapQuery: "pubs near Lulworth Tasmania", distance: "Varies" },
      { name: "Easy family day", distance: "—" },
    ],
  },
  {
    id: "sthelens",
    dates: "Thu 1 – Fri 2 Oct",
    nights: "2 nights",
    place: "Tasman Holiday Parks – St Helens",
    shortPlace: "St Helens",
    visualLabel: "Bay of Fires",
    visualIcon: "🧡",
    theme: "bay",
    mapQuery: "Tasman Holiday Parks St Helens Tasmania",
    status: "Booked",
    note: "Bay Breeze Cabin • Sleeps 6 • $431 total. Check out Sat 3 Oct.",
    things: [
      { name: "Bay of Fires", mapQuery: "Bay of Fires Tasmania", distance: "~11–30 km • 15–30 min" },
      { name: "Binalong Bay", mapQuery: "Binalong Bay Tasmania", distance: "11 km • ~10–15 min" },
      { name: "The Gardens", mapQuery: "The Gardens Bay of Fires Tasmania", distance: "~24 km • ~25 min" },
      { name: "Seafood / pub", mapQuery: "seafood pub St Helens Tasmania", distance: "Local" },
    ],
  },
  {
    id: "bicheno",
    dates: "Sat 3 – Sun 4 Oct",
    nights: "2 nights",
    place: "Home in Bicheno",
    shortPlace: "Bicheno",
    visualLabel: "East coast",
    visualIcon: "🐧",
    theme: "bicheno",
    mapQuery: "8 Banksia Street Bicheno TAS 7215 Australia",
    status: "Booked",
    note: "Airbnb • 5 guests • $371.68 paid • Check-in Sat 3 Oct 10:00 am • Checkout Mon 5 Oct 2:00 pm • Key safe self check-in.",
    things: [
      { name: "Bicheno Blowhole", mapQuery: "Bicheno Blowhole Tasmania", distance: "Local • few min" },
      { name: "Bicheno Penguin Tours", mapQuery: "Bicheno Penguin Tours Tasmania", distance: "Local • few min" },
      { name: "Freycinet / Coles Bay", mapQuery: "Freycinet National Park Tasmania", distance: "~35 km • ~30 min" },
      { name: "Friendly Beaches", mapQuery: "Friendly Beaches Tasmania", distance: "~28 km • ~27 min" },
      { name: "Seafood / pub", mapQuery: "seafood pub Bicheno Tasmania", distance: "Local" },
    ],
  },
  {
    id: "carlton",
    dates: "Mon 5 – Thu 8 Oct",
    nights: "4 nights",
    place: "Carlton River",
    shortPlace: "Carlton",
    visualLabel: "Family base",
    visualIcon: "🏡",
    theme: "river",
    mapQuery: "Carlton River Tasmania Australia",
    status: "Locked In",
    note: "Family base. Leave Friday 9 October for Strahan.",
    things: [
      { name: "Port Arthur Historic Site", mapQuery: "Port Arthur Historic Site Tasmania", distance: "~60 km • ~1 hr" },
      { name: "Tasman Peninsula", mapQuery: "Tasman Peninsula Tasmania", distance: "~30–60 km" },
      { name: "Remarkable Cave", mapQuery: "Remarkable Cave Tasmania", distance: "~65 km • ~1 hr" },
      { name: "Hobart", mapQuery: "Hobart Tasmania", distance: "40 km • ~30–40 min" },
      { name: "kunanyi / Mount Wellington", mapQuery: "kunanyi Mount Wellington Tasmania", distance: "~60 km • ~1 hr" },
    ],
  },
  {
    id: "strahan",
    dates: "Fri 9 – Sun 11 Oct",
    nights: "3 nights",
    place: "Home in Strahan",
    shortPlace: "Strahan",
    visualLabel: "Wild west coast",
    visualIcon: "🌧️",
    theme: "west",
    mapQuery: "10 Innes Street West Strahan TAS 7468 Australia",
    status: "Booked",
    note: "Four Bedroom Cottage • 5 guests • $782.10 paid • Check-in Fri 9 Oct 2:00 pm • Checkout Mon 12 Oct 10:00 am.",
    things: [
      { name: "Gordon River Cruise", mapQuery: "Gordon River Cruises Strahan Tasmania", distance: "Strahan waterfront" },
      { name: "Sarah Island", mapQuery: "Sarah Island Tasmania", distance: "By cruise / boat" },
      { name: "Ocean Beach", mapQuery: "Ocean Beach Strahan Tasmania", distance: "~6 km • ~10 min" },
      { name: "Hogarth Falls", mapQuery: "Hogarth Falls Strahan Tasmania", distance: "Local" },
      { name: "Pub / dinner", mapQuery: "pubs Strahan Tasmania", distance: "Local" },
    ],
  },
  {
    id: "smithton",
    dates: "Mon 12 – Wed 14 Oct",
    nights: "3 nights",
    place: "Tall Timbers Hotel – Smithton",
    shortPlace: "Smithton",
    visualLabel: "Tarkine country",
    visualIcon: "🌲",
    theme: "tarkine",
    mapQuery: "Tall Timbers Hotel 15 Scotchtown Road Smithton TAS 7330 Australia",
    status: "Booked",
    note: "TT Lake Apartment • 2 bedrooms • 2 bathrooms • 4 adults + 1 child • $904.50 total • Check out Thu 15 Oct.",
    things: [
      { name: "Stanley / The Nut", mapQuery: "The Nut Stanley Tasmania", distance: "~22 km • ~20 min" },
      { name: "Tarkine Drive", mapQuery: "Tarkine Drive Tasmania", distance: "Day trip" },
      { name: "Edge of the World", mapQuery: "Edge of the World Arthur River Tasmania", distance: "~50 km • ~45 min" },
      { name: "Dip Falls", mapQuery: "Dip Falls Tasmania", distance: "~45 km • ~45 min" },
      { name: "Tall Timbers", mapQuery: "Tall Timbers Hotel Smithton Tasmania", distance: "Here" },
    ],
  },
  {
    id: "returnferry",
    dates: "Thu 15 Oct",
    nights: "1 night",
    place: "Spirit of Tasmania",
    shortPlace: "Ferry",
    visualLabel: "Devonport → Geelong",
    visualIcon: "⛴️",
    theme: "ferry",
    mapQuery: "Spirit of Tasmania Devonport Terminal",
    status: "Booked",
    note: "Check out of Smithton and drive to Devonport for the return sailing.",
    things: [
      { name: "Spirit of Tasmania Devonport Terminal", mapQuery: "Spirit of Tasmania Devonport Terminal", distance: "Destination" },
      { name: "Dinner onboard", distance: "Onboard" },
      { name: "Sleep on the boat", distance: "Onboard" },
    ],
  },
  {
    id: "home",
    dates: "Fri 16 Oct",
    nights: "Home",
    place: "Sydney",
    shortPlace: "Home",
    visualLabel: "Trip done",
    visualIcon: "🏠",
    theme: "home",
    mapQuery: "Sydney NSW Australia",
    status: "Finish",
    note: "Drive home from Geelong.",
    things: [
      { name: "Drive home", mapQuery: "Sydney NSW Australia", distance: "~920 km" },
      { name: "Unpack later", distance: "—" },
      { name: "Trip done", distance: "—" },
    ],
  },
];

const routes = Object.fromEntries(
  Object.entries(routePlans).map(([id, plan]) => [
    id,
    {
      ...plan.summary,
      comparePath: `#/route/${id}`,
    },
  ]),
);

function RouteCard({ route }) {
  return (
    <div className="routeCard">
      <div className="routeTop">
        <span className="routeTitle">🚙 {route.from} → {route.to}</span>
        <span className="routeNumbers">{route.distance} &nbsp; • &nbsp; {route.drive}</span>
      </div>
      <div className="routeOptions">
        <span><strong>Fastest:</strong> {route.direct}</span>
        <span><strong>Scenic:</strong> {route.scenic}</span>
        <span><strong>Touring:</strong> {route.touring}</span>
        <span><strong>4WD:</strong> {route.offroad}</span>
      </div>
      <a className="routeMapLink" href={route.comparePath}>
        Compare all 4 routes →
      </a>
    </div>
  );
}

function StayVisual({ stay }) {
  return (
    <div className={`stayVisual stayVisual-${stay.theme}`} aria-hidden="true">
      <span className="stayVisualIcon">{stay.visualIcon}</span>
      <span className="stayVisualLabel">{stay.visualLabel}</span>
    </div>
  );
}

export default function Home() {
  const [openStay, setOpenStay] = useState("hadspen");

  const jumpToStay = (id) => {
    document.getElementById(`stay-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Layout>
      <section className="plannerIntro">
        <div>
          <p className="introEyebrow">22 days • family road trip</p>
          <h2>Where are we sleeping?</h2>
          <p>Tap a stay for nearby ideas. Tap any drive card to compare fastest, scenic, touring and 4WD options.</p>
        </div>
      </section>

      <nav className="stayJumpBar" aria-label="Jump to a stay">
        {stays.map((stay) => (
          <button key={stay.id} type="button" onClick={() => jumpToStay(stay.id)}>
            <span>{stay.visualIcon}</span>
            {stay.shortPlace}
          </button>
        ))}
      </nav>

      <div className="calendarList">
        {stays.map((stay) => {
          const isOpen = openStay === stay.id;
          const route = routes[stay.id];

          return (
            <div key={stay.id}>
              {route && <RouteCard route={route} />}

              <section id={`stay-${stay.id}`} className={`stayCard ${isOpen ? "open" : ""}`}>
                <button
                  className="stayButton"
                  type="button"
                  onClick={() => setOpenStay(isOpen ? null : stay.id)}
                  aria-expanded={isOpen}
                >
                  <div className="dateBlock">
                    <span className="dateText">{stay.dates}</span>
                    <span className="nightText">{stay.nights}</span>
                  </div>

                  <div className="stayMain">
                    <div className="stayHeading">
                      <h3>{stay.place}</h3>
                      <span className={`status status-${stay.status.toLowerCase().replaceAll(" ", "-")}`}>
                        {stay.status}
                      </span>
                    </div>
                    <p>{stay.note}</p>
                  </div>

                  <StayVisual stay={stay} />
                  <span className="chevron" aria-hidden="true">{isOpen ? "−" : "+"}</span>
                </button>

                {isOpen && (
                  <div className="stayDetails">
                    <a
                      className="stayMapLink"
                      href={mapsUrl(stay.mapQuery)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      📍 Open {stay.place} in Google Maps ↗
                    </a>

                    <h4>Things to do nearby</h4>
                    <div className="activityList">
                      {stay.things.map((thing) => (
                        <div className="activityRow" key={thing.name}>
                          {thing.mapQuery ? (
                            <a
                              className="activityMapLink"
                              href={mapsUrl(thing.mapQuery)}
                              target="_blank"
                              rel="noreferrer"
                            >
                              📍 {thing.name} ↗
                            </a>
                          ) : (
                            <span>{thing.name}</span>
                          )}
                          <span className="activityDistance">{thing.distance}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            </div>
          );
        })}
      </div>

      <p className="plannerNote">
        Route times and distances are planning estimates. Gravel and 4WD options still need a current road-condition check before we use them.
      </p>
    </Layout>
  );
}
