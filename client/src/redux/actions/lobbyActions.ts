import { LobbyKeys } from './actionKeys';
import { Action, Dispatch } from 'redux';
import { Lobby } from '../../models/Lobby';
import * as lobbySocket from '../../socket/actions/lobbyActions';

export interface ICreateNewGameAction extends Action {
    game: Lobby
}
export function createNewGameSuccess(game: Lobby): ICreateNewGameAction {
    return { type: LobbyKeys.CREATE_NEW_GAME, game}
}

export function createNewGame(socket: SocketIOClient.Socket, game: Lobby) {
    return function(dispatch: Dispatch) {
        lobbySocket.createNewGame(socket, game);
    }
}

export interface ILoadLobbies extends Action {
    games: Lobby[]
}
export function loadLobbies(games: Lobby[]): ILoadLobbies {
    return { type: LobbyKeys.LOAD_LOBBIES, games }
}