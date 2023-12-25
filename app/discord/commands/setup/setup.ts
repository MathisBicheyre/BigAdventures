import {
    ChannelType,
    CommandInteraction,
    PermissionFlagsBits,
    PermissionsBitField,
    SlashCommandBuilder,
} from "discord.js";

import {createGuild, findGuild} from "../../../data/guild/guild-repository";
import {Guild} from "../../../data/guild/guild";
import {info} from "#logger";

async function execute(interaction: CommandInteraction) {
    if (!interaction.guild || !interaction.guildId) {
        throw new Error("No guild id for interaction");
    }
    info("Setting up bot for server [%s]", interaction.guildId);

    if (interaction.guildId && findGuild(interaction.guildId)) {
        return await interaction.reply("Le serveur est déjà configuré !");
    }

    const adventurerRole = await interaction.guild.roles.create({
        // @ts-ignore
        name: interaction.options.getString('adventurerolename')
    });

    const accomplishedAdventurerRole = await interaction.guild.roles.create({
        // @ts-ignore
        name: interaction.options.getString('accomplishedadventurerrolename')
    });

    const channels = interaction.guild.channels;

    const parent = await channels.create({
        name: "Aventures en cours",
        type: ChannelType.GuildCategory,
        permissionOverwrites: [
            {
                id: interaction.guildId,
                deny: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel]
            },
        ]
    });
    const archive = await channels.create({
        name: "Aventures terminées",
        type: ChannelType.GuildCategory,
        permissionOverwrites: [
            {id: channels.guild.id, deny: [PermissionsBitField.Flags.SendMessages]},
            {id: accomplishedAdventurerRole.id, allow: [PermissionsBitField.Flags.ViewChannel]}
        ]
    });


    createGuild(new Guild(interaction.guildId, parent.id, archive.id, adventurerRole.id, accomplishedAdventurerRole.id));

    return await interaction.reply(
        "Tout est prêt, il ne manque plus que des aventuriers... "
    );
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setup")
        .setDescription("Configurer pour le serveur")
        .addStringOption(option =>
            option.setName('adventurerolename')
                .setDescription('Le nom du rôle donné aux nouveaux arrivants')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('accomplishedadventurerrolename')
                .setDescription('Le nom du rôle donné à ceux ayant complété leur aventure')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),
    execute: execute,
};
