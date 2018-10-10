import { PlayerModel } from "./PlayerModel";

export interface GameModel {
    _id: string,
    name: string,
    players: PlayerModel[]
}