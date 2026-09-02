import { useEffect, useState } from 'react';
import api from '../api/axios';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';

const empty = { busNumber: '', route: '', capacity: '', status: 'active', conductor: '' };

export default function Buses() {
  const [buses, setBuses] = useState([]);
  const [conductors, setConductors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  const fetchAll = () => {
    setLoading(true);
    Promise.all([api.get('/buses'), api.get('/conductors')]).then(([b, c]) => {
      setBuses(b.data.data);
      setConductors(c.data.data);
    }).finally(() => setLoading(false));
  };

  useEffect(() => { fetchAll(); }, []);

  const openCreate = () => { setForm(empty); setEditId(null); setModalOpen(true); };
  const openEdit = (bus) => {
    setForm({
      busNumber: bus.busNumber,
      route: bus.route,
      capacity: bus.capacity,
      status: bus.status,
      conductor: bus.conductor?._id || '',
    });
    setEditId(bus._id);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, capacity: Number(form.capacity), conductor: form.conductor || undefined };
      if (editId) {
        await api.put(`/buses/${editId}`, payload);
        addToast('Bus updated successfully', 'success');
      } else {
        await api.post('/buses', payload);
        addToast('Bus added successfully', 'success');
      }
      setModalOpen(false);
      fetchAll();
    } catch (err) {
      addToast(err.response?.data?.message || 'Something went wrong', 'error');
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/buses/${deleteModal}`);
      addToast('Bus deleted', 'success');
      setDeleteModal(null);
      fetchAll();
    } catch (err) {
      addToast('Failed to delete bus', 'error');
    }
  };

  const statusBadge = (s) => {
    const map = { active: 'badge-active', inactive: 'badge-inactive', maintenance: 'badge-maintenance' };
    return <span className={`badge ${map[s]}`}><span className="badge-dot" />{s}</span>;
  };

  return (
    <div className="page-wrapper">
      <Toast toasts={toasts} removeToast={removeToast} />

      <div className="page-header">
        <div className="page-header-title">
          <h2>Bus Fleet</h2>
          <p>{buses.length} buses registered in the system</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          + Add Bus
        </button>
      </div>

      <div className="table-card">
        <div className="table-card-header">
          <div><h3>All Buses</h3><p>Full list of registered buses</p></div>
        </div>
        {loading ? (
          <div className="loading-wrapper"><div className="spinner" /><p>Loading buses...</p></div>
        ) : buses.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🚌</div>
            <h3>No buses found</h3>
            <p>Add your first bus to get started</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Bus Number</th>
                  <th>Route</th>
                  <th>Capacity</th>
                  <th>Conductor</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {buses.map((bus, i) => (
                  <tr key={bus._id}>
                    <td className="text-muted fs-13">{i + 1}</td>
                    <td><span className="fw-700 text-maroon">{bus.busNumber}</span></td>
                    <td>{bus.route}</td>
                    <td>{bus.capacity} seats</td>
                    <td>{bus.conductor ? (
                      <span className="fw-600">{bus.conductor.name}</span>
                    ) : <span style={{ color: 'var(--text-muted)' }}>Unassigned</span>}</td>
                    <td>{statusBadge(bus.status)}</td>
                    <td>
                      <div className="td-actions">
                        <button className="btn btn-outline btn-sm" onClick={() => openEdit(bus)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => setDeleteModal(bus._id)}>Delete</button>
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
        title={editId ? 'Edit Bus' : 'Add New Bus'}
        subtitle={editId ? 'Update bus information' : 'Register a new bus in the fleet'}
        icon="🚌"
        footer={
          <>
            <button className="btn btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={saving}>
              {saving ? 'Saving...' : editId ? 'Update Bus' : 'Add Bus'}
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Bus Number *</label>
              <input className="form-input" placeholder="e.g. BUS-001" required
                value={form.busNumber} onChange={e => setForm({ ...form, busNumber: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Capacity *</label>
              <input className="form-input" type="number" placeholder="e.g. 50" required min={1}
                value={form.capacity} onChange={e => setForm({ ...form, capacity: e.target.value })} />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Route *</label>
              <input className="form-input" placeholder="e.g. Colombo → Kandy" required
                value={form.route} onChange={e => setForm({ ...form, route: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-select" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Assign Conductor</label>
              <select className="form-select" value={form.conductor} onChange={e => setForm({ ...form, conductor: e.target.value })}>
                <option value="">— Unassigned —</option>
                {conductors.map(c => (
                  <option key={c._id} value={c._id}>{c.name} ({c.licenseNumber})</option>
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
        title="Delete Bus"
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
          Are you sure you want to permanently delete this bus from the fleet?
        </p>
      </Modal>
    </div>
  );
}

