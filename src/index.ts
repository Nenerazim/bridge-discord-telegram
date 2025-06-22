import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import {corsConfigurate} from './config';
import {PingController} from './app/controllers/PingController';

dotenv.config({path: path.resolve(__dirname, '../.env')});

const app = express();
const PORT = process.env.PORT || 3000;

const pingController = new PingController(Number(process.env.TG_CHAT_ID), process.env.DS_CHAT_ID || '', Number(process.env.TG_TOPIC_ID));

app.use(corsConfigurate);

pingController.init();

// @ts-ignore
app.get('/', async (req, res) => {
  return await pingController.status(req, res);
});

// Запуск Express-сервера
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
