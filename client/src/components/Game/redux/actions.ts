import { GameKeys } from './keys';
import { Action, Dispatch } from 'redux';
import { LobbyModel } from '../../../models/LobbyModel';
import { GameModel } from '../../../models/GameModel';
import { PlayerModel } from '../../../models/PlayerModel';
import * as lobbySocket from '../../../socket/actions/lobbyActions';

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