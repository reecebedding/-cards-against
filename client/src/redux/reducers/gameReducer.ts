import { GameKeys } from '../../components/Game/redux/keys';
import * as actions from '../../components/Game/redux/actions'
import { gameState } from '../store/initialStates';
import { IGameState } from '../store/IStoreStates';
import { PlayerModel } from '../../models/PlayerModel';

type GameActions = 
     actions.IJoinedGame
     & actions.IPlayerJoined
     & actions.IPlayerLeft
     & actions.IGameStarted
     & actions.IPlayerRecievedCard;

export default function lobbyReducer(state = gameState, action: GameActions): IGameState {
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

        case GameKeys.GAME_STARTED:
            return {
                ...state,
                activeGame: {
                    ...state.activeGame,
                    gameStatus: action.game.gameStatus
                }
            }
            
        case GameKeys.PLAYER_RECIEVED_CARD:
            return {
                ...state,
                activeGame: {
                    ...state.activeGame,
                    players: state.activeGame.players.map(player => {
                        if(player.id === action.player.id){
                            return {
                                ...player,
                                cards: [
                                    ...player.cards || [],
                                    action.card
                                ]
                            }
                        } 
                        return player;
                    })
                }
            }

        default:
            return state;
    }
}