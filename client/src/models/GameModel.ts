import { PlayerModel } from "./PlayerModel";

export enum GameStatus {
    SETUP,
    PLAYING,
    ENDED
}

export interface GameModel {
    _id: string,
    name: string,
    players: PlayerModel[],
    gameStatus: GameStatus,
    hostId: string
}