import Layout from "../components/Layout";

const days = [
  {
    day: 1,
    date: "Fri 25 Sep",
    title: "Sydney → Geelong",
    stay: "Geelong",
    notes: [
      "Scott & Jane depart Sydney",
      "Easy drive south",
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
    title: "Devonport → Hadspen",
    stay: "Discovery Parks Hadspen",
    notes: [
      "Arrive Devonport",
      "Drive to Hadspen",
      "Check in for two nights (Booked)",
      "Scott & Jane only",
    ],
  },
  {
    day: 4,
    date: "Mon 28 Sep",
    title: "Hadspen / Launceston",
    stay: "Discovery Parks Hadspen",
    notes: [
      "Easy morning with Scott & Jane",
      "Collect Sarah, Mia & Simone from Launceston Airport at 3:20 pm",
      "First family dinner together",
    ],
  },
  {
    day: 5,
    date: "Tue 29 Sep",
    title: "Hadspen → Lulworth",
    stay: "Lulworth",
    notes: [
      "Check out of Hadspen",
      "Drive north-east to Lulworth",
      "Check in for two nights (Booked)",
      "Beach / relaxed family afternoon",
    ],
  },
  {
    day: 6,
    date: "Wed 30 Sep",
    title: "Lulworth",
    stay: "Lulworth",
    notes: [
      "Full family day",
      "Beach and local exploring",
      "Good pub option",
      "Keep the day relaxed",
    ],
  },
  {
    day: 7,
    date: "Thu 1 Oct",
    title: "Lulworth → St Helens",
    stay: "St Helens",
    notes: [
      "Check out of Lulworth",
      "Working route via Gladstone / north-east back roads",
      "Optional harder 4WD sections if conditions suit",
      "Arrive St Helens",
    ],
  },
  {
    day: 8,
    date: "Fri 2 Oct",
    title: "St Helens → Bicheno",
    stay: "Bicheno",
    notes: [
      "Bay of Fires / Binalong Bay options",
      "Easy coastal drive south",
      "Bicheno Blowhole",
      "Little Penguin Tour option",
    ],
  },
  {
    day: 9,
    date: "Sat 3 Oct",
    title: "Bicheno → Freycinet",
    stay: "Coles Bay",
    notes: [
      "Wineglass Bay",
      "Cape Tourville",
      "Seafood dinner",
    ],
  },
  {
    day: 10,
    date: "Sun 4 Oct",
    title: "Freycinet",
    stay: "Coles Bay",
    notes: [
      "Relaxed Freycinet day",
      "Walks",
      "Photography",
    ],
  },
  {
    day: 11,
    date: "Mon 5 Oct",
    title: "Freycinet → Carlton River",
    stay: "Carlton River",
    notes: [
      "Drive south",
      "Move into family accommodation",
      "BBQ and relax",
    ],
  },
  {
    day: 12,
    date: "Tue 6 Oct",
    title: "Carlton River",
    stay: "Carlton River",
    notes: [
      "Family day",
      "Pub lunch",
      "Beach",
    ],
  },
  {
    day: 13,
    date: "Wed 7 Oct",
    title: "Port Arthur",
    stay: "Carlton River",
    notes: [
      "Port Arthur Historic Site",
      "Tasman Peninsula",
      "Remarkable Cave",
    ],
  },
  {
    day: 14,
    date: "Thu 8 Oct",
    title: "Hobart",
    stay: "Carlton River",
    notes: [
      "Hobart day trip",
      "Salamanca area",
      "kunanyi / Mount Wellington if weather suits",
      "Dinner",
    ],
  },
  {
    day: 15,
    date: "Fri 9 Oct",
    title: "Carlton River",
    stay: "Carlton River",
    notes: [
      "Free / flexible day",
      "Family time",
      "Final night at the base",
    ],
  },
  {
    day: 16,
    date: "Sat 10 Oct",
    title: "Carlton River → Strahan",
    stay: "Strahan",
    notes: [
      "West Coast drive",
      "Lookouts and stops along the way",
      "Good pub in the evening",
    ],
  },
  {
    day: 17,
    date: "Sun 11 Oct",
    title: "Strahan",
    stay: "Strahan",
    notes: [
      "Gordon River Cruise",
      "Sarah Island",
    ],
  },
  {
    day: 18,
    date: "Mon 12 Oct",
    title: "Strahan → Cradle Mountain",
    stay: "Cradle Mountain",
    notes: [
      "Scenic drive",
      "Wildlife",
      "Snow if lucky",
    ],
  },
  {
    day: 19,
    date: "Tue 13 Oct",
    title: "Cradle Mountain",
    stay: "Cradle Mountain",
    notes: [
      "Dove Lake",
      "Wombats",
      "Photography",
      "Snow chase if conditions cooperate",
    ],
  },
  {
    day: 20,
    date: "Wed 14 Oct",
    title: "Cradle Mountain → North Coast",
    stay: "Devonport / North Coast TBC",
    notes: [
      "Easy final touring day",
      "Position ourselves for the ferry",
      "Final Tasmania night",
    ],
  },
  {
    day: 21,
    date: "Thu 15 Oct",
    title: "Return Spirit of Tasmania",
    stay: "Spirit of Tasmania",
    notes: [
      "Return ferry is on 15 October",
      "Board Spirit of Tasmania",
    ],
  },
  {
    day: 22,
    date: "Fri 16 Oct",
    title: "Geelong → Sydney",
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

            <p className="muted">🛏 {day.stay}</p>

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
