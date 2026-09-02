import { useEffect, useState } from 'react';
import api from '../api/axios';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';

const today = new Date().toISOString().split('T')[0];
const empty = { ticketNumber: '', passenger: '', bus: '', from: '', to: '', fare: '', travelDate: today, seatNumber: '', status: 'booked' };

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState('all');
  const { toasts, addToast, removeToast } = useToast();

  const fetchAll = () => {
    setLoading(true);
    Promise.all([api.get('/tickets'), api.get('/passengers'), api.get('/buses')]).then(([t, p, b]) => {
      setTickets(t.data.data);
      setPassengers(p.data.data);
      setBuses(b.data.data);
    }).finally(() => setLoading(false));
  };

  useEffect(() => { fetchAll(); }, []);

  const autoTicketNumber = () => `TKT-${Date.now().toString().slice(-6)}`;

  const openCreate = () => {
    setForm({ ...empty, ticketNumber: autoTicketNumber() });
    setEditId(null);
    setModalOpen(true);
  };

  const openEdit = (t) => {
    setForm({
      ticketNumber: t.ticketNumber,
      passenger: t.passenger?._id || '',
      bus: t.bus?._id || '',
      from: t.from,
      to: t.to,
      fare: t.fare,
      travelDate: t.travelDate?.split('T')[0] || today,
      seatNumber: t.seatNumber || '',
      status: t.status,
    });
    setEditId(t._id);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, fare: Number(form.fare) };
      if (editId) {
        await api.put(`/tickets/${editId}`, payload);
        addToast('Ticket updated', 'success');
      } else {
        await api.post('/tickets', payload);
        addToast('Ticket booked successfully', 'success');
      }
      setModalOpen(false);
      fetchAll();
    } catch (err) {
      addToast(err.response?.data?.message || 'Something went wrong', 'error');
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/tickets/${deleteModal}`);
      addToast('Ticket cancelled', 'success');
      setDeleteModal(null);
      fetchAll();
    } catch { addToast('Failed to cancel ticket', 'error'); }
  };

  const statusBadge = (s) => {
    const map = { booked: 'badge-booked', cancelled: 'badge-cancelled', completed: 'badge-completed' };
    return <span className={`badge ${map[s]}`}><span className="badge-dot" />{s}</span>;
  };

  const filtered = filter === 'all' ? tickets : tickets.filter(t => t.status === filter);

  const totalFare = filtered.reduce((sum, t) => sum + (t.fare || 0), 0);

  return (
    <div className="page-wrapper">
      <Toast toasts={toasts} removeToast={removeToast} />

      <div className="page-header">
        <div className="page-header-title">
          <h2>Tickets</h2>
          <p>{tickets.length} total tickets · Total fare: LKR {totalFare.toLocaleString()}</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>+ Book Ticket</button>
      </div>

      {/* Filter Bar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {['all', 'booked', 'completed', 'cancelled'].map(f => (
          <button
            key={f}
            className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-outline'}`}
            style={{ textTransform: 'capitalize' }}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All Tickets' : f}
          </button>
        ))}
      </div>

      <div className="table-card">
        <div className="table-card-header">
          <div>
            <h3>{filter === 'all' ? 'All Tickets' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Tickets`}</h3>
            <p>{filtered.length} ticket(s) found</p>
          </div>
        </div>
        {loading ? (
          <div className="loading-wrapper"><div className="spinner" /><p>Loading tickets...</p></div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🎫</div>
            <h3>No tickets found</h3>
            <p>{filter !== 'all' ? `No ${filter} tickets` : 'Book your first ticket'}</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Ticket #</th>
                  <th>Passenger</th>
                  <th>Bus</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Seat</th>
                  <th>Travel Date</th>
                  <th>Fare</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t, i) => (
                  <tr key={t._id}>
                    <td className="fs-13" style={{ color: 'var(--text-muted)' }}>{i + 1}</td>
                    <td><span className="fw-700 text-maroon">{t.ticketNumber}</span></td>
                    <td><span className="fw-600">{t.passenger?.name || '—'}</span>
                      {t.passenger?.phone && <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t.passenger.phone}</div>}
                    </td>
                    <td>
                      <span className="fw-600">{t.bus?.busNumber || '—'}</span>
                      {t.bus?.route && <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t.bus.route}</div>}
                    </td>
                    <td>{t.from}</td>
                    <td>{t.to}</td>
                    <td>{t.seatNumber || <span style={{ color: 'var(--text-muted)' }}>—</span>}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>{new Date(t.travelDate).toLocaleDateString()}</td>
                    <td><span className="fw-700 text-gold">LKR {t.fare?.toLocaleString()}</span></td>
                    <td>{statusBadge(t.status)}</td>
                    <td>
                      <div className="td-actions">
                        <button className="btn btn-outline btn-sm" onClick={() => openEdit(t)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => setDeleteModal(t._id)}>Cancel</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editId ? 'Edit Ticket' : 'Book Ticket'}
        subtitle={editId ? 'Update ticket information' : 'Create a new passenger ticket'}
        icon="🎫"
        footer={
          <>
            <button className="btn btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={saving}>
              {saving ? 'Saving...' : editId ? 'Update Ticket' : 'Book Ticket'}
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Ticket Number *</label>
              <input className="form-input" placeholder="e.g. TKT-001" required
                value={form.ticketNumber} onChange={e => setForm({ ...form, ticketNumber: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Seat Number</label>
              <input className="form-input" placeholder="e.g. A12"
                value={form.seatNumber} onChange={e => setForm({ ...form, seatNumber: e.target.value })} />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Passenger *</label>
              <select className="form-select" required value={form.passenger} onChange={e => setForm({ ...form, passenger: e.target.value })}>
                <option value="">— Select Passenger —</option>
                {passengers.map(p => (
                  <option key={p._id} value={p._id}>{p.name} — {p.phone}</option>
                ))}
              </select>
            </div>
            <div className="form-group full-width">
              <label className="form-label">Bus *</label>
              <select className="form-select" required value={form.bus} onChange={e => setForm({ ...form, bus: e.target.value })}>
                <option value="">— Select Bus —</option>
                {buses.map(b => (
                  <option key={b._id} value={b._id}>{b.busNumber} — {b.route}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">From (Departure) *</label>
              <input className="form-input" placeholder="e.g. Colombo" required
                value={form.from} onChange={e => setForm({ ...form, from: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">To (Destination) *</label>
              <input className="form-input" placeholder="e.g. Kandy" required
                value={form.to} onChange={e => setForm({ ...form, to: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Fare (LKR) *</label>
              <input className="form-input" type="number" placeholder="e.g. 350" required min={0}
                value={form.fare} onChange={e => setForm({ ...form, fare: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Travel Date *</label>
              <input className="form-input" type="date" required
                value={form.travelDate} onChange={e => setForm({ ...form, travelDate: e.target.value })} />
            </div>
            {editId && (
              <div className="form-group full-width">
                <label className="form-label">Status</label>
                <select className="form-select" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                  <option value="booked">Booked</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            )}
          </div>
        </form>
      </Modal>

      {/* Delete Confirm */}
      <Modal
        isOpen={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        title="Cancel Ticket"
        subtitle="This will delete the ticket record"
        icon="⚠️"
        footer={
          <>
            <button className="btn btn-outline" onClick={() => setDeleteModal(null)}>Go Back</button>
            <button className="btn btn-danger" onClick={handleDelete}>Yes, Cancel Ticket</button>
          </>
        }
      >
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
          Are you sure you want to cancel and remove this ticket?
        </p>
      </Modal>
    </div>
  );
}

