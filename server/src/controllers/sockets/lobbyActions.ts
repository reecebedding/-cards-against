import { GameModel } from "../../models/GameModel";
import { Server } from "socket.io";
import { Game } from "../../database/Game";
import { plainToClass } from "class-transformer"
import { GameManager } from "../../managers/gameManager";

export class LobbyActions {
    static init(socket_server: Server, socket: SocketIO.Socket){
        socket.on('CREATE_NEW_GAME', async (game: GameModel, response:(game: GameModel) => void) => {
            const newGame = plainToClass(GameModel, game);
            
            GameManager.createGame(newGame, socket);     
            GameManager.joinGame(newGame._id, socket);
           
            response(newGame);

            socket_server.emit('NEW_GAME_CREATED', newGame);
        });

        socket.on('LOAD_LOBBIES', async (response: (data:any) => any) => {
            response(await Game.find());
        });

        socket.on('JOIN_GAME', async(gameId: string, response:(game: GameModel) => void) => {
            const game = await GameManager.joinGame(gameId, socket);
            response(game);
        });
    }
}

