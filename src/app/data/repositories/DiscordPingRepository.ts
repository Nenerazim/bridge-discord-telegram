import { DiscordDataSource } from '../datasources/DiscordDatasources';
import { TextChannel, Message } from 'discord.js';

export class DiscordPingRepository {
  protected dataSource: DiscordDataSource;
  private channelId: string;
  private channel?: TextChannel;

  constructor( channelId: string) {
    this.channelId = channelId;
    this.dataSource =  new DiscordDataSource();
  }

  public async init() {
    const channel = await this.dataSource.init(process.env.DISCORD_TOKEN).then(() => this.dataSource.client.channels.fetch(this.channelId))

    if (!channel || !(channel instanceof TextChannel)) {
      throw new Error('Channel is not defined or not a TextChannel');
    }

    this.channel = channel;
  }

  public async sendMessage(message: string) {
  return this.channel?.send(message);
  }

  // eslint-disable-next-line no-unused-vars
  public onNewMessage(callback: (message: Message) => void) {
   return this.dataSource.client.on('messageCreate', callback);
  }
}
