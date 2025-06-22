import {Message} from 'discord.js';
import {DiscordPingRepository} from 'app/data/repositories/DiscordPingRepository.ts';

export class DiscordMessageLoggerUseCase {
  private repository: DiscordPingRepository;
  constructor(channelId: string) {
    this.repository = new DiscordPingRepository(channelId);
  }

  // eslint-disable-next-line no-unused-vars
  public async start(callback: (message: Message) => void) {
    await this.repository.init();
    this.repository.onNewMessage(callback);
    console.log('Discord message logger started');
  }

  public async sendMessage(message: string) {
    await this.repository.sendMessage({
      content: `@everyone ${message}`,
      allowedMentions: {parse: ['everyone']}
    });
  }

  public async status() {
    return await this.repository.status();
  }
}
