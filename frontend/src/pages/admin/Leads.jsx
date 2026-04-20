import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { api } from '../../services/api';

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getAdminLeads()
      .then(setLeads)
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout>
      <h1 style={{ marginBottom: '20px' }}>Leads</h1>

      {loading ? (
        <p>Loading leads...</p>
      ) : (
        <div style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#0B3C5D', color: '#fff' }}>
              <tr>
                <th style={{ padding: '12px' }}>Name</th>
                <th style={{ padding: '12px' }}>Email</th>
                <th style={{ padding: '12px' }}>Phone</th>
                <th style={{ padding: '12px' }}>Interest</th>
                <th style={{ padding: '12px' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map(lead => (
                <tr key={lead.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}>{lead.name}</td>
                  <td style={{ padding: '12px' }}>{lead.email}</td>
                  <td style={{ padding: '12px' }}>{lead.phone}</td>
                  <td style={{ padding: '12px' }}>{lead.interest}</td>
                  <td style={{ padding: '12px' }}>{lead.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}