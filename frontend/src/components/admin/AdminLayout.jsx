import { Link, useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Listings', path: '/admin/listings' },
  { label: 'Add Listing', path: '/admin/listings/new' },
  { label: 'Leads', path: '/admin/leads' }
];

export default function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f7fa' }}>
      <aside
        style={{
          width: '240px',
          background: '#0B3C5D',
          color: '#fff',
          padding: '24px 16px'
        }}
      >
        <h2 style={{ marginBottom: '24px' }}>Pocket Landz Admin</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                padding: '12px',
                borderRadius: '8px',
                textDecoration: 'none',
                color: '#fff',
                background: location.pathname === item.path ? '#2E8B57' : 'transparent'
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          style={{
            marginTop: '24px',
            width: '100%',
            padding: '12px',
            border: 'none',
            borderRadius: '8px',
            background: '#D9534F',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </aside>

      <main style={{ flex: 1, padding: '24px' }}>{children}</main>
    </div>
  );
}