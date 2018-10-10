import * as lobbyResponses from './lobbyResponses';
import * as gameResponses from './gameResponses';
import { Dispatch } from 'redux';

export class ResponsesManager {

    static init(socket: SocketIOClient.Socket, dispatch:  Dispatch<any>){
        lobbyResponses.init(socket, dispatch);
        gameResponses.init(socket, dispatch);
    }
}