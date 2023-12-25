import fs from "fs";
import path from "path";
import {Client, ClientUser, Collection, Events, GatewayIntentBits} from "discord.js";

import {info, warning} from "#logger";

export let clientUser: ClientUser;

export default function connectToDiscord() {
    const token = process.env.DISCORD_API_KEY;
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.MessageContent
        ]
    });

    const commandFoldersPath = path.join(__dirname, "commands");
    const commandFolders = fs.readdirSync(commandFoldersPath);
    const commands = new Collection();

    for (const folder of commandFolders) {
        const commandsPath = path.join(commandFoldersPath, folder);
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

    client.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isChatInputCommand()) return;

        const command = commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            // @ts-ignore
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: 'There was an error while executing this command!',
                    ephemeral: true
                });
            } else {
                await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
            }
        }
    });

    const eventsFoldersPaths = path.join(__dirname, 'events');
    const eventFolders = fs.readdirSync(eventsFoldersPaths);

    for (const folder of eventFolders) {
        const eventsPath = path.join(eventsFoldersPaths, folder);
        const eventFiles = fs.readdirSync(eventsPath);
        for (const file of eventFiles) {
            const filePath = path.join(eventsPath, file);
            const event = require(filePath);
            if ("name" in event && "once" in event && "execute" in event) {
                info("Successfully parsed event %s", event.name);
                if (event.once) {
                    client.once(event.name, (...args) => event.execute(...args));
                } else {
                    client.on(event.name, (...args) => event.execute(...args));
                }
            } else {
                warning(
                    "The event at %s is missing a required property",
                    filePath
                )
            }
        }
    }

    client.once(Events.ClientReady, (readyClient) => {
        info(`Ready! Logged in as ${readyClient.user.tag}`);
    });

    client.login(token).then(r => {
        clientUser = client.user;
    });
}
