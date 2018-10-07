import { GameModel } from "../../models/GameModel";
import { Server } from "socket.io";
import { Game } from "../../database/Game";
import { plainToClass } from "class-transformer"
import { GameManager } from "../../managers/gameManager";

export class LobbyActions {
    static init(socket_server: Server, socket: SocketIO.Socket){
        socket.on('CREATE_NEW_GAME', async (game: GameModel) => {
            const newGame = plainToClass(GameModel, game);
            
            GameManager.createGame(newGame, socket);     
            socket.join(newGame._id);
           
            socket_server.emit('NEW_GAME_CREATED', newGame);
        });

        socket.on('LOAD_LOBBIES', async (response: (data:any) => any) => {
            response(await Game.find());
        });
    }
}

