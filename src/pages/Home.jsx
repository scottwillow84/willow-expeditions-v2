import { Link } from "react-router-dom";
import { WeatherTile, useTripWeather } from "../components/WeatherTile";
import Layout from "../components/Layout";
import { routePlans } from "../data/routeOptions";
import { stays } from "../data/stays";
import heroImage from "../assets/hero-optimised.jpg";

const mapsUrl = (query) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
const stayIcon = (type) => type === "ferry" ? "⛴" : type === "home" ? "⌂" : "◆";
const routes = Object.fromEntries(Object.entries(routePlans).map(([id, plan]) => [id, { ...plan.summary, comparePath: `#/route/${id}` }]));

const mapStops = [
  { id: "hadspen", label: "Hadspen", x: 52, y: 21 },
  { id: "lulworth", label: "Lulworth", x: 70, y: 17 },
  { id: "sthelens", label: "St Helens", x: 80, y: 36 },
  { id: "bicheno", label: "Bicheno", x: 78, y: 49 },
  { id: "carlton", label: "Carlton", x: 69, y: 73 },
  { id: "strahan", label: "Strahan", x: 27, y: 64 },
  { id: "smithton", label: "Smithton", x: 25, y: 19 },
];

const featuredTracks = [
  { stay: "Strahan", name: "Climies Track", level: "Serious", icon: "⚠", id: "strahan" },
  { stay: "Smithton", name: "Sandy Cape Track", level: "Big day", icon: "◉", id: "smithton" },
  { stay: "Smithton", name: "Balfour Track", level: "Extreme", icon: "⚠", id: "smithton" },
];

function RouteCard({ route }) {
  return (
    <div className="routeCard">
      <div className="routeTop"><span className="routeTitle">{route.from} → {route.to}</span><span className="routeNumbers">{route.distance} · {route.drive}</span></div>
      <div className="routeOptions"><span><strong>Fastest</strong> {route.direct}</span><span><strong>Scenic</strong> {route.scenic}</span><span><strong>4WD</strong> {route.offroad}</span></div>
      <a className="routeMapLink" href={route.comparePath}>Compare route options →</a>
    </div>
  );
}

function TripMap({ onSelect }) {
  const points = mapStops.map((stop) => `${stop.x},${stop.y}`).join(" ");
  return (
    <section className="tripMapSection" aria-labelledby="trip-map-title">
      <div className="sectionHeading">
        <div><p className="introEyebrow">The island loop</p><h2 id="trip-map-title">The whole adventure at a glance</h2></div>
        <a href="https://newtracs.com/en-US/trails/tasmania" target="_blank" rel="noreferrer">Open Tasmania in Newtracs ↗</a>
      </div>
      <div className="mapPanel">
        <svg className="tassieMap" viewBox="0 0 100 100" role="img" aria-label="Stylised map of the Tasmania trip route">
          <path className="islandShape" d="M22 12 L38 6 57 10 73 16 86 32 91 50 81 69 68 88 48 96 30 85 18 70 11 50 15 31 Z" />
          <polyline className="routeLineGlow" points={points} /><polyline className="routeLine" points={points} />
          {mapStops.map((stop, index) => (
            <g key={stop.id} className="mapStop" role="button" tabIndex="0" onClick={() => onSelect(stop.id)} onKeyDown={(event) => event.key === "Enter" && onSelect(stop.id)}>
              <circle cx={stop.x} cy={stop.y} r="3.6" /><text x={stop.x} y={stop.y + 1.5} textAnchor="middle">{index + 1}</text>
              <text className="mapLabel" x={stop.x + (stop.x > 65 ? -5 : 5)} y={stop.y - 5} textAnchor={stop.x > 65 ? "end" : "start"}>{stop.label}</text>
            </g>
          ))}
        </svg>
        <div className="mapLegend"><span><i className="legendLine" /> 7 Tasmania bases</span><span><i className="legendTrack" /> 3 serious 4WD options</span><span>Tap a numbered stop to jump to it</span></div>
      </div>
    </section>
  );
}

export default function Home() {
  const weather = useTripWeather();
  const tasmaniaNights = stays.filter((stay) => !["albury", "sep26", "returnferry", "home"].includes(stay.id)).reduce((sum, stay) => sum + (Number.parseInt(stay.nights, 10) || 0), 0);
  const jumpToStay = (id) => document.getElementById(`stay-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <Layout>
      <section className="expeditionHero" style={{ backgroundImage: `linear-gradient(90deg, rgba(9,14,17,.96) 0%, rgba(9,14,17,.72) 48%, rgba(9,14,17,.12) 100%), url(${heroImage})` }}>
        <div className="heroContent">
          <p className="heroKicker">The Williamson Expedition</p><h2>Tasmania<br /><em>2026</em></h2>
          <p className="heroLead">Five people. One LandCruiser. Twenty-two days across wild coast, rainforest, mountain roads and the best tracks we can legally find.</p>
          <div className="heroActions"><button type="button" onClick={() => document.getElementById("trip-map-title")?.scrollIntoView({ behavior: "smooth" })}>Explore the route</button><button className="heroSecondary" type="button" onClick={() => jumpToStay("strahan")}>See the 4WD country</button></div>
        </div>
        <div className="heroStats" aria-label="Trip summary"><span><strong>22</strong> days</span><span><strong>{tasmaniaNights}</strong> island nights</span><span><strong>200</strong> Series</span></div>
      </section>

      <section className="nextUp">
        <div className="nextDate"><span>FRI</span><strong>25</strong><small>SEP</small></div>
        <div className="nextMain"><p className="introEyebrow">First stop · Booked</p><h2>Atura Albury</h2><p>Roomy Twin · Breakfast included · Check-in from 3:00 pm</p></div>
        <a href={mapsUrl("Atura Albury")} target="_blank" rel="noreferrer">Navigate ↗</a>
      </section>

      <TripMap onSelect={jumpToStay} />

      <section className="trackSpotlight">
        <div className="sectionHeading"><div><p className="introEyebrow">Newtracs shortlist</p><h2>The proper 4WD options</h2></div><p>Not promises — the tracks worth watching as weather, tides and closures become clear.</p></div>
        <div className="trackGrid">{featuredTracks.map((track) => <button key={track.name} type="button" onClick={() => jumpToStay(track.id)}><span className="trackIcon">{track.icon}</span><span><small>{track.stay} · {track.level}</small><strong>{track.name}</strong></span><b>→</b></button>)}</div>
      </section>

      <section className="plannerIntro" id="planner"><p className="introEyebrow">The booked plan</p><h2>Every stay and drive</h2><p>Accommodation, live forecast, route choices and nearby adventures — all in one place for the road.</p></section>
      <nav className="stayJumpBar" aria-label="Jump to a stay">{stays.map((stay) => <button key={stay.id} type="button" onClick={() => jumpToStay(stay.id)}><span>{stayIcon(stay.type)}</span>{stay.shortPlace}</button>)}</nav>

      <div className="calendarList">
        {stays.map((stay) => {
          const route = routes[stay.id]; const hasThings = Boolean(stay.activities?.length);
          return <div key={stay.id}>{route && <RouteCard route={route} />}
            <section id={`stay-${stay.id}`} className="stayCard">
              <div className="stayButton"><div className="dateBlock"><span className="dateText">{stay.dates}</span><span className="nightText">{stay.nights}</span></div><div className="stayIcon" aria-hidden="true">{stayIcon(stay.type)}</div><div className="stayMain"><div className="stayHeading"><h3>{stay.place}</h3><span className={`status status-${stay.status.toLowerCase().replaceAll(" ", "-")}`}>{stay.status}</span></div><p>{stay.note}</p></div></div>
              <div className="stayActions"><a className="stayMapLink" href={mapsUrl(stay.mapQuery)} target="_blank" rel="noreferrer">Navigate ↗</a>{hasThings && <Link className="thingsLink" to={`/stay/${stay.id}`}>Explore nearby + 4WD →</Link>}</div>
              <WeatherTile stayId={stay.id} weather={weather} />
            </section>
          </div>;
        })}
      </div>
      <p className="plannerNote">Route times are planning estimates. Gravel and 4WD choices still need a current Newtracs, weather, tide and land-manager check before we commit.</p>
    </Layout>
  );
}
