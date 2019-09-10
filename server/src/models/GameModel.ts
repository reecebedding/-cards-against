import { PlayerModel } from "./PlayerModel";
import CardModel from "./CardModel";

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
    blackCard: CardModel
    players: PlayerModel[] = []
}