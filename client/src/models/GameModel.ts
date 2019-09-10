import { PlayerModel } from "./PlayerModel";
import CardModel from "./CardModel";

export enum GameStatus {
    SETUP,
    PLAYING,
    ENDED
}

export interface GameModel {
    _id: string,
    name: string,
    players: PlayerModel[],
    blackCard: CardModel
    gameStatus: GameStatus
    hostId: string
}