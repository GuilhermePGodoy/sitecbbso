import { NavLink } from 'react-router-dom';

// Menu lateral deslizante + overlay escuro. O estado (aberto/fechado)
// é controlado pelo LayoutPublico.
export default function MenuLateral({ aberto, fechar }) {
  return (
    <>
      <div
        id="overlay-menu"
        className={aberto ? 'ativo' : ''}
        onClick={fechar}
      ></div>

      <nav id="menu-lateral" className={aberto ? 'ativo' : ''}>
        <div className="menu-topo">
          <div className="menu-brand">
            <img src="/images/cbbso-logo-512x512.png" alt="" />
            <div className="menu-brand-texto">
              <strong>Vôlei CBBSO</strong>
              <span>Menu</span>
            </div>
          </div>
          <button id="btn-fechar" aria-label="Fechar Menu" onClick={fechar}>
            &times;
          </button>
        </div>

        <ul className="lista-lateral">
          <li>
            <NavLink to="/" end onClick={fechar}>
              Página Inicial
            </NavLink>
          </li>
          <li>
            <NavLink to="/elenco" onClick={fechar}>
              Nosso Elenco
            </NavLink>
          </li>
          <li>
            <NavLink to="/lista" onClick={fechar}>
              Lista de espera CBBSO
            </NavLink>
          </li>
          <li>
            <NavLink to="/inscricao" onClick={fechar}>
              Inscrição de atletas
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/login" onClick={fechar}>
              Login Administrador
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
