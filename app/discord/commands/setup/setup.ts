import {
  CommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
} from "discord.js";

import { findGuild, createGuild } from "../../../data/guild/GuildRepository";
import { Guild } from "../../../data/guild/guild";
import { createChannelCategory } from "../../channels";
import { info } from "../../../logger/logger";

async function execute(interaction: CommandInteraction) {
  if (!interaction.guild || !interaction.guildId) {
    throw new Error("No guild id for interaction");
  }
  info("Setting up bot for server [%s]", interaction.guildId);

  if (interaction.guildId && findGuild(interaction.guildId)) {
    interaction.reply("Le serveur est déjà configuré !");
  } else {
    const channels = interaction.guild.channels;

    const parent = await createChannelCategory("Aventures en cours", channels);
    const archive = await createChannelCategory(
      "Aventures terminées",
      channels
    );

    createGuild(new Guild(interaction.guildId, parent.id, archive.id));

    interaction.reply(
      "Tout est prêt, il ne manque plus que des aventuriers... "
    );
  }
}

export const command = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Configurer pour le serveur")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  execute: execute,
};
