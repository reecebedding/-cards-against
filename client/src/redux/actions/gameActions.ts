import { GameKeys } from './actionKeys';
import { Action } from 'redux';
import { LobbyModel } from '../../models/LobbyModel';

export interface IJoinedGame extends Action {
    game: LobbyModel
}
export function joinedGame(game: LobbyModel): IJoinedGame {
    return { type: GameKeys.JOINED_GAME, game }
}