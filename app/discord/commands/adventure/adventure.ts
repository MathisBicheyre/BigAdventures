import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { info } from "#logger";

async function execute(interaction: CommandInteraction) {
  info(
    "Start a new adventure for user [%s - %s]",
    interaction.user.globalName,
    interaction.user.id
  );
  interaction.guild.channels.create({
    name: "adventure",
  });
}

export const command = {
  data: new SlashCommandBuilder()
    .setName("adventure")
    .setDescription("Commencez votre aventure"),
  execute: execute,
};
