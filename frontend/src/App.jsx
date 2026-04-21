import { Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./pages/admin/Login.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Listings from "./pages/admin/Listings.jsx";
import ListingForm from "./pages/admin/ListingForm.jsx";
import Leads from "./pages/admin/Leads.jsx";
import ProtectedRoute from "./components/admin/ProtectedRoute.jsx";

function HomePage() {
  const featuredListings = [
    {
      id: 1,
      projectName: "Neopolis Greens",
      area: "Kokapet",
      company: "Urban Axis Realty",
      price: "₹69,500 / sq yd",
      approval: "HMDA"
    },
    {
      id: 2,
      projectName: "Tellapur Elite Plots",
      area: "Tellapur",
      company: "Sri Veda Estates",
      price: "₹53,000 / sq yd",
      approval: "HMDA"
    },
    {
      id: 3,
      projectName: "Kollur Future Enclave",
      area: "Kollur",
      company: "Skyline Infra",
      price: "₹44,000 / sq yd",
      approval: "DTCP"
    }
  ];

  const topAreas = [
    { name: "Kokapet", price: "₹68,000", trend: "+8.2%" },
    { name: "Tellapur", price: "₹52,000", trend: "+6.1%" },
    { name: "Kollur", price: "₹43,000", trend: "+5.4%" },
    { name: "Mokila", price: "₹39,000", trend: "+4.8%" }
  ];

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#f5f7fa", color: "#1a1a1a" }}>
      <header
        style={{
          background: "#0B3C5D",
          color: "#fff",
          padding: "18px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>Pocket Landz</h2>
          <p style={{ margin: "4px 0 0", fontSize: "13px", opacity: 0.85 }}>
            Hyderabad land price tracker
          </p>
        </div>

        <nav style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <a href="#top-areas" style={{ color: "#fff", textDecoration: "none" }}>Areas</a>
          <a href="#featured-listings" style={{ color: "#fff", textDecoration: "none" }}>Listings</a>
          <Link
            to="/admin/login"
            style={{
              background: "#2E8B57",
              color: "#fff",
              padding: "10px 14px",
              borderRadius: "8px",
              textDecoration: "none"
            }}
          >
            Admin Panel
          </Link>
        </nav>
      </header>

      <section
        style={{
          padding: "70px 40px",
          background: "linear-gradient(135deg, #0B3C5D, #2E8B57)",
          color: "#fff"
        }}
      >
        <div style={{ maxWidth: "900px" }}>
          <h1 style={{ fontSize: "48px", marginBottom: "16px" }}>
            Pocket Landz LIVE VERSION
          </h1>
          <p style={{ fontSize: "18px", lineHeight: 1.6, maxWidth: "700px" }}>
            Track Hyderabad land prices, compare plot projects, manage listings,
            and view leads from one place. Use the admin panel to add listings
            and manage your data.
          </p>

          <div style={{ marginTop: "24px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a
              href="#featured-listings"
              style={{
                background: "#fff",
                color: "#0B3C5D",
                padding: "12px 18px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "bold"
              }}
            >
              Explore Listings
            </a>

            <Link
              to="/admin/login"
              style={{
                background: "transparent",
                border: "1px solid #fff",
                color: "#fff",
                padding: "12px 18px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "bold"
              }}
            >
              Go to Admin
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: "40px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px"
          }}
        >
          <div style={statCardStyle}>
            <h3 style={statTitleStyle}>Active Areas</h3>
            <p style={statValueStyle}>12+</p>
          </div>
          <div style={statCardStyle}>
            <h3 style={statTitleStyle}>Live Listings</h3>
            <p style={statValueStyle}>25+</p>
          </div>
          <div style={statCardStyle}>
            <h3 style={statTitleStyle}>Leads Captured</h3>
            <p style={statValueStyle}>Real-Time</p>
          </div>
          <div style={statCardStyle}>
            <h3 style={statTitleStyle}>Admin Panel</h3>
            <p style={statValueStyle}>Enabled</p>
          </div>
        </div>
      </section>

      <section id="top-areas" style={{ padding: "20px 40px 50px" }}>
        <h2 style={{ marginBottom: "20px" }}>Top Hyderabad Areas</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px"
          }}
        >
          {topAreas.map((area) => (
            <div key={area.name} style={cardStyle}>
              <h3 style={{ marginTop: 0 }}>{area.name}</h3>
              <p style={{ margin: "8px 0", color: "#555" }}>Avg. Price / sq yd</p>
              <h2 style={{ margin: "0 0 10px", color: "#0B3C5D" }}>{area.price}</h2>
              <span
                style={{
                  background: "#e7f6ee",
                  color: "#2E8B57",
                  padding: "6px 10px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: "bold"
                }}
              >
                {area.trend}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section id="featured-listings" style={{ padding: "20px 40px 60px" }}>
        <h2 style={{ marginBottom: "20px" }}>Featured Listings</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px"
          }}
        >
          {featuredListings.map((item) => (
            <div key={item.id} style={cardStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <h3 style={{ marginTop: 0, marginBottom: "8px" }}>{item.projectName}</h3>
                <span
                  style={{
                    background: "#eef4ff",
                    color: "#0B3C5D",
                    padding: "6px 10px",
                    borderRadius: "999px",
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}
                >
                  {item.approval}
                </span>
              </div>

              <p style={{ margin: "6px 0", color: "#555" }}>
                <strong>Area:</strong> {item.area}
              </p>
              <p style={{ margin: "6px 0", color: "#555" }}>
                <strong>Company:</strong> {item.company}
              </p>
              <p style={{ margin: "12px 0 0", fontSize: "20px", fontWeight: "bold", color: "#2E8B57" }}>
                {item.price}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "20px 40px 60px" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "30px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
          }}
        >
          <h2 style={{ marginTop: 0 }}>Admin Access</h2>
          <p style={{ color: "#555", lineHeight: 1.6 }}>
            Manage listings, add new projects, and track leads from the admin panel.
            Your admin routes are live and working.
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "20px" }}>
            <Link to="/admin/login" style={buttonPrimaryStyle}>Admin Login</Link>
            <Link to="/admin/dashboard" style={buttonSecondaryStyle}>Dashboard</Link>
            <Link to="/admin/listings" style={buttonSecondaryStyle}>Listings</Link>
            <Link to="/admin/leads" style={buttonSecondaryStyle}>Leads</Link>
          </div>
        </div>
      </section>

      <footer
        style={{
          background: "#0B3C5D",
          color: "#fff",
          padding: "24px 40px",
          textAlign: "center"
        }}
      >
        <p style={{ margin: 0 }}>© 2026 Pocket Landz. All rights reserved.</p>
      </footer>
    </div>
  );
}

const statCardStyle = {
  background: "#fff",
  padding: "24px",
  borderRadius: "12px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
};

const statTitleStyle = {
  margin: "0 0 10px",
  color: "#666",
  fontSize: "15px"
};

const statValueStyle = {
  margin: 0,
  fontSize: "28px",
  fontWeight: "bold",
  color: "#0B3C5D"
};

const cardStyle = {
  background: "#fff",
  padding: "24px",
  borderRadius: "12px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
};

const buttonPrimaryStyle = {
  background: "#2E8B57",
  color: "#fff",
  padding: "12px 16px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "bold"
};

const buttonSecondaryStyle = {
  background: "#eef4ff",
  color: "#0B3C5D",
  padding: "12px 16px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "bold"
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin/login" element={<Login />} />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/listings"
        element={
          <ProtectedRoute>
            <Listings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/listings/new"
        element={
          <ProtectedRoute>
            <ListingForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/listings/edit/:id"
        element={
          <ProtectedRoute>
            <ListingForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/leads"
        element={
          <ProtectedRoute>
            <Leads />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}