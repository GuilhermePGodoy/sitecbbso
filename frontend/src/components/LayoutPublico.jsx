import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Banner from './Banner.jsx';
import MenuLateral from './MenuLateral.jsx';
import Footer from './Footer.jsx';

// Estrutura comum das páginas públicas: banner + menu lateral + rodapé,
// com a página atual renderizada no <Outlet />.
export default function LayoutPublico() {
  const [menuAberto, setMenuAberto] = useState(false);

  // Fecha o menu ao apertar Esc (paridade com o site original).
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setMenuAberto(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="grid-container">
      <MenuLateral aberto={menuAberto} fechar={() => setMenuAberto(false)} />
      <Banner abrirMenu={() => setMenuAberto(true)} />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
