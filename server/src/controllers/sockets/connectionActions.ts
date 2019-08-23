import { Server } from "socket.io";
import { GameManager } from "../../managers/gameManager";

export class ConnectionActions {
    static init(socket_server: Server, socket: SocketIO.Socket){
        socket.on('disconnect', async () => {
            console.log(`User '${socket.id}' disconnected`)           

            GameManager.disconnectUserFromGames(socket.id, socket_server);
        });
    }
}