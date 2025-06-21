import { DiscordPingRepository } from "@repository/DiscordPingRepository";

export class UseCasePingDiscord {
    private repository: DiscordPingRepository
    constructor(channelId: string) {
        this.repository = new DiscordPingRepository(channelId)
    }

    
}