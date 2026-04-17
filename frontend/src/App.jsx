import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import StatsGrid from './components/StatsGrid';
import AreaCard from './components/AreaCard';
import ListingCard from './components/ListingCard';
import TrendChart from './components/TrendChart';
import ComparePanel from './components/ComparePanel';
import LeadForm from './components/LeadForm';
import { api } from './services/api';

export default function App() {
  const [stats, setStats] = useState({ activeAreas: 0, liveProjects: 0, avgPriceSqyd: 0, totalMarketValue: 0 });
  const [areas, setAreas] = useState([]);
  const [listings, setListings] = useState([]);
  const [trends, setTrends] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [query, setQuery] = useState('');
  const [areaFilter, setAreaFilter] = useState('all');
  const [approvalFilter, setApprovalFilter] = useState('all');
  const [compareItems, setCompareItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);
        const [statsData, areasData, listingsData, trendsData, testimonialsData] = await Promise.all([
          api.getStats(),
          api.getAreas(),
          api.getListings(),
          api.getTrends(),
          api.getTestimonials()
        ]);

        setStats(statsData);
        setAreas(areasData);
        setListings(listingsData);
        setTrends(trendsData);
        setTestimonials(testimonialsData);
      } catch (err) {
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, []);

  useEffect(() => {
    async function loadListings() {
      try {
        const results = await api.getListings({ query, area: areaFilter, approval: approvalFilter });
        setListings(results);
      } catch (err) {
        setError(err.message || 'Failed to load listings');
      }
    }

    loadListings();
  }, [query, areaFilter, approvalFilter]);

  const featuredArea = useMemo(() => areas[0], [areas]);

  function toggleCompare(listing) {
    setCompareItems((previous) => {
      const alreadyAdded = previous.some((item) => item.id === listing.id);

      if (alreadyAdded) {
        return previous.filter((item) => item.id !== listing.id);
      }

      if (previous.length >= 3) {
        return [...previous.slice(1), listing];
      }

      return [...previous, listing];
    });
  }

  if (loading) {
    return <div className="loading-screen">Loading Pocket Landz...</div>;
  }

  return (
    <div>
      <Header />

      <main className="container page-stack">
        <section className="hero-section">
          <div className="hero-copy">
            <span className="hero-pill">Phase 1 MVP</span>
            <h1>Track Hyderabad land prices smarter with Pocket Landz.</h1>
            <p>
              Search by area, compare projects, view area-wise trends, and launch a real real-estate
              intelligence website using fake data first.
            </p>

            <div className="search-panel">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search Kokapet, Tellapur, Kollur..."
              />
              <select value={areaFilter} onChange={(event) => setAreaFilter(event.target.value)}>
                <option value="all">All Areas</option>
                {areas.map((area) => (
                  <option key={area.id} value={area.name}>{area.name}</option>
                ))}
              </select>
              <select value={approvalFilter} onChange={(event) => setApprovalFilter(event.target.value)}>
                <option value="all">All Approval</option>
                <option value="HMDA">HMDA</option>
                <option value="DTCP">DTCP</option>
              </select>
            </div>
          </div>

          <div className="hero-card card">
            <div className="section-heading-row">
              <div>
                <div className="muted">Featured Market Snapshot</div>
                <h2>{featuredArea?.name || 'Kokapet'}</h2>
              </div>
              <span className="badge success">+{featuredArea?.trendPct || 0}%</span>
            </div>
            <div className="hero-metrics">
              <div className="mini-box">
                <span className="mini-label">Avg Price / sq yd</span>
                <strong>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(featuredArea?.avgPriceSqyd || 0)}</strong>
              </div>
              <div className="mini-box">
                <span className="mini-label">Projects</span>
                <strong>{featuredArea?.projectsCount || 0}</strong>
              </div>
            </div>
            <TrendChart trends={trends} />
          </div>
        </section>

        <StatsGrid stats={stats} />

        {error ? <div className="status-message error">{error}</div> : null}

        <section id="areas">
          <div className="section-heading-row">
            <div>
              <h2>Top Hyderabad Areas</h2>
              <p className="muted">Area-wise benchmark pricing for your first launch.</p>
            </div>
          </div>
          <div className="grid three-col">
            {areas.map((area) => <AreaCard key={area.id} area={area} />)}
          </div>
        </section>

        <section id="listings">
          <div className="section-heading-row">
            <div>
              <h2>Featured Plot Listings</h2>
              <p className="muted">Search, filter, and compare projects from multiple companies.</p>
            </div>
            <span className="muted">{listings.length} result(s)</span>
          </div>
          <div className="grid three-col">
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                selected={compareItems.some((item) => item.id === listing.id)}
                onToggleCompare={toggleCompare}
              />
            ))}
          </div>
        </section>

        <ComparePanel items={compareItems} />

        <section className="two-column-section">
          <section className="card map-card">
            <h2>Map Preview</h2>
            <p className="muted">This is a static visual for Phase 1. Later, connect Google Maps or Mapbox.</p>
            <div className="map-placeholder">
              {[
                { top: '16%', left: '60%', label: 'Kokapet' },
                { top: '34%', left: '50%', label: 'Tellapur' },
                { top: '44%', left: '44%', label: 'Kollur' },
                { top: '55%', left: '35%', label: 'Mokila' },
                { top: '68%', left: '66%', label: 'Shamshabad' },
                { top: '22%', left: '28%', label: 'Kompally' }
              ].map((pin) => (
                <div className="map-pin" style={{ top: pin.top, left: pin.left }} key={pin.label}>
                  <span>{pin.label}</span>
                </div>
              ))}
            </div>
          </section>

          <LeadForm />
        </section>

        <section>
          <div className="section-heading-row">
            <div>
              <h2>What early users say</h2>
              <p className="muted">Simple testimonial section using API data.</p>
            </div>
          </div>
          <div className="grid two-col">
            {testimonials.map((item) => (
              <article className="card" key={item.id}>
                <p>“{item.text}”</p>
                <strong>{item.name}</strong>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
