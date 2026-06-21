import { useState } from 'react';
import { api, uploadFoto } from '../../api/client.js';
import { useToast } from '../../components/Toast.jsx';

const VAZIO = { nome: '', numero: '', posicao: '', time: 'B', foto: '' };

// Modal de criar/editar atleta. Recebe `atleta` (para editar) ou null (para criar).
export default function AtletaModal({ atleta, aoFechar, aoSalvar }) {
  const editando = Boolean(atleta);
  const [form, setForm] = useState(
    atleta
      ? {
          nome: atleta.nome,
          numero: atleta.numero,
          posicao: atleta.posicao,
          time: atleta.time,
          foto: atleta.foto || '',
        }
      : VAZIO
  );
  const [erro, setErro] = useState(null);
  const [salvando, setSalvando] = useState(false);
  const [enviandoFoto, setEnviandoFoto] = useState(false);
  const toast = useToast();

  const mudar = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function aoEscolherFoto(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setEnviandoFoto(true);
    setErro(null);
    try {
      const { url } = await uploadFoto(file);
      setForm((f) => ({ ...f, foto: url }));
    } catch (err) {
      setErro(err.message);
    } finally {
      setEnviandoFoto(false);
    }
  }

  async function enviar(e) {
    e.preventDefault();
    setSalvando(true);
    setErro(null);
    const payload = {
      ...form,
      numero: Number(form.numero),
      foto: form.foto || null,
    };
    try {
      if (editando) await api.put(`/atletas/${atleta.id}`, payload);
      else await api.post('/atletas', payload);
      toast.sucesso(editando ? 'Atleta atualizado.' : 'Atleta adicionado.');
      aoSalvar();
    } catch (err) {
      setErro(err.message);
      setSalvando(false);
    }
  }

  return (
    <div className="cbm-overlay" onClick={aoFechar}>
      <form
        className="cbm-card"
        onClick={(e) => e.stopPropagation()}
        onSubmit={enviar}
      >
        <div className="cbm-head">
          {editando ? 'Editar atleta' : 'Novo atleta'}
        </div>

        <div className="cbm-body">
          <div className="field">
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              name="nome"
              value={form.nome}
              onChange={mudar}
              required
              autoFocus
            />
          </div>

          <div className="field row2">
            <div className="field">
              <label htmlFor="numero">Número</label>
              <input
                id="numero"
                name="numero"
                type="number"
                min="0"
                value={form.numero}
                onChange={mudar}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="time">Time</label>
              <select id="time" name="time" value={form.time} onChange={mudar}>
                <option value="B">Time B</option>
                <option value="C">Time C</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="posicao">Posição</label>
            <select
              id="posicao"
              name="posicao"
              value={form.posicao}
              onChange={mudar}
              required
            >
              <option value="" disabled>
                Selecione
              </option>
              <option value="levantador">Levantador</option>
              <option value="ponteiro">Ponteiro</option>
              <option value="central">Central</option>
              <option value="libero">Líbero</option>
              <option value="oposto">Oposto</option>
            </select>
          </div>

          <div className="field">
            <label>Foto (opcional)</label>
            {form.foto ? (
              <div className="foto-preview">
                <img src={form.foto} alt="Pré-visualização" />
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => setForm({ ...form, foto: '' })}
                >
                  Remover foto
                </button>
              </div>
            ) : (
              <label className="foto-drop">
                {enviandoFoto ? 'Enviando...' : 'Escolher imagem'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={aoEscolherFoto}
                  disabled={enviandoFoto}
                  hidden
                />
              </label>
            )}
          </div>

          {erro && <p className="form-erro">{erro}</p>}
        </div>

        <div className="cbm-foot">
          <button type="button" className="btn btn-ghost" onClick={aoFechar}>
            Cancelar
          </button>
          <button
            type="submit"
            className="btn btn-brand"
            disabled={salvando || enviandoFoto}
          >
            {salvando ? 'Salvando...' : editando ? 'Salvar' : 'Adicionar'}
          </button>
        </div>
      </form>
    </div>
  );
}
