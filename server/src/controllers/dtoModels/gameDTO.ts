import "reflect-metadata";
import {Type} from "class-transformer";

import { PlayerDTO } from "./playerDTO"

export enum GameStatus {
    SETUP,
    PLAYING,
    ENDED
}

export class GameDTO {
    name: string = ''
    gameStatus: GameStatus
    hostId: string
    _id: string = ''
    @Type(() => PlayerDTO)
    players: PlayerDTO[] = []
}