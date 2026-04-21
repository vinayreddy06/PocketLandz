import { Routes, Route, Navigate, Link } from "react-router-dom";
import Header from "./components/Header.jsx";
import Login from "./pages/admin/Login.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Listings from "./pages/admin/Listings.jsx";
import ListingForm from "./pages/admin/ListingForm.jsx";
import Leads from "./pages/admin/Leads.jsx";
import ProtectedRoute from "./components/admin/ProtectedRoute.jsx";

function HomePage() {
  return (
    <div>
      <Header />

      <main className="container" style={{ padding: "40px 20px" }}>
        <section className="hero" style={{ marginBottom: "40px" }}>
          <h1>Pocket Landz LIVE VERSION</h1>
          <p>Track Hyderabad land prices and manage listings easily.</p>
          <Link to="/admin/login">Go to Admin Panel</Link>
        </section>

        <section id="areas" style={{ marginBottom: "40px" }}>
          <h2>Top Areas</h2>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <div style={{ padding: "20px", background: "#fff", borderRadius: "8px" }}>Kokapet</div>
            <div style={{ padding: "20px", background: "#fff", borderRadius: "8px" }}>Tellapur</div>
            <div style={{ padding: "20px", background: "#fff", borderRadius: "8px" }}>Kollur</div>
          </div>
        </section>

        <section id="listings" style={{ marginBottom: "40px" }}>
          <h2>Featured Listings</h2>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <div style={{ padding: "20px", background: "#fff", borderRadius: "8px" }}>Listing 1</div>
            <div style={{ padding: "20px", background: "#fff", borderRadius: "8px" }}>Listing 2</div>
          </div>
        </section>

        <section id="contact">
          <h2>Contact</h2>
          <p>Submit your interest and we’ll reach out.</p>
        </section>
      </main>
    </div>
  );
}

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