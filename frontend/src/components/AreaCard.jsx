function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
}

export default function AreaCard({ area }) {
  return (
    <article className="card area-card">
      <div className="card-top-row">
        <div>
          <h3>{area.name}</h3>
          <p className="muted">{area.zone}</p>
        </div>
        <span className="badge success">+{area.trendPct}%</span>
      </div>
      <div className="price-lg">{formatCurrency(area.avgPriceSqyd)}</div>
      <p className="muted">Avg. price per sq yard</p>
      <div className="mini-grid">
        <div className="mini-box">
          <span className="mini-label">Projects</span>
          <strong>{area.projectsCount}</strong>
        </div>
      </div>
      <p>{area.description}</p>
    </article>
  );
}
