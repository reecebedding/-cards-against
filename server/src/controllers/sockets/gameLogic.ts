import { Socket } from "socket.io";

export function InitListeners(socket_server: any){
    socket_server.on('connection', function(socket: Socket){
        console.log(`User ${socket.id} connected`);
        socket.join("TheGame");
        socket_server.to("TheGame").emit("USER_JOINED", socket.id);

        socket.on('disconnect', function(){
            console.log(`User ${socket.id} disconnected`)
            socket_server.to("TheGame").emit("USER_LEFT", socket.id);
        });
    });
}