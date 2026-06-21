import { useEffect, useState } from 'react';
import { api } from '../api/client.js';

const POS_LABEL = {
  levantador: 'Levantador',
  ponteiro: 'Ponteiro',
  central: 'Central',
  libero: 'Líbero',
  oposto: 'Oposto',
};
const STATUS_LABEL = { aguardando: 'Aguardando', aprovado: 'Aprovado' };

// Lista de espera pública: mostra os candidatos (nome, posição e status),
// sem dados de contato e sem os recusados. Dados vêm da API.
export default function ListaEspera() {
  const [itens, setItens] = useState([]);
  const [estado, setEstado] = useState('carregando'); // carregando | ok | erro

  useEffect(() => {
    api
      .get('/inscricoes/publica')
      .then((d) => {
        setItens(d);
        setEstado('ok');
      })
      .catch(() => setEstado('erro'));
  }, []);

  return (
    <div>
      <section className="titulo-pagina">
        <h2>Lista de Espera</h2>
        <p>Confira a lista de espera para ingressar nos times do CBBSO.</p>
      </section>

      <section className="paragrafo-content">
        <p>
          A lista de espera será atualizada conforme novas inscrições forem
          recebidas. Fique atento às convocações!
        </p>
      </section>

      <div className="lista-espera-container">
        {estado === 'carregando' && (
          <p style={{ textAlign: 'center' }}>Carregando...</p>
        )}
        {estado === 'erro' && (
          <p style={{ textAlign: 'center' }}>
            Não foi possível carregar a lista no momento.
          </p>
        )}
        {estado === 'ok' && itens.length === 0 && (
          <p style={{ textAlign: 'center' }}>
            Ainda não há candidatos na lista de espera.
          </p>
        )}

        {estado === 'ok' && itens.length > 0 && (
          <table className="tabela-lista">
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Posição</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {itens.map((it, i) => (
                <tr key={it.id}>
                  <td>{i + 1}</td>
                  <td>{it.nome}</td>
                  <td>{POS_LABEL[it.posicao] || it.posicao}</td>
                  <td>
                    <span className={`status ${it.status}`}>
                      {STATUS_LABEL[it.status] || it.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
