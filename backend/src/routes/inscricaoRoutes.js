import { Router } from 'express';
import {
  criar,
  listar,
  listarPublica,
  atualizarStatus,
  remover,
} from '../controllers/inscricaoController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Envio do formulário é público.
router.post('/', criar);

// Lista pública (só nome/posição/status, sem recusados).
router.get('/publica', listarPublica);

// Gestão da lista de espera é só para admin.
router.get('/', requireAuth, listar);
router.patch('/:id', requireAuth, atualizarStatus);
router.delete('/:id', requireAuth, remover);

export default router;
