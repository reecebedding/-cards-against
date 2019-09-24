import { IGameState, ILobbyState, IChatState } from './IStoreStates'
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
        roundsSelectedCards: [],
        blackCard: null,
        roundResult: null
    }
}

export const lobbyState: ILobbyState = {
    lobbies: []
}

export const chatState: IChatState = {
    chatHistory: []
}