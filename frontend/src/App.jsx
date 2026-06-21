import { Routes, Route, Navigate } from 'react-router-dom';
import LayoutPublico from './components/LayoutPublico.jsx';
import Home from './pages/Home.jsx';
import Elenco from './pages/Elenco.jsx';
import ListaEspera from './pages/ListaEspera.jsx';
import Inscricao from './pages/Inscricao.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import AtletasAdmin from './pages/admin/AtletasAdmin.jsx';
import ListaEsperaAdmin from './pages/admin/ListaEsperaAdmin.jsx';

// Rotas reais substituem o antigo "mostrar/esconder divs" com JavaScript.
export default function App() {
  return (
    <Routes>
      {/* Páginas públicas compartilham o layout (banner/menu/rodapé). */}
      <Route element={<LayoutPublico />}>
        <Route path="/" element={<Home />} />
        <Route path="/elenco" element={<Elenco />} />
        <Route path="/lista" element={<ListaEspera />} />
        <Route path="/inscricao" element={<Inscricao />} />
      </Route>

      {/* Login do admin tem tela própria (sem banner/rodapé). */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Painel administrativo (protegido pelo AdminLayout). */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/atletas" replace />} />
        <Route path="atletas" element={<AtletasAdmin />} />
        <Route path="lista" element={<ListaEsperaAdmin />} />
      </Route>
    </Routes>
  );
}
