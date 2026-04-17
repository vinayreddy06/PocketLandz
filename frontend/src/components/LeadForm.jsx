import { useState } from 'react';
import { api } from '../services/api';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  interest: ''
};

export default function LeadForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await api.createLead(form);
      setStatus({ type: 'success', message: response.message });
      setForm(initialForm);
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card lead-card" id="contact">
      <h2>Get Early Access</h2>
      <p className="muted">Collect leads from buyers and investors in your first version.</p>

      <form className="lead-form" onSubmit={handleSubmit}>
        <input placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input placeholder="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
        <input placeholder="Interested area or project" value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })} />
        <button className="button" type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Interest'}</button>
      </form>

      {status.message ? (
        <div className={`status-message ${status.type}`}>{status.message}</div>
      ) : null}
    </section>
  );
}
