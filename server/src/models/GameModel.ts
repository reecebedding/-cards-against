import { PlayerModel } from "./PlayerModel";

export enum GameStatus {
    SETUP,
    PLAYING,
    ENDED
}

export class GameModel {
    name: string = ''
    gameStatus: GameStatus
    hostId: string
    _id: string = ''
    players: PlayerModel[] = []
}