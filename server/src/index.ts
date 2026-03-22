import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import demosRouter from './routes/demos';

const app = express();
const PORT = Number(process.env.PORT) || 3001;
const DATA_DIR = path.join(__dirname, '../../data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/api/demos', demosRouter);

app.listen(PORT, () => {
  console.log(`Tuto server running at http://localhost:${PORT}`);
  console.log(`Data stored in: ${DATA_DIR}`);
});
