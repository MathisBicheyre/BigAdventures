export class Adventure {
  id: number;
  userId: string;
  guildId: string;
  channelId: string;

  constructor(userId: string, guildId: string, channelId: string) {
    this.userId = userId;
    this.guildId = guildId;
    this.channelId = channelId;
  }
}
