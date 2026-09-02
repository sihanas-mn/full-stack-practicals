import { Link } from 'react-router-dom';

const Location = () => {
  return (
    <main id="main-content">
      <section className="page-hero page-hero--burgundy"><div className="container">
        <p className="text-overline">Location</p>
        <h1 className="page-hero__title">Dehiwala — Where Colombo Meets Suburban Comfort</h1>
        <p className="page-hero__subtitle">A well-connected, established suburban location with strong residential demand and comprehensive social infrastructure.</p>
      </div></section>

      {/* Map placeholder */}
      <section className="section section--ivory">
        <div className="container">
          <div style={{ aspectRatio: '16/7', background: 'var(--color-warm-grey)', borderRadius: 'var(--radius-xl)', border: '2px dashed var(--color-warm-grey-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <span style={{ fontSize: '64px' }}>📍</span>
            <span className="text-overline">Preferred Dehiwala Search Area</span>
            <p className="text-body-sm text-muted" style={{ maxWidth: '400px', textAlign: 'center' }}>
              Interactive area-level map. Exact site location will be confirmed upon final land acquisition. No exact map pin is placed without a verified address.
            </p>
          </div>
        </div>
      </section>

      {/* Connectivity */}
      <section className="section">
        <div className="container">
          <p className="text-overline text-center">Connectivity</p>
          <h2 className="text-center heading-accent heading-accent--center" style={{ marginBottom: 'var(--space-12)' }}>Exceptional Access</h2>
          <div className="grid grid--3">
            {[
              { icon: '🛣️', title: 'Road Network', items: ['Galle Road — primary arterial', 'Marine Drive — coastal route', 'Southern Expressway links', 'Baseline Road access'] },
              { icon: '🚂', title: 'Rail & Transit', items: ['Colombo-Matara coastal railway', 'Multiple bus routes', 'Proposed Marine Drive extension toward Panadura'] },
              { icon: '📍', title: 'Nearby Areas', items: ['Wellawatte & Bambalapitiya', 'Colombo 05', 'Mount Lavinia & Ratmalana', 'Moratuwa', 'Nugegoda & Battaramulla'] },
            ].map((section, i) => (
              <div key={i} className="card">
                <div style={{ fontSize: '32px', marginBottom: 'var(--space-3)' }}>{section.icon}</div>
                <h4 style={{ marginBottom: 'var(--space-4)' }}>{section.title}</h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {section.items.map((item, j) => (
                    <li key={j} className="text-body-sm" style={{ paddingLeft: 'var(--space-4)', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, top: '6px', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-gold)' }}></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Amenities */}
      <section className="section section--ivory">
        <div className="container">
          <p className="text-overline text-center">Infrastructure</p>
          <h2 className="text-center heading-accent heading-accent--center" style={{ marginBottom: 'var(--space-12)' }}>Nearby Amenities</h2>
          <div className="grid grid--4">
            {[
              { icon: '🏥', label: 'Healthcare', desc: 'Kalubowila Teaching Hospital and multiple private medical facilities' },
              { icon: '🎓', label: 'Education', desc: 'Schools and educational institutions across all levels' },
              { icon: '🛒', label: 'Shopping', desc: 'Marine Drive commercial corridor, supermarkets, and retail' },
              { icon: '🏦', label: 'Banking', desc: 'Major banks and financial services within easy reach' },
              { icon: '🍽️', label: 'Dining', desc: 'Diverse restaurant and café scene' },
              { icon: '🚌', label: 'Transport', desc: 'Bus routes, railway stations, and expressway access' },
              { icon: '🌊', label: 'Leisure', desc: 'Mount Lavinia Beach, National Zoological Gardens' },
              { icon: '⛽', label: 'Services', desc: 'Fuel stations, utilities, and essential services' },
            ].map((a, i) => (
              <div key={i} className="card text-center">
                <div style={{ fontSize: '32px', marginBottom: 'var(--space-2)' }}>{a.icon}</div>
                <h5 style={{ marginBottom: 'var(--space-2)' }}>{a.label}</h5>
                <p className="text-caption text-muted">{a.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-disclaimer text-center" style={{ marginTop: 'var(--space-6)', borderLeft: 'none', maxWidth: '600px', margin: 'var(--space-6) auto 0' }}>
            Travel times are not published without verified mapping data or administrator input. Source and measurement date required before publishing area statistics.
          </p>
        </div>
      </section>

      {/* Proposed Nearby Roads */}
      <section className="section">
        <div className="container" style={{ maxWidth: '700px' }}>
          <h3 className="heading-accent" style={{ marginBottom: 'var(--space-6)' }}>Proposed Nearby Roads & Areas</h3>
          <div className="grid grid--3" style={{ gap: 'var(--space-3)' }}>
            {['Marine Drive', 'Kawdana Road', 'Hill Street', 'Galle Road', 'Kalubowila Road', 'Allen Avenue'].map(road => (
              <div key={road} className="card" style={{ padding: 'var(--space-3) var(--space-4)', textAlign: 'center' }}>
                <span className="text-sm">{road}</span>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: 'var(--space-10)' }}>
            <Link to="/contact" className="btn btn--primary btn--lg">Book a Site Visit</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Location;
