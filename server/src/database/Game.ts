import { GameModel } from "../models/GameModel";
import { Database } from "./database";
import { Db } from "mongodb";

export class Game {

    static async create(game: GameModel): Promise<void> {
        Database.execute(async (db: Db) => {
            await  db.collection('games').insertOne(game);
        });
    }

    static async remove(id: string): Promise<void> {      
        Database.execute(async (db: Db) => {
            await  db.collection('games').deleteOne({_id: id});
        });
    }

    static async update(game: GameModel): Promise<void> {
        Database.execute(async (db: Db) => {
            await db.collection('games').updateOne({_id: game._id}, { $set: game });
        });
    }

    static async find(): Promise<GameModel[]> {
        return Database.execute(async (db: Db) => {
            return await db.collection('games').find().toArray();
        });
    }
}