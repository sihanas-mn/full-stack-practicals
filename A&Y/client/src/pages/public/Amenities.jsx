import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { getStatusClass } from '../../utils/formatters';
import { Link } from 'react-router-dom';

const Amenities = () => {
  const [amenities, setAmenities] = useState([]);
  useEffect(() => { api.get('/amenities').then(res => setAmenities(res.data)); }, []);

  const icons = { gym: '🏋️', rooftop: '🌇', security: '🔒', generator: '⚡', intercom: '📞', ac: '❄️', parking: '🅿️', water: '💧', default: '✦' };

  return (
    <main id="main-content">
      <section className="page-hero page-hero--burgundy"><div className="container">
        <p className="text-overline">Lifestyle</p>
        <h1 className="page-hero__title">Amenities & Lifestyle</h1>
        <p className="page-hero__subtitle">Proposed amenities designed to complement modern apartment living with comfort, security, and convenience.</p>
      </div></section>

      <section className="section">
        <div className="container">
          <div className="alert alert--info" style={{ marginBottom: 'var(--space-8)' }}>
            <span>ℹ️</span>
            <div>Each amenity's status is managed through the CMS. Statuses reflect the current state: <strong>Proposed</strong>, <strong>Confirmed</strong>, <strong>Under construction</strong>, or <strong>Complete</strong>. No unconfirmed amenity is shown as delivered.</div>
          </div>
          <div className="grid grid--3">
            {amenities.map(a => (
              <div key={a._id} className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: 'var(--space-4)' }}>{icons[a.icon] || icons.default}</div>
                <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>{a.name}</h3>
                <p className="text-body-sm text-muted" style={{ marginBottom: 'var(--space-4)' }}>{a.description}</p>
                <span className={`badge ${getStatusClass(a.status)}`}>{a.status}</span>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: 'var(--space-10)' }}>
            <p className="text-muted" style={{ marginBottom: 'var(--space-4)' }}>
              Additional amenities such as smart parking, smart-home features, co-working spaces, rooftop garden, children's area, and energy-efficient features will be added if approved.
            </p>
            <Link to="/contact" className="btn btn--primary">Enquire About Amenities</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Amenities;
