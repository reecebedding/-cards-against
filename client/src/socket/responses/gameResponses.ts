import { Dispatch } from "redux";
import { PlayerModel } from "../../models/PlayerModel";
import { playerJoined, playerLeft, gameStarted, playerRecievedCard, gameDealtBlackCard, playerChoseCards } from "../../components/Game/redux/actions";
import { GameModel } from "../../models/GameModel";
import CardModel from "../../models/CardModel";

export function init(socket: SocketIOClient.Socket, dispatch: Dispatch<any>){
    socket.on("GAME_PLAYER_JOINED", (player: PlayerModel) => { dispatch(playerJoined(player)); });
    socket.on("GAME_PLAYER_LEFT", (player: PlayerModel) => { dispatch(playerLeft(player)); });
    socket.on("GAME_STARTED", (game: GameModel) => { dispatch(gameStarted(game))} )
    socket.on("PLAYER_RECIEVED_CARD", (player: PlayerModel, card: CardModel) => { dispatch(playerRecievedCard(player, card)); });
    socket.on("GAME_DEALT_BLACK_CARD", (card: CardModel) => { dispatch(gameDealtBlackCard(card)) });
    socket.on("PLAYER_CHOSE_CARDS", (playerId: string) => { dispatch(playerChoseCards(playerId)); })
};