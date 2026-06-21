import jwt from 'jsonwebtoken';

// Middleware de autorização: exige um JWT válido (cookie ou header Authorization).
// Use em rotas que só o admin pode acessar.
export function requireAuth(req, res, next) {
  const token =
    req.cookies?.token ||
    req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Não autenticado.' });
  }

  try {
    const payload = jwt.verify(token, process.env.AUTH_SECRET);
    req.admin = payload; // disponibiliza os dados do admin para os controllers
    next();
  } catch {
    return res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
}
