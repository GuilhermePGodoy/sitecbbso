import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/client.js';

// Tela de login do administrador (layout próprio, sem banner/rodapé).
// Envia para POST /api/auth/login; em caso de sucesso, o back-end devolve
// o JWT em cookie httpOnly.
export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const navigate = useNavigate();

  async function aoEnviar(e) {
    e.preventDefault();
    setEnviando(true);
    setErro(null);
    try {
      await api.post('/auth/login', { email, senha });
      navigate('/admin');
    } catch (err) {
      setErro(err.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="bg-login">
      <main className="login-container">
        <div className="login-box">
          <img
            src="/images/cbbso-logo-512x512.png"
            alt="Logo CBBSO"
            className="logo-login"
          />
          <h2>Área Administrativa</h2>
          <p>Acesso restrito à diretoria e comissão técnica.</p>

          <form className="login-form" onSubmit={aoEnviar}>
            <div className="form-group">
              <label htmlFor="usuario">Usuário ou E-mail</label>
              <input
                type="text"
                id="usuario"
                name="usuario"
                placeholder="Digite seu usuário"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                id="senha"
                name="senha"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-entrar" disabled={enviando}>
              {enviando ? 'Entrando...' : 'Entrar no Sistema'}
            </button>

            {erro && (
              <p style={{ color: '#a00', textAlign: 'center' }}>{erro}</p>
            )}
          </form>

          <Link to="/" className="link-voltar">
            &larr; Voltar para o site principal
          </Link>
        </div>
      </main>
    </div>
  );
}
