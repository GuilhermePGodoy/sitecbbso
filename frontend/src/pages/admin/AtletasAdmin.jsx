import { useEffect, useState, useCallback } from 'react';
import { api } from '../../api/client.js';
import AtletaModal from './AtletaModal.jsx';
import ConfirmDialog from '../../components/ConfirmDialog.jsx';
import { useToast } from '../../components/Toast.jsx';

const POS_LABEL = {
  levantador: 'Levantador',
  ponteiro: 'Ponteiro',
  central: 'Central',
  libero: 'Líbero',
  oposto: 'Oposto',
};

// Tela de gestão do elenco: lista, filtra por time, cria/edita/remove atletas.
export default function AtletasAdmin() {
  const [filtro, setFiltro] = useState('todos'); // todos | B | C
  const [atletas, setAtletas] = useState([]);
  const [estado, setEstado] = useState('carregando'); // carregando | ok | erro
  const [modal, setModal] = useState(null); // null | {} (novo) | atleta (editar)
  const [aExcluir, setAExcluir] = useState(null); // atleta aguardando confirmação
  const toast = useToast();

  const carregar = useCallback(() => {
    setEstado('carregando');
    const q = filtro === 'todos' ? '' : `?time=${filtro}`;
    api
      .get(`/atletas${q}`)
      .then((d) => {
        setAtletas(d);
        setEstado('ok');
      })
      .catch(() => setEstado('erro'));
  }, [filtro]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  async function confirmarExclusao() {
    const a = aExcluir;
    setAExcluir(null);
    try {
      await api.del(`/atletas/${a.id}`);
      toast.sucesso(`${a.nome} removido do elenco.`);
      carregar();
    } catch (err) {
      toast.erro(err.message);
    }
  }

  return (
    <>
      <div className="admin-topbar">
        <div>
          <h1>Atletas</h1>
          <p>Gerencie o elenco dos times B e C.</p>
        </div>
        <button className="btn btn-brand" onClick={() => setModal({})}>
          + Novo atleta
        </button>
      </div>

      <div className="admin-content">
        <div className="panel">
          <div className="panel-head">
            <div className="seg">
              {['todos', 'B', 'C'].map((t) => (
                <button
                  key={t}
                  className={filtro === t ? 'on' : ''}
                  onClick={() => setFiltro(t)}
                >
                  {t === 'todos' ? 'Todos' : `Time ${t}`}
                </button>
              ))}
            </div>
            <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
              {estado === 'ok' ? `${atletas.length} atleta(s)` : ''}
            </span>
          </div>

          {estado === 'carregando' && (
            <div className="state">Carregando atletas...</div>
          )}
          {estado === 'erro' && (
            <div className="state">
              <strong>Não foi possível carregar.</strong>
              Verifique se o back-end está rodando.
            </div>
          )}
          {estado === 'ok' && atletas.length === 0 && (
            <div className="state">
              <strong>Nenhum atleta neste filtro.</strong>
              Use “Novo atleta” para começar a montar o elenco.
            </div>
          )}

          {estado === 'ok' && atletas.length > 0 && (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Posição</th>
                  <th>Time</th>
                  <th aria-label="Ações"></th>
                </tr>
              </thead>
              <tbody>
                {atletas.map((a) => (
                  <tr key={a.id}>
                    <td>
                      <span className="jersey">{a.numero}</span>
                    </td>
                    <td style={{ fontWeight: 600 }}>
                      <div className="nome-cel">
                        {a.foto && (
                          <img className="avatar" src={a.foto} alt="" />
                        )}
                        {a.nome}
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-pos">
                        {POS_LABEL[a.posicao] || a.posicao}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-time">{a.time}</span>
                    </td>
                    <td>
                      <div className="acoes">
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => setModal(a)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => setAExcluir(a)}
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {modal && (
        <AtletaModal
          atleta={modal.id ? modal : null}
          aoFechar={() => setModal(null)}
          aoSalvar={() => {
            setModal(null);
            carregar();
          }}
        />
      )}

      {aExcluir && (
        <ConfirmDialog
          titulo="Remover atleta"
          mensagem={`Remover ${aExcluir.nome} (#${aExcluir.numero}) do elenco?`}
          confirmarTexto="Excluir"
          onConfirmar={confirmarExclusao}
          onCancelar={() => setAExcluir(null)}
        />
      )}
    </>
  );
}
