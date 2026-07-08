import Layout from "../components/Layout";

const days = [
  {
    day: 1,
    date: "Fri 25 Sep",
    title: "Sydney → Geelong",
    stay: "Geelong",
    notes: [
      "Scott & Jane depart Sydney",
      "Easy drive to Geelong",
      "Dinner and overnight",
    ],
  },
  {
    day: 2,
    date: "Sat 26 Sep",
    title: "Geelong",
    stay: "Spirit of Tasmania",
    notes: [
      "Relaxing morning",
      "Board Spirit of Tasmania",
      "2-bed Porthole Cabin (Booked)",
    ],
  },
  {
    day: 3,
    date: "Sun 27 Sep",
    title: "Devonport → Launceston",
    stay: "Launceston",
    notes: [
      "Arrive Devonport",
      "Explore Launceston",
      "Early night",
    ],
  },
  {
    day: 4,
    date: "Mon 28 Sep",
    title: "Launceston",
    stay: "Launceston",
    notes: [
      "Collect Sarah, Mia & Simone (3:20 pm)",
      "Stock up on supplies",
      "Dinner together",
    ],
  },
  {
    day: 5,
    date: "Tue 29 Sep",
    title: "Launceston → Bay of Fires",
    stay: "St Helens",
    notes: [
      "Bay of Fires",
      "Binalong Bay",
      "Sunset photography",
    ],
  },
  {
    day: 6,
    date: "Wed 30 Sep",
    title: "East Coast",
    stay: "St Helens",
    notes: [
      "The Gardens",
      "Beer / Pub",
      "Beach afternoon",
    ],
  },
  {
    day: 7,
    date: "Thu 1 Oct",
    title: "St Helens → Bicheno",
    stay: "Bicheno",
    notes: [
      "Easy coastal drive",
      "Blowhole",
      "Little Penguin Tour",
    ],
  },
  {
    day: 8,
    date: "Fri 2 Oct",
    title: "Bicheno → Freycinet",
    stay: "Coles Bay",
    notes: [
      "Wineglass Bay",
      "Cape Tourville",
      "Seafood dinner",
    ],
  },
  {
    day: 9,
    date: "Sat 3 Oct",
    title: "Freycinet",
    stay: "Coles Bay",
    notes: [
      "Relax day",
      "Walks",
      "Photography",
    ],
  },
  {
    day: 10,
    date: "Sun 4 Oct",
    title: "Freycinet → Carlton River",
    stay: "Carlton River",
    notes: [
      "Move into family accommodation",
      "BBQ",
      "Relax",
    ],
  },
  {
    day: 11,
    date: "Mon 5 Oct",
    title: "Carlton River",
    stay: "Carlton River",
    notes: [
      "Family day",
      "Pub lunch",
      "Beach",
    ],
  },
  {
    day: 12,
    date: "Tue 6 Oct",
    title: "Port Arthur",
    stay: "Carlton River",
    notes: [
      "Historic Site",
      "Tasman Peninsula",
      "Remarkable Cave",
    ],
  },
  {
    day: 13,
    date: "Wed 7 Oct",
    title: "Hobart",
    stay: "Carlton River",
    notes: [
      "Salamanca",
      "Mount Wellington",
      "Dinner",
    ],
  },
  {
    day: 14,
    date: "Thu 8 Oct",
    title: "Carlton River",
    stay: "Carlton River",
    notes: [
      "Free day",
      "Markets / shopping",
      "Family dinner",
    ],
  },
  {
    day: 15,
    date: "Fri 9 Oct",
    title: "Carlton River → Strahan",
    stay: "Strahan",
    notes: [
      "West Coast drive",
      "Lookouts",
      "Pub",
    ],
  },
  {
    day: 16,
    date: "Sat 10 Oct",
    title: "Strahan",
    stay: "Strahan",
    notes: [
      "Gordon River Cruise",
      "Sarah Island",
    ],
  },
  {
    day: 17,
    date: "Sun 11 Oct",
    title: "Strahan → Cradle Mountain",
    stay: "Cradle Mountain",
    notes: [
      "Scenic drive",
      "Wildlife",
      "Snow if lucky",
    ],
  },
  {
    day: 18,
    date: "Mon 12 Oct",
    title: "Cradle Mountain",
    stay: "Cradle Mountain",
    notes: [
      "Dove Lake",
      "Wombats",
      "Photography",
    ],
  },
  {
    day: 19,
    date: "Tue 13 Oct",
    title: "Cradle → Devonport",
    stay: "Spirit of Tasmania",
    notes: [
      "Easy drive",
      "Board ferry",
    ],
  },
  {
    day: 20,
    date: "Wed 14 Oct",
    title: "Melbourne → Sydney",
    stay: "Home",
    notes: [
      "Drive home",
      "Expedition complete",
    ],
  },
];

export default function Itinerary() {
  return (
    <Layout title="Master Timeline">

      <div className="grid">

        {days.map((day) => (
          <div className="card" key={day.day}>
            <h3>
              Day {day.day} • {day.date}
            </h3>

            <h2>{day.title}</h2>

            <p className="muted">
              🛏 {day.stay}
            </p>

            <ul>
              {day.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>

          </div>
        ))}

      </div>

    </Layout>
  );
}