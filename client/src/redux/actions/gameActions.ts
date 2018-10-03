import { GameKeys } from './actionKeys';
import { Action } from 'redux';

export interface IUserJoinedGameAction extends Action {
    user: any
}
export function userJoinedGame(user: any): IUserJoinedGameAction {
    return { type: GameKeys.USER_JOINED, user}
}

export interface IUserLeftGameAction extends Action {
    user: any
}
export function userLeftGame(user: any): IUserLeftGameAction {
    return { type: GameKeys.USER_LEFT, user }
}