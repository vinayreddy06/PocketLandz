function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
}

export default function TrendChart({ trends }) {
  const max = Math.max(...trends.flatMap((item) => [item.Kokapet, item.Tellapur, item.Kollur]));

  return (
    <div className="trend-list">
      {trends.map((row) => (
        <div className="trend-item" key={row.month}>
          <strong>{row.month}</strong>
          {[
            { label: 'Kokapet', value: row.Kokapet },
            { label: 'Tellapur', value: row.Tellapur },
            { label: 'Kollur', value: row.Kollur }
          ].map((item) => (
            <div className="bar-group" key={`${row.month}-${item.label}`}>
              <div className="bar-label-row">
                <span>{item.label}</span>
                <span>{formatCurrency(item.value)}</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${(item.value / max) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
