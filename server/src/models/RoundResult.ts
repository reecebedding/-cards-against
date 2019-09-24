import { ChosenCardModel } from "./ChosenCardModel"
import { PlayerModel } from "./PlayerModel"

export class RoundResult {
    winningPlayer: PlayerModel
    winningCards: ChosenCardModel[]
}