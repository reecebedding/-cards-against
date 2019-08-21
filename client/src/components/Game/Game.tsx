import * as React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { IGameState } from "../../redux/store/IStoreStates";
import { GameModel, GameStatus } from "../../models/GameModel";
import Button from "reactstrap/lib/Button";
import { startGame } from "./redux/actions";

interface IProps {
    socket: SocketIOClient.Socket,
    startGame: (socket: SocketIOClient.Socket, game: GameModel, started: (game: GameModel) => void) => void,
    activeGame: GameModel
}
export class Game extends React.Component<IProps> {

    startGame = () => {
        this.props.startGame(this.props.socket, this.props.activeGame, (game: GameModel) => {
            console.log("Game Started");
        })
    }

    render(){
        return (
            <div>
                <h1>Game: {this.props.activeGame.name}</h1>
                <h2>Status: {this.props.activeGame.gameStatus}</h2>
                <div>
                    <h2>Player List</h2>
                    <ol>
                        {
                            this.props.activeGame.players.map((player) => {
                                return <li>{player.id} {(player.id === this.props.activeGame.hostId) && "- HOST"}</li>;
                            })
                        }
                    </ol>
                </div>
                {this.renderStartGame()}
            </div>
        )
    }

    renderStartGame(){
        if((this.props.socket.id === this.props.activeGame.hostId) && (this.props.activeGame.gameStatus === GameStatus.SETUP)){
            return (
                <div>
                    <Button color="primary" onClick={this.startGame}>Start Game</Button>
                </div>
            );
        }
    }
}


function mapStateToProps(state: any) {
    return {
        activeGame: state.game.activeGame        
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<IGameState, null, AnyAction>) {
    return {
        startGame: (socket: SocketIOClient.Socket, game: GameModel, started: (game: GameModel) => void) => dispatch(startGame(socket, game, started))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);