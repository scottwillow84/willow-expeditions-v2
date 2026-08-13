import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import RouteDetail from "./pages/RouteDetail";

export default function App() {
  return (
    <BrowserRouter basename="/willow-expeditions-v2">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/route/hadspen-lulworth" element={<RouteDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
