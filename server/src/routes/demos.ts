import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();
const DATA_DIR = path.join(__dirname, '../../../data');

function getDemoPath(id: string): string {
  return path.join(DATA_DIR, `${id}.json`);
}

// List all demos
router.get('/', (_req: Request, res: Response) => {
  try {
    const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
    const demos = files.map(file => {
      const data = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf-8'));
      return {
        id: data.id,
        title: data.title,
        createdAt: data.createdAt,
        stepCount: data.steps?.length || 0,
      };
    });
    demos.sort((a, b) => b.createdAt - a.createdAt);
    res.json(demos);
  } catch {
    res.json([]);
  }
});

// Get single demo
router.get('/:id', (req: Request, res: Response) => {
  const filePath = getDemoPath(req.params.id);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Demo not found' });
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  res.json(data);
});

// Save demo
router.post('/', (req: Request, res: Response) => {
  const recording = req.body;
  if (!recording.id) {
    return res.status(400).json({ error: 'Missing id' });
  }
  const filePath = getDemoPath(recording.id);
  fs.writeFileSync(filePath, JSON.stringify(recording, null, 2));
  res.json({ ok: true, id: recording.id });
});

// Update demo title
router.patch('/:id', (req: Request, res: Response) => {
  const filePath = getDemoPath(req.params.id);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Demo not found' });
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  if (req.body.title) data.title = req.body.title;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.json({ ok: true });
});

// Delete demo
router.delete('/:id', (req: Request, res: Response) => {
  const filePath = getDemoPath(req.params.id);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  res.json({ ok: true });
});

export default router;
