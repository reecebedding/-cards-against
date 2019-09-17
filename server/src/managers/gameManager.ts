import { GameModel, GameStatus, RoundStatus } from "../models/GameModel";
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
    public static async createGame(game: GameModel, socket: SocketIO.Socket): Promise<GameModel> {
        
        const newGame: GameModel = {
            ...game,
            _id: createGameID(),
            hostId: socket.id,
            czarId: socket.id,
            gameStatus: GameStatus.SETUP,
            roundStatus: RoundStatus.PLAYER_SELECT
        }

        const savedGame = await Game.create(newGame);
        console.log(`Game '${savedGame.name}' created`);

        return savedGame;
    }

    public static async startGame(gameId: string, socket: SocketIO.Socket, socketServer: Server): Promise<GameModel>{
        const game: GameModel = await Game.findById(gameId);
        //Only allow the game to be started by the host
        if(game.hostId === socket.id && game.gameStatus === GameStatus.SETUP)
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

    public static async determineRoundStatus(gameId: string): Promise<RoundStatus> {
        const game = await Game.findById(gameId);
        const playersStillToPlayWhiteCard = (game.blackCard) ? game.players.filter(x => (x.id !== game.czarId) && (x.playedCards.length < game.blackCard.requiredAnswers)) : [];

        if(game.blackCard && playersStillToPlayWhiteCard.length === 0)
        {
            return RoundStatus.CZAR_SELECT;
        } else {
            return RoundStatus.PLAYER_SELECT;
        }

    }

    public static async playCards(gameId: string, cardIds: ChosenCardModel[], socket: SocketIO.Socket, socketServer: Server): Promise<void> {
        const canPlayAllCards: boolean = (await Promise.all(cardIds.map(card => GameValidator.canPlayerPlayCard(gameId, socket.id, card.card.id)))).every(x => x === CanPlayerPlayCardResult.YES);

        if (canPlayAllCards){
            const game = await Game.findById(gameId);
            const player = game.players.find(player => player.id === socket.id);
            //Incase more ID's were injected, only grab the required amount
            const allowedCards = cardIds.length > game.blackCard.requiredAnswers ? cardIds.splice(0, game.blackCard.requiredAnswers) : cardIds;
    
            const allPlayersCards = player.cards.concat(plainToClass(CardModel, player.playedCards.map(x => x.card)));
    
            player.playedCards = allPlayersCards.filter(card => allowedCards.map(x => x.card.id).includes(card.id)).map(card => {
                return {
                    card: card,
                    position: cardIds.find(x => x.card.id == card.id).position
                }
            });
            player.cards = allPlayersCards.filter(card => !allowedCards.map(x => x.card.id).includes(card.id));
            Player.update(player);
            GameSocketActions.emitPlayerChoseCards(gameId, player, socketServer);
            
            const roundStatus = await this.determineRoundStatus(gameId);
            if(roundStatus !== game.roundStatus){
                GameSocketActions.emitRoundStatusChanged(gameId, roundStatus, socketServer);
            }
        }
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
                
                const roundStatus = await this.determineRoundStatus(game._id);
                if (roundStatus !== game.roundStatus){
                    GameSocketActions.emitRoundStatusChanged(game._id, roundStatus, socketServer);
                }

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