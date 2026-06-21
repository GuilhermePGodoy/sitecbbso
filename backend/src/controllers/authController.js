import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/index.js';

// Opções do cookie que guarda o JWT no navegador.
const COOKIE_OPTS = {
  httpOnly: true, // o JS do front-end não consegue ler -> protege contra XSS
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production', // exige HTTPS em produção
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias (timeout do login)
};

// POST /api/auth/registrar  — cria um admin (senha vira hash bcrypt)
export async function registrar(req, res) {
  try {
    const { nome, email, senha } = req.body;
    const existente = await Admin.findOne({ where: { email } });
    if (existente) return res.status(409).json({ error: 'E-mail já cadastrado.' });

    const hash = bcrypt.hashSync(senha, bcrypt.genSaltSync());
    const admin = await Admin.create({ nome, email, senha: hash });
    res.status(201).json({ id: admin.id, nome: admin.nome, email: admin.email });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// POST /api/auth/login  — valida senha e devolve um JWT em cookie
export async function login(req, res) {
  const { email, senha } = req.body;
  const admin = await Admin.findOne({ where: { email } });

  // compareSync devolve false se o admin não existe OU a senha está errada.
  if (!admin || !bcrypt.compareSync(senha, admin.senha)) {
    return res.status(401).json({ error: 'Usuário e senha inválidos!' });
  }

  const token = jwt.sign(
    { sub: admin.id, nome: admin.nome, email: admin.email, admin: true },
    process.env.AUTH_SECRET,
    { expiresIn: '7d' }
  );

  res.cookie('token', token, COOKIE_OPTS);
  res.json({ id: admin.id, nome: admin.nome, email: admin.email });
}

// POST /api/auth/logout
export async function logout(req, res) {
  res.clearCookie('token');
  res.status(204).end();
}

// GET /api/auth/eu  — retorna o admin logado (rota protegida)
export async function eu(req, res) {
  res.json({ admin: req.admin });
}
