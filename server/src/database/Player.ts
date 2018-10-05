import { Database } from "./database";
import { GameModel } from "../models/GameModel";
import { plainToClass } from "class-transformer";

export class Player {

    static async findGames(id: string): Promise<GameModel[]> {
        const db = await Database.db();
        var games = plainToClass(GameModel, await db.collection('games').find({"players": { $all: [{id:id}] }}).toArray());
        return games;
    }
}