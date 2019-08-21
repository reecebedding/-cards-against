import { Database } from "./Database";
import * as GameDatabase from './Game';
import { GameModel } from "../models/GameModel";
import { plainToClass } from "class-transformer";
import { Db } from "mongodb";
import { PlayerModel } from "src/models/PlayerModel";

export class Player {

    static async findGames(id: string): Promise<GameModel[]> {
        return Database.execute(async (db: Db) => {
            return plainToClass(GameModel, await db.collection('games').find({"players": { $all: [{id:id}] }}).toArray());
        })
    }

    static async update(player: PlayerModel): Promise<GameModel> {
        return Database.execute(async (db: Db) => {
            await db.collection('games').updateOne({_id: player.gameId, "players.id": player.id}, { $set: { "players.$": player } });
            return await GameDatabase.Game.findById(player.gameId);
        });
    }
}