import * as lobbyResponses from './lobbyResponses';
import * as gameResponses from './gameResponses';
import * as chatReponses from './chatResponses';
import { Dispatch } from 'redux';

export class ResponsesManager {

    static init(socket: SocketIOClient.Socket, dispatch:  Dispatch<any>){
        lobbyResponses.init(socket, dispatch);
        gameResponses.init(socket, dispatch);
        chatReponses.init(socket, dispatch);
    }
}