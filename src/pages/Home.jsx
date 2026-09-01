import { useState } from "react";
import Layout from "../components/Layout";

const mapsUrl = (query) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const directionsUrl = (origin, destination) =>
  `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=driving`;

const stays = [
  {
    id: "sep26",
    dates: "Sat 26 Sep",
    nights: "1 night",
    place: "Spirit of Tasmania",
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

const routes = {
  sep26: {
    from: "Sydney",
    to: "Spirit of Tasmania – Geelong",
    origin: "Sydney NSW Australia",
    destination: "Spirit of Tasmania Geelong Terminal",
    distance: "920 km",
    drive: "~9 h 45 min",
    direct: "M31 / Hume → Geelong",
    scenic: "No — get to the boat",
    offroad: "No",
  },
  hadspen: {
    from: "Devonport",
    to: "Hadspen",
    origin: "Spirit of Tasmania Devonport Terminal",
    destination: "Discovery Parks Hadspen Tasmania",
    distance: "88 km",
    drive: "~1 h",
    direct: "Bass Hwy / Meander Valley",
    scenic: "Optional stops",
    offroad: "Not needed",
  },
  lulworth: {
    from: "Hadspen",
    to: "Lulworth",
    origin: "Discovery Parks Hadspen Tasmania",
    destination: "Lulworth Tasmania Australia",
    distance: "~70–75 km",
    drive: "~55–60 min",
    direct: "Three good route choices",
    scenic: "Lilydale / Pipers River options",
    offroad: "Industry Road rural shortcut option",
    comparePath: "#/route/hadspen-lulworth",
  },
  sthelens: {
    from: "Lulworth",
    to: "St Helens",
    origin: "Lulworth Tasmania Australia",
    destination: "Tasman Holiday Parks St Helens Tasmania",
    distance: "~150 km",
    drive: "~2 h 30 min direct",
    direct: "Via Bridport / north-east",
    scenic: "Via Gladstone / Ansons Bay",
    offroad: "Legal 4WD detours to research",
  },
  bicheno: {
    from: "St Helens",
    to: "Bicheno",
    origin: "Tasman Holiday Parks St Helens Tasmania",
    destination: "8 Banksia Street Bicheno TAS 7215 Australia",
    distance: "~75 km",
    drive: "~1 h",
    direct: "Tasman Hwy via Scamander",
    scenic: "Coastal stops along the Great Eastern Drive",
    offroad: "Optional detours",
  },
  carlton: {
    from: "Bicheno",
    to: "Carlton River",
    origin: "8 Banksia Street Bicheno TAS 7215 Australia",
    destination: "Carlton River Tasmania Australia",
    distance: "~150 km",
    drive: "~2 h",
    direct: "Great Eastern Drive south via Swansea / Triabunna / Orford",
    scenic: "Plenty of east-coast stops if we make a day of it",
    offroad: "Optional",
  },
  strahan: {
    from: "Carlton River",
    to: "Strahan",
    origin: "Carlton River Tasmania Australia",
    destination: "10 Innes Street West Strahan TAS 7468 Australia",
    distance: "~340 km",
    drive: "~5 h",
    direct: "Via Hobart / Lyell Hwy",
    scenic: "Make it a full touring day",
    offroad: "Optional",
  },
  smithton: {
    from: "Strahan",
    to: "Smithton",
    origin: "10 Innes Street West Strahan TAS 7468 Australia",
    destination: "Tall Timbers Hotel 15 Scotchtown Road Smithton TAS 7330 Australia",
    distance: "~260 km",
    drive: "~3 h 30 min",
    direct: "North via Zeehan / Burnie then west to Smithton",
    scenic: "West Coast and north-west touring day",
    offroad: "Optional detours",
  },
  returnferry: {
    from: "Smithton",
    to: "Spirit of Tasmania – Devonport",
    origin: "Tall Timbers Hotel 15 Scotchtown Road Smithton TAS 7330 Australia",
    destination: "Spirit of Tasmania Devonport Terminal",
    distance: "~134 km",
    drive: "~1 h 40 min",
    direct: "Bass Hwy via Burnie",
    scenic: "Allow extra time for a north-west coast stop if ferry timing permits",
    offroad: "No",
  },
  home: {
    from: "Geelong",
    to: "Sydney",
    origin: "Spirit of Tasmania Geelong Terminal",
    destination: "Sydney NSW Australia",
    distance: "~920 km",
    drive: "~9 h 45 min",
    direct: "M31 / Hume",
    scenic: "Only if we feel like it",
    offroad: "No",
  },
};

function RouteCard({ route }) {
  return (
    <div className="routeCard">
      <div className="routeTop">
        <span>🚙 {route.from} → {route.to}</span>
        <span className="routeNumbers">{route.distance} &nbsp; • &nbsp; {route.drive}</span>
      </div>
      <div className="routeOptions">
        <span><strong>Direct:</strong> {route.direct}</span>
        <span><strong>Scenic:</strong> {route.scenic}</span>
        <span><strong>4WD:</strong> {route.offroad}</span>
      </div>

      {route.comparePath ? (
        <a className="routeMapLink" href={route.comparePath}>
          Compare the route options →
        </a>
      ) : (
        <a
          className="routeMapLink"
          href={directionsUrl(route.origin, route.destination)}
          target="_blank"
          rel="noreferrer"
        >
          Open route in Google Maps ↗
        </a>
      )}
    </div>
  );
}

export default function Home() {
  const [openStay, setOpenStay] = useState("hadspen");

  return (
    <Layout>
      <section className="plannerIntro">
        <h2>Where are we sleeping?</h2>
        <p>Tap any stay for nearby ideas. Tap any map link to open it straight in Google Maps.</p>
      </section>

      <div className="calendarList">
        {stays.map((stay) => {
          const isOpen = openStay === stay.id;
          const route = routes[stay.id];

          return (
            <div key={stay.id}>
              {route && <RouteCard route={route} />}

              <section className={`stayCard ${isOpen ? "open" : ""}`}>
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

                    <h4>Things to do</h4>
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
        Drive times are planning estimates. Tap the Google Maps route before travel for the live route and traffic.
      </p>
    </Layout>
  );
}
