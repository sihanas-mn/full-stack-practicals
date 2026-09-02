import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [stats, setStats] = useState({ buses: 0, conductors: 0, passengers: 0, tickets: 0 });
  const [recentTickets, setRecentTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      api.get('/buses'),
      api.get('/conductors'),
      api.get('/passengers'),
      api.get('/tickets'),
    ]).then(([b, c, p, t]) => {
      setStats({
        buses: b.data.count,
        conductors: c.data.count,
        passengers: p.data.count,
        tickets: t.data.count,
      });
      setRecentTickets(t.data.data.slice(0, 6));
    }).finally(() => setLoading(false));
  }, []);

  const statCards = [
    { label: 'Total Buses', value: stats.buses, icon: '🚌', color: '#8D1B3D' },
    { label: 'Conductors', value: stats.conductors, icon: '👤', color: '#C4A35A' },
    { label: 'Passengers', value: stats.passengers, icon: '👥', color: '#1e40af' },
    { label: 'Tickets Issued', value: stats.tickets, icon: '🎫', color: '#166534' },
  ];

  const statusBadge = (status) => {
    const map = { booked: 'badge-booked', cancelled: 'badge-cancelled', completed: 'badge-completed' };
    return <span className={`badge ${map[status] || 'badge-booked'}`}><span className="badge-dot" />{status}</span>;
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="page-header-title">
          <h2>Welcome back 👋</h2>
          <p>Here's an overview of your fleet operations today.</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="stats-grid">
        {statCards.map(card => (
          <div className="stat-card" key={card.label}>
            <div className="stat-card-icon" style={{ background: `${card.color}15` }}>
              <span style={{ fontSize: 22 }}>{card.icon}</span>
            </div>
            <div className="stat-card-value">
              {loading ? '—' : card.value}
            </div>
            <div className="stat-card-label">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        {/* Recent Tickets */}
        <div className="recent-table-card">
          <div className="table-card-header">
            <div>
              <h3>Recent Tickets</h3>
              <p>Latest bookings across the fleet</p>
            </div>
            <button className="btn btn-outline btn-sm" onClick={() => navigate('/tickets')}>
              View All →
            </button>
          </div>
          {loading ? (
            <div className="loading-wrapper"><div className="spinner" /><p>Loading...</p></div>
          ) : recentTickets.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🎫</div>
              <h3>No tickets yet</h3>
              <p>Book your first ticket to get started</p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Ticket #</th>
                    <th>Passenger</th>
                    <th>Bus</th>
                    <th>Route</th>
                    <th>Fare</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTickets.map(t => (
                    <tr key={t._id}>
                      <td><span className="fw-600 text-maroon">{t.ticketNumber}</span></td>
                      <td>{t.passenger?.name || '—'}</td>
                      <td>{t.bus?.busNumber || '—'}</td>
                      <td>{t.from} → {t.to}</td>
                      <td className="fw-600">LKR {t.fare}</td>
                      <td>{statusBadge(t.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="activity-card">
          <div className="activity-card-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="activity-list">
            {[
              { label: 'Add New Bus', icon: '🚌', path: '/buses' },
              { label: 'Register Conductor', icon: '👤', path: '/conductors' },
              { label: 'Add Passenger', icon: '👥', path: '/passengers' },
              { label: 'Book a Ticket', icon: '🎫', path: '/tickets' },
            ].map(a => (
              <div
                key={a.label}
                className="activity-item"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(a.path)}
              >
                <div className="activity-dot" />
                <div>
                  <div className="activity-text fw-600">{a.icon} {a.label}</div>
                  <div className="activity-time">Click to navigate →</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

