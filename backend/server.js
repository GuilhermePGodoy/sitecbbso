import 'dotenv/config';
import app from './src/app.js';
import { sequelize } from './src/models/index.js';

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    // Testa a conexão com o PostgreSQL.
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco estabelecida.');

    // Cria/atualiza as tabelas a partir dos modelos (apenas em desenvolvimento).
    await sequelize.sync({ alter: true });
    console.log('✅ Modelos sincronizados.');

    app.listen(PORT, () => {
      console.log(`🚀 API rodando em http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Erro ao iniciar o servidor:', err.message);
    process.exit(1);
  }
}

start();
