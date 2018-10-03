import { GameKeys } from '../actions/actionKeys';
import { gameState } from '../store/initialStates';
import * as gameStatus from '../../constants/gameStatusConstants';
import { GameActions } from '../actions/actionTypes';

export default function gameReducer(state = gameState, action: GameActions) {
    switch (action.type) {
        
        case GameKeys.USER_JOINED:
            return {
                ...state,
                users: [...state.users, action.user]
            }

            case GameKeys.USER_LEFT:
            return {
                ...state,
                users: state.users.filter(user => user !== action.user)
            }

        default:
            return state;
    }
}