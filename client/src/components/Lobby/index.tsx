import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ILobbyState } from '../../redux/store/IStoreStates';
import { AnyAction } from 'redux';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Label, Col, Input, FormFeedback, Form, FormGroup } from 'reactstrap';
import { Game } from '../../models/Game';
import { createNewGame } from '../../redux/actions/lobbyActions';

interface IProps {
    socket: SocketIOClient.Socket,
    lobbies: Game[],
    createNewGame: (socket: SocketIOClient.Socket, game: Game) => void
}

interface IState {
    showNewGame: boolean,
    newGame: Game
}

class Lobby extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            showNewGame: false,
            newGame: {
                name: '',
                _id: ''
            }
        }
    }

    toggleShowNewGame = () => {
        this.setState({
            showNewGame: !this.state.showNewGame
        });
    }

    newGameConfirm = () => {
        this.props.createNewGame(this.props.socket, this.state.newGame)
        this.toggleShowNewGame();
    }

    newGameDecline = () => {
        this.toggleShowNewGame();
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
                    <ol> 
                        {
                            this.props.lobbies.map((item, index) => (
                            <li key={index}>{item.name}</li>
                            ))
                        }
                    </ol>
                </div>
                <Button color="primary" onClick={this.toggleShowNewGame}>New Game</Button>

                <Modal isOpen={this.state.showNewGame} backdrop="static">
                    <ModalHeader>New Game</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                            <Label for="lobbyName">Game Name</Label>
                            <Input invalid={!this.validateNewGame()} value={this.state.newGame.name} name="name" onChange={this.handleTextChange}/>
                            <FormFeedback>Game name is required!</FormFeedback>
                            </FormGroup>
                        </Form>
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
        createNewGame: (socket: SocketIOClient.Socket, game: Game) => dispatch(createNewGame(socket, game))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);