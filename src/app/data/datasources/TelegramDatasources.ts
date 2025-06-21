import TelegramBot from 'node-telegram-bot-api';

export class TelegramDatasources {
  private token?: string;

  constructor(token?: string) {
    this.token = token;
  }
  public init() {
    if (this.token) {
      return new TelegramBot(this.token, {polling: true});
    }
    throw new Error('Tg token in not defined');
  }
}
