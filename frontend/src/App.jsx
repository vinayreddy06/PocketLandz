import { useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header.jsx";
import AreaCard from "./components/AreaCard.jsx";
import ListingCard from "./components/ListingCard.jsx";
import StatsGrid from "./components/StatsGrid.jsx";
import TrendChart from "./components/TrendChart.jsx";
import ComparePanel from "./components/ComparePanel.jsx";
import LeadForm from "./components/LeadForm.jsx";

import Login from "./pages/admin/Login.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Listings from "./pages/admin/Listings.jsx";
import ListingForm from "./pages/admin/ListingForm.jsx";
import Leads from "./pages/admin/Leads.jsx";
import ProtectedRoute from "./components/admin/ProtectedRoute.jsx";

function HomePage() {
  const [compareItems, setCompareItems] = useState([]);

  const areas = [
    {
      name: "Kokapet",
      zone: "West Hyderabad",
      avgPriceSqyd: 68000,
      trendPct: 8.2,
      projectsCount: 12,
      description: "Premium growth corridor near ORR."
    },
    {
      name: "Tellapur",
      zone: "Financial District",
      avgPriceSqyd: 52000,
      trendPct: 6.1,
      projectsCount: 9,
      description: "High demand residential plots."
    },
    {
      name: "Kollur",
      zone: "North-West Hyderabad",
      avgPriceSqyd: 43000,
      trendPct: 5.4,
      projectsCount: 7,
      description: "Affordable growth market with strong appreciation."
    }
  ];

  const listings = [
    {
      id: 1,
      projectName: "Neopolis Greens",
      company: "Urban Axis Realty",
      approval: "HMDA",
      area: "Kokapet",
      status: "Open",
      sizeSqyd: 200,
      priceSqyd: 65000,
      totalPrice: 13000000,
      trendPct: 7.5,
      verified: true,
      distance: "5 km from ORR",
      description: "Premium villa plots in a prime growth corridor."
    },
    {
      id: 2,
      projectName: "Tellapur Elite Plots",
      company: "Skyline Infra",
      approval: "DTCP",
      area: "Tellapur",
      status: "Selling",
      sizeSqyd: 150,
      priceSqyd: 50000,
      totalPrice: 7500000,
      trendPct: 5.2,
      verified: false,
      distance: "8 km from Gachibowli",
      description: "Affordable plots with good future appreciation."
    },
    {
      id: 3,
      projectName: "Kollur Future Enclave",
      company: "GreenFields Developers",
      approval: "HMDA",
      area: "Kollur",
      status: "New Launch",
      sizeSqyd: 180,
      priceSqyd: 42000,
      totalPrice: 7560000,
      trendPct: 4.8,
      verified: true,
      distance: "10 km from Financial District",
      description: "Well-positioned project for medium-term growth."
    }
  ];

  const trends = [
    { month: "Jan", Kokapet: 62000, Tellapur: 49000, Kollur: 40000 },
    { month: "Feb", Kokapet: 63500, Tellapur: 50000, Kollur: 40800 },
    { month: "Mar", Kokapet: 65000, Tellapur: 51000, Kollur: 41700 },
    { month: "Apr", Kokapet: 66500, Tellapur: 51800, Kollur: 42500 },
    { month: "May", Kokapet: 68000, Tellapur: 52000, Kollur: 43000 }
  ];

  const stats = useMemo(() => {
    const avgPriceSqyd =
      Math.round(
        areas.reduce((sum, item) => sum + item.avgPriceSqyd, 0) / areas.length
      ) || 0;

    const totalMarketValue = listings.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    return {
      activeAreas: areas.length,
      liveProjects: listings.length,
      avgPriceSqyd,
      totalMarketValue
    };
  }, [areas, listings]);

  function handleToggleCompare(listing) {
    const exists = compareItems.some((item) => item.id === listing.id);

    if (exists) {
      setCompareItems(compareItems.filter((item) => item.id !== listing.id));
      return;
    }

    if (compareItems.length >= 3) return;

    setCompareItems([...compareItems, listing]);
  }

  return (
    <div>
      <Header />

      <main className="container">
        <section className="hero">
  <h1>Pocket Landz LIVE VERSION</h1>
  <p>
    Track Hyderabad land prices, compare projects, and manage listings.
  </p>

  <div className="button-row" style={{ marginTop: "20px" }}>
    <a className="button" href="#listings">Explore Listings</a>

    <a className="button secondary" href="#/admin/login">
      Admin Login
    </a>

    <a className="button outline" href="#/admin/listings/new">
      Add Listing
    </a>
  </div>
</section>

        <StatsGrid stats={stats} />

        <section id="areas">
          <h2>Top Areas</h2>
          <div className="grid">
            {areas.map((area) => (
              <AreaCard key={area.name} area={area} />
            ))}
          </div>
        </section>

        <section id="listings">
          <h2>Featured Listings</h2>
          <div className="grid">
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                selected={compareItems.some((item) => item.id === listing.id)}
                onToggleCompare={handleToggleCompare}
              />
            ))}
          </div>
        </section>

        <section>
          <h2>Price Trend Snapshot</h2>
          <TrendChart trends={trends} />
        </section>

        <ComparePanel items={compareItems} />

        <LeadForm />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin/login" element={<Login />} />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/listings"
        element={
          <ProtectedRoute>
            <Listings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/listings/new"
        element={
          <ProtectedRoute>
            <ListingForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/listings/edit/:id"
        element={
          <ProtectedRoute>
            <ListingForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/leads"
        element={
          <ProtectedRoute>
            <Leads />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}