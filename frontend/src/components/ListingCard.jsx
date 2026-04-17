function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
}

export default function ListingCard({ listing, selected, onToggleCompare }) {
  return (
    <article className="card listing-card">
      <div className="card-top-row">
        <div>
          <h3>{listing.projectName}</h3>
          <p className="muted">{listing.company}</p>
        </div>
        {listing.verified ? <span className="badge success">Verified</span> : <span className="badge">Check</span>}
      </div>

      <div className="tag-row">
        <span className="tag dark">{listing.approval}</span>
        <span className="tag">{listing.area}</span>
        <span className="tag">{listing.status}</span>
      </div>

      <div className="mini-grid two-col">
        <div className="mini-box">
          <span className="mini-label">Plot Size</span>
          <strong>{listing.sizeSqyd} sq yd</strong>
        </div>
        <div className="mini-box">
          <span className="mini-label">Price / sq yd</span>
          <strong>{formatCurrency(listing.priceSqyd)}</strong>
        </div>
      </div>

      <div className="highlight-box">
        <span className="mini-label">Total Price</span>
        <div className="price-md">{formatCurrency(listing.totalPrice)}</div>
        <span className="muted">+{listing.trendPct}% in 6 months</span>
      </div>

      <p className="muted">{listing.distance}</p>
      <p>{listing.description}</p>

      <div className="button-row">
        <button className="button secondary" type="button">View Details</button>
        <button className={`button ${selected ? '' : 'outline'}`} type="button" onClick={() => onToggleCompare(listing)}>
          {selected ? 'Selected' : 'Compare'}
        </button>
      </div>
    </article>
  );
}
