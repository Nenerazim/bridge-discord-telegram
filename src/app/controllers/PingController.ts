import { DiscordMessageLoggerUseCase } from '../domain/useCase/UseCasePingDiscord';
import {UseCasePingTelegram} from '../domain/useCase/UseCasePingTelegram';
import {Message} from 'discord.js';
import {Request, Response} from 'express';
import TelegramBot from 'node-telegram-bot-api';

export class PingController {
  private useCaseDs: DiscordMessageLoggerUseCase;
  private useCaseTg: UseCasePingTelegram;
  constructor(tgChanelId: number, dsChanelId: string, thread: number) {
    this.useCaseDs = new DiscordMessageLoggerUseCase(dsChanelId);
    this.useCaseTg = new UseCasePingTelegram(tgChanelId, thread);

    this.loggerTsMessage = this.loggerTsMessage.bind(this);
    this.loggerDsMesage = this.loggerDsMesage.bind(this);
  }

  private async loggerTsMessage(message: TelegramBot.Message) {
    await this.useCaseDs
      .sendMessage(message.text || 'Пустое сообщение')
  }

  private async loggerDsMesage(message: Message) {
    if (message.author.bot) {
      return;
    }
    await this.useCaseTg
      .sendMessage(message.content, {message_thread_id: Number(process.env.TG_TOPIC_ID)})
      .then(() => {
        message.react('👍');
      })
      .catch(() => {
        message.react('👎');
      });
  }
  public init = async (req?: Request, res?: Response) => {
    await Promise.all([this.useCaseDs.start(this.loggerDsMesage), this.useCaseTg.start(this.loggerTsMessage)])
      .then(() => res?.status(200).json({message: 'Discord and TG logger already started'}))
      .catch(() => {
        res?.status(500).json({error: 'Failed to start logger'});
      });
  };

  public sendMessage = async (message: string) => {
    await this.useCaseDs.sendMessage(message);
  };

  public status = async (req?: Request, res?: Response) => {
    const [tgStatus, dcStatus] = await Promise.all([this.useCaseTg.status(), this.useCaseDs.status()]);
    return res?.status(200).json({message: `Discord is ${dcStatus}, Tg is ${tgStatus}`});
  };
}
