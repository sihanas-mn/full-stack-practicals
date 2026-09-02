import { Link } from 'react-router-dom';

const Market = () => {
  const DISCLAIMER = 'Market figures from the proposal. Source period and disclaimer required. These values can become stale; managed as dated CMS records.';

  return (
    <main id="main-content">
      <section className="page-hero page-hero--burgundy"><div className="container">
        <p className="text-overline">Research</p>
        <h1 className="page-hero__title">Market Opportunity</h1>
        <p className="page-hero__subtitle">Analysis of Dehiwala's residential market dynamics, buyer demand drivers, and suburban apartment development trends.</p>
      </div></section>

      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="alert alert--warning" style={{ marginBottom: 'var(--space-10)' }}>
            <span>⚠️</span><div>Market observations are sourced from the A&Y proposal document. Each figure requires a verified source period and date before publication. Do not treat these as live market data.</div>
          </div>

          {/* Key Trends */}
          <h2 className="heading-accent" style={{ marginBottom: 'var(--space-8)' }}>Key Market Trends</h2>
          <div className="grid grid--2" style={{ marginBottom: 'var(--space-16)' }}>
            {[
              { title: 'Suburban Migration', text: 'Apartment development is moving from central Colombo to established suburbs like Dehiwala, driven by higher city land costs and buyer preference for space and value.' },
              { title: 'Affordability Demand', text: 'Broader buyer demand exists in Dehiwala compared to premium Colombo locations, attracting mid-to-upper-middle-income families, professionals, and first-time buyers.' },
              { title: 'Post-Crisis Priorities', text: 'After the economic crisis, buyers emphasise developer integrity, construction quality, legal clarity, approvals, parking, backup systems, and transparent value.' },
              { title: 'Infrastructure Growth', text: 'Transport improvements including the proposed Marine Drive extension from Dehiwala toward Panadura strengthen long-term location value.' },
            ].map((trend, i) => (
              <div key={i} className="card">
                <h4 style={{ marginBottom: 'var(--space-3)', color: 'var(--color-burgundy)' }}>{trend.title}</h4>
                <p className="text-body-sm text-muted">{trend.text}</p>
              </div>
            ))}
          </div>

          {/* Buyer Segments */}
          <h2 className="heading-accent" style={{ marginBottom: 'var(--space-8)' }}>Buyer & Demand Segments</h2>
          <div className="grid grid--3" style={{ marginBottom: 'var(--space-16)' }}>
            {['Owner-Occupiers', 'Professionals', 'Families', 'Expatriates', 'Students', 'Medical Professionals', 'Investors'].map(seg => (
              <div key={seg} className="card text-center" style={{ padding: 'var(--space-4) var(--space-3)' }}>
                <span className="text-sm font-medium">{seg}</span>
              </div>
            ))}
          </div>

          {/* Market Figures */}
          <h2 className="heading-accent" style={{ marginBottom: 'var(--space-4)' }}>Proposal Market Observations</h2>
          <p className="text-disclaimer" style={{ marginBottom: 'var(--space-6)' }}>{DISCLAIMER}</p>
          <div className="table-wrapper" style={{ marginBottom: 'var(--space-16)' }}>
            <table className="table">
              <thead><tr><th>Observation</th><th>Value</th><th>Source Status</th></tr></thead>
              <tbody>
                <tr><td>Annual apartment price appreciation</td><td><strong>~15.66%</strong></td><td><span className="badge badge--proposed">Source/Date Required</span></td></tr>
                <tr><td>Average city 3-bedroom apartment price</td><td><strong>~LKR 109.0M</strong></td><td><span className="badge badge--proposed">Source/Date Required</span></td></tr>
                <tr><td>Premium apartment rental yield</td><td><strong>6%–7%</strong></td><td><span className="badge badge--proposed">Source/Date Required</span></td></tr>
                <tr><td>Higher-floor premium observation</td><td><strong>10%–25%</strong></td><td><span className="badge badge--proposed">Source/Date Required</span></td></tr>
              </tbody>
            </table>
          </div>

          {/* Buyer Preferences */}
          <h2 className="heading-accent" style={{ marginBottom: 'var(--space-8)' }}>Buyer Preferences</h2>
          <div className="grid grid--2" style={{ marginBottom: 'var(--space-8)' }}>
            {['Larger homes with more space', 'Private balconies', 'Quieter residential areas', 'Dedicated parking', 'Modern amenities', 'Better family environments', 'Quality construction & finishes', 'Clear legal documentation'].map(pref => (
              <div key={pref} className="flex items-center gap-3" style={{ padding: 'var(--space-3) 0', borderBottom: '1px solid var(--color-warm-grey)' }}>
                <span style={{ color: 'var(--color-gold)', fontWeight: 700 }}>✓</span>
                <span className="text-sm">{pref}</span>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: 'var(--space-10)' }}>
            <Link to="/investor" className="btn btn--primary btn--lg">View Financial Projections</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Market;
