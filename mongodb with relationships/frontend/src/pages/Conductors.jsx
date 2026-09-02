import { useEffect, useState } from 'react';
import api from '../api/axios';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';

const empty = { name: '', licenseNumber: '', phone: '', email: '', status: 'available', assignedBus: '' };

export default function Conductors() {
  const [conductors, setConductors] = useState([]);
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  const fetchAll = () => {
    setLoading(true);
    Promise.all([api.get('/conductors'), api.get('/buses')]).then(([c, b]) => {
      setConductors(c.data.data);
      setBuses(b.data.data);
    }).finally(() => setLoading(false));
  };

  useEffect(() => { fetchAll(); }, []);

  const openCreate = () => { setForm(empty); setEditId(null); setModalOpen(true); };
  const openEdit = (c) => {
    setForm({
      name: c.name, licenseNumber: c.licenseNumber, phone: c.phone,
      email: c.email || '', status: c.status, assignedBus: c.assignedBus?._id || '',
    });
    setEditId(c._id);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, assignedBus: form.assignedBus || undefined };
      if (editId) {
        await api.put(`/conductors/${editId}`, payload);
        addToast('Conductor updated successfully', 'success');
      } else {
        await api.post('/conductors', payload);
        addToast('Conductor added successfully', 'success');
      }
      setModalOpen(false);
      fetchAll();
    } catch (err) {
      addToast(err.response?.data?.message || 'Something went wrong', 'error');
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/conductors/${deleteModal}`);
      addToast('Conductor deleted', 'success');
      setDeleteModal(null);
      fetchAll();
    } catch { addToast('Failed to delete conductor', 'error'); }
  };

  const statusBadge = (s) => {
    const map = { available: 'badge-available', 'on-duty': 'badge-on-duty', 'off-duty': 'badge-off-duty' };
    return <span className={`badge ${map[s]}`}><span className="badge-dot" />{s}</span>;
  };

  return (
    <div className="page-wrapper">
      <Toast toasts={toasts} removeToast={removeToast} />

      <div className="page-header">
        <div className="page-header-title">
          <h2>Conductors</h2>
          <p>{conductors.length} conductors registered</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>+ Add Conductor</button>
      </div>

      <div className="table-card">
        <div className="table-card-header">
          <div><h3>All Conductors</h3><p>Staff roster and bus assignments</p></div>
        </div>
        {loading ? (
          <div className="loading-wrapper"><div className="spinner" /><p>Loading conductors...</p></div>
        ) : conductors.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">👤</div>
            <h3>No conductors found</h3>
            <p>Add your first conductor to get started</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>License Number</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Assigned Bus</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {conductors.map((c, i) => (
                  <tr key={c._id}>
                    <td className="fs-13" style={{ color: 'var(--text-muted)' }}>{i + 1}</td>
                    <td><span className="fw-700">{c.name}</span></td>
                    <td><span className="text-maroon fw-600">{c.licenseNumber}</span></td>
                    <td>{c.phone}</td>
                    <td>{c.email || <span style={{ color: 'var(--text-muted)' }}>—</span>}</td>
                    <td>{c.assignedBus ? (
                      <span className="fw-600">{c.assignedBus.busNumber} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({c.assignedBus.route})</span></span>
                    ) : <span style={{ color: 'var(--text-muted)' }}>Unassigned</span>}</td>
                    <td>{statusBadge(c.status)}</td>
                    <td>
                      <div className="td-actions">
                        <button className="btn btn-outline btn-sm" onClick={() => openEdit(c)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => setDeleteModal(c._id)}>Delete</button>
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
        title={editId ? 'Edit Conductor' : 'Add Conductor'}
        subtitle={editId ? 'Update conductor details' : 'Register a new conductor'}
        icon="👤"
        footer={
          <>
            <button className="btn btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={saving}>
              {saving ? 'Saving...' : editId ? 'Update' : 'Add Conductor'}
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group full-width">
              <label className="form-label">Full Name *</label>
              <input className="form-input" placeholder="e.g. Kamal Perera" required
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">License Number *</label>
              <input className="form-input" placeholder="e.g. LIC-20240001" required
                value={form.licenseNumber} onChange={e => setForm({ ...form, licenseNumber: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Phone *</label>
              <input className="form-input" placeholder="e.g. 0771234567" required
                value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" placeholder="e.g. kamal@example.com"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-select" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                <option value="available">Available</option>
                <option value="on-duty">On Duty</option>
                <option value="off-duty">Off Duty</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label className="form-label">Assign Bus</label>
              <select className="form-select" value={form.assignedBus} onChange={e => setForm({ ...form, assignedBus: e.target.value })}>
                <option value="">— Unassigned —</option>
                {buses.map(b => (
                  <option key={b._id} value={b._id}>{b.busNumber} — {b.route}</option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm */}
      <Modal
        isOpen={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        title="Delete Conductor"
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
          Are you sure you want to remove this conductor from the system?
        </p>
      </Modal>
    </div>
  );
}

