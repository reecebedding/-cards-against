import { Server, Socket } from "socket.io";
import { ConnectionActions } from "./connectionActions";
import { LobbySocketActions } from "./lobbySocketActions";
import { GameSocketActions } from "./gameSocketActions";
import { ChatSocketActions } from "./chatSocketActions"

export class SocketManager {
    static initListeners(socket_server: Server){
        socket_server.on('connection', function(socket: Socket){
            console.log(`User '${socket.id}' connected`);
            socket_server.emit("USER_JOINED", socket.id);

            ConnectionActions.init(socket_server, socket);
            LobbySocketActions.init(socket_server, socket);
            GameSocketActions.init(socket_server, socket);
            ChatSocketActions.init(socket_server, socket);
        });
    }
}