import { GameModel, RoundStatus } from "../../models/GameModel";
import { Server } from "socket.io";
import { plainToClass } from "class-transformer"
import { PlayerModel } from "src/models/PlayerModel";
import { PlayerDTO } from "../dtoModels/playerDTO";
import { GameDTO } from "../dtoModels/gameDTO";
import CardDTO from "../dtoModels/cardDTO";
import CardModel from "src/models/CardModel";
import { GameManager } from "../../../src/managers/gameManager";
import { ChosenCardModel } from "src/models/ChosenCardModel";
import { RoundResult } from "src/models/RoundResult";
import { RoundResultDTO } from "../dtoModels/roundResultDTO";

export class GameSocketActions {
    static init(socket_server: Server, socket: SocketIO.Socket){
        socket.on('PLAY_CARDS', async (gameId: string, cardIds: ChosenCardModel[]) => {
            await GameManager.playCards(gameId, cardIds, socket, socket_server);
        }); 

        socket.on('CZAR_PICKED_CARD', async (gameId: string, cardId: string) => {
            await GameManager.czarPickedCard(gameId, cardId, socket, socket_server)
        })
    }

    static emitPlayerJoined(gameId: string, player: PlayerModel, socketServer: Server){
        const playerDto: PlayerDTO = plainToClass(PlayerDTO, player);
        socketServer.to(gameId).emit("GAME_PLAYER_JOINED", playerDto);
    }

    static emitPlayerLeft(gameId: string, player: PlayerModel, socketServer: Server){
        const playerDto: PlayerDTO = plainToClass(PlayerDTO, player);
        socketServer.to(gameId).emit("GAME_PLAYER_LEFT", playerDto);
    }

    static emitGameStarted(game: GameModel, socketServer: Server){
        const gameDto: GameDTO = plainToClass(GameDTO, game);
        socketServer.to(game._id).emit("GAME_STARTED", gameDto);
    }

    static emitPlayerGivenCard(player: PlayerModel, card: CardModel, socketServer: Server){
        const cardDto: CardDTO = plainToClass(CardDTO, card);
        const playerDto: PlayerDTO = plainToClass(PlayerDTO, player);
        socketServer.sockets.sockets[player.id].emit("PLAYER_RECIEVED_CARD", playerDto, cardDto);
    }

    static emitGameGivenBlackCard(gameId: string, card: CardModel, socketServer: Server){
        const cardDto: CardDTO = plainToClass(CardDTO, card);
        socketServer.to(gameId).emit("GAME_DEALT_BLACK_CARD", cardDto);
    }

    static emitPlayerChoseCards(gameId: string, player: PlayerModel, socketServer: Server){
        socketServer.to(gameId).emit("PLAYER_CHOSE_CARDS", player.id);
    }

    static emitRoundStatusChanged(gameId: string, roundStatus: RoundStatus, socketServer: Server){
        socketServer.to(gameId).emit("ROUND_STATUS_CHANGED", roundStatus);
    }

    static emitCzarPickingCards(gameId: string, cards: ChosenCardModel[][], socketServer: Server){
        socketServer.to(gameId).emit("CZAR_PICKING_CARDS", cards);
    }

    static emitRoundFinished(gameId: string, roundResult: RoundResult, socketServer: Server){
        const roundResultDto: RoundResultDTO = plainToClass(RoundResultDTO, roundResult);
        socketServer.to(gameId).emit("ROUND_FINISHED", roundResultDto);
    }
}

