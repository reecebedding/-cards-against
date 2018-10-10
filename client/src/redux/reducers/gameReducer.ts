import { GameKeys } from '../actions/actionKeys';
import { gameState } from '../store/initialStates';
import { GameActions } from '../actions/actionTypes';

export default function lobbyReducer(state = gameState, action: GameActions) {
    switch (action.type) {
        
        case GameKeys.JOINED_GAME:
            return {
                ...state,
                activeGame: action.game
            };
        break;

        default:
            return state;
    }
}