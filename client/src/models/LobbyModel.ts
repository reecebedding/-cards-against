import { PlayerModel } from "./PlayerModel";

export interface LobbyModel {
    name: string,
    _id: string,
    players: PlayerModel[]
}