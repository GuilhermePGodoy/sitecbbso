import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { sequelize, Atleta, Inscricao, Admin } from './src/models/index.js';

// Admin inicial — lido do .env para não deixar credenciais no código.
// Como o cadastro de admin pela API exige estar logado, é aqui que o
// primeiro administrador é criado numa instalação nova.
const ADMIN_PADRAO = {
  nome: process.env.ADMIN_NOME || 'Administrador',
  email: process.env.ADMIN_EMAIL || 'admin@cbbso.test',
  senha: process.env.ADMIN_SENHA || 'Cbbso@2026',
};

// Elenco real do Time B (extraído do site original).
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

// Elenco do Time C. Os nomes marcados ainda são provisórios — ajuste pelo painel.
const timeC = [
  { numero: 1, nome: 'Rodrigo', posicao: 'levantador' },
  { numero: 2, nome: 'Higor', posicao: 'levantador' },
  { numero: 7, nome: 'Colombia', posicao: 'ponteiro' },
  { numero: 8, nome: 'Orlando', posicao: 'oposto' },
  { numero: 11, nome: 'Matheus', posicao: 'libero' },
  { numero: 3, nome: 'Bruno', posicao: 'ponteiro' },
  { numero: 13, nome: 'Lucas', posicao: 'ponteiro' },
  { numero: 15, nome: 'Felipe', posicao: 'ponteiro' },
  { numero: 16, nome: 'Gustavo', posicao: 'central' },
  { numero: 20, nome: 'Rafael', posicao: 'central' },
  { numero: 22, nome: 'Thiago', posicao: 'central' },
  { numero: 23, nome: 'Pedro', posicao: 'central' },
  { numero: 24, nome: 'André', posicao: 'oposto' },
  { numero: 25, nome: 'Vinicius', posicao: 'libero' },
].map((a) => ({ ...a, time: 'C' }));

async function seed() {
  await sequelize.authenticate();
  await sequelize.sync();

  // Limpa atletas e a inscrição de teste; mantém os admins.
  await Atleta.destroy({ where: {} });
  await Atleta.bulkCreate([...timeB, ...timeC]);
  await Inscricao.destroy({ where: { email: 'cand@test.com' } });

  // Cria o admin inicial só se ainda não existir nenhum com esse e-mail,
  // para o seed poder rodar de novo sem duplicar nem trocar a senha.
  const jaExiste = await Admin.findOne({ where: { email: ADMIN_PADRAO.email } });
  if (jaExiste) {
    console.log(`ℹ️  Admin ${ADMIN_PADRAO.email} já existe — mantido.`);
  } else {
    const hash = bcrypt.hashSync(ADMIN_PADRAO.senha, bcrypt.genSaltSync());
    await Admin.create({ nome: ADMIN_PADRAO.nome, email: ADMIN_PADRAO.email, senha: hash });
    console.log(`✅ Admin criado: ${ADMIN_PADRAO.email}`);
  }

  console.log(`✅ ${timeB.length} atletas do Time B e ${timeC.length} do Time C inseridos.`);
  await sequelize.close();
}

seed().catch((e) => {
  console.error('❌ Erro no seed:', e.message);
  process.exit(1);
});
