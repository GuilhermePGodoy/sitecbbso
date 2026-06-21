// Cartão de um atleta (foto opcional + número + nome). Reutilizado no elenco.
export default function PlayerCard({ numero, nome, foto }) {
  return (
    <div className="player-card">
      {foto && <img className="player-foto" src={foto} alt={nome} />}
      <span className="player-number">{numero}</span>
      <p className="player-name">{nome}</p>
    </div>
  );
}
