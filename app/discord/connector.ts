import fs from "fs";
import path from "path";
import { Client, Collection, Events, GatewayIntentBits } from "discord.js";

import { warning, info } from "#logger";

export default function connectToDiscord() {
  const token = process.env.DISCORD_API_KEY;
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  const foldersPath = path.join(__dirname, "commands");
  const commandFolders = fs.readdirSync(foldersPath);
  const commands = new Collection();

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath); //.filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      if ("data" in command && "execute" in command) {
        info("Successfully parsed command %s", command.data.name);
        commands.set(command.data.name, command);
      } else {
        warning(
          "The command at %s is missing a required data or execute property",
          filePath
        );
      }
    }
  }

  client.once(Events.ClientReady, (readyClient) => {
    info(`Ready! Logged in as ${readyClient.user.tag}`);
  });

  client.login(token);
}
