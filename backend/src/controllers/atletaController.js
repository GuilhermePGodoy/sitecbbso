import { Atleta } from '../models/index.js';
import { removerUpload } from '../middleware/upload.js';

// GET /api/atletas?time=B  — lista pública do elenco
export async function listar(req, res) {
  const where = {};
  if (req.query.time) where.time = req.query.time;
  const atletas = await Atleta.findAll({ where, order: [['numero', 'ASC']] });
  res.json(atletas);
}

// GET /api/atletas/:id
export async function obter(req, res) {
  const atleta = await Atleta.findByPk(req.params.id);
  if (!atleta) return res.status(404).json({ error: 'Atleta não encontrado.' });
  res.json(atleta);
}

// POST /api/atletas  — (admin)
export async function criar(req, res) {
  try {
    const atleta = await Atleta.create(req.body);
    res.status(201).json(atleta);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// PUT /api/atletas/:id  — (admin)
export async function atualizar(req, res) {
  const atleta = await Atleta.findByPk(req.params.id);
  if (!atleta) return res.status(404).json({ error: 'Atleta não encontrado.' });
  const fotoAntiga = atleta.foto;
  try {
    await atleta.update(req.body);
    // Trocou ou removeu a foto? Apaga o arquivo antigo do disco.
    if (fotoAntiga && fotoAntiga !== atleta.foto) await removerUpload(fotoAntiga);
    res.json(atleta);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// DELETE /api/atletas/:id  — (admin)
export async function remover(req, res) {
  const atleta = await Atleta.findByPk(req.params.id);
  if (!atleta) return res.status(404).json({ error: 'Atleta não encontrado.' });
  const foto = atleta.foto;
  await atleta.destroy();
  await removerUpload(foto);
  res.status(204).end();
}
