import {Guild} from "./guild";
import {findOne, run} from "../connector";

let loadedGuilds: Map<string, Guild> = new Map<string, Guild>();

export function createGuild(guild: Guild) {
    const result = run(
        "INSERT INTO guilds (id, parentId, archiveId, adventureRoleId, completedAdventureRoleId) VALUES (?,?,?,?,?)",
        guild.id,
        guild.parentId,
        guild.archiveId,
        guild.adventureRoleId,
        guild.completedAdventureRoleId
    );
    if (result.changes != 1) {
        throw new Error("Unexpected result changes while inserting guild");
    }
}

export function findGuild(guildId: string): Guild | null {
    const cachedGuild = loadedGuilds.get(guildId);
    if (cachedGuild) return cachedGuild;

    const dbGuild = findOne("SELECT * FROM guilds WHERE id = ?", guildId) as Guild | null;
    if (dbGuild) loadedGuilds = loadedGuilds.set(guildId, dbGuild);
    return dbGuild;
}
