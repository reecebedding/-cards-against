import { LobbyKeys } from './actionKeys';
import { Action, Dispatch } from 'redux';
import { LobbyModel } from '../../models/LobbyModel';
import * as lobbySocket from '../../socket/actions/lobbyActions';

export interface ICreateNewGameAction extends Action {
    game: LobbyModel
}
export function createNewGameSuccess(game: LobbyModel): ICreateNewGameAction {
    return { type: LobbyKeys.CREATE_NEW_GAME, game}
}

export function createNewGame(socket: SocketIOClient.Socket, game: LobbyModel) {
    return function(dispatch: Dispatch) {
        lobbySocket.createNewGame(socket, game);
    }
}

export interface ILoadLobbies extends Action {
    games: LobbyModel[]
}
export function loadLobbies(games: LobbyModel[]): ILoadLobbies {
    return { type: LobbyKeys.LOAD_LOBBIES, games }
}

export interface ILobbyRemoved extends Action {
    game: LobbyModel
}
export function lobbyRemoved(game: LobbyModel): ILobbyRemoved {
    return { type: LobbyKeys.LOBBY_REMOVED, game }
}