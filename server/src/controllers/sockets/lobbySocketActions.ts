import { GameModel } from "../../models/GameModel";
import { Server } from "socket.io";
import { Game } from "../../database/Game";
import { plainToClass } from "class-transformer"
import { GameManager } from "../../managers/gameManager";

export class LobbySocketActions {
    static init(socket_server: Server, socket: SocketIO.Socket){
        socket.on('CREATE_NEW_GAME', async (game: GameModel, response:(game: GameModel) => void) => {
            const newGame = plainToClass(GameModel, game);
            
            const createdGame: GameModel = await GameManager.createGame(newGame, socket);     
           
            response(createdGame);
        });

        socket.on('LOAD_LOBBIES', async (response: (data:any) => any) => {
            response(await Game.find());
        });

        socket.on('JOIN_GAME', async(gameId: string, response:(game: GameModel) => void) => {
            const game = await GameManager.joinGame(gameId, socket, socket_server);
            response(game);
        });

        socket.on('START_GAME', async(gameId: string, response:(game: GameModel) => void) => {
            const game = await GameManager.startGame(gameId, socket, socket_server);
            response(game);
        });
    }

    static emitLobbyUpdated(game: GameModel, socketServer: Server){
        socketServer.emit("LOBBY_UPDATED", game);
    }

    static emitLobbyRemoved(game: GameModel, socketServer: Server){
        socketServer.emit("LOBBY_REMOVED", game);
    }
}

