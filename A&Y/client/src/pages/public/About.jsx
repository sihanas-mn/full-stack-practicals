import { Link } from 'react-router-dom';

const About = () => {
  return (
    <main id="main-content">
      <section className="page-hero page-hero--burgundy"><div className="container">
        <p className="text-overline">Company</p>
        <h1 className="page-hero__title">About A&Y Consolidated</h1>
        <p className="page-hero__subtitle">A Sri Lankan property development company committed to quality residential projects.</p>
      </div></section>

      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-12)', alignItems: 'start' }}>
            <div>
              <p className="text-overline">Our Story</p>
              <h2 className="heading-accent" style={{ marginBottom: 'var(--space-6)' }}>Building With Purpose</h2>
              <p className="text-body-lg" style={{ marginBottom: 'var(--space-4)' }}>
                A&Y Consolidated (PVT) Ltd is a Sri Lankan property development company focused on delivering residential projects that balance thoughtful design, solid construction, and strong value fundamentals.
              </p>
              <p className="text-body" style={{ marginBottom: 'var(--space-4)' }}>
                Our approach combines careful market analysis with disciplined financial management, ensuring that every project serves both homebuyers seeking quality living spaces and investors seeking sound returns.
              </p>
              <p className="text-body" style={{ marginBottom: 'var(--space-6)' }}>
                With the proposed Dehiwala development, A&Y Consolidated brings together experienced management, proven suburban market understanding, and a commitment to transparent stakeholder communication.
              </p>
            </div>
            <div>
              <div className="card card--bordered-gold">
                <h4 style={{ marginBottom: 'var(--space-4)' }}>Company Details</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  <div><span className="text-caption text-muted" style={{ display: 'block' }}>Legal Name</span><strong>A&Y Consolidated (PVT) Ltd</strong></div>
                  <div><span className="text-caption text-muted" style={{ display: 'block' }}>Registration</span><span>To be confirmed</span></div>
                  <div><span className="text-caption text-muted" style={{ display: 'block' }}>Type</span><span>Private Limited Company</span></div>
                  <div><span className="text-caption text-muted" style={{ display: 'block' }}>Sector</span><span>Property Development</span></div>
                  <div><span className="text-caption text-muted" style={{ display: 'block' }}>Location</span><span>Sri Lanka</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section section--ivory">
        <div className="container">
          <p className="text-overline text-center">Our Values</p>
          <h2 className="text-center heading-accent heading-accent--center" style={{ marginBottom: 'var(--space-12)' }}>What Drives Us</h2>
          <div className="grid grid--4">
            {[
              { icon: '🏗️', title: 'Quality Construction', desc: 'Every project is built to last, with experienced consultants and rigorous quality inspections.' },
              { icon: '📊', title: 'Financial Discipline', desc: 'Conservative assumptions, transparent projections, and prudent risk management.' },
              { icon: '🤝', title: 'Stakeholder Trust', desc: 'Honest communication with buyers, investors, banks, and partners at every stage.' },
              { icon: '📐', title: 'Thoughtful Design', desc: 'Spaces designed for real families — functional, comfortable, and well-proportioned.' },
            ].map((v, i) => (
              <div key={i} className="card text-center">
                <div style={{ fontSize: '40px', marginBottom: 'var(--space-4)' }}>{v.icon}</div>
                <h4 style={{ marginBottom: 'var(--space-2)' }}>{v.title}</h4>
                <p className="text-body-sm text-muted">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evidence Note */}
      <section className="section">
        <div className="container" style={{ maxWidth: '700px' }}>
          <div className="alert alert--info">
            <span>ℹ️</span>
            <div>
              <strong>Track Record — Evidence Pending</strong><br/>
              The proposal references performance of Kawdana Residence and Hill Street projects. These claims require supporting evidence before publication and will be displayed once verified and approved by the administrator.
            </div>
          </div>
          <div className="text-center" style={{ marginTop: 'var(--space-8)' }}>
            <Link to="/contact" className="btn btn--primary btn--lg">Get in Touch</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
