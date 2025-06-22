import {TelegramPingRepository} from '@repository/TelegramPingRepository';
import TelegramBot from 'node-telegram-bot-api';

export class UseCasePingTelegram {
  private tgChanelId: number;
  private thread: number
  private repository: TelegramPingRepository;
  constructor(tgChanelId: number, thread: number) {
    this.thread = thread
    this.tgChanelId = tgChanelId;
    this.repository = new TelegramPingRepository();
  }

  // eslint-disable-next-line no-unused-vars
  public start(callback: (message: TelegramBot.Message, metadata: TelegramBot.Metadata) => void) {
    this.repository.onNewMessage((message, metadata) => {
      if (message.from?.is_bot) {
        return;
      }
      console.log('chatId')
      console.log(message.chat.id)
      console.log('thread_id')
      console.log(message.message_thread_id)
      if (this.tgChanelId === message.chat.id &&  message.message_thread_id === this.thread) {
        callback(message, metadata);
      }
    });
  }

  public sendMessage(message: string, oprion?: TelegramBot.SendMessageOptions) {
    console.log(this.tgChanelId, 'on')
    return this.repository.sendMessage(this.tgChanelId, message, oprion);
  }

  public async status() {
    return await this.repository.status();
  }
}
