export const adminUser = {
  email: 'admin@pocketlandz.com',
  password: 'admin123',
  name: 'Pocket Landz Admin'
};

export let adminListings = [
  {
    id: 1,
    projectName: 'Neopolis Greens',
    company: 'Urban Axis Realty',
    area: 'Kokapet',
    approval: 'HMDA',
    plotSize: '267 sq yd',
    pricePerSqYd: 69500,
    totalPrice: 18556500,
    distance: '4.5 km to Financial District',
    verified: true,
    createdAt: '2026-04-17'
  },
  {
    id: 2,
    projectName: 'Tellapur Elite Plots',
    company: 'Sri Veda Estates',
    area: 'Tellapur',
    approval: 'HMDA',
    plotSize: '200 sq yd',
    pricePerSqYd: 53000,
    totalPrice: 10600000,
    distance: '8 km to Gachibowli',
    verified: true,
    createdAt: '2026-04-17'
  },
  {
    id: 3,
    projectName: 'Kollur Future Enclave',
    company: 'Skyline Infra',
    area: 'Kollur',
    approval: 'DTCP',
    plotSize: '240 sq yd',
    pricePerSqYd: 44000,
    totalPrice: 10560000,
    distance: '12 km to ORR Exit',
    verified: false,
    createdAt: '2026-04-17'
  }
];

export let adminLeads = [
  {
    id: 1,
    name: 'Ravi Kumar',
    email: 'ravi@example.com',
    phone: '9876543210',
    interest: 'Kokapet',
    createdAt: '2026-04-17'
  },
  {
    id: 2,
    name: 'Sneha Reddy',
    email: 'sneha@example.com',
    phone: '9988776655',
    interest: 'Tellapur Elite Plots',
    createdAt: '2026-04-17'
  }
];

export function getNextListingId() {
  return adminListings.length ? Math.max(...adminListings.map(item => item.id)) + 1 : 1;
}

export function getNextLeadId() {
  return adminLeads.length ? Math.max(...adminLeads.map(item => item.id)) + 1 : 1;
}