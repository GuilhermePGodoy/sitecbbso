// Caixa de confirmação para ações destrutivas, no lugar do confirm() nativo.
export default function ConfirmDialog({
  titulo,
  mensagem,
  confirmarTexto = 'Confirmar',
  onConfirmar,
  onCancelar,
}) {
  return (
    <div className="cbm-overlay" onClick={onCancelar}>
      <div className="cbm-card" onClick={(e) => e.stopPropagation()}>
        <div className="cbm-head">{titulo}</div>
        <div className="cbm-body">
          <p style={{ margin: 0, color: 'var(--muted)' }}>{mensagem}</p>
        </div>
        <div className="cbm-foot">
          <button className="btn btn-ghost" onClick={onCancelar}>
            Cancelar
          </button>
          <button className="btn btn-danger" onClick={onConfirmar}>
            {confirmarTexto}
          </button>
        </div>
      </div>
    </div>
  );
}
