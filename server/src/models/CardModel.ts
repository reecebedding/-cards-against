export enum CardType {
    Black,
    White
}

export default class CardModel {
    type?: CardType = CardType.White
    requiredAnswers?: Number = 1
    text: string = ''
}