import { LobbyKeys } from '../actions/actionKeys';
import { lobbyState } from '../store/initialStates';
import { LobbyActions } from '../actions/actionTypes';

export default function lobbyReducer(state = lobbyState, action: LobbyActions) {
    switch (action.type) {
        
        case LobbyKeys.CREATE_NEW_GAME:
            return {
                ...state,
                lobbies: [...state.lobbies, action.game]
            }

        default:
            return state;
    }
}