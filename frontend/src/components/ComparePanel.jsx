function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
}

export default function ComparePanel({ items }) {
  return (
    <section className="compare-section" id="compare">
      <div className="section-heading-row">
        <div>
          <h2>Compare Projects</h2>
          <p className="muted">Select up to 3 listings and compare them instantly.</p>
        </div>
        <span className="badge dark">{items.length}/3 selected</span>
      </div>

      {items.length === 0 ? (
        <div className="empty-box">Select listings from above to compare.</div>
      ) : (
        <div className="grid three-col">
          {items.map((item) => (
            <article className="card" key={item.id}>
              <h3>{item.projectName}</h3>
              <p className="muted">{item.company}</p>
              <div className="compare-rows">
                <div><span>Area</span><strong>{item.area}</strong></div>
                <div><span>Approval</span><strong>{item.approval}</strong></div>
                <div><span>Plot Size</span><strong>{item.sizeSqyd} sq yd</strong></div>
                <div><span>Price / sq yd</span><strong>{formatCurrency(item.priceSqyd)}</strong></div>
                <div><span>Total Price</span><strong>{formatCurrency(item.totalPrice)}</strong></div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
