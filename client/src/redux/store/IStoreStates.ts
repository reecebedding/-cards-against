import { LobbyModel } from "../../models/LobbyModel";
import { GameModel } from "../../models/GameModel";
import { ChatMessage } from "../../models/chatMessage";

export interface IGameState {
    activeGame: GameModel
}

export interface IChatState {
    chatHistory: ChatMessage[]
}

export interface ILobbyState {
    lobbies: LobbyModel[]
}