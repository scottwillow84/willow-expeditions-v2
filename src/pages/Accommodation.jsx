import Layout from "../components/Layout";

const stays = [
  {
    location: "Sydney to Geelong",
    nights: 1,
    status: "Researching",
    notes: "Need overnight stop for Scott and Jane.",
  },
  {
    location: "Spirit of Tasmania - outbound",
    nights: 1,
    status: "Booked",
    notes: "2-bed Porthole Cabin booked for Scott and Jane.",
  },
  {
    location: "Discovery Parks Hadspen",
    nights: 2,
    status: "Booked",
    notes: "27-29 September. Scott and Jane arrive first; Sarah, Mia and Simone are collected from Launceston Airport on 28 September.",
  },
  {
    location: "Lulworth",
    nights: 2,
    status: "Booked",
    notes: "29 September-1 October. First two-night stay with the whole family together.",
  },
  {
    location: "Carlton River",
    nights: 5,
    status: "Locked In",
    notes: "Family base.",
  },
  {
    location: "East Coast",
    nights: 2,
    status: "Researching",
    notes: "Bicheno / Coles Bay / St Helens section still being refined.",
  },
  {
    location: "West Coast",
    nights: 2,
    status: "Researching",
    notes: "Probably Strahan.",
  },
  {
    location: "Cradle Mountain",
    nights: 2,
    status: "Snow Chase",
    notes: "Need flexibility depending on weather.",
  },
  {
    location: "Spirit of Tasmania - return",
    nights: 1,
    status: "Date Confirmed",
    notes: "Return sailing is 15 October.",
  },
];

export default function Accommodation() {
  return (
    <Layout title="Accommodation">
      <p className="intro">Every booking for the expedition in one place.</p>

      <div className="grid">
        {stays.map((stay) => (
          <div className="card" key={stay.location}>
            <h3>{stay.location}</h3>
            <p className="muted">{stay.status}</p>
            <p>
              <strong>Nights:</strong> {stay.nights}
            </p>
            <p>{stay.notes}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
