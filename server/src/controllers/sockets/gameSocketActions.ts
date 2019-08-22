import { GameModel } from "../../models/GameModel";
import { Server } from "socket.io";
import { plainToClass } from "class-transformer"
import { PlayerModel } from "src/models/PlayerModel";
import { PlayerDTO } from "../dtoModels/playerDTO";
import { GameDTO } from "../dtoModels/gameDTO";

export class GameSocketActions {
    static init(socket_server: Server, socket: SocketIO.Socket){
        
    }

    static emitPlayerJoined(gameId: string, player: PlayerModel, socketServer: Server){
        const dtoPlayer: PlayerDTO = plainToClass(PlayerDTO, player);
        socketServer.to(gameId).emit("GAME_PLAYER_JOINED", dtoPlayer);
    }

    static emitPlayerLeft(gameId: string, player: PlayerModel, socketServer: Server){
        const dtoPlayer: PlayerDTO = plainToClass(PlayerDTO, player);
        socketServer.to(gameId).emit("GAME_PLAYER_LEFT", dtoPlayer);
    }

    static emitGameStarted(game: GameModel, socketServer: Server){
        const dtoGame: GameDTO = plainToClass(GameDTO, game);
        socketServer.to(game._id).emit("GAME_STARTED", dtoGame);
    }
}

