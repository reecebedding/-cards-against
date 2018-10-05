import { GameModel } from "../../models/GameModel";
import { Server } from "socket.io";
import { Game } from "../../database/Game";
import { plainToClass } from "class-transformer"

export class LobbyActions {
    static init(socket_server: Server, socket: SocketIO.Socket){
        socket.on('CREATE_NEW_GAME', async (game: GameModel) => {
            const newGame = plainToClass(GameModel, game);

            newGame._id = createGameID();
            newGame.players.push({ id: socket.id });
            socket.join(newGame._id);

            await Game.create(newGame);

            console.log(`Game '${newGame.name}' created`);
            socket_server.emit('NEW_GAME_CREATED', newGame);
        });
    }
}

function createGameID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}