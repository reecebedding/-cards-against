import { IGameState, ILobbyState } from './IStoreStates'
import * as gameStatus from '../../constants/gameStatusConstants';

export const gameState: IGameState = {
    activeGame: {
        _id: '',
        name: ''
    }
}

export const lobbyState: ILobbyState = {
    lobbies: []
}