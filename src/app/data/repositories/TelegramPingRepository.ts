import TelegramBot from 'node-telegram-bot-api';
import {TelegramDatasources} from '../datasources/TelegramDatasources.ts';

export class TelegramPingRepository {
  private datasourse: TelegramBot;
  constructor() {
    this.datasourse = new TelegramDatasources(process.env.TELEGRAM_TOKEN).init();
  }

  // eslint-disable-next-line no-unused-vars
  public async onNewMessage(callback: (message: TelegramBot.Message, metadata: TelegramBot.Metadata) => void) {
    await this.datasourse.on('message', callback);
  }

  public async sendMessage(chatId: number, message: string, oprion?: TelegramBot.SendMessageOptions) {
    await this.datasourse.sendMessage(chatId, message, oprion);
  }

  public async status() {
    return await this.datasourse
      .getMe()
      .then(() => 'online')
      .catch(() => 'offline');
  }
}
