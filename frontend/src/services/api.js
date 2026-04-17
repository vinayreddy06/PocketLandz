
const API_BASE = "https://pocketlandz.onrender.com";

async function request(path, options = {}) {
  const response = await fetch("https://pocketlandz.onrender.com/api/areas"), options);

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.message || 'Something went wrong');
  }

  return response.json();
}

export const api = {
  getStats: () => request('/stats'),
  getAreas: () => request('/areas'),
  getTrends: () => request('/trends'),
  getTestimonials: () => request('/testimonials'),
  getListings: ({ query = '', area = 'all', approval = 'all' } = {}) =>
    request(
      `/listings?query=${encodeURIComponent(query)}&area=${encodeURIComponent(area)}&approval=${encodeURIComponent(approval)}`
    ),
  createLead: (payload) =>
    request('/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
};
`