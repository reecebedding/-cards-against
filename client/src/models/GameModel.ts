import { PlayerModel } from "./PlayerModel";
import CardModel from "./CardModel";
import { ChosenCardModel } from "./ChosenCardModel";
import RoundResult from "./RoundResult";

export enum GameStatus {
    SETUP,
    PLAYING,
    ENDED
}

export enum RoundStatus {
    PLAYER_SELECT,
    CZAR_SELECT
}

export interface GameModel {
    _id: string,
    name: string,
    players: PlayerModel[],
    blackCard: CardModel
    gameStatus: GameStatus,
    roundStatus: RoundStatus,
    roundsSelectedCards: ChosenCardModel[][],
    hostId: string,
    czarId: string,
    roundResult: RoundResult
}