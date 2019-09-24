import { GameKeys } from './keys';
import { Action, Dispatch } from 'redux';
import { GameModel, RoundStatus } from '../../../models/GameModel';
import { PlayerModel } from '../../../models/PlayerModel';
import * as gameSocket from '../../../socket/actions/gameActions';
import CardModel from '../../../models/CardModel';
import { ChosenCardModel } from '../../../models/ChosenCardModel';
import RoundResult from '../../../models/RoundResult';

export interface IJoinedGame extends Action {
    game: GameModel
}
export function joinedGame(game: GameModel): IJoinedGame {
    return { type: GameKeys.JOINED_GAME, game }
}

export interface IPlayerJoined extends Action {
    player: PlayerModel
}
export function playerJoined(player: PlayerModel): IPlayerJoined {
    return { type: GameKeys.PLAYER_JOINED, player }
}

export interface IPlayerLeft extends Action {
    player: PlayerModel
}
export function playerLeft(player: PlayerModel): IPlayerLeft {
    return { type: GameKeys.PLAYER_LEFT, player }
}

export function startGame(socket: SocketIOClient.Socket, game: GameModel, started: (game: GameModel) => void) {
    return function(dispatch: Dispatch){
        gameSocket.startGame(socket, game, dispatch, started);
    }
}

export interface IGameStarted extends Action {
    game: GameModel
}
export function gameStarted (game: GameModel): IGameStarted {
    return { type: GameKeys.GAME_STARTED, game }
}

export interface IPlayerRecievedCard extends Action {
    player: PlayerModel,
    card: CardModel
}
export function playerRecievedCard (player: PlayerModel, card: CardModel): IPlayerRecievedCard {
    return { type: GameKeys.PLAYER_RECIEVED_CARD, player, card }
}

export interface IGameDealtBlackCard extends Action {
    card: CardModel
}
export function gameDealtBlackCard (card: CardModel): IGameDealtBlackCard {
    return { type: GameKeys.GAME_DEALT_BLACK_CARD, card }
}

export interface IPlayerChoseCards extends Action {
    playerId: string
}
export function playerChoseCards(playerId: string): IPlayerChoseCards {
    return { type: GameKeys.PLAYER_CHOSE_CARDS, playerId };
}

export interface IRoundStatusChanged extends Action { 
    roundStatus: RoundStatus
}
export function roundStatusChanged(roundStatus: RoundStatus): IRoundStatusChanged {
    return { type: GameKeys.ROUND_STATUS_CHANGED, roundStatus }
}

export function playCards(socket: SocketIOClient.Socket, gameId: string, cardIds: ChosenCardModel[]) {
    return function(dispatch: Dispatch){
        gameSocket.playCards(socket, gameId, cardIds, dispatch);
    }
}

export interface ICzarPickingCard extends Action {
    roundsSelectedCards: ChosenCardModel[][]
}
export function czarPickingCard(roundsSelectedCards: ChosenCardModel[][]): ICzarPickingCard {
    return { type: GameKeys.CZAR_PICKING_CARDS, roundsSelectedCards };
}

export function czarPickedCard(socket: SocketIOClient.Socket, gameId: string, cardId: string) {
    return function(dispatch: Dispatch){
        gameSocket.czarPickedCard(socket, gameId, cardId);
    }
}

export interface IRoundFinished extends Action {
    roundResult: RoundResult
}
export function roundFinished(roundResult: RoundResult): IRoundFinished {
    return { type: GameKeys.ROUND_FINISHED, roundResult }
}