import { useLocation } from 'react-router-dom';

const pageMeta = {
  '/': { title: 'Dashboard', subtitle: 'Overview of your fleet and operations' },
  '/buses': { title: 'Bus Fleet', subtitle: 'Manage all buses and routes' },
  '/conductors': { title: 'Conductors', subtitle: 'Manage conductor staff and assignments' },
  '/passengers': { title: 'Passengers', subtitle: 'Manage passenger records' },
  '/tickets': { title: 'Tickets', subtitle: 'Manage ticket bookings and reservations' },
};

export default function Topbar() {
  const location = useLocation();
  const meta = pageMeta[location.pathname] || { title: 'FleetConnect', subtitle: '' };
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1>{meta.title}</h1>
        <p>{meta.subtitle}</p>
      </div>
      <div className="topbar-right">
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{dateStr}</span>
        <div className="topbar-badge">
          <span className="status-dot" />
          <span>Connected to DB</span>
        </div>
      </div>
    </header>
  );
}

