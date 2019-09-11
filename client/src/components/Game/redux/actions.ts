import { GameKeys } from './keys';
import { Action, Dispatch } from 'redux';
import { GameModel } from '../../../models/GameModel';
import { PlayerModel } from '../../../models/PlayerModel';
import * as lobbySocket from '../../../socket/actions/gameActions';
import CardModel from '../../../models/CardModel';

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
        lobbySocket.startGame(socket, game, dispatch, started);
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

export interface IPlayerChoseCard extends Action {
    playerId: string
}
export function playerChoseCard(playerId: string): IPlayerChoseCard {
    return { type: GameKeys.PLAYER_CHOSE_CARD, playerId };
}

export function playCard(socket: SocketIOClient.Socket, gameId: string, cardId: String) {
    return function(dispatch: Dispatch){
        lobbySocket.playCard(socket, gameId, cardId, dispatch);
    }
}