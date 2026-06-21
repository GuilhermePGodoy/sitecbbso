import multer from 'multer';
import { unlink } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
// backend/uploads
export const UPLOAD_DIR = join(__dirname, '..', '..', 'uploads');

// Salva os arquivos em disco com um nome único.
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const unico = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `atleta-${unico}${extname(file.originalname).toLowerCase()}`);
  },
});

// Aceita apenas imagens.
function fileFilter(req, file, cb) {
  if (/^image\/(png|jpe?g|webp|gif)$/.test(file.mimetype)) cb(null, true);
  else cb(new Error('Envie uma imagem (png, jpg, webp ou gif).'));
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

// Apaga um arquivo de upload pelo caminho público (/uploads/arquivo).
// Ignora URLs externas e erros (arquivo já removido, etc.).
export async function removerUpload(foto) {
  if (!foto || !foto.startsWith('/uploads/')) return;
  await unlink(join(UPLOAD_DIR, foto.slice('/uploads/'.length))).catch(() => {});
}
