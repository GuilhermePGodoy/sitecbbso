import { Sequelize } from 'sequelize';

// Lê as credenciais do .env (carregado em server.js via dotenv).
const {
  DB_NAME = 'cbbso',
  DB_USER = 'postgres',
  DB_PASSWORD = '',
  DB_HOST = 'localhost',
  DB_PORT = 5432,
} = process.env;

// Instância única do Sequelize, usada por todos os modelos.
export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  logging: false, // mude para console.log para ver as queries SQL
});
