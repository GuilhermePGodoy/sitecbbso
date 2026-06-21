import { Router } from 'express';
import { registrar, login, logout, eu } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Criar novo admin exige estar logado (só um admin cadastra outro).
router.post('/registrar', requireAuth, registrar);
router.post('/login', login);
router.post('/logout', logout);
router.get('/eu', requireAuth, eu);

export default router;
