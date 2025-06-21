import { Client, GatewayIntentBits } from 'discord.js';

export class DiscordDataSource {
  public client: Client;

  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });
  }

  async init(token?: string) {
    if (process.env.DISCORD_TOKEN) {
    return await this.client.login(token);
    } 
    throw new Error('DISCORD_TOKEN is not defined');
  }
}
