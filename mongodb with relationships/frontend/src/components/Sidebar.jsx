import { NavLink, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Dashboard', icon: '▦', exact: true },
  { to: '/buses', label: 'Buses', icon: '🚌' },
  { to: '/conductors', label: 'Conductors', icon: '👤' },
  { to: '/passengers', label: 'Passengers', icon: '👥' },
  { to: '/tickets', label: 'Tickets', icon: '🎫' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">🚌</div>
        <div className="sidebar-logo-text">
          <span>FleetConnect</span>
          <span>Bus Management</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-label">Main Menu</div>
        {navItems.map(item => {
          const isActive = item.exact
            ? location.pathname === item.to
            : location.pathname.startsWith(item.to);
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`nav-item${isActive ? ' active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <p className="sidebar-footer-text">© 2024 FleetConnect v1.0</p>
      </div>
    </aside>
  );
}

