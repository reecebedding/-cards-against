import { GameModel, RoundStatus } from "../../models/GameModel";
import { Game } from "../../database/Game";

export enum CanPlayerPlayCardResult {
    "YES", "NOT_PLAYERS_CARD", "NOT_TIME_TO_PICK"
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
        }
        else if(gameModel.roundStatus !== RoundStatus.PLAYER_SELECT){
            return CanPlayerPlayCardResult.NOT_TIME_TO_PICK;
        }
        else {
            return CanPlayerPlayCardResult.YES;
        }
    }

}