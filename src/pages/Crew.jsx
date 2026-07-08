import Layout from "../components/Layout";

const crew = [
  {
    name: "Scott",
    role: "Co-Leader / Co-Driver",
    mission: "Route planning, 4WD fun, photography, snow chances and good pubs.",
    wishlist: [
      "4WD fun, not just gravel roads",
      "Snow",
      "Lighthouses",
      "Photography spots",
      "Good pubs",
    ],
  },
  {
    name: "Sarah",
    role: "Co-Leader / Co-Driver",
    mission: "Food, wildlife, comfort, relaxed days and keeping the trip enjoyable.",
    wishlist: [
      "Platypus",
      "Wildlife",
      "Seafood",
      "Breweries and cider",
      "Good pubs",
      "Nice accommodation",
      "Markets",
      "Port Arthur",
      "Richmond",
    ],
  },
  {
    name: "Mia",
    role: "Wishlist pending",
    mission: "Add cafés, photo spots, shopping or activities.",
    wishlist: [
      "Add Mia’s ideas here",
      "Cafés?",
      "Shopping?",
      "Photo spots?",
      "Activities?",
    ],
  },
  {
    name: "Simone",
    role: "Wishlist pending",
    mission: "Add fun stops, activities and must-see places.",
    wishlist: [
      "Add Simone’s ideas here",
      "Activities?",
      "Food?",
      "Shopping?",
      "Beaches?",
    ],
  },
  {
    name: "Jane",
    role: "Junior Explorer",
    mission: "Find animals, beaches, rock pools and adventure.",
    wishlist: [
      "Penguins",
      "Wombats",
      "Snow",
      "Rock pools",
      "Wildlife",
    ],
  },
];

export default function Crew() {
  return (
    <Layout title="Meet the Crew">
      <p className="intro">
        Everyone gets input. Add ideas, must-dos, things to skip and realistic
        options before we lock bookings in.
      </p>

      <div className="grid">
        {crew.map((person) => (
          <div className="card" key={person.name}>
            <h3>{person.name}</h3>
            <p className="muted">{person.role}</p>

            <h4>Looking Forward To</h4>
            <p>{person.mission}</p>

            <h4>Wishlist</h4>
            <ul>
              {person.wishlist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h4>Feedback Needed</h4>
            <p>What would you add, remove or change?</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
