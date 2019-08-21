import { GameModel, GameStatus } from "../models/GameModel";
import { Game } from "../database/Game";
import { Player } from "../database/Player";
import { Server } from "socket.io";
import { PlayerModel } from "src/models/PlayerModel";
import { CardsManager } from "./cardsManager";

export class GameManager {
    public static async createGame(newGame: GameModel, socket: SocketIO.Socket): Promise<GameModel> {
        newGame._id = createGameID();
        newGame.hostId = socket.id;
        newGame.gameStatus = GameStatus.SETUP;

        const game = await Game.create(newGame);
        console.log(`Game '${newGame.name}' created`);

        return game;
    }

    public static async startGame(gameId: string, socket: SocketIO.Socket, socketServer: Server): Promise<GameModel>{
        const game: GameModel = await Game.findById(gameId);
        //Only allow the game to be started by the host
        if(game.hostId === socket.id)
        {
            game.gameStatus = GameStatus.PLAYING;
            const updatedGame: GameModel = await Game.update(game);
            socketServer.emit("LOBBY_UPDATED", updatedGame);
            socketServer.to(gameId).emit("GAME_STARTED", game);
            return updatedGame;
        }
        return game;
    }

    public static async joinGame(gameId: string, socket: SocketIO.Socket, socketServer: Server): Promise<GameModel> {
        const game = await Game.findById(gameId);
        const playerId = socket.id;
        if(!game.players.some(x => x.id === playerId)){
            const player:PlayerModel = { id: playerId, gameId: gameId, cards: []};
            game.players.push(player);

            socket.join(game._id);    
            const updatedGame: GameModel = await Game.update(game);

            socketServer.emit("LOBBY_UPDATED", updatedGame);
            socketServer.to(gameId).emit("GAME_PLAYER_JOINED", player);
            
            return updatedGame;
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
                const player: Player = { id: userId };
                game.players = game.players.filter((player) => player.id !== userId);
                const updatedGame: GameModel = await Game.update(game);

                socketServer.to(updatedGame._id).emit("GAME_PLAYER_LEFT", player);
                socketServer.emit("LOBBY_UPDATED", updatedGame);    
                return updatedGame;
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