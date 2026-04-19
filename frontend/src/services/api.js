const API_BASE = "https://pocketlandz.onrender.com";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, options);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

export const api = {
  getAreas() {
    return request("/api/areas");
  },

  getListings() {
    return request("/api/listings");
  },

  submitLead(data) {
    return request("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  }
};