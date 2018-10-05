import { Socket, Server } from "socket.io";
import { GameModel } from "../../models/GameModel";
import { LobbyActions } from "./lobbyActions";

export class ConnectionActions {
    static init(socket_server: Server, socket: SocketIO.Socket){
        socket.on('disconnect', function(){
            console.log(`User '${socket.id}' disconnected`)
            socket_server.emit("USER_LEFT", socket.id);
        });
    }
}