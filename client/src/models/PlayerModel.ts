import CardModel from "./CardModel";

export interface PlayerModel {
    id: string,
    cards: CardModel[],
    playedCards: number
}