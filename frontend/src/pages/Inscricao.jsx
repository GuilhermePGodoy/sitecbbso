import { useState } from 'react';
import { api } from '../api/client.js';

const VAZIO = {
  nome: '',
  email: '',
  telefone: '',
  posicao: '',
  experiencia: '',
};

// Formulário público de inscrição na lista de espera.
// Agora envia de verdade para a API (antes só dava um alert()).
export default function Inscricao() {
  const [form, setForm] = useState(VAZIO);
  const [feedback, setFeedback] = useState(null); // { tipo, texto }
  const [enviando, setEnviando] = useState(false);

  const aoMudar = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function aoEnviar(e) {
    e.preventDefault();
    setEnviando(true);
    setFeedback(null);
    try {
      await api.post('/inscricoes', form);
      setFeedback({ tipo: 'ok', texto: 'Inscrição enviada com sucesso!' });
      setForm(VAZIO);
    } catch (err) {
      setFeedback({ tipo: 'erro', texto: `Erro ao enviar: ${err.message}` });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div>
      <section className="titulo-pagina">
        <h2>Inscrição de Atletas</h2>
        <p>Preencha o formulário abaixo para se inscrever na lista de espera.</p>
      </section>

      <form className="form-inscricao" onSubmit={aoEnviar}>
        <div className="form-grupo">
          <label htmlFor="nome">Nome completo</label>
          <input
            type="text"
            id="nome"
            name="nome"
            placeholder="Seu nome completo"
            value={form.nome}
            onChange={aoMudar}
            required
          />
        </div>

        <div className="form-grupo">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="seu@email.com"
            value={form.email}
            onChange={aoMudar}
            required
          />
        </div>

        <div className="form-grupo">
          <label htmlFor="telefone">Telefone</label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            placeholder="(00) 00000-0000"
            value={form.telefone}
            onChange={aoMudar}
          />
        </div>

        <div className="form-grupo">
          <label htmlFor="posicao">Posição pretendida</label>
          <select
            id="posicao"
            name="posicao"
            value={form.posicao}
            onChange={aoMudar}
            required
          >
            <option value="" disabled>
              Selecione uma posição
            </option>
            <option value="levantador">Levantador(a)</option>
            <option value="ponteiro">Ponteiro(a)</option>
            <option value="central">Central</option>
            <option value="libero">Líbero</option>
            <option value="oposto">Oposto(a)</option>
          </select>
        </div>

        <div className="form-grupo">
          <label htmlFor="experiencia">Experiência anterior</label>
          <textarea
            id="experiencia"
            name="experiencia"
            rows="4"
            placeholder="Conte sobre sua experiência com vôlei..."
            value={form.experiencia}
            onChange={aoMudar}
          ></textarea>
        </div>

        <button type="submit" className="btn-enviar" disabled={enviando}>
          {enviando ? 'Enviando...' : 'Enviar Inscrição'}
        </button>

        {feedback && (
          <p
            style={{
              textAlign: 'center',
              marginTop: '15px',
              color: feedback.tipo === 'ok' ? '#155724' : '#a00',
            }}
          >
            {feedback.texto}
          </p>
        )}
      </form>
    </div>
  );
}
