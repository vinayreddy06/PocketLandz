export default function Header() {
  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <div>
          <div className="brand">Pocket Landz</div>
          <div className="brand-subtitle">Hyderabad land price tracker</div>
        </div>
        <nav className="nav-links">
          <a href="#areas">Areas</a>
          <a href="#listings">Listings</a>
          <a href="#compare">Compare</a>
          <a href="#contact">Contact</a>
          <a href="#/admin/login">Admin</a>
        </nav>
      </div>
    </header>
  );
}