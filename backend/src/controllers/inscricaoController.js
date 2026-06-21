import { Inscricao } from '../models/index.js';

// POST /api/inscricoes  — público: candidato entra na lista de espera
export async function criar(req, res) {
  try {
    const { nome, email, telefone, posicao, experiencia } = req.body;
    const inscricao = await Inscricao.create({ nome, email, telefone, posicao, experiencia });
    res.status(201).json(inscricao);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// GET /api/inscricoes  — (admin) lista todas as inscrições
export async function listar(req, res) {
  const inscricoes = await Inscricao.findAll({ order: [['createdAt', 'ASC']] });
  res.json(inscricoes);
}

// GET /api/inscricoes/publica  — público: só dados não sensíveis
// (nome, posição, status), sem e-mail/telefone, e sem os recusados.
export async function listarPublica(req, res) {
  const inscricoes = await Inscricao.findAll({
    where: { status: ['aguardando', 'aprovado'] },
    attributes: ['id', 'nome', 'posicao', 'status'],
    order: [['createdAt', 'ASC']],
  });
  res.json(inscricoes);
}

// PATCH /api/inscricoes/:id  — (admin) aprova/recusa
export async function atualizarStatus(req, res) {
  const inscricao = await Inscricao.findByPk(req.params.id);
  if (!inscricao) return res.status(404).json({ error: 'Inscrição não encontrada.' });
  await inscricao.update({ status: req.body.status });
  res.json(inscricao);
}

// DELETE /api/inscricoes/:id  — (admin)
export async function remover(req, res) {
  const inscricao = await Inscricao.findByPk(req.params.id);
  if (!inscricao) return res.status(404).json({ error: 'Inscrição não encontrada.' });
  await inscricao.destroy();
  res.status(204).end();
}
