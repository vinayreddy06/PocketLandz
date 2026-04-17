const API_BASE_URL = 'http://localhost:4000/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, options);

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
