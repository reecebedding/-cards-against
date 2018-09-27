import { GameKeys } from '../actions/actionKeys';
import { IStartNewGame } from '../actions/gameActions';
import { gameState } from '../store/initialStates';
import * as gameStatus from '../../constants/gameStatusConstants';

export default function gameReducer(state = gameState, action: IStartNewGame) {
    switch (action.type) {

        case GameKeys.START_NEW_GAME:
            return {
                ...state, 
                gameStatus: gameStatus.IN_PROGRESS
            };

        default:
            return state;
    }
}