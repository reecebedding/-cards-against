import { Dispatch } from "redux";
import { PlayerModel } from "../../models/PlayerModel";
import { playerJoined, playerLeft } from "../../components/Game/redux/actions";

export function init(socket: SocketIOClient.Socket, dispatch: Dispatch<any>){
    socket.on("GAME_PLAYER_JOINED", (player: PlayerModel) => { dispatch(playerJoined(player)); });
    socket.on("GAME_PLAYER_LEFT", (player: PlayerModel) => { dispatch(playerLeft(player)); });
};