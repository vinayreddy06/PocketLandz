import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { api } from '../../services/api';

const initialForm = {
  projectName: '',
  company: '',
  area: '',
  approval: 'HMDA',
  plotSize: '',
  pricePerSqYd: '',
  totalPrice: '',
  distance: '',
  verified: false
};

export default function ListingForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEdit) return;

    api.getAdminListingById(id).then(data => {
      setForm({
        projectName: data.projectName || '',
        company: data.company || '',
        area: data.area || '',
        approval: data.approval || 'HMDA',
        plotSize: data.plotSize || '',
        pricePerSqYd: data.pricePerSqYd || '',
        totalPrice: data.totalPrice || '',
        distance: data.distance || '',
        verified: Boolean(data.verified)
      });
    });
  }, [id, isEdit]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      pricePerSqYd: Number(form.pricePerSqYd),
      totalPrice: Number(form.totalPrice)
    };

    try {
      if (isEdit) {
        await api.updateAdminListing(id, payload);
      } else {
        await api.createAdminListing(payload);
      }
      navigate('/admin/listings');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminLayout>
      <h1 style={{ marginBottom: '20px' }}>{isEdit ? 'Edit Listing' : 'Add Listing'}</h1>

      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '24px', borderRadius: '12px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '16px' }}>
          <input name="projectName" placeholder="Project Name" value={form.projectName} onChange={handleChange} required style={{ padding: '12px' }} />
          <input name="company" placeholder="Company" value={form.company} onChange={handleChange} required style={{ padding: '12px' }} />
          <input name="area" placeholder="Area" value={form.area} onChange={handleChange} required style={{ padding: '12px' }} />
          <select name="approval" value={form.approval} onChange={handleChange} style={{ padding: '12px' }}>
            <option value="HMDA">HMDA</option>
            <option value="DTCP">DTCP</option>
            <option value="GHMC">GHMC</option>
          </select>
          <input name="plotSize" placeholder="Plot Size" value={form.plotSize} onChange={handleChange} required style={{ padding: '12px' }} />
          <input name="pricePerSqYd" placeholder="Price Per Sq Yd" value={form.pricePerSqYd} onChange={handleChange} required style={{ padding: '12px' }} />
          <input name="totalPrice" placeholder="Total Price" value={form.totalPrice} onChange={handleChange} required style={{ padding: '12px' }} />
          <input name="distance" placeholder="Distance / Landmark" value={form.distance} onChange={handleChange} required style={{ padding: '12px' }} />
        </div>

        <label style={{ display: 'block', marginTop: '16px' }}>
          <input type="checkbox" name="verified" checked={form.verified} onChange={handleChange} /> Verified
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: '20px', background: '#0B3C5D', color: '#fff', padding: '12px 18px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          {loading ? 'Saving...' : isEdit ? 'Update Listing' : 'Create Listing'}
        </button>
      </form>
    </AdminLayout>
  );
}