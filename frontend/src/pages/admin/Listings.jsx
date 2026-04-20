import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState("");

  async function loadListings() {
    try {
      const data = await api.getAdminListings();
      setListings(data);
    } catch (err) {
      setError(err.message || "Failed to load listings");
    }
  }

  useEffect(() => {
    loadListings();
  }, []);

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Delete this listing?");
    if (!confirmDelete) return;

    try {
      await api.deleteAdminListing(id);
      loadListings();
    } catch (err) {
      setError(err.message || "Delete failed");
    }
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Listings</h1>

      <div style={{ marginBottom: "16px" }}>
        <Link to="/admin/dashboard">Dashboard</Link>
        {" | "}
        <Link to="/admin/listings/new">Add Listing</Link>
        {" | "}
        <Link to="/admin/leads">Leads</Link>
      </div>

      {error ? <p style={{ color: "red" }}>{error}</p> : null}

      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Project</th>
            <th>Area</th>
            <th>Company</th>
            <th>Approval</th>
            <th>Price / Sq Yd</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((item) => (
            <tr key={item._id}>
              <td>{item.projectName}</td>
              <td>{item.area}</td>
              <td>{item.company}</td>
              <td>{item.approval}</td>
              <td>{item.pricePerSqYd}</td>
              <td>
                <Link to={`/admin/listings/edit/${item._id}`}>Edit</Link>
                {" | "}
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}