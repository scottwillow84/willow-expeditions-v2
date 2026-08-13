import { useState } from "react";
import Layout from "../components/Layout";

const mapsUrl = (query) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const stays = [
  {
    id: "sep25",
    dates: "Fri 25 Sep",
    nights: "1 night",
    place: "Overnight stop – TBC",
    mapQuery: "Geelong Victoria Australia",
    status: "Planning",
    note: "Scott & Jane drive south from Sydney.",
    things: [
      { name: "Easy dinner", mapQuery: "restaurants Geelong Victoria" },
      { name: "Early night" },
      { name: "Keep the first day simple" },
    ],
  },
  {
    id: "sep26",
    dates: "Sat 26 Sep",
    nights: "1 night",
    place: "Spirit of Tasmania",
    mapQuery: "Spirit of Tasmania Geelong Terminal",
    status: "Booked",
    note: "2-bed porthole cabin for Scott & Jane.",
    things: [
      { name: "Spirit of Tasmania Geelong Terminal", mapQuery: "Spirit of Tasmania Geelong Terminal" },
      { name: "Dinner onboard" },
      { name: "Cabin booked" },
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
      { name: "Launceston", mapQuery: "Launceston Tasmania" },
      { name: "Launceston Airport", mapQuery: "Launceston Airport Tasmania" },
      { name: "Family dinner", mapQuery: "family restaurants Launceston Tasmania" },
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
      { name: "Lulworth Beach", mapQuery: "Lulworth Beach Tasmania" },
      { name: "Local exploring", mapQuery: "Lulworth Tasmania" },
      { name: "Good pub", mapQuery: "pubs near Lulworth Tasmania" },
      { name: "Easy family day" },
    ],
  },
  {
    id: "sthelens",
    dates: "Thu 1 Oct",
    nights: "1 night",
    place: "St Helens",
    mapQuery: "St Helens Tasmania Australia",
    status: "Planning",
    note: "Current idea is to make the drive from Lulworth part of the day.",
    things: [
      { name: "Bay of Fires", mapQuery: "Bay of Fires Tasmania" },
      { name: "Binalong Bay", mapQuery: "Binalong Bay Tasmania" },
      { name: "The Gardens", mapQuery: "The Gardens Bay of Fires Tasmania" },
      { name: "Seafood / pub", mapQuery: "seafood pub St Helens Tasmania" },
    ],
  },
  {
    id: "bicheno",
    dates: "Fri 2 Oct",
    nights: "1 night",
    place: "Bicheno",
    mapQuery: "Bicheno Tasmania Australia",
    status: "Planning",
    note: "East coast stop before Freycinet.",
    things: [
      { name: "Bicheno Blowhole", mapQuery: "Bicheno Blowhole Tasmania" },
      { name: "Little Penguin Tour", mapQuery: "Bicheno Penguin Tours Tasmania" },
      { name: "Coastal exploring", mapQuery: "Bicheno Tasmania" },
    ],
  },
  {
    id: "colesbay",
    dates: "Sat 3 – Sun 4 Oct",
    nights: "2 nights",
    place: "Coles Bay / Freycinet",
    mapQuery: "Coles Bay Tasmania Australia",
    status: "Planning",
    note: "Two nights so we are not packing up every morning.",
    things: [
      { name: "Wineglass Bay", mapQuery: "Wineglass Bay Tasmania" },
      { name: "Cape Tourville", mapQuery: "Cape Tourville Lighthouse Tasmania" },
      { name: "Freycinet walks", mapQuery: "Freycinet National Park Tasmania" },
      { name: "Photography", mapQuery: "Freycinet National Park Tasmania" },
      { name: "Seafood", mapQuery: "seafood Coles Bay Tasmania" },
    ],
  },
  {
    id: "carlton",
    dates: "Mon 5 – Fri 9 Oct",
    nights: "5 nights",
    place: "Carlton River",
    mapQuery: "Carlton River Tasmania Australia",
    status: "Locked In",
    note: "Family base for the middle of the trip.",
    things: [
      { name: "Port Arthur Historic Site", mapQuery: "Port Arthur Historic Site Tasmania" },
      { name: "Tasman Peninsula", mapQuery: "Tasman Peninsula Tasmania" },
      { name: "Remarkable Cave", mapQuery: "Remarkable Cave Tasmania" },
      { name: "Hobart", mapQuery: "Hobart Tasmania" },
      { name: "kunanyi / Mount Wellington", mapQuery: "kunanyi Mount Wellington Tasmania" },
      { name: "Family / free day" },
    ],
  },
  {
    id: "strahan",
    dates: "Sat 10 – Sun 11 Oct",
    nights: "2 nights",
    place: "Strahan",
    mapQuery: "Strahan Tasmania Australia",
    status: "Planning",
    note: "West coast section.",
    things: [
      { name: "Gordon River Cruise", mapQuery: "Gordon River Cruises Strahan Tasmania" },
      { name: "Sarah Island", mapQuery: "Sarah Island Tasmania" },
      { name: "West coast lookouts", mapQuery: "lookouts near Strahan Tasmania" },
      { name: "Pub", mapQuery: "pubs Strahan Tasmania" },
    ],
  },
  {
    id: "cradle",
    dates: "Mon 12 – Tue 13 Oct",
    nights: "2 nights",
    place: "Cradle Mountain",
    mapQuery: "Cradle Mountain Tasmania Australia",
    status: "Planning",
    note: "Keep some flexibility here for weather and possible snow.",
    things: [
      { name: "Dove Lake", mapQuery: "Dove Lake Tasmania" },
      { name: "Wombats", mapQuery: "Cradle Mountain Tasmania" },
      { name: "Photography", mapQuery: "Cradle Mountain Tasmania" },
      { name: "Snow chase if conditions suit", mapQuery: "Cradle Mountain Tasmania" },
    ],
  },
  {
    id: "northcoast",
    dates: "Wed 14 Oct",
    nights: "1 night",
    place: "Devonport / North Coast – TBC",
    mapQuery: "Devonport Tasmania Australia",
    status: "Planning",
    note: "Final Tasmania night before the ferry.",
    things: [
      { name: "Devonport", mapQuery: "Devonport Tasmania" },
      { name: "Position close to ferry", mapQuery: "Spirit of Tasmania Devonport Terminal" },
      { name: "Final dinner in Tasmania", mapQuery: "restaurants Devonport Tasmania" },
    ],
  },
  {
    id: "returnferry",
    dates: "Thu 15 Oct",
    nights: "1 night",
    place: "Spirit of Tasmania",
    mapQuery: "Spirit of Tasmania Devonport Terminal",
    status: "Booked",
    note: "Return sailing is booked for 15 October.",
    things: [
      { name: "Spirit of Tasmania Devonport Terminal", mapQuery: "Spirit of Tasmania Devonport Terminal" },
      { name: "Dinner onboard" },
      { name: "Sleep on the boat" },
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
      { name: "Drive home", mapQuery: "Sydney NSW Australia" },
      { name: "Unpack later" },
      { name: "Trip done" },
    ],
  },
];

const routes = {
  sep26: { from: "Overnight stop", to: "Geelong / ferry", direct: "Direct route", scenic: "TBC", offroad: "Not needed" },
  hadspen: { from: "Devonport", to: "Hadspen", direct: "Direct route", scenic: "Optional stops", offroad: "Not needed" },
  lulworth: { from: "Hadspen", to: "Lulworth", direct: "Direct route", scenic: "Scenic option to compare", offroad: "Optional" },
  sthelens: { from: "Lulworth", to: "St Helens", direct: "Direct route", scenic: "Via Gladstone / north-east back roads", offroad: "4WD options to research" },
  bicheno: { from: "St Helens", to: "Bicheno", direct: "Coastal route", scenic: "Bay of Fires stops", offroad: "Optional detours" },
  colesbay: { from: "Bicheno", to: "Coles Bay", direct: "Direct route", scenic: "Coastal stops", offroad: "Not a priority" },
  carlton: { from: "Coles Bay", to: "Carlton River", direct: "Direct route", scenic: "Scenic option to compare", offroad: "Optional" },
  strahan: { from: "Carlton River", to: "Strahan", direct: "Direct route", scenic: "Make it a touring day", offroad: "Optional" },
  cradle: { from: "Strahan", to: "Cradle Mountain", direct: "Direct route", scenic: "Scenic west coast drive", offroad: "Optional" },
  northcoast: { from: "Cradle Mountain", to: "North Coast", direct: "Direct route", scenic: "Flexible final day", offroad: "Optional" },
  returnferry: { from: "North Coast", to: "Spirit of Tasmania", direct: "Short run to ferry", scenic: "Not needed", offroad: "Not needed" },
  home: { from: "Geelong", to: "Sydney", direct: "Direct route home", scenic: "Only if we feel like it", offroad: "No" },
};

function RouteCard({ route }) {
  return (
    <div className="routeCard">
      <div className="routeTop">
        <span>🚙 {route.from} → {route.to}</span>
        <span className="routeNumbers">Distance: — &nbsp; • &nbsp; Drive: —</span>
      </div>
      <div className="routeOptions">
        <span><strong>Direct:</strong> {route.direct}</span>
        <span><strong>Scenic:</strong> {route.scenic}</span>
        <span><strong>4WD:</strong> {route.offroad}</span>
      </div>
    </div>
  );
}

export default function Home() {
  const [openStay, setOpenStay] = useState("hadspen");

  return (
    <Layout>
      <section className="plannerIntro">
        <h2>Where are we sleeping?</h2>
        <p>Tap any stay to see what we can do while we are there. Map links open straight in Google Maps.</p>
      </section>

      <div className="calendarList">
        {stays.map((stay, index) => {
          const isOpen = openStay === stay.id;
          const route = index > 0 ? routes[stay.id] : null;

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
                          <span className="activityDistance">Distance: —</span>
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
        Distances and drive times are deliberately blank until we verify each leg — no made-up numbers.
      </p>
    </Layout>
  );
}
