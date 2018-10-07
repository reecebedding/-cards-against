import { Dispatch } from "redux";
import { createNewGameSuccess, lobbyRemoved } from "../../redux/actions/lobbyActions";
import { LobbyModel } from "../../models/Lobby";

export function init(socket: SocketIOClient.Socket, dispatch: Dispatch<any>){
    socket.on('NEW_GAME_CREATED', (game: LobbyModel) => { dispatch(createNewGameSuccess(game)) });
    socket.on("LOBBY_REMOVED", (game: LobbyModel) => { dispatch(lobbyRemoved(game)) });
}