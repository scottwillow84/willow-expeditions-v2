export default function Layout({ children }) {
  return (
    <div className="app">
      <header className="simpleHeader">
        <div>
          <p className="tripLabel">Tasmania 2026</p>
          <h1>Family Trip Planner</h1>
        </div>
        <p className="tripDates">25 Sep – 16 Oct</p>
      </header>

      <main>{children}</main>
    </div>
  );
}
