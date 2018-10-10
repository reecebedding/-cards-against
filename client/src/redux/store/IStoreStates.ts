import { LobbyModel } from "../../models/LobbyModel";
import { GameModel } from "../../models/GameModel";

export interface IGameState {
    activeGame: GameModel
}

export interface ILobbyState {
    lobbies: LobbyModel[]
}