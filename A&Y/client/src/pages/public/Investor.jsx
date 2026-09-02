import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { formatLKR, formatPercent, getStatusClass } from '../../utils/formatters';

const Investor = () => {
  const [metrics, setMetrics] = useState([]);
  const [risks, setRisks] = useState([]);

  useEffect(() => {
    Promise.all([api.get('/financials'), api.get('/risks')]).then(([fRes, rRes]) => {
      setMetrics(fRes.data);
      setRisks(rRes.data);
    });
  }, []);

  const byCategory = (cat) => metrics.filter(m => m.category === cat);
  const DISCLAIMER = 'Illustrative projections based on proposal assumptions; subject to due diligence, final approvals, contracts, market conditions, tax treatment, and financing terms.';

  const renderValue = (m) => {
    if (m.unit === 'LKR') return formatLKR(m.value, m.value >= 1000000);
    if (m.unit === 'Percent') return formatPercent(m.value);
    return String(m.value);
  };

  return (
    <main id="main-content">
      <section className="page-hero page-hero--burgundy"><div className="container">
        <p className="text-overline">Investment</p>
        <h1 className="page-hero__title">Investor Overview</h1>
        <p className="page-hero__subtitle">Key financial projections, cost structure, and risk assessment for the proposed A&Y Residences development in Dehiwala.</p>
      </div></section>

      {/* Disclaimer */}
      <section className="section--sm section--ivory">
        <div className="container">
          <div className="alert alert--warning"><span>⚠️</span><div><strong>Important:</strong> {DISCLAIMER}</div></div>
        </div>
      </section>

      {/* Revenue & Profitability */}
      <section className="section">
        <div className="container">
          <h2 className="heading-accent" style={{ marginBottom: 'var(--space-8)' }}>Revenue & Profitability</h2>
          <div className="grid grid--3" style={{ marginBottom: 'var(--space-8)' }}>
            {[...byCategory('Revenue'), ...byCategory('Profit')].map(m => (
              <div key={m._id} className="card card--bordered-gold text-center">
                <div className="stat-card__label">{m.label}</div>
                <div className="stat-card__value">{renderValue(m)}</div>
                <div className="stat-card__disclaimer">Projection</div>
              </div>
            ))}
          </div>
          <div className="grid grid--4">
            {byCategory('Margin').concat(byCategory('Return')).map(m => (
              <div key={m._id} className="card text-center">
                <div className="stat-card__label">{m.label}</div>
                <div className="stat-card__value" style={{ fontSize: 'var(--text-2xl)' }}>{renderValue(m)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Structure */}
      <section className="section section--ivory">
        <div className="container">
          <h2 className="heading-accent" style={{ marginBottom: 'var(--space-8)' }}>Project Cost Structure</h2>
          <div className="table-wrapper">
            <table className="table">
              <thead><tr><th>Cost Item</th><th style={{ textAlign: 'right' }}>Amount</th></tr></thead>
              <tbody>
                {byCategory('Cost').map(m => (
                  <tr key={m._id}>
                    <td>{m.label}</td>
                    <td style={{ textAlign: 'right', fontWeight: 600 }}>{renderValue(m)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Assumptions */}
      <section className="section">
        <div className="container">
          <h2 className="heading-accent" style={{ marginBottom: 'var(--space-8)' }}>Key Assumptions</h2>
          <div className="table-wrapper">
            <table className="table">
              <thead><tr><th>Assumption</th><th style={{ textAlign: 'right' }}>Value</th><th>Note</th></tr></thead>
              <tbody>
                {byCategory('Assumption').map(m => (
                  <tr key={m._id}>
                    <td>{m.label}</td>
                    <td style={{ textAlign: 'right', fontWeight: 600 }}>{renderValue(m)}</td>
                    <td className="text-caption text-muted">{m.description || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Break-even */}
      <section className="section section--charcoal">
        <div className="container">
          <h2 className="heading-accent text-white" style={{ marginBottom: 'var(--space-8)' }}>Break-Even Analysis</h2>
          <div className="grid grid--3">
            {byCategory('BreakEven').map(m => (
              <div key={m._id} className="card card--dark text-center">
                <div className="stat-card__label" style={{ color: 'var(--color-gold)' }}>{m.label}</div>
                <div className="stat-card__value">{renderValue(m)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Risk Matrix */}
      <section className="section">
        <div className="container">
          <h2 className="heading-accent" style={{ marginBottom: 'var(--space-8)' }}>Risk Assessment</h2>
          <p className="text-muted" style={{ marginBottom: 'var(--space-6)' }}>
            25 risk categories identified from the proposal. No mitigation is marked as implemented without evidence.
          </p>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr><th>Category</th><th>Likelihood</th><th>Impact</th><th>Mitigation</th><th>Residual</th><th>Status</th></tr>
              </thead>
              <tbody>
                {risks.slice(0, 15).map(r => (
                  <tr key={r._id}>
                    <td><strong>{r.category}</strong></td>
                    <td><span className={`badge ${getStatusClass(r.likelihood)}`}>{r.likelihood}</span></td>
                    <td><span className={`badge ${getStatusClass(r.impact)}`}>{r.impact}</span></td>
                    <td className="text-caption" style={{ maxWidth: '300px' }}>{r.mitigation}</td>
                    <td><span className={`badge ${getStatusClass(r.residualRisk)}`}>{r.residualRisk}</span></td>
                    <td><span className={`badge ${getStatusClass(r.status)}`}>{r.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {risks.length > 15 && <p className="text-center text-muted" style={{ marginTop: 'var(--space-4)' }}>Showing 15 of {risks.length} identified risks. Full matrix available in the data room.</p>}
        </div>
      </section>

      {/* CTA */}
      <section className="section section--dark cta-section">
        <div className="container text-center">
          <h2 className="text-white" style={{ marginBottom: 'var(--space-4)' }}>Interested in the Full Financial Model?</h2>
          <p className="text-body-lg" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto var(--space-8)' }}>
            Qualified investors and banking partners can request access to the secure data room for detailed financial models, cash-flow projections, and supporting documentation.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/contact" className="btn btn--gold btn--lg">Investor Enquiry</Link>
            <Link to="/contact" className="btn btn--ghost btn--lg">Request Data Room Access</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Investor;
