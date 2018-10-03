import { LobbyKeys } from './actionKeys';
import { Action, Dispatch } from 'redux';
import { Game } from '../../models/Game';
import * as lobbySocket from '../../socket/actions/lobbyActions';

export interface ICreateNewGameAction extends Action {
    game: Game
}
export function createNewGameSuccess(game: Game): ICreateNewGameAction {
    return { type: LobbyKeys.CREATE_NEW_GAME, game}
}

export function createNewGame(socket: SocketIOClient.Socket, game: Game) {
    return function(dispatch: Dispatch) {
        lobbySocket.createNewGame(socket, game);
    }
}