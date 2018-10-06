import { Lobby } from "../../models/Lobby";

export interface IGameState {
    gameStatus: string,
    users: string[]
}

export interface ILobbyState {
    lobbies: Lobby[]
}