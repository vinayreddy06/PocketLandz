import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome to Pocket Landz admin panel.</p>

      <div style={{ marginTop: "20px", display: "flex", gap: "16px" }}>
        <Link to="/admin/listings">Go to Listings</Link>
        <Link to="/admin/listings/new">Add Listing</Link>
        <Link to="/admin/leads">View Leads</Link>
      </div>
    </div>
  );
}