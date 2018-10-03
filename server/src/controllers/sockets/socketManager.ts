import { Server, Socket } from "socket.io";
import { ConnectionActions } from "./connectionActions";
import { LobbyActions } from "./lobbyActions";

export class SocketManager {
    static initListeners(socket_server: Server){
        socket_server.on('connection', function(socket: Socket){
            console.log(`User '${socket.id}' connected`);
            socket_server.emit("USER_JOINED", socket.id);

            ConnectionActions.init(socket_server, socket);
            LobbyActions.init(socket_server, socket);
        });
    }
}