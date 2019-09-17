import "reflect-metadata";
import {Type, Exclude, Expose} from "class-transformer";

import { PlayerDTO } from "./playerDTO"

export enum GameStatus {
    SETUP,
    PLAYING,
    ENDED
}

@Exclude()
export class GameDTO {
    @Expose() name: string = ''
    @Expose() gameStatus: GameStatus
    @Expose() hostId: string
    @Expose() czarId: string
    @Expose() _id: string = ''    
    @Expose() @Type(() => PlayerDTO)
    @Expose() players: PlayerDTO[] = []
}