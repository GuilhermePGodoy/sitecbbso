import { sequelize } from '../config/database.js';
import defineAtleta from './Atleta.js';
import defineInscricao from './Inscricao.js';
import defineAdmin from './Admin.js';

// Inicializa cada modelo com a mesma instância do Sequelize.
const Atleta = defineAtleta(sequelize);
const Inscricao = defineInscricao(sequelize);
const Admin = defineAdmin(sequelize);

// (Associações entre modelos entrariam aqui, se houver.)

export { sequelize, Atleta, Inscricao, Admin };
