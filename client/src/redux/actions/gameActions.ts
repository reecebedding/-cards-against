import { GameKeys } from './actionKeys';
import { Action } from 'redux';

export interface IStartNewGameAction extends Action {}
export function startNewGameSuccess(): IStartNewGameAction {
    return { type: GameKeys.START_NEW_GAME }
}

export interface IUserJoinedGameAction extends Action {
    user: any
}
export function userJoinedGameSuccess(user: any): IUserJoinedGameAction {
    return { type: GameKeys.USER_JOINED, user}
}

export interface IUserLeftGameAction extends Action {
    user: any
}
export function userLeftGameSuccess(user: any): IUserLeftGameAction {
    return { type: GameKeys.USER_LEFT, user }
}