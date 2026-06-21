import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate, Navigate } from 'react-router-dom';
import { api } from '../../api/client.js';
import '../../admin.css';

// Casca do painel: protege as rotas (checa o login via /auth/eu),
// mostra a barra lateral e renderiza a página atual no <Outlet />.
export default function AdminLayout() {
  const [auth, setAuth] = useState('checando'); // checando | ok | nao
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get('/auth/eu')
      .then((d) => {
        setAdmin(d.admin);
        setAuth('ok');
      })
      .catch(() => setAuth('nao'));
  }, []);

  if (auth === 'checando') {
    return (
      <div className="admin-shell" style={{ gridTemplateColumns: '1fr' }}>
        <div className="state" style={{ margin: 'auto' }}>
          Carregando painel...
        </div>
      </div>
    );
  }

  // Não autenticado -> manda para o login.
  if (auth === 'nao') return <Navigate to="/admin/login" replace />;

  async function sair() {
    await api.post('/auth/logout').catch(() => {});
    navigate('/admin/login');
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <img src="/images/cbbso-logo-512x512.png" alt="" />
          <div>
            <strong>CBBSO</strong>
            <span>Painel</span>
          </div>
        </div>

        <nav className="admin-nav">
          <NavLink to="/admin/atletas">Atletas</NavLink>
          <NavLink to="/admin/lista">Lista de espera</NavLink>
        </nav>

        <div className="admin-userbox">
          <p className="who">{admin?.nome || admin?.email}</p>
          <button
            className="btn btn-ghost btn-sm"
            onClick={sair}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Sair
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <Outlet />
      </div>
    </div>
  );
}
