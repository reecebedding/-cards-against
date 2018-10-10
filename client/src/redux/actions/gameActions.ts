import { GameKeys } from './actionKeys';
import { Action } from 'redux';
import { LobbyModel } from '../../models/LobbyModel';
import { GameModel } from '../../models/GameModel';

export interface IJoinedGame extends Action {
    game: LobbyModel
}
export function joinedGame(game: GameModel): IJoinedGame {
    return { type: GameKeys.JOINED_GAME, game }
}