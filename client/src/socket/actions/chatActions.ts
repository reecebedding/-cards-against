export function sendChatMessage(socket: SocketIOClient.Socket, chatMessage: string, scope: string) {
    socket.emit('SEND_CHAT_MESSAGE', chatMessage, scope);
}