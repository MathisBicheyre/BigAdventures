import {
  ChannelType,
  GuildChannelManager,
  CategoryChannel,
  TextChannel,
} from "discord.js";

export async function createChannelCategory(
  name: string,
  channels: GuildChannelManager
): Promise<CategoryChannel> {
  const category = (await channels.create({
    name: name,
    type: ChannelType.GuildCategory,
  })) as CategoryChannel;

  return category;
}

export async function createTextChannel(
  name: string,
  parentId: string,
  userId: string,
  channels: GuildChannelManager
): Promise<TextChannel> {
  const channel = (await channels.create({
    name: name,
    type: ChannelType.GuildText,
    parent: parentId,
  })) as TextChannel;

  return channel;
}
