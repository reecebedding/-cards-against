import { GameKeys } from './actionKeys';
import { Action } from 'redux';

export interface IStartNewGame extends Action {}
export function startNewGameSuccess(): IStartNewGame {
    return { type: GameKeys.START_NEW_GAME }
}
