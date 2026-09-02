import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { formatLKR, formatSqFt, getStatusClass } from '../../utils/formatters';
import './Home.css';

const Home = () => {
  const [units, setUnits] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [phases, setPhases] = useState([]);
  const [financials, setFinancials] = useState([]);
  const statsRef = useRef(null);
  const zoomSectionRef = useRef(null);
  const horizSectionRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [zoomProgress, setZoomProgress] = useState(0);
  const [horizProgress, setHorizProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [uRes, aRes, pRes, fRes] = await Promise.all([
          api.get('/units'),
          api.get('/amenities'),
          api.get('/timeline/phases'),
          api.get('/financials')
        ]);
        setUnits(uRes.data);
        setAmenities(aRes.data);
        setPhases(pRes.data);
        setFinancials(fRes.data);
      } catch (err) {
        console.error('Failed to load homepage data:', err);
      }
    };
    fetchData();
  }, []);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target === statsRef.current) setStatsVisible(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    if (statsRef.current) observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, [financials]);

  // Scroll listener for all scroll-driven animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const windowHeight = window.innerHeight;
      
      // Zoom Section (Walkthrough)
      if (zoomSectionRef.current) {
        const rect = zoomSectionRef.current.getBoundingClientRect();
        let progress = 0;
        if (rect.top <= 0) {
          progress = Math.abs(rect.top) / (rect.height - windowHeight);
        }
        setZoomProgress(Math.max(0, Math.min(1, progress)));
      }

      // Horizontal Scroll Section (Residences)
      if (horizSectionRef.current) {
        const rect = horizSectionRef.current.getBoundingClientRect();
        let progress = 0;
        if (rect.top <= 0) {
          progress = Math.abs(rect.top) / (rect.height - windowHeight);
        }
        setHorizProgress(Math.max(0, Math.min(1, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getMetric = (label) => {
    const m = financials.find(f => f.label === label);
    return m ? m.value : null;
  };

  const amenityIcons = {
    gym: '🏋️',
    rooftop: '🌇',
    security: '🔒',
    generator: '⚡',
    intercom: '📞',
    ac: '❄️',
    parking: '🅿️',
    water: '💧',
    default: '✦'
  };

  // Count-up animation
  const CountUp = ({ end, suffix = '', prefix = '', duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
      if (!statsVisible) return;
      const numEnd = parseFloat(String(end).replace(/[^0-9.]/g, ''));
      if (isNaN(numEnd)) { setCount(end); return; }

      let start = 0;
      const increment = numEnd / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= numEnd) {
          setCount(numEnd);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start * 100) / 100);
        }
      }, 16);
      return () => clearInterval(timer);
    }, [statsVisible, end, duration]);

    if (typeof end === 'string' && isNaN(parseFloat(end.replace(/[^0-9.]/g, '')))) {
      return <span>{end}</span>;
    }

    return <span>{prefix}{typeof count === 'number' ? count.toLocaleString('en-US', { maximumFractionDigits: 2 }) : count}{suffix}</span>;
  };

  // Show two unit types (first larger, first compact)
  const largerUnit = units.find(u => u.unitType === 'Larger 3-Bedroom');
  const compactUnit = units.find(u => u.unitType === 'Compact 3-Bedroom');

  return (
    <main id="main-content" className="home">
      {/* ═══ 1. Hero ═══ */}
      <section className="hero" aria-label="Hero">
        <div 
          className="hero__bg-image"
          style={{ 
            backgroundImage: 'url(/assets/apartment-exterior.jpg)',
            transform: `translateY(${scrollY * 0.4}px)` 
          }}
        />
        <div className="hero__overlay"></div>
        <div className="hero__content container">
          <p className="text-overline animate-fade-in-up">Proposed Residential Development — Dehiwala, Sri Lanka</p>
          <h1 className="hero__title animate-fade-in-up stagger-1">
            Where Thoughtful Space<br/>
            <span className="text-gold">Meets Connected Living</span>
          </h1>
          <p className="hero__subtitle animate-fade-in-up stagger-2">
            A proposed mid-to-upper-middle-income residential apartment development in the heart of Dehiwala.
            Ten spacious three-bedroom residences designed for modern families and discerning homebuyers.
          </p>
          <div className="hero__ctas animate-fade-in-up stagger-3">
            <Link to="/residences" className="btn btn--gold btn--lg">Explore the Residences</Link>
            <Link to="/contact" className="btn btn--ghost btn--lg">Request Information</Link>
          </div>
        </div>
        <div className="hero__scroll-indicator" aria-hidden="true">
          <span></span>
        </div>
      </section>

      {/* ═══ 1.5 Immersive Walkthrough ═══ */}
      <section className="camera-section" ref={zoomSectionRef} aria-label="Immersive Walkthrough">
        <div className="camera-sticky">
          <div 
            className="camera-image-wrapper"
            style={{ 
              transform: `scale(${1 + zoomProgress * 0.8})`,
            }}
          >
            <img 
              src="/assets/apartment-interior.jpg" 
              alt="Luxurious living room looking out to the city skyline" 
              className="camera-image" 
            />
          </div>
          
          <div 
            className="camera-overlay" 
            style={{ opacity: 1 - zoomProgress * 1.5 }}
          >
            <h2 className="camera-title text-white">Experience Space</h2>
            <p className="camera-subtitle text-white">Step into a living area crafted with exquisite detail and bathed in warm natural light.</p>
          </div>
        </div>
      </section>

      {/* ═══ 2. Project Snapshot ═══ */}
      <section className="section section--ivory" aria-label="Project snapshot">
        <div className="container">
          <div className="reveal">
            <p className="text-overline text-center">Project Snapshot</p>
            <h2 className="text-center heading-accent heading-accent--center" style={{ marginBottom: 'var(--space-12)' }}>
              The Development at a Glance
            </h2>
          </div>
          <div className="snapshot-grid reveal">
            {[
              { value: '14', label: 'Perches', sub: 'Proposed land requirement' },
              { value: 'G+5', label: 'Concept', sub: 'Development structure' },
              { value: '10', label: 'Apartments', sub: 'Three-bedroom residences' },
              { value: '2', label: 'Units/Floor', sub: 'Privacy by design' },
              { value: '1,425', label: 'sq. ft.', sub: 'Larger unit size' },
              { value: '1,273', label: 'sq. ft.', sub: 'Compact unit size' },
              { value: '36', label: 'Months', sub: 'Construction programme' },
              { value: '✓', label: 'Parking', sub: 'Subject to confirmation' },
            ].map((item, i) => (
              <div key={i} className="snapshot-card">
                <div className="snapshot-card__value">{item.value}</div>
                <div className="snapshot-card__label">{item.label}</div>
                <div className="snapshot-card__sub">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 3. Why Dehiwala ═══ */}
      <section className="section" aria-label="Why Dehiwala">
        <div className="container">
          <div className="why-dehiwala reveal">
            <div className="why-dehiwala__text">
              <p className="text-overline">Location</p>
              <h2 className="heading-accent">Why Dehiwala</h2>
              <p className="text-body-lg" style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
                Dehiwala offers an unmatched combination of urban connectivity, established social infrastructure, and enduring residential demand — making it one of Colombo's most sought-after suburban locations.
              </p>
              <ul className="why-dehiwala__features">
                <li><strong>Connectivity:</strong> Minutes from Galle Road, Marine Drive, Southern Expressway links, and the Colombo-Matara railway</li>
                <li><strong>Infrastructure:</strong> Schools, hospitals, banking, shopping, and dining within reach</li>
                <li><strong>Demand:</strong> Strong rental and owner-occupier demand from professionals, families, and expatriates</li>
                <li><strong>Value:</strong> More moderate land costs compared to central Colombo, with strong capital-value fundamentals</li>
                <li><strong>Constrained Supply:</strong> Limited available land drives sustained value for well-planned developments</li>
              </ul>
              <Link to="/location" className="btn btn--secondary" style={{ marginTop: 'var(--space-6)' }}>
                Discover Dehiwala →
              </Link>
            </div>
            <div className="why-dehiwala__visual">
              <div className="why-dehiwala__map-placeholder">
                <div className="why-dehiwala__map-inner">
                  <span className="text-overline">Preferred Dehiwala Search Area</span>
                  <p className="text-body-sm text-muted" style={{ marginTop: 'var(--space-2)' }}>
                    Interactive area map — exact site to be confirmed
                  </p>
                  <div className="why-dehiwala__map-pin">📍</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 4. Residence Preview (Horizontal Scroll) ═══ */}
      <section className="horiz-section" ref={horizSectionRef} aria-label="Residences preview">
        <div className="horiz-sticky">
          <div className="container" style={{ position: 'relative', zIndex: 2, paddingBottom: 'var(--space-8)' }}>
            <div className="reveal">
              <p className="text-overline text-center">Residences</p>
              <h2 className="text-center text-white heading-accent heading-accent--center">
                Two Thoughtfully Designed Floor Plans
              </h2>
            </div>
          </div>
          
          <div className="horiz-track-container">
            <div 
              className="horiz-track"
              style={{ transform: `translateX(-${horizProgress * 40}%)` }}
            >
              {/* Add a spacer item for visual padding */}
              <div className="horiz-spacer"></div>
              
              {[largerUnit, compactUnit].filter(Boolean).map((unit) => (
                <div key={unit._id || unit.unitId} className="unit-preview-card horiz-item">
                  <div className="unit-preview-card__header">
                    <span className={`badge ${getStatusClass(unit.status)}`}>{unit.status}</span>
                    <span className="unit-preview-card__type">{unit.unitType}</span>
                  </div>
                  <div className="unit-preview-card__visual">
                    <div className="unit-preview-card__plan-placeholder">
                      <span>Floor Plan</span>
                      <span className="text-caption">To be confirmed</span>
                    </div>
                  </div>
                  <div className="unit-preview-card__details">
                    <div className="unit-preview-card__specs">
                      <span>🛏 {unit.bedrooms} Bed</span>
                      <span>🚿 {unit.bathrooms} Bath</span>
                      <span>📐 {formatSqFt(unit.saleableArea)}</span>
                    </div>
                    <div className="unit-preview-card__price">
                      <span className="text-caption text-muted">Indicative price from</span>
                      <span className="unit-preview-card__price-value">{formatLKR(unit.basePrice, true)}</span>
                    </div>
                    <p className="text-disclaimer">
                      Indicative proposal price. Subject to confirmation.
                    </p>
                  </div>
                  <Link to="/residences" className="btn btn--gold btn--full" style={{ marginTop: 'var(--space-4)' }}>
                    View All Units
                  </Link>
                </div>
              ))}
              
              {/* Extra visual card to extend scroll */}
              <div className="unit-preview-card horiz-item horiz-item--cta">
                 <h3 className="text-white" style={{ marginBottom: 'var(--space-4)' }}>Explore the Inventory</h3>
                 <p className="text-body text-muted" style={{ marginBottom: 'var(--space-6)' }}>View all 10 available units, compare floor plans, and utilize our interactive mortgage calculator.</p>
                 <Link to="/residences" className="btn btn--primary btn--lg btn--full">Go to Residences →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 5. Amenities Preview ═══ */}
      <section className="section" aria-label="Amenities preview">
        <div className="container">
          <div className="reveal">
            <p className="text-overline text-center">Lifestyle</p>
            <h2 className="text-center heading-accent heading-accent--center" style={{ marginBottom: 'var(--space-12)' }}>
              Proposed Amenities & Conveniences
            </h2>
          </div>
          <div className="grid grid--4 reveal">
            {amenities.slice(0, 8).map((a) => (
              <div key={a._id} className="amenity-card">
                <span className="amenity-card__icon">{amenityIcons[a.icon] || amenityIcons.default}</span>
                <h4 className="amenity-card__name">{a.name}</h4>
                <span className={`badge ${getStatusClass(a.status)}`}>{a.status}</span>
              </div>
            ))}
          </div>
          <div className="text-center reveal" style={{ marginTop: 'var(--space-8)' }}>
            <Link to="/amenities" className="btn btn--secondary">View All Amenities →</Link>
          </div>
        </div>
      </section>

      {/* ═══ 6. Financial Snapshot ═══ */}
      <section className="section section--charcoal" aria-label="Investment snapshot" ref={statsRef}>
        <div className="container">
          <div className="reveal">
            <p className="text-overline text-center">Investment Snapshot</p>
            <h2 className="text-center heading-accent heading-accent--center" style={{ marginBottom: 'var(--space-4)', color: 'white' }}>
              Key Financial Projections
            </h2>
            <p className="text-center text-disclaimer" style={{ maxWidth: '700px', margin: '0 auto var(--space-12)', borderLeft: 'none', paddingLeft: 0, color: 'rgba(255,255,255,0.5)' }}>
              Illustrative projections based on proposal assumptions; subject to due diligence, final approvals, contracts, market conditions, tax treatment, and financing terms.
            </p>
          </div>
          <div className="grid grid--3 reveal" role="list" aria-label="Financial projections">
            {[
              { label: 'Projected Sales Revenue', value: 472.06, suffix: 'M', prefix: 'LKR ' },
              { label: 'Total Project Cost', value: 358.55, suffix: 'M', prefix: 'LKR ' },
              { label: 'Profit Before Tax/Finance', value: 113.50, suffix: 'M', prefix: 'LKR ' },
              { label: 'Gross Profit Margin', value: 24.05, suffix: '%', prefix: '~' },
              { label: 'Base-Case Loan-to-Cost', value: 18.74, suffix: '%', prefix: '' },
              { label: 'Project IRR (Detailed)', value: '21%–24%', suffix: '', prefix: '~' },
            ].map((stat, i) => (
              <div key={i} className="stat-card" role="listitem">
                <div className="stat-card__value" aria-label={`${stat.label}: ${stat.prefix}${stat.value}${stat.suffix}`}>
                  {typeof stat.value === 'number' ? (
                    <CountUp end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  ) : (
                    <span>{stat.prefix}{stat.value}</span>
                  )}
                </div>
                <div className="stat-card__label">{stat.label}</div>
                <div className="stat-card__disclaimer">Projection</div>
              </div>
            ))}
          </div>
          <div className="text-center reveal" style={{ marginTop: 'var(--space-8)' }}>
            <Link to="/investor" className="btn btn--gold">Full Financial Overview →</Link>
          </div>
        </div>
      </section>

      {/* ═══ 7. Timeline ═══ */}
      <section className="section section--ivory" aria-label="Development timeline">
        <div className="container">
          <div className="reveal">
            <p className="text-overline text-center">Progress</p>
            <h2 className="text-center heading-accent heading-accent--center" style={{ marginBottom: 'var(--space-12)' }}>
              36-Month Construction Programme
            </h2>
          </div>
          <div className="timeline reveal">
            {phases.map((phase) => (
              <div key={phase._id} className={`timeline-item timeline-item--${phase.status === 'In progress' ? 'active' : phase.status === 'Completed' ? 'complete' : ''}`}>
                <div className="timeline-item__title">Phase {phase.phaseNumber}: {phase.name}</div>
                <div className="timeline-item__meta">
                  {phase.durationMonths} months · {phase.costAllocationPercent}% of construction cost · {formatLKR(phase.approximateCost, true)}
                </div>
                <div className="flex items-center gap-3" style={{ marginTop: 'var(--space-2)' }}>
                  <span className={`badge ${getStatusClass(phase.status)}`}>{phase.status}</span>
                  {phase.progressPercent > 0 && (
                    <div className="progress-bar" style={{ flex: 1, maxWidth: '200px' }}>
                      <div className="progress-bar__fill" style={{ width: `${phase.progressPercent}%` }}
                        role="progressbar" aria-valuenow={phase.progressPercent} aria-valuemin="0" aria-valuemax="100"
                        aria-label={`${phase.name} progress: ${phase.progressPercent}%`}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center reveal" style={{ marginTop: 'var(--space-8)' }}>
            <Link to="/timeline" className="btn btn--secondary">Full Timeline & Updates →</Link>
          </div>
        </div>
      </section>

      {/* ═══ 8. Developer Credibility ═══ */}
      <section className="section" aria-label="About the developer">
        <div className="container">
          <div className="dev-credibility reveal">
            <div className="dev-credibility__text">
              <p className="text-overline">The Developer</p>
              <h2 className="heading-accent">A&Y Consolidated (PVT) Ltd</h2>
              <p className="text-body-lg" style={{ margin: 'var(--space-4) 0 var(--space-6)' }}>
                A Sri Lankan property development company focused on delivering quality residential projects that balance thoughtful design, solid construction, and strong value fundamentals.
              </p>
              <p className="text-body" style={{ marginBottom: 'var(--space-4)' }}>
                Management experience includes involvement in residential projects in Colombo and suburban areas.
              </p>
              <div className="alert alert--info" style={{ marginBottom: 'var(--space-6)' }}>
                <span>ℹ️</span>
                <div>
                  <strong>Evidence Pending:</strong> Claims regarding Kawdana Residence booking performance and Hill Street sales record require supporting evidence before publication. These will be displayed once verified and approved by the administrator.
                </div>
              </div>
              <Link to="/about" className="btn btn--secondary">About A&Y →</Link>
            </div>
            <div className="dev-credibility__stats">
              <div className="card card--bordered-gold">
                <div className="stat-card">
                  <div className="stat-card__value" style={{ color: 'var(--color-burgundy)' }}>Est.</div>
                  <div className="stat-card__label">Company registration and history to be confirmed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 9. CTA (Parallax) ═══ */}
      <section className="section cta-section" aria-label="Call to action">
        <div 
          className="cta-section__bg"
          style={{ backgroundImage: 'url(/assets/apartment-amenity.jpg)' }}
        ></div>
        <div className="hero__overlay" style={{ background: 'rgba(23, 23, 23, 0.8)', backdropFilter: 'blur(8px)' }}></div>
        <div className="container text-center" style={{ position: 'relative', zIndex: 2 }}>
          <div className="reveal">
            <p className="text-overline">Get Started</p>
            <h2 className="text-white" style={{ marginBottom: 'var(--space-4)' }}>
              Interested in A&Y Residences?
            </h2>
            <p className="text-body-lg" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto var(--space-8)' }}>
              Request a brochure, current pricing, or book a consultation with our team.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link to="/contact" className="btn btn--gold btn--lg">Request Brochure</Link>
              <Link to="/residences" className="btn btn--ghost btn--lg">View Availability</Link>
              <Link to="/investor" className="btn btn--ghost btn--lg">Investor Info</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
