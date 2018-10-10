import { IGameState, ILobbyState } from './IStoreStates'
import * as gameStatus from '../../constants/gameStatusConstants';

export const gameState: IGameState = {
    activeGame: {
        _id: '',
        name: '',
        players: []
    }
}

export const lobbyState: ILobbyState = {
    lobbies: []
}