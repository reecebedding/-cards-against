import { GameKeys } from '../../components/Game/redux/keys';
import * as actions from '../../components/Game/redux/actions'
import { gameState } from '../store/initialStates';

type GameActions = 
     actions.IJoinedGame
     & actions.IPlayerJoined
     & actions.IPlayerLeft;

export default function lobbyReducer(state = gameState, action: GameActions) {
    switch (action.type) {
        
        case GameKeys.JOINED_GAME:
            return {
                ...state,
                activeGame: action.game
            };
        
        case GameKeys.PLAYER_JOINED:
            return {
                ...state,
                activeGame: {
                    ...state.activeGame,
                    players: [...state.activeGame.players, action.player]
                }
            }

        case GameKeys.PLAYER_LEFT:
            return {
                ...state,
                activeGame: {
                    ...state.activeGame,
                    players: state.activeGame.players.filter(x => x.id != action.player.id)
                }
            }

        default:
            return state;
    }
}