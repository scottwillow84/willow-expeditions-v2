import { Link } from "react-router-dom";

export default function Layout({ title, children }) {
  return (
    <div className="app">
      <header className="hero">
        <h1>🚙 Williamson Expeditions</h1>
        <p>Expedition 001 • Tasmania 2026</p>

        <nav>
          <Link to="/">HQ</Link>
          <Link to="/timeline">Timeline</Link>
          <Link to="/places">Places</Link>
          <Link to="/accommodation">Stays</Link>
          <Link to="/crew">Crew</Link>
          <Link to="/vehicle">Vehicle</Link>
          <Link to="/feedback">Ideas</Link>
        </nav>
      </header>

      <main>
        <h2>{title}</h2>
        {children}
      </main>
    </div>
  );
}