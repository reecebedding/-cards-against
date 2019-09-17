import { Dispatch } from "redux";
import { ChatMessage } from "../../models/ChatMessage";
import { chatMessageRecieved } from "../../components/Shared/Chat/redux/actions";


export function init(socket: SocketIOClient.Socket, dispatch: Dispatch<any>){
    socket.on("CHAT_MESSAGE_RECIEVED", (chatMessage: ChatMessage) => { dispatch(chatMessageRecieved(chatMessage)) });
};