import { connectDB } from "./db.js";
import cors from 'cors';
import express from 'express';
import apiRoutes from './routes/api.js';
import adminRoutes from './routes/admin.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (_req, res) => {
  res.send('Pocket Landz backend is running. Use /api endpoints.');
});
connectDB();
app.listen(PORT, () => {
  console.log(`Pocket Landz backend listening on http://localhost:${PORT}`);
});