import * as React from "react";
import { LobbyModel } from "../../models/LobbyModel";
import { Button } from "reactstrap";

interface IProps {
    lobbies: LobbyModel[],
    joinGame: (id: string) => void
}

export const LobbyList: React.StatelessComponent<IProps> = (props: IProps) => {
    
    const joinGame = (event: any) =>  {
        props.joinGame(event.target.value);
    }

    return (
    <div>
        <ol> 
            {
                props.lobbies.map((lobby: LobbyModel, index: number) => (
                    <li key={index}>
                        {lobby.name} <Button color="primary" value={lobby._id} onClick={joinGame}>Join</Button> - {lobby.players.length} players
                    </li>
                ))
            }
        </ol>
    </div>
)};