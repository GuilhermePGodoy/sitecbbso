import { Router } from 'express';
import {
  listar,
  obter,
  criar,
  atualizar,
  remover,
} from '../controllers/atletaController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Leitura pública (o site mostra o elenco para qualquer visitante).
router.get('/', listar);
router.get('/:id', obter);

// Escrita só para admin autenticado.
router.post('/', requireAuth, criar);
router.put('/:id', requireAuth, atualizar);
router.delete('/:id', requireAuth, remover);

export default router;
