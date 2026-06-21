import { useEffect, useState, useCallback } from 'react';
import { api } from '../../api/client.js';
import ConfirmDialog from '../../components/ConfirmDialog.jsx';
import { useToast } from '../../components/Toast.jsx';

const POS_LABEL = {
  levantador: 'Levantador',
  ponteiro: 'Ponteiro',
  central: 'Central',
  libero: 'Líbero',
  oposto: 'Oposto',
};

// Gestão da lista de espera: aprovar, recusar ou remover inscrições.
export default function ListaEsperaAdmin() {
  const [itens, setItens] = useState([]);
  const [estado, setEstado] = useState('carregando'); // carregando | ok | erro
  const [aExcluir, setAExcluir] = useState(null);
  const toast = useToast();

  const carregar = useCallback(() => {
    setEstado('carregando');
    api
      .get('/inscricoes')
      .then((d) => {
        setItens(d);
        setEstado('ok');
      })
      .catch(() => setEstado('erro'));
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  async function mudarStatus(item, status) {
    try {
      await api.patch(`/inscricoes/${item.id}`, { status });
      toast.sucesso(
        status === 'aprovado'
          ? `${item.nome} aprovado.`
          : `${item.nome} recusado.`
      );
      carregar();
    } catch (err) {
      toast.erro(err.message);
    }
  }

  async function confirmarExclusao() {
    const item = aExcluir;
    setAExcluir(null);
    try {
      await api.del(`/inscricoes/${item.id}`);
      toast.sucesso(`Inscrição de ${item.nome} removida.`);
      carregar();
    } catch (err) {
      toast.erro(err.message);
    }
  }

  return (
    <>
      <div className="admin-topbar">
        <div>
          <h1>Lista de espera</h1>
          <p>Aprove, recuse ou remova os candidatos inscritos.</p>
        </div>
      </div>

      <div className="admin-content">
        <div className="panel">
          <div className="panel-head">
            <strong style={{ fontWeight: 800 }}>Candidatos</strong>
            <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
              {estado === 'ok' ? `${itens.length} inscrição(ões)` : ''}
            </span>
          </div>

          {estado === 'carregando' && <div className="state">Carregando...</div>}
          {estado === 'erro' && (
            <div className="state">
              <strong>Não foi possível carregar.</strong>
              Verifique se o back-end está rodando.
            </div>
          )}
          {estado === 'ok' && itens.length === 0 && (
            <div className="state">
              <strong>Nenhuma inscrição ainda.</strong>
              As inscrições enviadas pelo formulário aparecem aqui.
            </div>
          )}

          {estado === 'ok' && itens.length > 0 && (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Contato</th>
                  <th>Posição</th>
                  <th>Status</th>
                  <th aria-label="Ações"></th>
                </tr>
              </thead>
              <tbody>
                {itens.map((it) => (
                  <tr key={it.id}>
                    <td style={{ fontWeight: 600 }}>{it.nome}</td>
                    <td>
                      <div>{it.email}</div>
                      {it.telefone && (
                        <div
                          style={{ color: 'var(--muted)', fontSize: '0.85rem' }}
                        >
                          {it.telefone}
                        </div>
                      )}
                    </td>
                    <td>
                      <span className="badge badge-pos">
                        {POS_LABEL[it.posicao] || it.posicao}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${it.status}`}>{it.status}</span>
                    </td>
                    <td>
                      <div className="acoes">
                        {it.status !== 'aprovado' && (
                          <button
                            className="btn btn-ghost btn-sm"
                            onClick={() => mudarStatus(it, 'aprovado')}
                          >
                            Aprovar
                          </button>
                        )}
                        {it.status !== 'recusado' && (
                          <button
                            className="btn btn-ghost btn-sm"
                            onClick={() => mudarStatus(it, 'recusado')}
                          >
                            Recusar
                          </button>
                        )}
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => setAExcluir(it)}
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

      {aExcluir && (
        <ConfirmDialog
          titulo="Remover inscrição"
          mensagem={`Remover a inscrição de ${aExcluir.nome}?`}
          confirmarTexto="Excluir"
          onConfirmar={confirmarExclusao}
          onCancelar={() => setAExcluir(null)}
        />
      )}
    </>
  );
}
