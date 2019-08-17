import { Dispatch } from "redux";
import { createNewGameSuccess, lobbyRemoved, lobbyUpdated } from "../../components/Lobby/redux/actions";
import { LobbyModel } from "../../models/LobbyModel";

export function init(socket: SocketIOClient.Socket, dispatch: Dispatch<any>){
    socket.on('NEW_GAME_CREATED', (game: LobbyModel) => { dispatch(createNewGameSuccess(game)) });
    socket.on("LOBBY_REMOVED", (game: LobbyModel) => { dispatch(lobbyRemoved(game)) });
    socket.on("LOBBY_UPDATED", (game: LobbyModel) => { dispatch(lobbyUpdated(game)) });
}