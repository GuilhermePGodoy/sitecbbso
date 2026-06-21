import { Link } from 'react-router-dom';

// Cabeçalho com botão de menu e logo que leva para a página inicial.
export default function Banner({ abrirMenu }) {
  return (
    <header className="banner">
      <button id="btn-menu" aria-label="Abrir Menu" onClick={abrirMenu}>
        ☰
      </button>
      <Link to="/" id="link-banner" className="logo-link">
        <img
          src="/images/cbbso-logo-512x512.png"
          alt="logo CBBSO"
          className="logo"
        />
        <h1>Vôlei CBBSO</h1>
      </Link>
    </header>
  );
}
