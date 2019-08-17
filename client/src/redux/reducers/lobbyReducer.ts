import { LobbyKeys } from '../../components/Lobby/redux/keys';
import * as actions from '../../components/Lobby/redux/actions';
import { lobbyState } from '../store/initialStates';

type LobbyActions = 
    actions.ICreateNewGameAction 
    & actions.ILoadLobbies
    & actions.ILobbyRemoved
    & actions.ILobbyUpdated;

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

        case LobbyKeys.LOBBY_UPDATED:
            return {
                ...state,
                lobbies: [
                    ...state.lobbies.filter(lobby => lobby._id != action.game._id),
                    action.game
                ]
            }
            
        default:
            return state;
    }
}