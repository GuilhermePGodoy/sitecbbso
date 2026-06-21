import { DataTypes } from 'sequelize';

// Inscrição na lista de espera, enviada pelo formulário público.
export default function defineInscricao(sequelize) {
  return sequelize.define(
    'Inscricao',
    {
      nome: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      telefone: { type: DataTypes.STRING, allowNull: true },
      posicao: {
        type: DataTypes.ENUM('levantador', 'ponteiro', 'central', 'libero', 'oposto'),
        allowNull: false,
      },
      experiencia: { type: DataTypes.TEXT, allowNull: true },
      // O admin move a inscrição entre estes status.
      status: {
        type: DataTypes.ENUM('aguardando', 'aprovado', 'recusado'),
        allowNull: false,
        defaultValue: 'aguardando',
      },
    },
    { tableName: 'inscricoes' }
  );
}
