import { GameKeys } from './actionKeys';
import { Action } from 'redux';
import { LobbyModel } from '../../models/LobbyModel';
import { GameModel } from '../../models/GameModel';
import { PlayerModel } from '../../models/PlayerModel';

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