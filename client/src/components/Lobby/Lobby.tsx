import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ILobbyState } from '../../redux/store/IStoreStates';
import { AnyAction, compose } from 'redux';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Label, Col, Input, FormFeedback, Form, FormGroup } from 'reactstrap';
import { LobbyModel } from '../../models/LobbyModel';
import { createNewGame, loadLobbies } from './redux/actions';
import { loadLobbyList, joinGame } from '../../socket/actions/gameActions';
import { LobbyList } from './LobbyList';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import { GameModel } from '../../models/GameModel';
import ChatBox from '../Shared/Chat/ChatBox';

interface IProps {
    socket: SocketIOClient.Socket,
    lobbies: LobbyModel[],
    createNewGame: (socket: SocketIOClient.Socket, game: LobbyModel, created: (game: GameModel) => void) => void,
    loadLobbies: (socket: SocketIOClient.Socket) => void,
    joinGame: (socket: SocketIOClient.Socket, id: string, joined: (game: GameModel) => void) => void,
    history: History
}

interface IState {
    showNewGame: boolean,
    newGame: LobbyModel
}

class Lobby extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            showNewGame: false,
            newGame: {
                name: '',
                _id: '',
                players: []
            }
        }
    }

    componentDidMount(){
        this.props.loadLobbies(this.props.socket);
    }

    toggleShowNewGame = () => {
        this.setState({
            showNewGame: !this.state.showNewGame
        });
    }

    newGameConfirm = () => {
        this.props.createNewGame(this.props.socket, this.state.newGame, async (game: GameModel) => {
            this.toggleShowNewGame();
            await this.joinGame(game._id);
        })
        
    }

    newGameDecline = () => {
        this.toggleShowNewGame();
    }

    joinGame = async (id: string) => {
        this.props.joinGame(this.props.socket, id, (game: GameModel) => {
            this.props.history.push("/play");
        });
    }

    validateNewGame = () => {
        return this.state.newGame.name != '';
    }

    handleTextChange = (event: any) => {
        let property = event.target.name;
        let value = event.target.value;

        this.setState((prevState) => ({
            ...prevState,
            newGame: {
                ...prevState.newGame,
                [property]: value
            }
        }));
    }

    render() {
        return (
            <div>
                <p>Lobby</p>
                <div>
                    <p>Games</p>
                    <LobbyList lobbies={this.props.lobbies} joinGame={this.joinGame} />
                </div>
                <Button color="primary" onClick={this.toggleShowNewGame}>New Game</Button>

                <ChatBox socket={this.props.socket} scope="GLOBAL">
                </ChatBox>


                <Modal isOpen={this.state.showNewGame} backdrop="static">
                    <ModalHeader>New Game</ModalHeader>
                    <ModalBody>
                        <div>
                            <FormGroup row={true}>
                            <Label for="lobbyName">Game Name</Label>
                            <Input invalid={!this.validateNewGame()} value={this.state.newGame.name} name="name" onChange={this.handleTextChange}/>
                            <FormFeedback>Game name is required!</FormFeedback>
                            </FormGroup>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.newGameConfirm} disabled={!this.validateNewGame()}>Start</Button>
                        <Button color="secondary" onClick={this.newGameDecline}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return {
        lobbies: state.lobby.lobbies
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<ILobbyState, null, AnyAction>) {
    return {
        createNewGame: (socket: SocketIOClient.Socket, game: LobbyModel, created: (game: GameModel) => void) => dispatch(createNewGame(socket, game, created)),
        loadLobbies: (socket: SocketIOClient.Socket) => loadLobbyList(socket, dispatch),
        joinGame: (socket: SocketIOClient.Socket, id: string, joined: (game: GameModel) => void) => joinGame(socket, dispatch, id, joined)
    };
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Lobby) as React.ComponentType<any>;