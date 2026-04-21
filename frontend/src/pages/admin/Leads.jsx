import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [error, setError] = useState("");

  async function loadLeads() {
    try {
      const data = await api.getAdminLeads();
      setLeads(data);
    } catch (err) {
      setError(err.message || "Failed to load leads");
    }
  }

  useEffect(() => {
    loadLeads();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Leads</h1>

      <div style={{ marginBottom: "16px" }}>
        <Link to="/admin/dashboard">Dashboard</Link>
        {" | "}
        <Link to="/admin/listings">Listings</Link>
      </div>

      {error ? <p style={{ color: "red" }}>{error}</p> : null}

      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Interest</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.phone}</td>
              <td>{lead.interest}</td>
              <td>{new Date(lead.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}