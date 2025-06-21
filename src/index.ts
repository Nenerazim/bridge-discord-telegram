import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import {corsConfigurate} from './config'

dotenv.config({path: path.resolve(__dirname, '../.env')});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(corsConfigurate)
// Тестовый роут
app.get('/', (_req, res) => {
  res.send('Bridge between Telegram & Discord is running 🚀');
});

// Запуск Express-сервера
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
