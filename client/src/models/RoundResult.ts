import { PlayerModel } from "./PlayerModel"
import { ChosenCardModel } from "./ChosenCardModel"

export default class RoundResult {
    winningPlayer: PlayerModel
    winningCards: ChosenCardModel[]
}