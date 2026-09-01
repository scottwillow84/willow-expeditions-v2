import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { routePlans } from "../data/routeOptions";
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

export default function RouteDetail() {
  const { routeId } = useParams();
  const plan = routePlans[routeId];

  if (!plan) {
    return (
      <Layout>
        <div className="routePage">
          <Link className="backLink" to="/">← Back to trip</Link>
          <div className="routePageHeader">
            <h2>Route not found</h2>
            <p>That route comparison is not in the planner yet.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="routePage">
        <Link className="backLink" to="/">← Back to trip</Link>

        <div className="routePageHeader">
          <p className="routeKicker">{plan.date}</p>
          <h2>{plan.title}</h2>
          <p>{plan.intro}</p>
        </div>

        <div className="routeChoiceList">
          {plan.options.map((option) => (
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

              {option.along?.length > 0 && (
                <>
                  <h4>What’s along it</h4>
                  <div className="routeStops">
                    {option.along.map((stop) => (
                      <a key={stop.name} href={mapsUrl(stop.query)} target="_blank" rel="noreferrer">
                        📍 {stop.name} ↗
                      </a>
                    ))}
                  </div>
                </>
              )}

              <p className="routeNote">{option.note}</p>

              {option.mapEnabled !== false ? (
                <a
                  className="routeDirectionsButton"
                  href={directionsUrl(plan.origin, plan.destination, option.waypoints || [])}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open this route in Google Maps ↗
                </a>
              ) : (
                <div className="routeDirectionsButton" style={{ opacity: 0.65, cursor: "default" }}>
                  No Google Maps through-route for this option
                </div>
              )}
            </section>
          ))}
        </div>

        <p className="routeDisclaimer">
          Times and distances are planning estimates, not promises. For gravel, forest and 4WD options, check current road closures, Parks notices and weather before leaving. Google Maps can also reroute around waypoints, so use it as navigation support rather than proof that a track is open.
        </p>
      </div>
    </Layout>
  );
}
