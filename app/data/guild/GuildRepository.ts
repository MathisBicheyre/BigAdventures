import { Guild } from "./guild";
import { findOne, run } from "../connector";

export function createGuild(guild: Guild) {
  const result = run(
    "INSERT INTO guilds (id, parent_id, archive_id) VALUES (?,?,?)",
    guild.id,
    guild.parentId,
    guild.archiveId
  );
  if (result.changes != 1) {
    throw new Error("Unexpected result changes while inserting guild");
  }
}

export function findGuild(guildId: string): Guild | null {
  return findOne("SELECT * FROM guilds WHERE id = ?", guildId) as Guild | null;
}
