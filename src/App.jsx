import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import RouteDetail from "./pages/RouteDetail";
import StayDetail from "./pages/StayDetail";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/route/:routeId" element={<RouteDetail />} />
        <Route path="/stay/:stayId" element={<StayDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
