import Layout from "../components/Layout";

const places = [
  { name: "Bay of Fires", status: "⭐ Must Do", notes: "Beaches, orange rocks, photos, easy 4WD." },
  { name: "Cradle Mountain", status: "⭐ Must Do", notes: "Snow chance, wombats, Dove Lake." },
  { name: "Port Arthur", status: "⭐ Must Do", notes: "Historic site and Tasman Peninsula." },
  { name: "Carlton River", status: "✅ Locked In", notes: "Five-night family base." },
  { name: "Bicheno Penguins", status: "⭐ Must Do", notes: "Evening penguin tour for the girls." },
  { name: "Freycinet / Wineglass Bay", status: "⭐ Must Do", notes: "Lookout, beaches, seafood." },
  { name: "Gordon River / Sarah Island", status: "⭐ Must Do", notes: "Cruise day from Strahan." },
  { name: "Tarkine / Arthur River", status: "👍 Nice to Have", notes: "Remote west coast and 4WD options." },
  { name: "Stanley / The Nut", status: "👍 Nice to Have", notes: "Seafood, views, lighthouse." },
  { name: "Richmond", status: "⭐ Must Do", notes: "Bridge, gaol, village, bakery." },
  { name: "Bruny Island", status: "🤔 Researching", notes: "Lighthouse, cheese, oysters, scenery." },
  { name: "Maria Island", status: "❌ Skip For Now", notes: "Great, but too much time for this trip." },
];

export default function Places() {
  return (
    <Layout title="Places to Visit">
      <p className="intro">
        This is the family shortlist. Status can change as everyone gives feedback.
      </p>

      <div className="grid">
        {places.map((place) => (
          <div className="card" key={place.name}>
            <h3>{place.name}</h3>
            <p className="muted">{place.status}</p>
            <p>{place.notes}</p>

            <h4>Family Feedback</h4>
            <p>Keep, change, skip, or add more?</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}