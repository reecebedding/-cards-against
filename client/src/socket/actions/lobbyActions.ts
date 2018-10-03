import { Game } from "../../models/Game";

export function createNewGame(socket: SocketIOClient.Socket, game: Game) {
    socket.emit('CREATE_NEW_GAME', game);
}