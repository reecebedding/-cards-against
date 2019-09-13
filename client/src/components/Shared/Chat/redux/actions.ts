import { Action, Dispatch } from "redux";
import { ChatMessage } from "../../../../models/chatMessage";
import * as chatSocket from '../../../../socket/actions/chatActions';
import { ChatKeys } from "./keys";

export interface IChatMessageRecieved extends Action {
    chatMessage: ChatMessage
}
export function chatMessageRecieved(chatMessage: ChatMessage): IChatMessageRecieved {
    return { type: ChatKeys.RECIEVED_CHAT_MESSAGE, chatMessage }
}

export function sendChatMessage(socket: SocketIOClient.Socket, chatMessage: string, scope: string) {
    return function(dispatch: Dispatch) {
        chatSocket.sendChatMessage(socket, chatMessage, scope);
    }
}