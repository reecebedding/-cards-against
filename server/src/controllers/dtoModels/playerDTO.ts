import { Expose, Exclude } from "class-transformer"

@Exclude()
export class PlayerDTO {
    @Expose() id: string
    @Expose() gameId: string
}