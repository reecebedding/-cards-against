import "reflect-metadata";
import {Type, Exclude, Expose} from "class-transformer";

import { PlayerDTO } from "./playerDTO"
import { ChosenCardModel } from "src/models/ChosenCardModel";

@Exclude()
export class RoundResultDTO {
    @Expose() @Type(() => PlayerDTO)
    @Expose() winningPlayer: PlayerDTO
    @Expose() winningCards: ChosenCardModel[]
}