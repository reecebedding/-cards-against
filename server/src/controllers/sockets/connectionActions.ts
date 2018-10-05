import { Socket, Server } from "socket.io";
import { GameModel } from "../../models/GameModel";
import { LobbyActions } from "./lobbyActions";
import { Player } from "../../database/Player";
import { Game } from "../../database/Game";

export class ConnectionActions {
    static init(socket_server: Server, socket: SocketIO.Socket){
        socket.on('disconnect', async () => {
            console.log(`User '${socket.id}' disconnected`)           

            const socketGames = await Player.findGames(socket.id);
            socketGames.forEach(async(game: GameModel) => {
                socket_server.to(game._id).emit("USER_LEFT", socket.id);
                if(game.players.length == 1) {
                    //Remove game from DB as there will be no users left.
                    await Game.remove(game._id);
                }else{
                    game.players = game.players.filter((player) => player.id !== socket.id)
                    await Game.update(game);
                }
            })
        });
    }
}