import { LobbyModel } from "../../models/LobbyModel";
import { Dispatch } from "redux";
import { loadLobbies } from "../../redux/actions/lobbyActions";
import { joinedGame } from "../../redux/actions/gameActions";

export function createNewGame(socket: SocketIOClient.Socket, game: LobbyModel) {
    socket.emit('CREATE_NEW_GAME', game);
}

export function joinGame(socket: SocketIOClient.Socket, dispatch: Dispatch<any>, id: string, callback: () => any) {
    socket.emit('JOIN_GAME', id, (game: LobbyModel) => {
        dispatch(joinedGame(game));
        callback();
    });
}

export function loadLobbyList(socket: SocketIOClient.Socket, dispatch: Dispatch<any>){
    socket.emit('LOAD_LOBBIES', (games: LobbyModel[]) => {
        dispatch(loadLobbies(games));
    });
}