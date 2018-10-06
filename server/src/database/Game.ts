import { GameModel } from "../models/GameModel";
import { Database } from "./database";

export class Game {

    static async create(game: GameModel): Promise<void> {
        const db = await Database.db();
        await db.collection('games').insertOne(game);
    }

    static async remove(id: string): Promise<void> {        
        const db = await Database.db();
        await db.collection('games').deleteOne({_id: id});
    }

    static async update(game: GameModel): Promise<void> {
        const db = await Database.db();
        await db.collection('games').updateOne({_id: game._id}, { $set: game });
    }

    static async find(): Promise<GameModel[]> {
        const db = await Database.db();
        return await db.collection('games').find().toArray();
    }
}