import { PlayerModel } from "./PlayerModel";
import CardModel from "./CardModel";

export enum GameStatus {
    SETUP,
    PLAYING,
    ENDED
}

export enum RoundStatus {
    PLAYER_SELECT,
    CZAR_SELECT
}

export class GameModel {
    name: string = ''
    gameStatus: GameStatus
    roundStatus: RoundStatus
    hostId: string
    czarId: string
    _id: string = ''
    blackCard: CardModel
    players: PlayerModel[] = []
    roundCount: number = 1
}