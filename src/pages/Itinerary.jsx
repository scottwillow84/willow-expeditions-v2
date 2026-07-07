import Layout from "../components/Layout";
import { CalendarDays, Car, Ship, Plane, Home } from "lucide-react";

const timeline = [
  {
    date: "Friday 25 September",
    icon: <Car size={20} />,
    title: "Scott & Jane depart Sydney",
    description:
      "Begin the road trip south. Overnight stop planned around Albury (TBC).",
  },
  {
    date: "Saturday 26 September",
    icon: <Car size={20} />,
    title: "Drive to Geelong",
    description:
      "Continue to Geelong, check in and board the Spirit of Tasmania.",
  },
  {
    date: "Saturday Night",
    icon: <Ship size={20} />,
    title: "Spirit of Tasmania",
    description:
      "Dinner onboard and overnight crossing to Devonport.",
  },
  {
    date: "Sunday 27 September",
    icon: <Ship size={20} />,
    title: "Arrive Devonport",
    description:
      "Explore northern Tasmania while waiting for the rest of the family.",
  },
  {
    date: "Monday 28 September",
    icon: <Plane size={20} />,
    title: "Pick up Sarah, Mia & Simone",
    description:
      "Collect everyone from Launceston Airport (Flight ETA approximately 3:20 pm).",
  },
  {
    date: "Family Holiday Begins",
    icon: <Home size={20} />,
    title: "Tasmania Adventure",
    description:
      "Begin travelling clockwise around Tasmania before reaching Carlton River for our five-night stay.",
  },
];

export default function Itinerary() {
  return (
    <Layout title="Master Timeline">

      <h2>Trip Overview</h2>

      <p>
        This page is our master plan. Dates, bookings and destinations will
        evolve as we plan the expedition.
      </p>

      <br />

      {timeline.map((item, index) => (
        <div className="card" key={index} style={{ marginBottom: 20 }}>
          <h3 style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {item.icon}
            {item.date}
          </h3>

          <h4>{item.title}</h4>

          <p>{item.description}</p>
        </div>
      ))}

      <br />

      <div className="card">
        <h3>
          <CalendarDays size={20} style={{ verticalAlign: "middle" }} /> Next
          Planning Tasks
        </h3>

        <ul>
          <li>Choose overnight stop between Sydney and Geelong.</li>
          <li>Book Spirit of Tasmania.</li>
          <li>Confirm Launceston flight arrival.</li>
          <li>Lock in Carlton River accommodation.</li>
          <li>Add remaining day-by-day itinerary.</li>
        </ul>
      </div>

    </Layout>
  );
}