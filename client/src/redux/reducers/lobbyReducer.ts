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

        case LobbyKeys.LOAD_LOBBIES:
            return {
                ...state,
                lobbies: action.games
            }

        case LobbyKeys.LOBBY_REMOVED:
            return {
                ...state,
                lobbies: state.lobbies.filter(lobby => lobby._id != action.game._id)
            }

        default:
            return state;
    }
}