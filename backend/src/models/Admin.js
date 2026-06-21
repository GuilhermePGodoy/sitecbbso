import { DataTypes } from 'sequelize';

// Usuário administrador (diretoria/comissão técnica). A senha é armazenada
// como hash bcrypt — nunca em texto puro (ver authController.js).
export default function defineAdmin(sequelize) {
  return sequelize.define(
    'Admin',
    {
      nome: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      senha: { type: DataTypes.STRING, allowNull: false }, // hash bcrypt
    },
    { tableName: 'admins' }
  );
}
