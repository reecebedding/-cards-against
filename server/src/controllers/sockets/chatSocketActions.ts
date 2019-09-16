import { Server } from "socket.io";
import { ChatManager } from "../../managers/chatManager";
import { ChatMessageModel, ChatScope } from "../../models/ChatMessageModel";
import { plainToClass } from "class-transformer";
import { ChatMessageDTO } from "../dtoModels/chatMessageDTO";

export class ChatSocketActions {
    static init(socket_server: Server, socket: SocketIO.Socket){
        socket.on('SEND_CHAT_MESSAGE', async (chatMessage: string, scope: string) => {
            ChatManager.sendMessage(chatMessage, (<any>ChatScope)[scope], socket, socket_server)
        }); 
    }
    static emitMessageRecieved(chatMessage: ChatMessageModel, socketServer: Server){
        const chatMessageDto = plainToClass(ChatMessageDTO, chatMessage);
        chatMessageDto.scope = ChatScope[chatMessage.scope];
        switch (chatMessage.scope){
            case ChatScope.GLOBAL:
                socketServer.emit("CHAT_MESSAGE_RECIEVED", chatMessageDto);
            break;
            case ChatScope.GAME:
                socketServer.to(chatMessage.gameId).emit("CHAT_MESSAGE_RECIEVED", chatMessageDto);
            break;
        }
    }
}