import Database, {RunResult} from 'better-sqlite3';

const db = new Database('./db/BigAdventures.sqlite', {});
db.pragma('journal_mode = WAL');

export function findOne(query: string, ...params: any[]): unknown {
    return db.prepare(query).get(...params);
}

export function findAll(query: string, ...params: any[]): unknown[] {
    return db.prepare(query).all(...params);
}

export function run(query: string, ...params: any[]): RunResult {
    return db.prepare(query).run(...params);
}