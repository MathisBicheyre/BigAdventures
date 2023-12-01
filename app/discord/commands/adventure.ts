import { CommandInteraction, SlashCommandBuilder } from "discord.js";

async function execute(interaction: CommandInteraction) {
  console.log(
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
