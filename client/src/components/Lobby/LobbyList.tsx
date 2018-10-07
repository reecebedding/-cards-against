import * as React from "react";
import { LobbyModel } from "../../models/Lobby";
import { Button } from "reactstrap";

interface IProps {
    lobbies: LobbyModel[],
    joinGame: (id: string) => void
}

export const LobbyList: React.StatelessComponent<IProps> = (props: IProps) => { return (
    <div>
        <ol> 
            {
                props.lobbies.map((lobby: LobbyModel, index: number) => (
                    <li key={index}>{lobby.name} <Button color="primary" onClick={() => props.joinGame(lobby._id)}>Join</Button> </li>
                ))
            }
        </ol>
    </div>
)};