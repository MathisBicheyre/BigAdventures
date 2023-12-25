import {findAll, findOne, run} from "../connector";
import {Adventure} from "./adventure";

export function createAdventure(adventure: Adventure): number | bigint {
    const result = run(
        "INSERT INTO adventures (id, userId, guildId) VALUES (?,?,?)",
        adventure.id,
        adventure.userId,
        adventure.guildId
    );
    if (result.changes != 1) {
        throw new Error("Unexpected result changes while inserting adventure");
    }
    return result.lastInsertRowid;
}

export function findAdventureByUserId(userId: string): Adventure | null {
    return findOne("SELECT * from adventures WHERE userId = ?", userId) as Adventure | null;
}

export function findAllAdventuresByUserId(userId: string): Adventure[] | null {
    return findAll("SELECT * from adventures WHERE userId = ?", userId) as Adventure[] | null;
}
