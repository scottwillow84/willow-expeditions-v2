import Layout from "../components/Layout";

const decisions = [
  "Discovery Parks Hadspen booked for 27-29 September",
  "Lulworth booked for 29 September-1 October",
  "Carlton River is the 5-night family base",
  "Sarah, Mia and Simone arrive Launceston 28 Sept at 3:20 pm",
  "Spirit of Tasmania 2-bed Porthole Cabin is booked",
  "Return Spirit of Tasmania sailing is 15 October",
];

const stats = [
  { label: "Planning Progress", value: "42%" },
  { label: "Crew", value: "5" },
  { label: "Places Saved", value: "12" },
  { label: "Nights Locked", value: "10" },
];

export default function Home() {
  return (
    <>
      <section className="homeHero">
        <div className="heroShade">
          <p className="eyebrow">Expedition 001</p>
          <h1>Willow Expeditions</h1>
          <h2>Tasmania 2026</h2>
          <p className="heroText">
            Adventure where it&apos;s worth it. Comfort where it matters.
          </p>
        </div>
      </section>

      <Layout title="Expedition HQ">
        <div className="grid">
          {stats.map((stat) => (
            <div className="card statCard" key={stat.label}>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="card" style={{ marginTop: 24 }}>
          <h3>Planning Progress</h3>
          <div className="progressBar">
            <span style={{ width: "42%" }}></span>
          </div>
          <p className="muted">Current mission: refine the east coast, west coast and final nights before the return ferry.</p>
        </div>

        <div className="grid" style={{ marginTop: 24 }}>
          <div className="card">
            <h3>Next Milestone</h3>
            <h2>Lock the remaining timeline</h2>
            <p>Hadspen and Lulworth are booked. Next step is refining the route from Lulworth onwards.</p>
          </div>

          <div className="card">
            <h3>Airport Pickup</h3>
            <h2>Launceston Airport</h2>
            <p>Sarah, Mia and Simone arrive Monday 28 September at 3:20 pm.</p>
          </div>

          <div className="card">
            <h3>Base Camp</h3>
            <h2>Carlton River</h2>
            <p>Five nights with family. This is the relaxed middle section of the trip.</p>
          </div>
        </div>

        <div className="card" style={{ marginTop: 24 }}>
          <h3>Latest Decisions</h3>
          <ul>
            {decisions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Layout>
    </>
  );
}
