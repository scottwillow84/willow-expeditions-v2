import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import "./routeDetail.css";

const directionsUrl = (origin, destination, waypoints = []) => {
  const params = new URLSearchParams({
    api: "1",
    origin,
    destination,
    travelmode: "driving",
  });

  if (waypoints.length) params.set("waypoints", waypoints.join("|"));

  return `https://www.google.com/maps/dir/?${params.toString()}`;
};

const mapsUrl = (query) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const options = [
  {
    name: "Fastest",
    time: "~55 min",
    distance: "~70 km",
    badge: "Quickest",
    route: "Launceston → East Tamar Highway → Industry Road / Bridport Road → Weymouth → Lulworth",
    road: "Mainly sealed, with a rural shortcut through the Industry Road corridor.",
    bestFor: "Getting to Lulworth quickly without just sitting on major highways the whole way.",
    along: [
      { name: "Legana", query: "Legana Tasmania" },
      { name: "Industry Road / Pipers River rural country", query: "Industry Road Pipers River Tasmania" },
      { name: "Pipers River", query: "Pipers River Tasmania" },
    ],
    note: "Bridport Road upgrades around Industry Road, Pipers River Road and Weymouth Road are scheduled through 2026, so check Google Maps and Tasmanian roadworks before leaving.",
    waypoints: ["Legana Tasmania", "Industry Road Pipers River Tasmania"],
  },
  {
    name: "Country",
    time: "~59 min",
    distance: "~71 km",
    badge: "Easy scenic",
    route: "Launceston → Turners Marsh → Pipers River → Weymouth → Lulworth",
    road: "Easy country-road driving. No 4WD required.",
    bestFor: "A relaxed rural drive with almost no time penalty.",
    along: [
      { name: "Turners Marsh", query: "Turners Marsh Tasmania" },
      { name: "Pipers River", query: "Pipers River Tasmania" },
      { name: "Pipers River wine country", query: "Pipers River wineries Tasmania" },
    ],
    note: "The Pipers River area is one of Tasmania's best-known sparkling-wine regions, so this is the easiest route to turn into a food/wine stop if we feel like it.",
    waypoints: ["Turners Marsh Tasmania", "Pipers River Tasmania"],
  },
  {
    name: "Scenic",
    time: "~1 hr",
    distance: "~75 km",
    badge: "Most interesting",
    route: "Hadspen → Launceston → Lilydale → Karoola / Pipers River → Lulworth",
    road: "Small country roads and forest scenery. Allow extra time if stopping.",
    bestFor: "Making the transfer part of the holiday rather than simply getting there.",
    along: [
      { name: "Lilydale", query: "Lilydale Tasmania" },
      { name: "Lilydale Falls", query: "Lilydale Falls Tasmania" },
      { name: "Pipers River", query: "Pipers River Tasmania" },
    ],
    note: "Lilydale is only about 28 km north of Launceston and gives us the best worthwhile stop of the three routes: rainforest, Lilydale Falls and small-town scenery.",
    waypoints: ["Lilydale Tasmania", "Pipers River Tasmania"],
  },
];

export default function RouteDetail() {
  return (
    <Layout>
      <div className="routePage">
        <Link className="backLink" to="/">← Back to trip</Link>

        <div className="routePageHeader">
          <p className="routeKicker">Tue 29 September</p>
          <h2>Discovery Parks Hadspen → Lulworth</h2>
          <p>
            Google gives us three routes within about five minutes of each other. This is what is actually different about them.
          </p>
        </div>

        <div className="routeChoiceList">
          {options.map((option) => (
            <section className="routeChoice" key={option.name}>
              <div className="routeChoiceHead">
                <div>
                  <span className="routeChoiceBadge">{option.badge}</span>
                  <h3>{option.name}</h3>
                </div>
                <div className="routeChoiceNumbers">
                  <strong>{option.time}</strong>
                  <span>{option.distance}</span>
                </div>
              </div>

              <p className="routeRoadName">{option.route}</p>

              <div className="routeFacts">
                <p><strong>Road:</strong> {option.road}</p>
                <p><strong>Best for:</strong> {option.bestFor}</p>
              </div>

              <h4>What’s along it</h4>
              <div className="routeStops">
                {option.along.map((stop) => (
                  <a key={stop.name} href={mapsUrl(stop.query)} target="_blank" rel="noreferrer">
                    📍 {stop.name} ↗
                  </a>
                ))}
              </div>

              <p className="routeNote">{option.note}</p>

              <a
                className="routeDirectionsButton"
                href={directionsUrl(
                  "Discovery Parks Hadspen Tasmania",
                  "Lulworth Tasmania Australia",
                  option.waypoints,
                )}
                target="_blank"
                rel="noreferrer"
              >
                Open this route in Google Maps ↗
              </a>
            </section>
          ))}
        </div>

        <p className="routeDisclaimer">
          Times and distances are planning figures based on the current route choices. Google Maps may alter the route for traffic or roadworks, so check again on the day.
        </p>
      </div>
    </Layout>
  );
}
