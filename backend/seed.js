import 'dotenv/config';
import { sequelize, Atleta, Inscricao } from './src/models/index.js';

// Elenco real do Time B (extraído do site original).
// O Time C ainda não tem nomes definidos — cadastre pelo painel quando tiver.
const timeB = [
  { numero: 18, nome: 'Godoy', posicao: 'levantador' },
  { numero: 4, nome: 'Kevin', posicao: 'levantador' },
  { numero: 9, nome: 'Davi', posicao: 'ponteiro' },
  { numero: 19, nome: 'Goularte', posicao: 'ponteiro' },
  { numero: 10, nome: 'Will', posicao: 'ponteiro' },
  { numero: 99, nome: 'Duarte', posicao: 'ponteiro' },
  { numero: 6, nome: 'Jean', posicao: 'central' },
  { numero: 17, nome: 'João Castro', posicao: 'central' },
  { numero: 33, nome: 'Xixo', posicao: 'central' },
  { numero: 36, nome: 'Daniel', posicao: 'central' },
  { numero: 21, nome: 'Hiro', posicao: 'libero' },
  { numero: 12, nome: 'Miguel', posicao: 'libero' },
  { numero: 5, nome: 'Cako', posicao: 'oposto' },
  { numero: 14, nome: 'Caue', posicao: 'oposto' },
].map((a) => ({ ...a, time: 'B' }));

async function seed() {
  await sequelize.authenticate();
  await sequelize.sync();

  // Limpa atletas e a inscrição de teste; mantém os admins.
  await Atleta.destroy({ where: {} });
  await Atleta.bulkCreate(timeB);
  await Inscricao.destroy({ where: { email: 'cand@test.com' } });

  console.log(`✅ ${timeB.length} atletas do Time B inseridos. Time C vazio.`);
  await sequelize.close();
}

seed().catch((e) => {
  console.error('❌ Erro no seed:', e.message);
  process.exit(1);
});
