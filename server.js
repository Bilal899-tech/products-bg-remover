import express from 'express';
import multer from 'multer';
import { readFileSync, unlinkSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const envPath = join(__dirname, '.env');
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    }
  }
}

const uploadsDir = join(__dirname, 'uploads');
if (!existsSync(uploadsDir)) mkdirSync(uploadsDir);

const app = express();
const upload = multer({ dest: uploadsDir });
app.use(express.static('.'));

const REMOVE_BG_KEY = process.env.REMOVE_BG_KEY || '';

app.post('/api/remove-bg', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  if (!REMOVE_BG_KEY) return res.status(500).json({ error: 'REMOVE_BG_KEY not set — create .env file (see .env.example)' });
  try {
    const buffer = readFileSync(req.file.path);
    const formData = new FormData();
    const blob = new Blob([buffer], { type: req.file.mimetype || 'image/png' });
    formData.append('image_file', blob, req.file.originalname);
    formData.append('size', 'auto');

    const apiRes = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: { 'X-Api-Key': REMOVE_BG_KEY },
      body: formData
    });

    if (!apiRes.ok) {
      const errText = await apiRes.text();
      return res.status(apiRes.status).json({ error: errText });
    }

    const arrayBuf = await apiRes.arrayBuffer();
    res.set('Content-Type', 'image/png');
    res.send(Buffer.from(arrayBuf));
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    try { unlinkSync(req.file.path); } catch {}
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`\n[products-bg-remover] http://localhost:${PORT}`);
  console.log(`nexagaze project — built by Founder Bilal`);
  console.log(`Contact: ai@nexagaze.com | WhatsApp: 03103860653\n`);
});
