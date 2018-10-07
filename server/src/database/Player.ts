import { Database } from "./database";
import { GameModel } from "../models/GameModel";
import { plainToClass } from "class-transformer";
import { Db } from "mongodb";

export class Player {

    static async findGames(id: string): Promise<GameModel[]> {
        return Database.execute(async (db: Db) => {
            return plainToClass(GameModel, await db.collection('games').find({"players": { $all: [{id:id}] }}).toArray());
        })
    }
}