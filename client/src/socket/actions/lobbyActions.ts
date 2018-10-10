import { LobbyModel } from "../../models/LobbyModel";
import { Dispatch } from "redux";
import { loadLobbies } from "../../redux/actions/lobbyActions";
import { joinedGame } from "../../redux/actions/gameActions";
import { GameModel } from "../../models/GameModel";

export function createNewGame(socket: SocketIOClient.Socket, game: LobbyModel, created: (game: GameModel) => any) {
    socket.emit('CREATE_NEW_GAME', game, (game: GameModel) =>{
        created(game);
    });
}

export function joinGame(socket: SocketIOClient.Socket, dispatch: Dispatch<any>, id: string, callback: (game: GameModel) => any) {
    socket.emit('JOIN_GAME', id, (game: GameModel) => {
        dispatch(joinedGame(game));
        callback(game);
    });
}

export function loadLobbyList(socket: SocketIOClient.Socket, dispatch: Dispatch<any>){
    socket.emit('LOAD_LOBBIES', (games: LobbyModel[]) => {
        dispatch(loadLobbies(games));
    });
}