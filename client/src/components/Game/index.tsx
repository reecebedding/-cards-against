import * as React from "react";
import { connect } from "react-redux";
import { IGameState } from "../../redux/store/IStoreStates";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { startNewGameSuccess } from "../../redux/actions/gameActions";

interface IProps {
  game: IGameState,
  startGame: () => void
}

class Game extends React.Component<IProps> {
  render() {
    return (
      <div className="container">
        <h1>Cards against</h1>
        <p>Status: {this.props.game.gameStatus}</p>
        <button className="btn" onClick={this.props.startGame}>Start</button>
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
    startGame: () => dispatch(startNewGameSuccess())
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Game);