import * as React from "react";
import classNames from 'classnames';
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { IGameState } from "../../redux/store/IStoreStates";
import { GameModel, GameStatus } from "../../models/GameModel";
import Button from "reactstrap/lib/Button";
import { startGame, playCard } from "./redux/actions";
import Card from "reactstrap/lib/Card";
import CardBody from "reactstrap/lib/CardBody";
import CardTitle from "reactstrap/lib/CardTitle";
import ChatBox from "../Shared/Chat/ChatBox";

interface IProps {
    socket: SocketIOClient.Socket,
    startGame: (socket: SocketIOClient.Socket, game: GameModel, started: (game: GameModel) => void) => void,
    playCard: (socket: SocketIOClient.Socket, gameId: string, cardId: string) => void,
    activeGame: GameModel
}

interface IState {
    playedCards: string[]
}

export class Game extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            playedCards: []
        };
    }

    startGame = () => {
        this.props.startGame(this.props.socket, this.props.activeGame, (game: GameModel) => {
            console.log("Game Started");
        })
    }

    playCard = (cardId: string) => () => {
        if (this.state.playedCards.length !== this.props.activeGame.blackCard.requiredAnswers) {
            this.props.playCard(this.props.socket, this.props.activeGame._id, cardId);
            this.setState((state) => ({
                ...state,
                playedCards: [
                    ...this.state.playedCards,
                    cardId
                ]
            }))
        }
    }

    render(){
        return (
            <div>
                <h1>Game: {this.props.activeGame.name}</h1>
                <h2>Status: {this.props.activeGame.gameStatus}</h2>
                {this.renderPlayerList()}


                <ChatBox socket={this.props.socket} scope="GAME">
                </ChatBox>

                {this.renderBlackCard()}
                {this.renderStartGameButton()}
                {this.renderPlayerCards()}
            </div>
        )
    }

    renderPlayerList(){
        return (
            <div>
                <h2>Player List</h2>
                <ol>
                    {
                        this.props.activeGame.players.map((player, index: number) => {
                            const userPlayedCards =  ((this.props.activeGame.blackCard) && (player.playedCards === this.props.activeGame.blackCard.requiredAnswers)) ? "✔" : "";
                            const userHost = (player.id === this.props.activeGame.hostId) ? " - HOST": "";
                            return (
                                <li key={index}>
                                    {userPlayedCards} {player.id} {userHost}
                                </li>
                            );
                        })
                    }
                </ol>
            </div>
        )
    }

    renderBlackCard(){
        if (this.props.activeGame.blackCard) {
            return (
                <Card className="black-card">
                    <CardBody>
                        <CardTitle>{this.props.activeGame.blackCard.text}</CardTitle>
                    </CardBody>
                </Card>
            );
        }          
    }

    renderPlayerCards(){
        return (
            this.props.activeGame.players.filter(x => (x.id === this.props.socket.id) && x.cards).map((player) => {
                return player.cards.map((card, index: number) => {
                    const isCardPlayed = this.state.playedCards.find(cardId => cardId === card.id);
                    const cardClass = classNames({"player-card-active": isCardPlayed, "player-card": !isCardPlayed});
                    return (
                        <Card key={index} onClick={this.playCard(card.id)} className={cardClass}>
                            <CardBody>
                                <CardTitle>{card.text}</CardTitle>
                            </CardBody>
                        </Card>
                    )
                });
            })
        )
    }

    renderStartGameButton(){
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
        startGame: (socket: SocketIOClient.Socket, game: GameModel, started: (game: GameModel) => void) => dispatch(startGame(socket, game, started)),
        playCard: (socket: SocketIOClient.Socket, gameId: string, cardId: String) => dispatch(playCard(socket, gameId, cardId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);