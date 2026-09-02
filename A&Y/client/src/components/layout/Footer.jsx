import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__main container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <span className="footer__logo-mark">A&Y</span>
              <span className="footer__logo-sub">Consolidated (PVT) Ltd</span>
            </Link>
            <p className="footer__tagline">
              Connected Dehiwala living, designed around space, value, and everyday convenience.
            </p>
            <p className="footer__tagline-note text-disclaimer">
              This is a working direction, not a final slogan. All marketing copy is editable.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer__links">
            <h4 className="footer__heading">Explore</h4>
            <ul>
              <li><Link to="/project">Project Overview</Link></li>
              <li><Link to="/residences">Residences</Link></li>
              <li><Link to="/amenities">Amenities</Link></li>
              <li><Link to="/location">Location</Link></li>
              <li><Link to="/timeline">Timeline</Link></li>
            </ul>
          </div>

          <div className="footer__links">
            <h4 className="footer__heading">Investment</h4>
            <ul>
              <li><Link to="/market">Market Opportunity</Link></li>
              <li><Link to="/investor">Investor Overview</Link></li>
              <li><Link to="/about">About A&Y</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__contact">
            <h4 className="footer__heading">Contact</h4>
            <p>Dehiwala, Sri Lanka</p>
            <p>info@ayconsolidated.lk</p>
            <p>+94 XX XXX XXXX</p>
            <p className="text-caption text-muted" style={{ marginTop: '0.5rem' }}>
              Contact details are placeholder values. Configure in Admin CMS.
            </p>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container flex items-center justify-between flex-wrap gap-4">
          <p className="footer__copyright">
            © {currentYear} A&Y Consolidated (PVT) Ltd. All rights reserved.
          </p>
          <div className="footer__legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Use</Link>
            <Link to="/disclaimer">Investment Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
