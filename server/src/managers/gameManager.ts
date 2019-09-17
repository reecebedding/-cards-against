import { GameModel, GameStatus } from "../models/GameModel";
import { Game } from "../database/Game";
import { Player } from "../database/Player";
import { Server } from "socket.io";
import { PlayerModel } from "src/models/PlayerModel";
import { CardsManager } from "./cardsManager";
import { LobbySocketActions } from "../controllers/sockets/lobbySocketActions";
import { GameSocketActions } from "../controllers/sockets/gameSocketActions";
import CardModel from "../models/CardModel";
import { GameValidator, CanPlayerPlayCardResult } from "./validators/gameValidator";
import { ChosenCardModel } from "../models/ChosenCardModel";
import { plainToClass } from "class-transformer";

export class GameManager {
    public static async createGame(newGame: GameModel, socket: SocketIO.Socket): Promise<GameModel> {
        newGame._id = createGameID();
        newGame.hostId = socket.id;
        newGame.gameStatus = GameStatus.SETUP;

        const game = await Game.create(newGame);
        console.log(`Game '${newGame.name}' created`);

        return game;
    }

    public static async startGame(gameId: string, socket: SocketIO.Socket, socketServer: Server): Promise<GameModel>{
        const game: GameModel = await Game.findById(gameId);
        //Only allow the game to be started by the host
        if(game.hostId === socket.id)
        {
            const gameDealtBlackCard: GameModel = await CardsManager.DealGameBlackCard(gameId);
            GameSocketActions.emitGameGivenBlackCard(game._id, gameDealtBlackCard.blackCard, socketServer);

            for(const player of gameDealtBlackCard.players) {
                const cardsDealt: CardModel[] = await CardsManager.DealPlayerWhiteCards(player.id, gameId);
                cardsDealt.forEach(card => GameSocketActions.emitPlayerGivenCard(player, card, socketServer));
            }
            
            const gameWithPlayers: GameModel = await Game.findById(gameId);
            gameWithPlayers.gameStatus = GameStatus.PLAYING;


            const updatedGame: GameModel = await Game.update(gameWithPlayers);
            
            GameSocketActions.emitGameStarted(updatedGame, socketServer);
            LobbySocketActions.emitLobbyUpdated(updatedGame, socketServer);

            return updatedGame;
        } 
        return game;
    }

    public static async playCards(gameId: string, cardIds: ChosenCardModel[], socket: SocketIO.Socket, socketServer: Server): Promise<void> {
        const canPlay: boolean = (await Promise.all(cardIds.map(card => GameValidator.canPlayerPlayCard(gameId, socket.id, card.card.id)))).every(x => x === CanPlayerPlayCardResult.YES);

        const game = await Game.findById(gameId);
        const player = game.players.find(player => player.id === socket.id);
        //Incase more ID's were injected, only grab the required amount
        const allowedCards = cardIds.length > game.blackCard.requiredAnswers ? cardIds.splice(0, game.blackCard.requiredAnswers) : cardIds;


        const allCards = player.cards.concat(plainToClass(CardModel, player.playedCards.map(x => x.card)));

        player.playedCards = allCards.filter(card => allowedCards.map(x => x.card.id).includes(card.id)).map(card => {
            const position = cardIds.find(x => x.card.id == card.id).position;
            const chosenCard = new ChosenCardModel();
            chosenCard.card = card;
            chosenCard.position = position;
            return chosenCard;
        });
        player.cards = allCards.filter(card => !allowedCards.map(x => x.card.id).includes(card.id));
        Player.update(player);

        GameSocketActions.emitPlayerChoseCards(gameId, player, socketServer);
    }

    public static async joinGame(gameId: string, socket: SocketIO.Socket, socketServer: Server): Promise<GameModel> {
        const game = await Game.findById(gameId);
        const playerId = socket.id;
        if(!game.players.some(x => x.id === playerId)){
            const player:PlayerModel = { id: playerId, gameId: gameId, cards: [], playedCards: []};
            game.players.push(player);

            socket.join(game._id);    
            const updatedGame: GameModel = await Game.update(game);

            LobbySocketActions.emitLobbyUpdated(updatedGame, socketServer);
            GameSocketActions.emitPlayerJoined(game._id, player, socketServer);
            
            return updatedGame;
        } else {
            return game;
        }
    }

    public static async disconnectUserFromGames(userId: string, socketServer: Server): Promise<void> {
        const socketGames = await Player.findGames(userId);

        socketGames.forEach(async(game: GameModel) => {
            if(game.players.length == 1) {
                //Remove game from DB as there will be no users left.
                await Game.remove(game._id);
                console.log(`Game '${game.name} closed`)
                LobbySocketActions.emitLobbyRemoved(game, socketServer);
            }else{
                const player:PlayerModel = { id: userId, gameId: game._id, cards: [], playedCards: []};
                game.players = game.players.filter((player) => player.id !== userId);
                const updatedGame: GameModel = await Game.update(game);

                GameSocketActions.emitPlayerLeft(updatedGame._id, player, socketServer)                
                LobbySocketActions.emitLobbyUpdated(updatedGame, socketServer);
                
                return updatedGame;
            }
        })
    }
}

function createGameID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}