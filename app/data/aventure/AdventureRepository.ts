import { run } from "../connector";
import { Adventure } from "./Adventure";

export function createAdventure(adventure: Adventure): number | bigint {
  const result = run(
    "INSERT INTO adventures (user_id, guilde_id, channel_id) VALUES (?,?,?)",
    adventure.userId,
    adventure.guildId,
    adventure.channelId
  );
  if (result.changes != 1) {
    throw new Error("Unexpected result changes while inserting adventure");
  }
  return result.lastInsertRowid;
}
