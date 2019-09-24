import CardModel from "./CardModel"
import { ChosenCardModel } from "./ChosenCardModel"

export class PlayerModel {
    id: string
    gameId: string
    cards: CardModel[]
    playedCards: ChosenCardModel[]
    score: number = 0
}