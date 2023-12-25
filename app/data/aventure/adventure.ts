export class Adventure {
    id: string;
    userId: string;
    guildId: string;

    constructor(channelId: string, userId: string, guildId: string) {
        this.id = channelId;
        this.userId = userId;
        this.guildId = guildId;
    }
}
