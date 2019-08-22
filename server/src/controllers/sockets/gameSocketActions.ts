import { GameModel } from "../../models/GameModel";
import { Server } from "socket.io";
import { Game } from "../../database/Game";
import { plainToClass } from "class-transformer"
import { GameManager } from "../../managers/gameManager";
import { PlayerModel } from "src/models/PlayerModel";

export class GameSocketActions {
    static init(socket_server: Server, socket: SocketIO.Socket){
        
    }

    static emitPlayerJoined(gameId: string, player: PlayerModel, socketServer: Server){
        socketServer.to(gameId).emit("GAME_PLAYER_JOINED", player);
    }

    static emitPlayerLeft(gameId: string, player: PlayerModel, socketServer: Server){
        socketServer.to(gameId).emit("GAME_PLAYER_LEFT", player);
    }

    static emitGameStarted(game: GameModel, socketServer: Server){
        socketServer.to(game._id).emit("GAME_STARTED", game);
    }
}

