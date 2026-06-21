import { Router } from 'express';
import { upload } from '../middleware/upload.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// POST /api/upload  — (admin) recebe uma imagem no campo "foto" e devolve a URL.
router.post('/', requireAuth, upload.single('foto'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
  res.status(201).json({ url: `/uploads/${req.file.filename}` });
});

export default router;
