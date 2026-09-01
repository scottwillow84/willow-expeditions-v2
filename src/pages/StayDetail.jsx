import { Link, Navigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { getStay } from "../data/stays";
import "./stayDetail.css";

const mapsUrl = (query) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const groupActivities = (activities) => {
  const order = ["Must do", "Wildlife", "Nature", "Scenic", "Beach", "Coast", "Short walk", "Easy walk", "Easy / local", "Easy / family", "Food & drink", "Town / food", "Town / history", "History", "City day", "Touring", "Touring day", "Big day", "Family / outdoors", "Wild coast", "Rainforest", "Snow / views", "Trip job", "4WD", "Serious 4WD"];
  return [...activities].sort((a, b) => {
    const ai = order.indexOf(a.category);
    const bi = order.indexOf(b.category);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });
};

export default function StayDetail() {
  const { stayId } = useParams();
  const stay = getStay(stayId);

  if (!stay || !stay.activities?.length) return <Navigate to="/" replace />;

  const activities = groupActivities(stay.activities);

  return (
    <Layout>
      <div className="stayPage">
        <Link className="backLink" to="/">← Back to trip</Link>

        <section className="stayPageHeader">
          <div className="stayPageTitleRow">
            <span className="stayPageIcon" aria-hidden="true">🏠</span>
            <div>
              <p className="stayPageKicker">{stay.dates} • {stay.nights}</p>
              <h2>{stay.place}</h2>
            </div>
          </div>
          <p className="stayPageNote">{stay.note}</p>

          <div className="stayPageActions">
            <a href={mapsUrl(stay.mapQuery)} target="_blank" rel="noreferrer">📍 Accommodation in Google Maps ↗</a>
            {stay.newtracsUrl && (
              <a className="newtracsButton" href={stay.newtracsUrl} target="_blank" rel="noreferrer">🛞 Open 4WD ideas in Newtracs ↗</a>
            )}
          </div>
        </section>

        <section className="thingsIntro">
          <div>
            <p className="thingsEyebrow">Things to do nearby</p>
            <h3>{activities.length} ideas from easy stops to full-day adventures</h3>
          </div>
          <p>Distances and times are planning figures from our base. Tap Maps for the live route, photos, reviews and opening details.</p>
        </section>

        <div className="thingsGrid">
          {activities.map((activity) => (
            <article className={`thingCard ${activity.category.includes("4WD") ? "thingCard-4wd" : ""}`} key={activity.name}>
              <div className="thingTop">
                <span className="thingIcon" aria-hidden="true">{activity.icon}</span>
                <span className="thingCategory">{activity.category}</span>
              </div>

              <h3>{activity.name}</h3>
              <div className="thingStats">
                <span><strong>Distance:</strong> {activity.distance}</span>
                <span><strong>Drive:</strong> {activity.drive}</span>
              </div>
              <p>{activity.blurb}</p>

              <div className="thingActions">
                {activity.mapQuery && (
                  <a href={mapsUrl(activity.mapQuery)} target="_blank" rel="noreferrer">📍 Google Maps ↗</a>
                )}
                {activity.newtracsUrl && (
                  <a className="newtracsButton" href={activity.newtracsUrl} target="_blank" rel="noreferrer">🛞 Newtracs ↗</a>
                )}
              </div>
            </article>
          ))}
        </div>

        <p className="stayPageDisclaimer">
          4WD difficulty and access can change quickly with rain, closures and track condition. Check Newtracs and the relevant land manager again close to the day before choosing a track.
        </p>
      </div>
    </Layout>
  );
}
