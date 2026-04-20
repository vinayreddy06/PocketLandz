import { Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./pages/admin/Login.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Listings from "./pages/admin/Listings.jsx";
import ListingForm from "./pages/admin/ListingForm.jsx";
import Leads from "./pages/admin/Leads.jsx";
import ProtectedRoute from "./components/admin/ProtectedRoute.jsx";

function HomePage() {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1>Pocket Landz LIVE VERSION</h1>
      <p>Frontend is running.</p>
      <Link to="/admin/login">Go to Admin Panel</Link>
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