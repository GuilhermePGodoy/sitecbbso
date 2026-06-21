import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import atletaRoutes from './routes/atletaRoutes.js';
import inscricaoRoutes from './routes/inscricaoRoutes.js';
import authRoutes from './routes/authRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { UPLOAD_DIR } from './middleware/upload.js';

const app = express();

// CORS com credenciais para o cookie do JWT funcionar entre front e back.
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Rota de saúde, útil para testar se a API está no ar.
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Arquivos enviados (fotos dos atletas).
app.use('/uploads', express.static(UPLOAD_DIR));

// Recursos da API.
app.use('/api/atletas', atletaRoutes);
app.use('/api/inscricoes', inscricaoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);

// Tratamento de erros (ex.: imagem inválida ou grande demais no upload).
app.use((err, req, res, next) => {
  res.status(err.status || 400).json({ error: err.message || 'Erro no servidor.' });
});

export default app;
