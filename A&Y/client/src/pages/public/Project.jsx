import { Link } from 'react-router-dom';

const Project = () => {
  return (
    <main id="main-content">
      <section className="page-hero page-hero--burgundy"><div className="container">
        <p className="text-overline">The Development</p>
        <h1 className="page-hero__title">Project Overview</h1>
        <p className="page-hero__subtitle">A mid-to-upper-middle-income residential apartment complex proposed for the Dehiwala area.</p>
      </div></section>

      <section className="section">
        <div className="container" style={{ maxWidth: '1000px' }}>
          {/* Key Specs */}
          <div className="grid grid--2" style={{ marginBottom: 'var(--space-16)' }}>
            <div>
              <p className="text-overline">Concept</p>
              <h2 className="heading-accent" style={{ marginBottom: 'var(--space-6)' }}>Development Concept</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {[
                  ['Development Type', 'Mid-to-upper-middle-income residential apartment complex'],
                  ['Land Requirement', '14 perches (approximately 3,811.50 sq. ft.)'],
                  ['Structure', 'G+5 financial-development concept'],
                  ['Residential Floors', '5 floors'],
                  ['Total Apartments', '10 three-bedroom apartments'],
                  ['Units Per Floor', '2 apartments per residential floor'],
                  ['Typical Floor Area', 'Approximately 2,698 sq. ft. (saleable)'],
                  ['Total Saleable Area', 'Approximately 13,487.38 sq. ft. (including balconies)'],
                  ['Larger Unit', 'Approximately 1,425 sq. ft.'],
                  ['Compact Unit', 'Approximately 1,273 sq. ft.'],
                  ['Parking', 'Dedicated — final configuration subject to architectural confirmation'],
                  ['Construction Programme', '36 months within a four-year financial horizon'],
                ].map(([label, value]) => (
                  <div key={label} style={{ display: 'flex', borderBottom: '1px solid var(--color-warm-grey)', paddingBottom: 'var(--space-3)' }}>
                    <span className="text-caption text-muted" style={{ minWidth: '160px', flexShrink: 0 }}>{label}</span>
                    <span className="text-sm" style={{ fontWeight: 500 }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              {/* Floor Stack */}
              <p className="text-overline">Floor Stack</p>
              <h3 style={{ marginBottom: 'var(--space-6)' }}>Building Visualisation</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <div className="card" style={{ padding: 'var(--space-3) var(--space-4)', background: 'var(--color-ivory)', textAlign: 'center', fontSize: 'var(--text-xs)' }}>
                  Rooftop — Leisure Area (Proposed)
                </div>
                {[5,4,3,2,1].map(f => (
                  <div key={f} className="card card--bordered-gold" style={{ padding: 'var(--space-3) var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="text-sm"><strong>Floor {f}</strong></span>
                    <div className="flex gap-2">
                      <span className="badge badge--coming-soon" style={{ fontSize: '0.65rem' }}>AY-{f}A · 1,425 sf</span>
                      <span className="badge badge--coming-soon" style={{ fontSize: '0.65rem' }}>AY-{f}B · 1,273 sf</span>
                    </div>
                  </div>
                ))}
                <div className="card" style={{ padding: 'var(--space-3) var(--space-4)', background: 'var(--color-charcoal)', color: 'var(--color-white)', textAlign: 'center', fontSize: 'var(--text-xs)' }}>
                  Ground Floor — Lobby, Parking, Services
                </div>
              </div>
            </div>
          </div>

          {/* Nearby Roads */}
          <h3 className="heading-accent" style={{ marginBottom: 'var(--space-6)' }}>Proposed Nearby Areas</h3>
          <div className="flex flex-wrap gap-3" style={{ marginBottom: 'var(--space-10)' }}>
            {['Marine Drive', 'Kawdana Road', 'Hill Street', 'Galle Road', 'Kalubowila Road', 'Allen Avenue'].map(r => (
              <span key={r} className="badge badge--proposed" style={{ fontSize: 'var(--text-sm)', padding: 'var(--space-2) var(--space-4)' }}>{r}</span>
            ))}
          </div>

          {/* Approvals Tracker */}
          <h3 className="heading-accent" style={{ marginBottom: 'var(--space-6)' }}>Approvals Tracker</h3>
          <div className="table-wrapper" style={{ marginBottom: 'var(--space-10)' }}>
            <table className="table">
              <thead><tr><th>Approval</th><th>Status</th><th>Notes</th></tr></thead>
              <tbody>
                {[
                  ['UDA Approval', 'Not started', 'Required before construction'],
                  ['CMA Approval', 'Not started', 'If applicable'],
                  ['Condominium Ownership Certificate (COC)', 'Not started', 'Required for unit sales'],
                  ['Clear Deed / Title Verification', 'Not started', 'Subject to land acquisition'],
                  ['Building Permit', 'Not started', 'Subject to architectural plans'],
                  ['Environmental Assessment', 'Not started', 'If required by regulations'],
                ].map(([name, status, note]) => (
                  <tr key={name}>
                    <td><strong>{name}</strong></td>
                    <td><span className={`badge ${getStatusClass(status)}`}>{status}</span></td>
                    <td className="text-caption text-muted">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="alert alert--info">
            <span>ℹ️</span>
            <div>Approval statuses are configurable values managed through the CMS. Do not assume any approval has been obtained unless verified and updated by the administrator.</div>
          </div>

          {/* Placeholders */}
          <h3 className="heading-accent" style={{ margin: 'var(--space-10) 0 var(--space-6)' }}>Project Team — To Be Confirmed</h3>
          <div className="grid grid--3">
            {['Architect', 'Structural Engineer', 'MEP Consultant', 'Main Contractor', 'Quantity Surveyor', 'Legal Counsel'].map(role => (
              <div key={role} className="card text-center" style={{ background: 'var(--color-ivory)' }}>
                <p className="text-caption text-muted">{role}</p>
                <p className="text-sm" style={{ fontWeight: 500, marginTop: 'var(--space-2)' }}>To be confirmed</p>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: 'var(--space-10)' }}>
            <Link to="/residences" className="btn btn--primary btn--lg">View Residences & Availability</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Project;
