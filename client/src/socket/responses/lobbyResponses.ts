import { Dispatch } from "redux";
import { createNewGameSuccess } from "../../redux/actions/lobbyActions";
import { Game } from "../../models/Game";

export function init(socket: SocketIOClient.Socket, dispatch: Dispatch<any>){
    socket.on('NEW_GAME_CREATED', (game: Game) => { dispatch(createNewGameSuccess(game))});
}