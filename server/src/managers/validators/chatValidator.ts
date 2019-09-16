import { ChatMessageModel, ChatScope } from "../../models/ChatMessageModel";
import { GameModel } from "src/models/GameModel";
import { Game } from "../../database/Game";

export enum CanPlayerSendMessageResult {
    "YES", "NOT_IN_GAME"
 }

export class ChatValidator {
    public static async canPlayerSendMessage(chatMessage: ChatMessageModel): Promise<CanPlayerSendMessageResult> {
        const gameModel = chatMessage.scope == ChatScope.GAME ? await Game.findById(chatMessage.gameId) : null;

        if (chatMessage.scope === ChatScope.GAME && !gameModel.players.find(x => x.id === chatMessage.sender)){
            return CanPlayerSendMessageResult.NOT_IN_GAME;
        }
        else{
            return CanPlayerSendMessageResult.YES;
        }
    }
}