import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Residences', path: '/residences' },
    {
      label: 'Explore',
      children: [
        { label: 'Project Overview', path: '/project' },
        { label: 'Amenities & Lifestyle', path: '/amenities' },
        { label: 'Dehiwala Location', path: '/location' },
        { label: 'Timeline & Updates', path: '/timeline' },
      ]
    },
    {
      label: 'Investment',
      children: [
        { label: 'Market Opportunity', path: '/market' },
        { label: 'Investor Overview', path: '/investor' },
      ]
    },
    {
      label: 'Company',
      children: [
        { label: 'About A&Y', path: '/about' },
        { label: 'FAQ', path: '/faq' },
      ]
    },
    { label: 'Contact', path: '/contact' },
  ];

  const toggleDropdown = (label) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`} role="banner">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="header__inner container">
        <Link to="/" className="header__logo" aria-label="A&Y Consolidated - Home">
          <span className="header__logo-mark">A&Y</span>
          <span className="header__logo-text">Consolidated</span>
        </Link>

        <nav className={`header__nav ${mobileOpen ? 'header__nav--open' : ''}`} role="navigation" aria-label="Main navigation">
          <ul className="header__menu">
            {navItems.map((item) => (
              <li key={item.label} className={`header__menu-item ${item.children ? 'has-dropdown' : ''}`}>
                {item.children ? (
                  <>
                    <button
                      className={`header__menu-link header__dropdown-trigger ${activeDropdown === item.label ? 'active' : ''}`}
                      onClick={() => toggleDropdown(item.label)}
                      aria-expanded={activeDropdown === item.label}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <svg className="header__chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <ul className={`header__dropdown ${activeDropdown === item.label ? 'header__dropdown--open' : ''}`} role="menu">
                      {item.children.map((child) => (
                        <li key={child.path} role="none">
                          <Link to={child.path} className="header__dropdown-link" role="menuitem">
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`header__menu-link ${location.pathname === item.path ? 'header__menu-link--active' : ''}`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <Link to="/contact" className="btn btn--primary btn--sm header__cta">
            Request Info
          </Link>
          <button
            className={`header__burger ${mobileOpen ? 'header__burger--open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
