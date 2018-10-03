import { Game } from "../../models/Game";

export interface IGameState {
    gameStatus: string,
    users: string[]
}

export interface ILobbyState {
    lobbies: Game[]
}