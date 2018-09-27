import { Socket } from "socket.io";

export function InitListeners(socket_server: any){
    socket_server.on('connection', function(socket: Socket){
        console.log('New Connection');
    });
}