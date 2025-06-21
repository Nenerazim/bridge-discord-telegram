import {Client, GatewayIntentBits, PresenceStatus} from 'discord.js';

export class DiscordDataSource {
  public client: Client;

  constructor() {
    this.client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
    });
  }

  public async init(token?: string) {
    if (process.env.DISCORD_TOKEN) {
      return await this.client.login(token);
    }
    throw new Error('DISCORD_TOKEN is not defined');
  }
  // Возвращает статус бота: online, idle, dnd, offline или 'unknown', если ещё не готов
  public async status(): Promise<PresenceStatus | 'unknown'> {
    if (!this.client.isReady()) {
      return 'unknown'; // клиент ещё не готов, статус неизвестен
    }

    return this.client.user?.presence?.status ?? 'unknown';
  }
}
