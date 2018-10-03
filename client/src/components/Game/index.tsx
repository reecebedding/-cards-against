import * as React from "react";
import { connect } from "react-redux";
import { IGameState } from "../../redux/store/IStoreStates";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { userJoinedGame, userLeftGame } from "../../redux/actions/gameActions";

interface IProps {
  socket: SocketIOClient.Socket,
  game: IGameState,
  userJoined: (user: any) => void,
  userLeft: (user: any) => void
}

class Game extends React.Component<IProps> {

  componentDidMount(){
    this.props.socket.on("USER_JOINED", (user: any) => {
        this.props.userJoined(user);
    });

    this.props.socket.on("USER_LEFT", (user: any) => {
      this.props.userLeft(user);
    })
  }

  render() {
    return (
      <div className="container">
        <h1>Cards against</h1>
        <p>Status: {this.props.game.gameStatus}</p>
        <p>Players: 
          <ol> 
          {
            this.props.game.users.map((item, index) => (
              <li key={index}>{item}</li>
            ))
          }
        </ol>
        </p>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    game: state.game
  };
}
function mapDispatchToProps(dispatch: ThunkDispatch<IGameState, null, AnyAction>) {
  return {
    userJoined: (user: any) => dispatch(userJoinedGame(user)),
    userLeft: (user: any) => dispatch(userLeftGame(user))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Game);