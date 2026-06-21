import { useEffect, useState } from 'react';
import { api } from '../api/client.js';
import PlayerCard from '../components/PlayerCard.jsx';

// Ordem e títulos das posições, para agrupar os cards.
const POSICOES = ['levantador', 'ponteiro', 'central', 'libero', 'oposto'];
const TITULOS = {
  levantador: 'Levantadores',
  ponteiro: 'Ponteiros',
  central: 'Centrais',
  libero: 'Líberos',
  oposto: 'Opostos',
};

// Esta página é o exemplo de integração com a API: busca os atletas do
// back-end e monta o elenco. Quando o banco estiver populado pelo admin,
// o elenco aparece aqui automaticamente.
export default function Elenco() {
  const [time, setTime] = useState('B');
  const [atletas, setAtletas] = useState([]);
  const [estado, setEstado] = useState('carregando'); // carregando | ok | erro

  useEffect(() => {
    setEstado('carregando');
    api
      .get(`/atletas?time=${time}`)
      .then((dados) => {
        setAtletas(dados);
        setEstado('ok');
      })
      .catch(() => setEstado('erro'));
  }, [time]);

  return (
    <div>
      <section className="titulo-pagina">
        <h2>Nosso Elenco</h2>
        <p>Conheça os atletas que representam o CBBSO.</p>
      </section>

      <div className="seletor-times">
        <button
          className={`btn-time ${time === 'B' ? 'ativo' : ''}`}
          onClick={() => setTime('B')}
        >
          Time B
        </button>
        <button
          className={`btn-time ${time === 'C' ? 'ativo' : ''}`}
          onClick={() => setTime('C')}
        >
          Time C
        </button>
      </div>

      {estado === 'carregando' && (
        <p style={{ textAlign: 'center' }}>Carregando...</p>
      )}
      {estado === 'erro' && (
        <p style={{ textAlign: 'center' }}>
          Não foi possível carregar o elenco. O back-end está rodando?
        </p>
      )}
      {estado === 'ok' && atletas.length === 0 && (
        <p style={{ textAlign: 'center' }}>Nenhum atleta cadastrado ainda.</p>
      )}

      {estado === 'ok' &&
        POSICOES.map((pos) => {
          const doGrupo = atletas.filter((a) => a.posicao === pos);
          if (doGrupo.length === 0) return null;
          return (
            <div className="posicao-grupo" key={pos}>
              <h4>{TITULOS[pos]}</h4>
              <div className="cards-container">
                {doGrupo.map((a) => (
                  <PlayerCard
                    key={a.id}
                    numero={a.numero}
                    nome={a.nome}
                    foto={a.foto}
                  />
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
}
