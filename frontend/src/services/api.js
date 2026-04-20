const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:4000"
    : "https://pocketlandz.onrender.com";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, options);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API request failed: ${response.status}`);
  }

  return response.json();
}

function getAuthHeaders() {
  const token = localStorage.getItem("adminToken");

  return token
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    : {
        "Content-Type": "application/json"
      };
}

export const api = {
  adminLogin(data) {
    return request("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  },

  getAdminDashboard() {
    return request("/api/admin/dashboard", {
      headers: getAuthHeaders()
    });
  },

  getAdminListings() {
    return request("/api/admin/listings", {
      headers: getAuthHeaders()
    });
  },

  getAdminListingById(id) {
    return request(`/api/admin/listings/${id}`, {
      headers: getAuthHeaders()
    });
  },

  createAdminListing(data) {
    return request("/api/admin/listings", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
  },

  updateAdminListing(id, data) {
    return request(`/api/admin/listings/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
  },

  deleteAdminListing(id) {
    return request(`/api/admin/listings/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders()
    });
  },

  getAdminLeads() {
    return request("/api/admin/leads", {
      headers: getAuthHeaders()
    });
  }
};