import {BaseGuildTextChannel, ChannelType, GuildChannelManager, TextChannel,} from "discord.js";

export async function createPrivateTextChannel(
    name: string,
    parentId: string,
    ownerId: string,
    userId: string,
    channels: GuildChannelManager
): Promise<TextChannel> {
    const channel = (await channels.create({
        name: name,
        type: ChannelType.GuildText,
        parent: parentId
    }));
    const syncedChannel = await channel.lockPermissions();
    await syncedChannel.permissionOverwrites.edit(userId, {SendMessages: true, ViewChannel: true});
    await syncedChannel.permissionOverwrites.edit(ownerId, {SendMessages: true, ViewChannel: true});
    return syncedChannel;
}

export function removeWritePermissionsForUser(channel: BaseGuildTextChannel, userId: string) {
    return channel.permissionOverwrites.edit(userId, {SendMessages: false});
}

export async function giveWritePermissionsForUser(channel: BaseGuildTextChannel, userId: string) {
    return channel.permissionOverwrites.edit(userId, {SendMessages: true});
}