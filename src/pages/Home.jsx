import { Link } from "react-router-dom";
import { CircleMarker, MapContainer, Polyline, Popup, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { WeatherTile, useTripWeather } from "../components/WeatherTile";
import Layout from "../components/Layout";
import { routePlans } from "../data/routeOptions";
import { stays } from "../data/stays";
import heroImage from "../assets/hero-optimised.jpg";

const mapsUrl = (query) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
const stayIcon = (type) => type === "ferry" ? "⛴" : type === "home" ? "⌂" : "◆";
const routes = Object.fromEntries(Object.entries(routePlans).map(([id, plan]) => [id, { ...plan.summary, comparePath: `#/route/${id}` }]));

const mapStops = [
  { id: "hadspen", label: "Hadspen", position: [-41.503, 147.075] },
  { id: "lulworth", label: "Lulworth", position: [-40.991, 147.106] },
  { id: "sthelens", label: "St Helens", position: [-41.322, 148.249] },
  { id: "bicheno", label: "Bicheno", position: [-41.874, 148.303] },
  { id: "carlton", label: "Carlton River", position: [-42.868, 147.650] },
  { id: "strahan", label: "Strahan", position: [-42.153, 145.328] },
  { id: "smithton", label: "Smithton", position: [-40.841, 145.124] },
];

const featuredTracks = [
  { stay: "Strahan", name: "Montezuma Falls 4WD", level: "Waterfall run", icon: "💧", id: "strahan", newtracsUrl: "https://newtracs.com/en-US/trails/tasmania", search: "Search: Montezuma Falls / Ring River" },
  { stay: "Strahan", name: "Climies Track", level: "Serious", icon: "⚠", id: "strahan", newtracsUrl: "https://newtracs.com/en-US/trails/tasmania/tasmania-climies-track-488226" },
  { stay: "Smithton", name: "Sandy Cape Track", level: "Big day", icon: "◉", id: "smithton", newtracsUrl: "https://newtracs.com/en-US/trails/tasmania/tasmania-sandy-cape-track-279582" },
  { stay: "Smithton", name: "Balfour Track", level: "Extreme", icon: "⚠", id: "smithton", newtracsUrl: "https://newtracs.com/en-US/trails/tasmania/tasmania-balfour-track-038240" },
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
  const routePositions = mapStops.map((stop) => stop.position);
  return (
    <section className="tripMapSection" aria-labelledby="trip-map-title">
      <div className="sectionHeading">
        <div><p className="introEyebrow">The island loop</p><h2 id="trip-map-title">The whole adventure at a glance</h2></div>
        <a className="newtracsCta" href="https://newtracs.com/en-US/trails/tasmania" target="_blank" rel="noreferrer">Open Newtracs ↗</a>
      </div>
      <div className="mapPanel">
        <MapContainer className="tassieMap" center={[-41.75, 146.75]} zoom={7} minZoom={6} scrollWheelZoom={false}>
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Polyline positions={routePositions} pathOptions={{ color: "#d9a15f", weight: 4, opacity: 0.9, dashArray: "8 8" }} />
          {mapStops.map((stop, index) => (
            <CircleMarker key={stop.id} center={stop.position} radius={11} pathOptions={{ color: "#101613", weight: 3, fillColor: "#d9a15f", fillOpacity: 1 }} eventHandlers={{ click: () => onSelect(stop.id) }}>
              <Tooltip permanent direction="top" offset={[0, -10]} className="tripMapLabel">{index + 1}. {stop.label}</Tooltip>
              <Popup><strong>{index + 1}. {stop.label}</strong><br /><button className="mapPopupButton" type="button" onClick={() => onSelect(stop.id)}>Jump to stay</button></Popup>
            </CircleMarker>
          ))}
        </MapContainer>
        <div className="mapLegend"><span><i className="legendLine" /> 7 Tasmania bases</span><span><i className="legendTrack" /> Trip order, not exact roads</span><span>Tap a stop for its stay</span></div>
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
        <div className="trackGrid">{featuredTracks.map((track) => <article key={track.name} className="trackCard"><button className="trackDetails" type="button" onClick={() => jumpToStay(track.id)}><span className="trackIcon">{track.icon}</span><span><small>{track.stay} · {track.level}</small><strong>{track.name}</strong>{track.search && <em>{track.search}</em>}</span></button><a href={track.newtracsUrl} target="_blank" rel="noreferrer" aria-label={`Open ${track.name} in Newtracs`}>Newtracs ↗</a></article>)}</div>
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
