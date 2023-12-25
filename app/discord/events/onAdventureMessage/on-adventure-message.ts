import {BaseGuildTextChannel, Events, Message} from "discord.js";
import {findGuild} from "../../../data/guild/guild-repository";
import {giveWritePermissionsForUser, removeWritePermissionsForUser} from "../../channels";
import {getChatCompletionFromMessages} from "../../../gpt/adventures/utils";
import {clientUser} from "../../connector";
import {fetchCompletion} from "../../../gpt/connector";

async function sendRollingMessages(channel: BaseGuildTextChannel, response: string) {
    return await channel.send(response);
}

async function execute(message: Message) {
    if (!("guild" in message.channel)) return;

    const channel = message.channel as BaseGuildTextChannel;
    const guild = findGuild(channel.guildId);

    if (channel.parentId && channel.parentId !== guild.parentId) return;

    const userId = channel.name.split("-").at(1);

    if (userId !== message.author.id) return;

    await removeWritePermissionsForUser(channel, userId);
    await channel.sendTyping();
    const response = await fetchCompletion(getChatCompletionFromMessages(channel.messages.cache, userId, clientUser.id));

    const responseMessage = await sendRollingMessages(channel, response);
    if (!responseMessage) throw new Error("Couldn't get response for gpt");

    if (response.includes('FIN')) {
        await (await channel.setParent(guild.archiveId)).lockPermissions();
        const member = await message.guild.members.fetch(userId);
        await member.roles.remove(guild.adventureRoleId);
        await member.roles.add(guild.completedAdventureRoleId);
    } else {
        await giveWritePermissionsForUser(channel, userId);
    }

}

module.exports = {
    name: Events.MessageCreate,
    once: false,
    execute: execute,
};