import {CommandInteraction, SlashCommandBuilder} from "discord.js";
import {info} from "#logger";
import {findGuild} from "app/data/guild/GuildRepository";
import {createPrivateTextChannel} from "app/discord/channels";
import {createAdventure, findAdventureByUserId} from "app/data/aventure/AdventureRepository";
import {Adventure} from "app/data/aventure/Adventure";

async function execute(interaction: CommandInteraction) {
    const guild = findGuild(interaction.guildId);
    if (!guild) {
        await interaction.reply(
            "Le serveur n'est pas préparé pour commencer ton aventure. Contacte un administrateur"
        );
    }
    if (findAdventureByUserId(interaction.user.id)) {
        await interaction.reply(
            "Tu as déjà commencé ton aventure."
        );
    }

    info(
        "Start a new adventure for user [%s - %s]",
        interaction.user.globalName,
        interaction.user.id
    );

    const adventureChannel = await createPrivateTextChannel(
        "aventure-".concat(interaction.user.id),
        guild.parentId,
        interaction.user.id,
        interaction.guild.channels
    );

    const adventure = createAdventure(
        new Adventure(interaction.user.id, interaction.guildId, adventureChannel.id)
    );

    adventureChannel.awaitMessages
    // When done
    await adventureChannel.setParent(guild.archiveId);
}

export const command = {
    data: new SlashCommandBuilder()
        .setName("adventure")
        .setDescription("Commencez votre aventure")
        .setDMPermission(false),
    execute: execute,
};
