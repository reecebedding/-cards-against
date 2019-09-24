import { GameModel, RoundStatus } from "../../models/GameModel";
import { Game } from "../../database/Game";
import CardModel from "src/models/CardModel";
import { PlayerModel } from "src/models/PlayerModel";

export enum CanPlayerPlayCardResult {
    "YES", "NOT_PLAYERS_CARD", "NOT_TIME_TO_PICK", "PLAYER_IS_CZAR"
}

export enum CanCzarPickCardResult {
    "YES", "PLAYER_IS_NOT_CZAR", "INVALID_CARD", "NOT_TIME_TO_PICK"
}


export class GameValidator {

    public static async canPlayerPlayCard(gameId: string, userId: string, cardId: string) : Promise<CanPlayerPlayCardResult>;
    public static async canPlayerPlayCard(game: GameModel, userId: string, cardId: string): Promise<CanPlayerPlayCardResult>;
    public static async canPlayerPlayCard(game: string | GameModel, userId: string, cardId: string): Promise<CanPlayerPlayCardResult> {
        const gameModel = typeof game === "string" ? await Game.findById(game) : game;

        const player = gameModel.players.find(player => player.id === userId);
        const playersCard = player.cards.find(card => card.id === cardId);
        if (!playersCard){
            return CanPlayerPlayCardResult.NOT_PLAYERS_CARD;
        } else if(gameModel.roundStatus !== RoundStatus.PLAYER_SELECT){
            return CanPlayerPlayCardResult.NOT_TIME_TO_PICK;
        } else if(gameModel.czarId === userId){
            return CanPlayerPlayCardResult.PLAYER_IS_CZAR;
        } else {
            return CanPlayerPlayCardResult.YES;
        }
    }


    
    public static async canCzarPickCard(game: GameModel, userId: string, cardId: string): Promise<CanCzarPickCardResult>{

        const winningPlayer = game.players.reduce((winningPlayer, player) => {
            const card = player.playedCards.find(cardSelection => cardSelection.card.id === cardId);
            return card ? player : winningPlayer;
        }, null);
        
        if(game.roundStatus !== RoundStatus.CZAR_SELECT){
            return CanCzarPickCardResult.NOT_TIME_TO_PICK;
        } else if(game.czarId !== userId) {
            return CanCzarPickCardResult.PLAYER_IS_NOT_CZAR;
        } else if(!winningPlayer){
            return CanCzarPickCardResult.INVALID_CARD
        } else {
            return CanCzarPickCardResult.YES;
        }
    }

}