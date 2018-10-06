import { Dispatch } from "redux";
import { createNewGameSuccess, lobbyRemoved } from "../../redux/actions/lobbyActions";
import { Lobby } from "../../models/Lobby";

export function init(socket: SocketIOClient.Socket, dispatch: Dispatch<any>){
    socket.on('NEW_GAME_CREATED', (game: Lobby) => { dispatch(createNewGameSuccess(game)) });
    socket.on("LOBBY_REMOVED", (game: Lobby) => { dispatch(lobbyRemoved(game)) });
}