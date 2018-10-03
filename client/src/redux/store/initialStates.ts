import { IGameState, ILobbyState } from './IStoreStates'
import * as gameStatus from '../../constants/gameStatusConstants';

export const gameState: IGameState = {
    gameStatus: gameStatus.SETTING_UP,
    users: []
}

export const lobbyState: ILobbyState = {
    lobbies: []
}