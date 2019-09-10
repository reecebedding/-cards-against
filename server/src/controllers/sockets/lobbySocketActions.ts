import { GameModel } from "../../models/GameModel";
import { Server } from "socket.io";
import { Game } from "../../database/Game";
import { plainToClass, plainToClassFromExist } from "class-transformer"
import { GameManager } from "../../managers/gameManager";
import { GameDTO } from "../dtoModels/gameDTO";

export class LobbySocketActions {
    static init(socket_server: Server, socket: SocketIO.Socket){
        socket.on('CREATE_NEW_GAME', async (game: GameModel, response:(game: GameDTO) => void) => {
            const newGame = plainToClass(GameModel, game);
            
            const createdGame: GameModel = await GameManager.createGame(newGame, socket);     
            const createdGameDto = plainToClass(GameDTO, createdGame);

            response(createdGameDto);
        });

        socket.on('LOAD_LOBBIES', async (response: (data:any) => GameDTO[]) => {
            const lobbies = await Game.find();
            const lobbiesDto = plainToClass(GameDTO, lobbies);
            response(lobbiesDto);
        });

        socket.on('JOIN_GAME', async(gameId: string, response:(game: GameDTO) => void) => {
            const game = await GameManager.joinGame(gameId, socket, socket_server);
            const gameDto = plainToClass(GameDTO, game);
            response(gameDto);
        });

        socket.on('START_GAME', async(gameId: string, response:(game: GameDTO) => void) => {
            const game = await GameManager.startGame(gameId, socket, socket_server);
            const gameDto = plainToClass(GameDTO, game);
            response(gameDto);
        });
    }

    static emitLobbyUpdated(game: GameModel, socketServer: Server){
        const dtoGame: GameDTO = plainToClass(GameDTO, game);
        socketServer.emit("LOBBY_UPDATED", dtoGame);
    }

    static emitLobbyRemoved(game: GameModel, socketServer: Server){
        const dtoGame: GameDTO = plainToClass(GameDTO, game);
        socketServer.emit("LOBBY_REMOVED", dtoGame);
    }
}

