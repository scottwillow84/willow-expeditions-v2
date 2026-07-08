import Layout from "../components/Layout";

const stays = [
  {
    location: "Sydney to Geelong",
    nights: 1,
    status: "Researching",
    notes: "Need overnight stop for Scott and Jane.",
  },
  {
    location: "Spirit of Tasmania",
    nights: 1,
    status: "Booked",
    notes: "2-bed Porthole Cabin booked for Scott and Jane.",
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
    notes: "Bicheno vs Coles Bay vs St Helens.",
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
