import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Itinerary from "./pages/Itinerary";
import Crew from "./pages/Crew";
import Vehicle from "./pages/Vehicle";
import Places from "./pages/Places";
import Feedback from "./pages/Feedback";
import Accommodation from "./pages/Accommodation";

export default function App() {
  return (
    <BrowserRouter basename="/willow-expeditions-v2">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timeline" element={<Itinerary />} />
        <Route path="/crew" element={<Crew />} />
        <Route path="/places" element={<Places />} />
        <Route path="/vehicle" element={<Vehicle />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/accommodation" element={<Accommodation />} />
      </Routes>
    </BrowserRouter>
  );
}