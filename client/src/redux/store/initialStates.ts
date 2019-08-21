import { IGameState, ILobbyState } from './IStoreStates'
import * as gameStatus from '../../constants/gameStatusConstants';
import { GameStatus } from '../../models/GameModel';

export const gameState: IGameState = {
    activeGame: {
        _id: '',
        name: '',
        players: [],
        gameStatus: GameStatus.SETUP,
        hostId: ''
    }
}

export const lobbyState: ILobbyState = {
    lobbies: []
}