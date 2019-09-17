import { LobbyModel } from "../../models/LobbyModel";
import { GameModel } from "../../models/GameModel";
import { ChatMessage } from "../../models/ChatMessage";

export interface IGameState {
    activeGame: GameModel
}

export interface IChatState {
    chatHistory: ChatMessage[]
}

export interface ILobbyState {
    lobbies: LobbyModel[]
}