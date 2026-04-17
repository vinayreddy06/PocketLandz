function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
}

function formatCompact(value) {
  return new Intl.NumberFormat('en-IN', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(value);
}

export default function StatsGrid({ stats }) {
  const items = [
    { label: 'Active Areas', value: stats.activeAreas },
    { label: 'Live Projects', value: stats.liveProjects },
    { label: 'Avg Price / sq yd', value: formatCurrency(stats.avgPriceSqyd) },
    { label: 'Market Value', value: formatCompact(stats.totalMarketValue) }
  ];

  return (
    <section className="stats-grid">
      {items.map((item) => (
        <div className="stat-card" key={item.label}>
          <div className="stat-value">{item.value}</div>
          <div className="stat-label">{item.label}</div>
        </div>
      ))}
    </section>
  );
}
