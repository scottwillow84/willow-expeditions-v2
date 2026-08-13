import { useState } from "react";
import Layout from "../components/Layout";

const stays = [
  {
    id: "sep25",
    dates: "Fri 25 Sep",
    nights: "1 night",
    place: "Overnight stop – TBC",
    status: "Planning",
    note: "Scott & Jane drive south from Sydney.",
    things: ["Easy dinner", "Early night", "Keep the first day simple"],
  },
  {
    id: "sep26",
    dates: "Sat 26 Sep",
    nights: "1 night",
    place: "Spirit of Tasmania",
    status: "Booked",
    note: "2-bed porthole cabin for Scott & Jane.",
    things: ["Board ferry", "Dinner onboard", "Cabin booked"],
  },
  {
    id: "hadspen",
    dates: "Sun 27 – Mon 28 Sep",
    nights: "2 nights",
    place: "Discovery Parks Hadspen",
    status: "Booked",
    note: "Scott & Jane first night. Family together from Monday afternoon.",
    things: [
      "Launceston exploring",
      "Collect Sarah, Mia & Simone – Mon 28 Sep, 3:20 pm",
      "Family dinner",
    ],
  },
  {
    id: "lulworth",
    dates: "Tue 29 – Wed 30 Sep",
    nights: "2 nights",
    place: "Lulworth",
    status: "Booked",
    note: "Relaxed coast stay for all five of us.",
    things: ["Beach", "Local exploring", "Good pub", "Easy family day"],
  },
  {
    id: "sthelens",
    dates: "Thu 1 Oct",
    nights: "1 night",
    place: "St Helens",
    status: "Planning",
    note: "Current idea is to make the drive from Lulworth part of the day.",
    things: ["Bay of Fires", "Binalong Bay", "The Gardens", "Seafood / pub"],
  },
  {
    id: "bicheno",
    dates: "Fri 2 Oct",
    nights: "1 night",
    place: "Bicheno",
    status: "Planning",
    note: "East coast stop before Freycinet.",
    things: ["Bicheno Blowhole", "Little Penguin Tour", "Coastal exploring"],
  },
  {
    id: "colesbay",
    dates: "Sat 3 – Sun 4 Oct",
    nights: "2 nights",
    place: "Coles Bay / Freycinet",
    status: "Planning",
    note: "Two nights so we are not packing up every morning.",
    things: ["Wineglass Bay", "Cape Tourville", "Walks", "Photography", "Seafood"],
  },
  {
    id: "carlton",
    dates: "Mon 5 – Fri 9 Oct",
    nights: "5 nights",
    place: "Carlton River",
    status: "Locked In",
    note: "Family base for the middle of the trip.",
    things: [
      "Port Arthur",
      "Tasman Peninsula",
      "Remarkable Cave",
      "Hobart day trip",
      "kunanyi / Mount Wellington",
      "Family / free day",
    ],
  },
  {
    id: "strahan",
    dates: "Sat 10 – Sun 11 Oct",
    nights: "2 nights",
    place: "Strahan",
    status: "Planning",
    note: "West coast section.",
    things: ["Gordon River Cruise", "Sarah Island", "West coast lookouts", "Pub"],
  },
  {
    id: "cradle",
    dates: "Mon 12 – Tue 13 Oct",
    nights: "2 nights",
    place: "Cradle Mountain",
    status: "Planning",
    note: "Keep some flexibility here for weather and possible snow.",
    things: ["Dove Lake", "Wombats", "Photography", "Snow chase if conditions suit"],
  },
  {
    id: "northcoast",
    dates: "Wed 14 Oct",
    nights: "1 night",
    place: "Devonport / North Coast – TBC",
    status: "Planning",
    note: "Final Tasmania night before the ferry.",
    things: ["Easy final touring day", "Position close to ferry", "Final dinner in Tasmania"],
  },
  {
    id: "returnferry",
    dates: "Thu 15 Oct",
    nights: "1 night",
    place: "Spirit of Tasmania",
    status: "Booked",
    note: "Return sailing is booked for 15 October.",
    things: ["Board return ferry", "Dinner onboard", "Sleep on the boat"],
  },
  {
    id: "home",
    dates: "Fri 16 Oct",
    nights: "Home",
    place: "Sydney",
    status: "Finish",
    note: "Drive home from Geelong.",
    things: ["Drive home", "Unpack later", "Trip done"],
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
        <p>Tap any stay to see what we can do while we are there. Driving details sit between each stop.</p>
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
                    <h4>Things to do</h4>
                    <div className="activityList">
                      {stay.things.map((thing) => (
                        <div className="activityRow" key={thing}>
                          <span>{thing}</span>
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
