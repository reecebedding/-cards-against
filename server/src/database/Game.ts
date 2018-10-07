import { GameModel } from "../models/GameModel";
import { Database } from "./database";
import { Db } from "mongodb";

export class Game {

    static async create(game: GameModel): Promise<GameModel> {
        return Database.execute(async (db: Db) => {
            await db.collection('games').insertOne(game);
            return this.findById(game._id);
        });
    }

    static async remove(id: string): Promise<void> {      
        Database.execute(async (db: Db) => {
            await  db.collection('games').deleteOne({_id: id});
        });
    }

    static async update(game: GameModel): Promise<GameModel> {
        return Database.execute(async (db: Db) => {
            await db.collection('games').updateOne({_id: game._id}, { $set: game });
            return await this.findById(game._id);
        });
    }

    static async find(): Promise<GameModel[]> {
        return Database.execute(async (db: Db) => {
            return await db.collection('games').find().toArray();
        });
    }

    static async findById(id: string): Promise<GameModel> {
        return Database.execute(async (db: Db) => {
            return await db.collection<GameModel>('games').findOne({_id:id});
        });
    }
}