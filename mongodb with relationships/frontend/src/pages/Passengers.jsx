import { useEffect, useState } from 'react';
import api from '../api/axios';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';

const empty = { name: '', phone: '', email: '', address: '', age: '', gender: '' };

export default function Passengers() {
  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(null);
  const [viewModal, setViewModal] = useState(null); // { passenger, tickets }
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  const fetchAll = () => {
    setLoading(true);
    api.get('/passengers').then(r => setPassengers(r.data.data)).finally(() => setLoading(false));
  };

  useEffect(() => { fetchAll(); }, []);

  const openCreate = () => { setForm(empty); setEditId(null); setModalOpen(true); };
  const openEdit = (p) => {
    setForm({ name: p.name, phone: p.phone, email: p.email || '', address: p.address || '', age: p.age || '', gender: p.gender || '' });
    setEditId(p._id);
    setModalOpen(true);
  };

  const openView = async (p) => {
    const res = await api.get(`/passengers/${p._id}`);
    setViewModal(res.data.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, age: form.age ? Number(form.age) : undefined };
      if (editId) {
        await api.put(`/passengers/${editId}`, payload);
        addToast('Passenger updated', 'success');
      } else {
        await api.post('/passengers', payload);
        addToast('Passenger added', 'success');
      }
      setModalOpen(false);
      fetchAll();
    } catch (err) {
      addToast(err.response?.data?.message || 'Something went wrong', 'error');
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/passengers/${deleteModal}`);
      addToast('Passenger deleted', 'success');
      setDeleteModal(null);
      fetchAll();
    } catch { addToast('Failed to delete', 'error'); }
  };

  const ticketStatusBadge = (s) => {
    const map = { booked: 'badge-booked', cancelled: 'badge-cancelled', completed: 'badge-completed' };
    return <span className={`badge ${map[s]}`}><span className="badge-dot" />{s}</span>;
  };

  return (
    <div className="page-wrapper">
      <Toast toasts={toasts} removeToast={removeToast} />

      <div className="page-header">
        <div className="page-header-title">
          <h2>Passengers</h2>
          <p>{passengers.length} passengers registered</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>+ Add Passenger</button>
      </div>

      <div className="table-card">
        <div className="table-card-header">
          <div><h3>All Passengers</h3><p>Complete passenger registry</p></div>
        </div>
        {loading ? (
          <div className="loading-wrapper"><div className="spinner" /><p>Loading passengers...</p></div>
        ) : passengers.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">👥</div>
            <h3>No passengers found</h3>
            <p>Register your first passenger</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {passengers.map((p, i) => (
                  <tr key={p._id}>
                    <td className="fs-13" style={{ color: 'var(--text-muted)' }}>{i + 1}</td>
                    <td><span className="fw-700">{p.name}</span></td>
                    <td>{p.phone}</td>
                    <td>{p.email || <span style={{ color: 'var(--text-muted)' }}>—</span>}</td>
                    <td>{p.address || <span style={{ color: 'var(--text-muted)' }}>—</span>}</td>
                    <td>{p.age || <span style={{ color: 'var(--text-muted)' }}>—</span>}</td>
                    <td>{p.gender ? <span style={{ textTransform: 'capitalize' }}>{p.gender}</span> : <span style={{ color: 'var(--text-muted)' }}>—</span>}</td>
                    <td>
                      <div className="td-actions">
                        <button className="btn btn-gold btn-sm" onClick={() => openView(p)}>Tickets</button>
                        <button className="btn btn-outline btn-sm" onClick={() => openEdit(p)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => setDeleteModal(p._id)}>Delete</button>
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
        title={editId ? 'Edit Passenger' : 'Add Passenger'}
        subtitle={editId ? 'Update passenger details' : 'Register a new passenger'}
        icon="👥"
        footer={
          <>
            <button className="btn btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={saving}>
              {saving ? 'Saving...' : editId ? 'Update' : 'Add Passenger'}
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group full-width">
              <label className="form-label">Full Name *</label>
              <input className="form-input" placeholder="e.g. Nimal Silva" required
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Phone *</label>
              <input className="form-input" placeholder="e.g. 0712345678" required
                value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" placeholder="e.g. nimal@email.com"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Age</label>
              <input className="form-input" type="number" placeholder="e.g. 28" min={0}
                value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Gender</label>
              <select className="form-select" value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}>
                <option value="">— Select —</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label className="form-label">Address</label>
              <input className="form-input" placeholder="e.g. 42 Main St, Colombo"
                value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
            </div>
          </div>
        </form>
      </Modal>

      {/* View Tickets Modal */}
      <Modal
        isOpen={!!viewModal}
        onClose={() => setViewModal(null)}
        title={`${viewModal?.passenger?.name}'s Tickets`}
        subtitle={`${viewModal?.tickets?.length || 0} ticket(s) found`}
        icon="🎫"
        footer={<button className="btn btn-outline" onClick={() => setViewModal(null)}>Close</button>}
      >
        {viewModal?.tickets?.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🎫</div>
            <h3>No tickets yet</h3>
            <p>This passenger has no booked tickets</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Ticket #</th>
                  <th>Bus</th>
                  <th>From → To</th>
                  <th>Fare</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {viewModal?.tickets?.map(t => (
                  <tr key={t._id}>
                    <td className="fw-700 text-maroon">{t.ticketNumber}</td>
                    <td>{t.bus?.busNumber || '—'}</td>
                    <td>{t.from} → {t.to}</td>
                    <td className="fw-600">LKR {t.fare}</td>
                    <td>{ticketStatusBadge(t.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Modal>

      {/* Delete Confirm */}
      <Modal
        isOpen={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        title="Delete Passenger"
        subtitle="This action cannot be undone"
        icon="⚠️"
        footer={
          <>
            <button className="btn btn-outline" onClick={() => setDeleteModal(null)}>Cancel</button>
            <button className="btn btn-danger" onClick={handleDelete}>Yes, Delete</button>
          </>
        }
      >
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
          Are you sure you want to remove this passenger from the system?
        </p>
      </Modal>
    </div>
  );
}

