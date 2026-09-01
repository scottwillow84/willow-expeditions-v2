import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { routePlans } from "../data/routeOptions";
import { stays } from "../data/stays";

const mapsUrl = (query) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const stayIcon = (type) => {
  if (type === "ferry") return "⛴️";
  if (type === "home") return "🏁";
  return "🏠";
};

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

export default function Home() {
  const jumpToStay = (id) => {
    document.getElementById(`stay-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Layout>
      <section className="plannerIntro">
        <p className="introEyebrow">22 days • family road trip</p>
        <h2>Where are we sleeping?</h2>
        <p>Accommodation stays are marked with a house. Drives sit between them — tap a route to compare fastest, scenic, touring and 4WD options.</p>
      </section>

      <nav className="stayJumpBar" aria-label="Jump to a stay">
        {stays.map((stay) => (
          <button key={stay.id} type="button" onClick={() => jumpToStay(stay.id)}>
            <span>{stayIcon(stay.type)}</span>
            {stay.shortPlace}
          </button>
        ))}
      </nav>

      <div className="calendarList">
        {stays.map((stay) => {
          const route = routes[stay.id];
          const hasThings = Boolean(stay.activities?.length);

          return (
            <div key={stay.id}>
              {route && <RouteCard route={route} />}

              <section id={`stay-${stay.id}`} className="stayCard">
                <div className="stayButton">
                  <div className="dateBlock">
                    <span className="dateText">{stay.dates}</span>
                    <span className="nightText">{stay.nights}</span>
                  </div>

                  <div className="stayIcon" aria-hidden="true">{stayIcon(stay.type)}</div>

                  <div className="stayMain">
                    <div className="stayHeading">
                      <h3>{stay.place}</h3>
                      <span className={`status status-${stay.status.toLowerCase().replaceAll(" ", "-")}`}>
                        {stay.status}
                      </span>
                    </div>
                    <p>{stay.note}</p>
                  </div>
                </div>

                <div className="stayActions">
                  <a className="stayMapLink" href={mapsUrl(stay.mapQuery)} target="_blank" rel="noreferrer">
                    📍 Google Maps ↗
                  </a>
                  {hasThings && (
                    <Link className="thingsLink" to={`/stay/${stay.id}`}>
                      Things to do nearby →
                    </Link>
                  )}
                </div>
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
