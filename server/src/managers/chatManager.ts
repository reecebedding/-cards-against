import { ChatScope, ChatMessageModel } from "../models/ChatMessageModel";
import { ChatSocketActions } from "../controllers/sockets/chatSocketActions";
import { Player } from "../database/Player";
import { Server } from "socket.io";
import { ChatValidator, CanPlayerSendMessageResult } from "./validators/chatValidator";
import { GameModel } from "src/models/GameModel";

export class ChatManager {
    public static async sendMessage(chatMessage: string, scope: ChatScope, socket: SocketIO.Socket, socketServer: Server){
        let game: GameModel = null;
        if (scope === ChatScope.GAME){
            const games = await Player.findGames(socket.id);
            game = games ? games[0] : null;            
        }
        
        const fullMessage: ChatMessageModel = {
            date: Date.now(),
            message: chatMessage,
            sender: socket.id,
            scope: scope,
            gameId: (game) ? game._id : null
        };
        if(await ChatValidator.canPlayerSendMessage(fullMessage) === CanPlayerSendMessageResult.YES){
            ChatSocketActions.emitMessageRecieved(fullMessage, socketServer);
        }
    }
}