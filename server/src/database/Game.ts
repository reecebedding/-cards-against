import { GameModel } from "../models/GameModel";
import { Database } from "./database";

export class Game {

    static async create(game: GameModel): Promise<void> {
        const db = await Database.db();
        await db.collection('games').insert(game);
    }
}