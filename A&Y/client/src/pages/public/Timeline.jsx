import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { formatLKR, getStatusClass } from '../../utils/formatters';

const Timeline = () => {
  const [phases, setPhases] = useState([]);
  useEffect(() => { api.get('/timeline/phases').then(res => setPhases(res.data)); }, []);

  return (
    <main id="main-content">
      <section className="page-hero page-hero--burgundy"><div className="container">
        <p className="text-overline">Progress</p>
        <h1 className="page-hero__title">Development Timeline & Updates</h1>
        <p className="page-hero__subtitle">36-month construction programme within a four-year financial horizon. Track progress across five construction phases.</p>
      </div></section>

      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="table-wrapper" style={{ marginBottom: 'var(--space-10)' }}>
            <table className="table">
              <thead>
                <tr><th>Phase</th><th>Duration</th><th>Cost Allocation</th><th>Approx. Cost</th><th>Status</th><th>Progress</th></tr>
              </thead>
              <tbody>
                {phases.map(p => (
                  <tr key={p._id}>
                    <td><strong>Phase {p.phaseNumber}:</strong> {p.name}</td>
                    <td>{p.durationMonths} months</td>
                    <td>{p.costAllocationPercent}%</td>
                    <td>{formatLKR(p.approximateCost, true)}</td>
                    <td><span className={`badge ${getStatusClass(p.status)}`}>{p.status}</span></td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="progress-bar" style={{ width: '80px' }}>
                          <div className="progress-bar__fill" style={{ width: `${p.progressPercent}%` }}
                            role="progressbar" aria-valuenow={p.progressPercent} aria-valuemin="0" aria-valuemax="100">
                          </div>
                        </div>
                        <span className="text-caption">{p.progressPercent}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Visual Timeline */}
          <h3 className="heading-accent" style={{ marginBottom: 'var(--space-8)' }}>Construction Programme</h3>
          <div className="timeline">
            {phases.map(p => (
              <div key={p._id} className={`timeline-item ${p.status === 'In progress' ? 'timeline-item--active' : p.status === 'Completed' ? 'timeline-item--complete' : ''}`}>
                <div className="timeline-item__title">Phase {p.phaseNumber}: {p.name}</div>
                <div className="timeline-item__meta">{p.durationMonths} months · {p.costAllocationPercent}% · {formatLKR(p.approximateCost, true)}</div>
                <div className="timeline-item__content">
                  <span className={`badge ${getStatusClass(p.status)}`}>{p.status}</span>
                  {p.delayReason && <p style={{ marginTop: 'var(--space-2)', color: 'var(--color-warning)' }}>Delay: {p.delayReason}</p>}
                </div>
              </div>
            ))}
          </div>

          <p className="text-disclaimer" style={{ marginTop: 'var(--space-8)' }}>
            Progress percentages and milestone statuses are updated by the administrator. No fake progress is displayed. Actual dates will be confirmed once construction commences.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Timeline;
