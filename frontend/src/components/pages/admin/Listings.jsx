import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";

export default function Listings() {
  const [listings, setListings] = useState([]);

  async function loadListings() {
    try {
      const data = await api.getAdminListings();
      setListings(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadListings();
  }, []);

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Delete this listing?");
    if (!confirmDelete) return;

    await api.deleteAdminListing(id);
    loadListings();
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Listings</h1>

      <Link to="/admin/listings/new">➕ Add Listing</Link>

      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Project</th>
            <th>Area</th>
            <th>Company</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {listings.map((item) => (
            <tr key={item.id}>
              <td>{item.projectName}</td>
              <td>{item.area}</td>
              <td>{item.company}</td>
              <td>{item.pricePerSqYd}</td>
              <td>
                <Link to={`/admin/listings/edit/${item.id}`}>Edit</Link>
                {" | "}
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}