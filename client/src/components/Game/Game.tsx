import * as React from "react";
import classNames from 'classnames';
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { IGameState } from "../../redux/store/IStoreStates";
import { GameModel, GameStatus, RoundStatus } from "../../models/GameModel";
import Button from "reactstrap/lib/Button";
import { startGame, playCards, czarPickedCard } from "./redux/actions";
import Card from "reactstrap/lib/Card";
import CardBody from "reactstrap/lib/CardBody";
import CardTitle from "reactstrap/lib/CardTitle";
import ChatBox from "../Shared/Chat/ChatBox";
import { ChosenCardModel } from "../../models/ChosenCardModel";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

interface IProps {
    socket: SocketIOClient.Socket,
    startGame: (socket: SocketIOClient.Socket, game: GameModel, started: (game: GameModel) => void) => void,
    playCards: (socket: SocketIOClient.Socket, gameId: string, cardIds: ChosenCardModel[]) => void,
    czarPickedCard: (socket: SocketIOClient.Socket, gameId: string, cardId: string) => void,
    activeGame: GameModel
}

interface IState {
    playedCards: ChosenCardModel[],
    showRoundResult: () => boolean
}

export class Game extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            playedCards: [],
            showRoundResult: () => this.props.activeGame.roundResult !== null
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

    czarPickCard = (cardId: string) => () => {
        if((this.props.socket.id === this.props.activeGame.czarId)){
            this.props.czarPickedCard(this.props.socket, this.props.activeGame._id, cardId);
        }
    }

    render(){
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <h1>Game: {this.props.activeGame.name}</h1>
                        <h2>Game Status: {this.props.activeGame.gameStatus}</h2>
                        <h2>Round Status: {this.props.activeGame.roundStatus}</h2>
                        {this.renderPlayerList()}
                        {this.renderStartGameButton()}
                    </div>
                    <div className="col">
                        {this.renderRoundsSelectedCards()}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <ChatBox socket={this.props.socket} defaultScope="Game" availableScopes={["Game","Global"]} />
                    </div>                    
                </div>
                <div className="row">
                    <div className="col">
                        {this.renderBlackCard()}                    
                        {this.renderPlayerCards()}
                    </div>
                </div>
                
                {this.renderRoundResult()}

            </div>
        )
    }

    renderRoundResult(){
        if(this.state.showRoundResult()){
            return (
                <Modal isOpen={this.state.showRoundResult()} backdrop="static">
                    <ModalHeader>Winner: {this.props.activeGame.roundResult.winningPlayer.id}</ModalHeader>
                    <ModalBody>
                        <div>
                            <div className="row">
                                {       
                                    this.props.activeGame.roundResult.winningCards.map((card: ChosenCardModel, index: number) => {
                                        return (
                                            <div className="col0" key={index}>
                                                <Card className="player-card">
                                                    <CardBody>
                                                        <CardTitle>{card.card.text}</CardTitle>
                                                    </CardBody>
                                                </Card>
                                            </div>                                           
                                        )
                                    })  
                                }
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            )
        }
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

    renderRoundsSelectedCards(){
        if(this.props.activeGame.roundsSelectedCards.length > 0 && this.props.activeGame.roundStatus == RoundStatus.CZAR_SELECT){
            return (
                this.props.activeGame.roundsSelectedCards.map((cards: ChosenCardModel[], index: number) => {
                    return (
                        <div className="row" key={index}>
                            {
                                cards.map(card => {
                                    return (
                                        <div className="col" key={card.card.id}>
                                            <Card className="player-card" onClick={this.czarPickCard(card.card.id)}>
                                                <CardBody>
                                                    <CardTitle>{card.card.text}</CardTitle>
                                                </CardBody>
                                            </Card>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            )
        }
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
        playCards: (socket: SocketIOClient.Socket, gameId: string, cardIds: ChosenCardModel[]) => dispatch(playCards(socket, gameId, cardIds)),
        czarPickedCard: (socket: SocketIOClient.Socket, gameId: string, cardId: string) => dispatch(czarPickedCard(socket, gameId, cardId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);