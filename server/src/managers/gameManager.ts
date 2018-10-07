import { GameModel } from "../models/GameModel";
import { Game } from "../database/Game";
import { Player } from "../database/Player";
import { Server } from "socket.io";

export class GameManager {
    public static async createGame(newGame: GameModel, socket: SocketIO.Socket): Promise<GameModel> {
        newGame._id = createGameID();
        
        const game = await Game.create(newGame);
        console.log(`Game '${newGame.name}' created`);

        return game;
    }

    public static async joinGame(gameId: string, socket: SocketIO.Socket): Promise<GameModel> {
        const game = await Game.findById(gameId);
        if(!game.players.some(x => x.id === socket.id)){
            game.players.push({ id: socket.id });

            socket.join(game._id);    
            return await Game.update(game);
        } else {
            return game;
        }
    }

    public static async disconnectUserFromGames(userId: string, socketServer: Server): Promise<void> {
        const socketGames = await Player.findGames(userId);

        socketGames.forEach(async(game: GameModel) => {
            if(game.players.length == 1) {
                //Remove game from DB as there will be no users left.
                await Game.remove(game._id);
                console.log(`Game '${game.name} closed`)
                socketServer.emit("LOBBY_REMOVED", game);
            }else{
                game.players = game.players.filter((player) => player.id !== userId)
                await Game.update(game);
            }
        })
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