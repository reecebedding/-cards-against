import * as React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { IGameState } from "../../redux/store/IStoreStates";
import { GameModel } from "../../models/GameModel";

interface IProps {
    socket: SocketIOClient.Socket,
    activeGame: GameModel
}
export class Game extends React.Component<IProps> {

    render(){
        return (
            <div>
                <h1>Game: {this.props.activeGame.name}</h1>
                <div>
                    <h2>Player List</h2>
                    <ol>
                        {
                            this.props.activeGame.players.map((player) => {
                                return (
                                    <li>{player.id}</li>
                                );
                            })
                        }
                    </ol>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state: any) {
    return {
        activeGame: state.game.activeGame
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<IGameState, null, AnyAction>) {
    return {
        
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);