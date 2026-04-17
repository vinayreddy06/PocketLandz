import express from 'express';
import { areas, listings, testimonials, trends } from '../data/fakeData.js';

const router = express.Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Pocket Landz API is running' });
});

router.get('/areas', (req, res) => {
  const search = (req.query.search || '').toLowerCase();
  const result = search
    ? areas.filter((area) => area.name.toLowerCase().includes(search))
    : areas;

  res.json(result);
});

router.get('/listings', (req, res) => {
  const query = (req.query.query || '').toLowerCase();
  const area = req.query.area || 'all';
  const approval = req.query.approval || 'all';

  const result = listings.filter((listing) => {
    const haystack = `${listing.projectName} ${listing.company} ${listing.area}`.toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    const matchesArea = area === 'all' || listing.area === area;
    const matchesApproval = approval === 'all' || listing.approval === approval;
    return matchesQuery && matchesArea && matchesApproval;
  });

  res.json(result);
});

router.get('/listings/:id', (req, res) => {
  const listing = listings.find((item) => item.id === Number(req.params.id));

  if (!listing) {
    return res.status(404).json({ message: 'Listing not found' });
  }

  return res.json(listing);
});

router.get('/trends', (_req, res) => {
  res.json(trends);
});

router.get('/stats', (_req, res) => {
  const avgPrice = Math.round(
    areas.reduce((sum, area) => sum + area.avgPriceSqyd, 0) / areas.length
  );

  const totalMarketValue = listings.reduce((sum, listing) => sum + listing.totalPrice, 0);

  res.json({
    activeAreas: areas.length,
    liveProjects: listings.length,
    avgPriceSqyd: avgPrice,
    totalMarketValue
  });
});

router.get('/testimonials', (_req, res) => {
  res.json(testimonials);
});

router.post('/leads', (req, res) => {
  const { name, email, phone, interest } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'Name, email, and phone are required.' });
  }

  return res.status(201).json({
    message: 'Lead captured successfully',
    lead: {
      id: Date.now(),
      name,
      email,
      phone,
      interest: interest || '',
      createdAt: new Date().toISOString()
    }
  });
});

export default router;
