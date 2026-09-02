import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { formatLKR, formatSqFt, getStatusClass } from '../../utils/formatters';
import './Residences.css';

const Residences = () => {
  const [units, setUnits] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({ floor: '', unitType: '', status: '', sort: '' });
  const [compareList, setCompareList] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const [calcValues, setCalcValues] = useState({ price: 49875000, rate: 12, tenure: 20, down: 30 });

  useEffect(() => {
    api.get('/units').then(res => { setUnits(res.data); setFiltered(res.data); });
  }, []);

  useEffect(() => {
    let result = [...units];
    if (filters.floor) result = result.filter(u => u.floor === Number(filters.floor));
    if (filters.unitType) result = result.filter(u => u.unitType === filters.unitType);
    if (filters.status) result = result.filter(u => u.status === filters.status);
    if (filters.sort === 'price_asc') result.sort((a, b) => a.finalPrice - b.finalPrice);
    if (filters.sort === 'price_desc') result.sort((a, b) => b.finalPrice - a.finalPrice);
    if (filters.sort === 'floor_asc') result.sort((a, b) => a.floor - b.floor);
    if (filters.sort === 'size_desc') result.sort((a, b) => b.saleableArea - a.saleableArea);
    setFiltered(result);
  }, [filters, units]);

  const toggleCompare = (unit) => {
    setCompareList(prev =>
      prev.find(u => u.unitId === unit.unitId)
        ? prev.filter(u => u.unitId !== unit.unitId)
        : prev.length < 3 ? [...prev, unit] : prev
    );
  };

  const monthly = (() => {
    const p = calcValues.price * (1 - calcValues.down / 100);
    const r = calcValues.rate / 100 / 12;
    const n = calcValues.tenure * 12;
    if (r === 0) return p / n;
    return p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  })();

  return (
    <main id="main-content" className="residences-page">
      {/* Hero */}
      <section className="page-hero page-hero--burgundy">
        <div className="container">
          <p className="text-overline">Residences</p>
          <h1 className="page-hero__title">Residences & Availability</h1>
          <p className="page-hero__subtitle">
            Ten spacious three-bedroom apartments across five residential floors. Two thoughtfully designed unit types offering comfort, natural light, and modern living.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="section--sm section--ivory">
        <div className="container">
          <div className="residences-filters">
            <select className="form-select" value={filters.floor} onChange={e => setFilters({ ...filters, floor: e.target.value })}>
              <option value="">All Floors</option>
              {[1, 2, 3, 4, 5].map(f => <option key={f} value={f}>Floor {f}</option>)}
            </select>
            <select className="form-select" value={filters.unitType} onChange={e => setFilters({ ...filters, unitType: e.target.value })}>
              <option value="">All Types</option>
              <option value="Larger 3-Bedroom">Larger (1,425 sq. ft.)</option>
              <option value="Compact 3-Bedroom">Compact (1,273 sq. ft.)</option>
            </select>
            <select className="form-select" value={filters.status} onChange={e => setFilters({ ...filters, status: e.target.value })}>
              <option value="">All Statuses</option>
              {['Coming soon', 'Available', 'On hold', 'Reserved', 'Sold'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select className="form-select" value={filters.sort} onChange={e => setFilters({ ...filters, sort: e.target.value })}>
              <option value="">Sort By</option>
              <option value="floor_asc">Floor (Low to High)</option>
              <option value="price_asc">Price (Low to High)</option>
              <option value="price_desc">Price (High to Low)</option>
              <option value="size_desc">Size (Large First)</option>
            </select>
            <button className="btn btn--secondary btn--sm" onClick={() => setCalcOpen(!calcOpen)}>
              🧮 Mortgage Calculator
            </button>
          </div>

          {/* Mortgage Calculator */}
          {calcOpen && (
            <div className="mortgage-calc card" style={{ marginTop: 'var(--space-6)' }}>
              <h4>Indicative Mortgage Calculator</h4>
              <p className="text-disclaimer" style={{ marginBottom: 'var(--space-4)' }}>
                For illustration only. Actual terms depend on your bank's assessment. User-entered interest rate and tenure.
              </p>
              <div className="grid grid--4">
                <div className="form-group">
                  <label className="form-label">Unit Price (LKR)</label>
                  <input type="number" className="form-input" value={calcValues.price} onChange={e => setCalcValues({ ...calcValues, price: Number(e.target.value) })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Down Payment (%)</label>
                  <input type="number" className="form-input" value={calcValues.down} onChange={e => setCalcValues({ ...calcValues, down: Number(e.target.value) })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Interest Rate (%)</label>
                  <input type="number" className="form-input" step="0.1" value={calcValues.rate} onChange={e => setCalcValues({ ...calcValues, rate: Number(e.target.value) })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Tenure (Years)</label>
                  <input type="number" className="form-input" value={calcValues.tenure} onChange={e => setCalcValues({ ...calcValues, tenure: Number(e.target.value) })} />
                </div>
              </div>
              <div className="flex items-center gap-6" style={{ marginTop: 'var(--space-2)' }}>
                <div>
                  <span className="text-caption text-muted">Estimated Monthly Payment</span>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--color-burgundy)' }}>
                    {formatLKR(Math.round(monthly))}
                  </div>
                </div>
                <div>
                  <span className="text-caption text-muted">Down Payment</span>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 600 }}>
                    {formatLKR(Math.round(calcValues.price * calcValues.down / 100))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Unit Grid */}
      <section className="section">
        <div className="container">
          <div className="residences-grid">
            {filtered.map((unit) => (
              <div key={unit._id || unit.unitId} className="unit-card">
                <div className="unit-card__header">
                  <span className="unit-card__id">{unit.unitId}</span>
                  <span className={`badge ${getStatusClass(unit.status)}`}>{unit.status}</span>
                </div>
                <div className="unit-card__plan">
                  <span>Floor Plan</span>
                  <span className="text-caption text-muted">To be confirmed</span>
                </div>
                <div className="unit-card__body">
                  <h3 className="unit-card__type">{unit.unitType}</h3>
                  <div className="unit-card__meta">
                    <span>Floor {unit.floor}</span>
                    <span>·</span>
                    <span>{unit.bedrooms} Bed</span>
                    <span>·</span>
                    <span>{unit.bathrooms} Bath</span>
                  </div>
                  <div className="unit-card__size">{formatSqFt(unit.saleableArea)}</div>
                  <div className="unit-card__price">
                    <span className="text-caption text-muted">Indicative price</span>
                    <span className="unit-card__price-value">{formatLKR(unit.finalPrice || unit.basePrice, true)}</span>
                  </div>
                  <div className="unit-card__actions">
                    <Link to="/contact" className="btn btn--primary btn--sm btn--full">Enquire</Link>
                    <button
                      className={`btn btn--sm btn--full ${compareList.find(u => u.unitId === unit.unitId) ? 'btn--gold' : 'btn--secondary'}`}
                      onClick={() => toggleCompare(unit)}
                      disabled={!compareList.find(u => u.unitId === unit.unitId) && compareList.length >= 3}
                    >
                      {compareList.find(u => u.unitId === unit.unitId) ? '✓ Comparing' : 'Compare'}
                    </button>
                  </div>
                </div>
                <p className="text-disclaimer" style={{ marginTop: 'var(--space-2)', borderLeft: 'none', paddingLeft: 0 }}>
                  Indicative proposal price. Subject to confirmation.
                </p>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center" style={{ padding: 'var(--space-16)' }}>
              <p className="text-body-lg text-muted">No units match your current filters.</p>
              <button className="btn btn--secondary" style={{ marginTop: 'var(--space-4)' }}
                onClick={() => setFilters({ floor: '', unitType: '', status: '', sort: '' })}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Compare Drawer */}
      {compareList.length > 0 && (
        <div className="compare-drawer">
          <div className="container flex items-center justify-between">
            <span className="text-sm"><strong>{compareList.length}</strong> unit(s) selected for comparison</span>
            <div className="flex gap-3">
              <button className="btn btn--gold btn--sm" onClick={() => setShowCompare(true)} disabled={compareList.length < 2}>
                Compare ({compareList.length})
              </button>
              <button className="btn btn--ghost btn--sm" onClick={() => setCompareList([])}>Clear</button>
            </div>
          </div>
        </div>
      )}

      {/* Compare Modal */}
      {showCompare && (
        <div className="modal-overlay" onClick={() => setShowCompare(false)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '900px' }}>
            <div className="modal__header">
              <h3>Unit Comparison</h3>
              <button className="modal__close" onClick={() => setShowCompare(false)}>✕</button>
            </div>
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    {compareList.map(u => <th key={u.unitId}>{u.unitId}</th>)}
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Type</td>{compareList.map(u => <td key={u.unitId}>{u.unitType}</td>)}</tr>
                  <tr><td>Floor</td>{compareList.map(u => <td key={u.unitId}>{u.floor}</td>)}</tr>
                  <tr><td>Size</td>{compareList.map(u => <td key={u.unitId}>{formatSqFt(u.saleableArea)}</td>)}</tr>
                  <tr><td>Bedrooms</td>{compareList.map(u => <td key={u.unitId}>{u.bedrooms}</td>)}</tr>
                  <tr><td>Bathrooms</td>{compareList.map(u => <td key={u.unitId}>{u.bathrooms}</td>)}</tr>
                  <tr><td>Price</td>{compareList.map(u => <td key={u.unitId}><strong>{formatLKR(u.finalPrice || u.basePrice, true)}</strong></td>)}</tr>
                  <tr><td>Status</td>{compareList.map(u => <td key={u.unitId}><span className={`badge ${getStatusClass(u.status)}`}>{u.status}</span></td>)}</tr>
                  <tr><td>Parking</td>{compareList.map(u => <td key={u.unitId} style={{ fontSize: '0.75rem' }}>{u.parkingAllocation}</td>)}</tr>
                </tbody>
              </table>
            </div>
            <p className="text-disclaimer" style={{ marginTop: 'var(--space-4)' }}>
              All prices are indicative proposal prices. Subject to confirmation, floor premiums, and final specifications.
            </p>
          </div>
        </div>
      )}
    </main>
  );
};

export default Residences;
