import { DataTypes } from 'sequelize';

// Atleta do elenco (Time B ou C). É o recurso central do CRUD do admin.
export default function defineAtleta(sequelize) {
  return sequelize.define(
    'Atleta',
    {
      nome: { type: DataTypes.STRING, allowNull: false },
      numero: { type: DataTypes.INTEGER, allowNull: false },
      posicao: {
        type: DataTypes.ENUM('levantador', 'ponteiro', 'central', 'libero', 'oposto'),
        allowNull: false,
      },
      time: {
        type: DataTypes.ENUM('B', 'C'),
        allowNull: false,
        defaultValue: 'B',
      },
      // Caminho/URL da foto de perfil (upload entra numa etapa futura).
      foto: { type: DataTypes.STRING, allowNull: true },
      ativo: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    { tableName: 'atletas' }
  );
}
