import {Events, GuildMember} from "discord.js";
import {findGuild} from "../../../data/guild/guild-repository";
import {info} from "#logger";
import {createAdventure, findAllAdventuresByUserId} from "../../../data/aventure/adventure-repository";
import {createPrivateTextChannel} from "../../channels";
import {Adventure} from "../../../data/aventure/adventure";
import {clientUser} from "../../connector";

async function execute(oldMember: GuildMember, newMember: GuildMember) {
    const guild = findGuild(oldMember.guild.id);
    if (guild && !oldMember.roles.cache.has(guild.adventureRoleId) && newMember.roles.cache.has(guild.adventureRoleId)) {
        info(
            "Starting a new adventure for user [%s - %s]",
            newMember.user.globalName,
            newMember.user.id
        );
        const nbPreviousAdventures = findAllAdventuresByUserId(newMember.id)?.length ?? 0;
        info(
            "Found %d previous adventures...",
            nbPreviousAdventures
        );

        const adventureChannel = await createPrivateTextChannel(
            `adventure-${newMember.user.id}-${nbPreviousAdventures + 1}`,
            guild.parentId,
            newMember.user.id,
            clientUser.id,
            newMember.guild.channels
        );

        createAdventure(new Adventure(adventureChannel.id, newMember.user.id, guild.id));
    }
}

module.exports = {
    name: Events.GuildMemberUpdate,
    once: false,
    execute: execute,
};