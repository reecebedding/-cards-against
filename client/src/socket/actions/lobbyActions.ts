import { Lobby } from "../../models/Lobby";
import { Dispatch } from "redux";
import { loadLobbies } from "../../redux/actions/lobbyActions";

export function createNewGame(socket: SocketIOClient.Socket, game: Lobby) {
    socket.emit('CREATE_NEW_GAME', game);
}

export function loadLobbyList(socket: SocketIOClient.Socket, dispatch: Dispatch<any>){
    socket.emit('LOAD_LOBBIES', (games: Lobby[]) => {
        dispatch(loadLobbies(games));
    });
}