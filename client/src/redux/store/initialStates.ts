import { IGameState, ILobbyState, IChatState } from './IStoreStates'
import * as gameStatus from '../../constants/gameStatusConstants';
import { GameStatus, RoundStatus } from '../../models/GameModel';

export const gameState: IGameState = {
    activeGame: {
        _id: '',
        name: '',
        players: [],
        gameStatus: GameStatus.SETUP,
        hostId: '',
        czarId: '',
        roundStatus: RoundStatus.PLAYER_SELECT, 
        blackCard: null
    }
}

export const lobbyState: ILobbyState = {
    lobbies: []
}

export const chatState: IChatState = {
    chatHistory: []
}