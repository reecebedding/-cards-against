import { ChatScope, ChatMessageModel } from "../models/ChatMessageModel";
import { ChatSocketActions } from "../controllers/sockets/chatSocketActions";
import { Player } from "../database/Player";
import { Server } from "socket.io";

export class ChatManager {
    public static async sendMessage(chatMessage: string, scope: ChatScope, socket: SocketIO.Socket, socketServer: Server){
        let gameId: string = null;
        if (scope === ChatScope.GAME){
            const game = await Player.findGames(socket.id);
            gameId = (game) ? game[0]._id : null;
        }
        const fullMessage: ChatMessageModel = {
            date: Date.now(),
            message: chatMessage,
            sender: socket.id,
            scope: scope
        };
        ChatSocketActions.emitMessageRecieved(fullMessage, gameId, socketServer);
    }
}