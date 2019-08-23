import { GameModel } from "../../models/GameModel";
import { Server } from "socket.io";
import { plainToClass } from "class-transformer"
import { PlayerModel } from "src/models/PlayerModel";
import { PlayerDTO } from "../dtoModels/playerDTO";
import { GameDTO } from "../dtoModels/gameDTO";
import CardDTO from "../dtoModels/cardDTO";

export class GameSocketActions {
    static init(socket_server: Server, socket: SocketIO.Socket){
        
    }

    static emitPlayerJoined(gameId: string, player: PlayerModel, socketServer: Server){
        const playerDto: PlayerDTO = plainToClass(PlayerDTO, player);
        socketServer.to(gameId).emit("GAME_PLAYER_JOINED", playerDto);
    }

    static emitPlayerLeft(gameId: string, player: PlayerModel, socketServer: Server){
        const playerDto: PlayerDTO = plainToClass(PlayerDTO, player);
        socketServer.to(gameId).emit("GAME_PLAYER_LEFT", playerDto);
    }

    static emitGameStarted(game: GameModel, socketServer: Server){
        const gameDto: GameDTO = plainToClass(GameDTO, game);
        socketServer.to(game._id).emit("GAME_STARTED", gameDto);
    }

    static emitPlayerGivenCard(player: PlayerModel, card: CardDTO, socketServer: Server){
        const cardDto: CardDTO = plainToClass(CardDTO, card);
        const playerDto: PlayerDTO = plainToClass(PlayerDTO, player);
        socketServer.sockets.sockets[player.id].emit("PLAYER_RECIEVED_CARD", playerDto, cardDto);
    }
}

