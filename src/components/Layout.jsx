export default function Layout({ children }) {
  return (
    <div className="app">
      <header className="simpleHeader">
        <div className="headerBrand">
          <span className="brandMark">W</span>
          <div>
            <p className="tripLabel">Tasmania 2026</p>
            <h1>Williamson Expedition</h1>
          </div>
        </div>
        <p className="tripDates"><span>22 days</span>25 Sep – 16 Oct</p>
      </header>

      <main>{children}</main>
    </div>
  );
}
