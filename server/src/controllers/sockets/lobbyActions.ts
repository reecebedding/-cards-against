import { Game } from "../../models/Game";
import { Server } from "socket.io";

export class LobbyActions {
    static init(socket_server: Server, socket: SocketIO.Socket){
        socket.on('CREATE_NEW_GAME', (game: Game) => {
            game.id = createGameID();
            socket.join(game.id);

            console.log(`Game '${game.name}' created`);
            socket_server.emit('NEW_GAME_CREATED', game);
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