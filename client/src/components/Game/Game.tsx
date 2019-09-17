import * as React from "react";
import classNames from 'classnames';
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { IGameState } from "../../redux/store/IStoreStates";
import { GameModel, GameStatus, RoundStatus } from "../../models/GameModel";
import Button from "reactstrap/lib/Button";
import { startGame, playCards } from "./redux/actions";
import Card from "reactstrap/lib/Card";
import CardBody from "reactstrap/lib/CardBody";
import CardTitle from "reactstrap/lib/CardTitle";
import ChatBox from "../Shared/Chat/ChatBox";
import { ChosenCardModel } from "../../models/ChosenCardModel";

interface IProps {
    socket: SocketIOClient.Socket,
    startGame: (socket: SocketIOClient.Socket, game: GameModel, started: (game: GameModel) => void) => void,
    playCards: (socket: SocketIOClient.Socket, gameId: string, cardIds: ChosenCardModel[]) => void,
    activeGame: GameModel
}

interface IState {
    playedCards: ChosenCardModel[]
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

        if ((this.props.activeGame.roundStatus == RoundStatus.PLAYER_SELECT) && (this.props.activeGame.czarId !== this.props.socket.id)){
            this.setState((prevState) => {
                let cards = prevState.playedCards;
                if (!cards.find(x => x.card.id === cardId)){
                    if (cards.length === this.props.activeGame.blackCard.requiredAnswers){
                        cards.shift();
                        cards = cards.map((card) => {
                            return {
                                ...card,
                                position: card.position -1
                            }
                        });
                    }   
    
                    return {
                        ...prevState,
                        playedCards: [
                            ...cards,
                            {
                                card: {
                                    id: cardId,
                                    text: '',
                                },
                                position: cards.length
                            }
                        ]
                    }
                }  
            }, () => {
                if (this.state.playedCards.length >= this.props.activeGame.blackCard.requiredAnswers) {
                    this.props.playCards(this.props.socket, this.props.activeGame._id, this.state.playedCards); 
                }
            });    
        }
    }

    render(){
        return (
            <div>
                <h1>Game: {this.props.activeGame.name}</h1>
                <h2>Status: {this.props.activeGame.gameStatus}</h2>
                {this.renderPlayerList()}


                <ChatBox socket={this.props.socket} defaultScope="Game" availableScopes={["Game","Global"]} />

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
                            const userCzar = (player.id === this.props.activeGame.czarId)? " - CZAR": "";
                            return (
                                <li key={index}>
                                    {userPlayedCards} {player.id} {userHost} {userCzar}
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
                    const isCardPlayed = this.state.playedCards.find(playedCard => playedCard.card.id === card.id);
                    const cardClass = (player.id !== this.props.activeGame.czarId) ? classNames({"player-card-active": isCardPlayed, "player-card": !isCardPlayed}) : "disabled-card";
                    
                    return (
                        <Card key={index} onClick={this.playCard(card.id)} className={cardClass}>
                            <CardBody>
                                <CardTitle>{this.state.playedCards.findIndex(x => x.card.id === card.id) >= 0 ? this.state.playedCards.findIndex(x => x.card.id === card.id)+1 + ' - ': ''} {card.text}</CardTitle>
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
        playCards: (socket: SocketIOClient.Socket, gameId: string, cardIds: ChosenCardModel[]) => dispatch(playCards(socket, gameId, cardIds))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);