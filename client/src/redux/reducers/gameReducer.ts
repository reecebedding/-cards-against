import { GameKeys } from '../../components/Game/redux/keys';
import * as actions from '../../components/Game/redux/actions'
import { gameState } from '../store/initialStates';
import { IGameState } from '../store/IStoreStates';

type GameActions = 
     actions.IJoinedGame
     & actions.IPlayerJoined
     & actions.IPlayerLeft
     & actions.IGameStarted
     & actions.IPlayerRecievedCard
     & actions.IPlayerChoseCards
     & actions.IRoundStatusChanged
     & actions.ICzarPickingCard
     & actions.IRoundFinished;

export default function gameReducer(state = gameState, action: GameActions): IGameState {
    switch (action.type) {
        
        case GameKeys.JOINED_GAME:
            return {
                ...state,
                activeGame: {
                    ...state.activeGame,
                    ...action.game
                }
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

        case GameKeys.GAME_DEALT_BLACK_CARD:
            return {
                ...state,
                activeGame: {
                    ...state.activeGame,
                    blackCard: action.card
                }       
            }
        case GameKeys.PLAYER_CHOSE_CARDS:
            return {
                ...state,
                activeGame: {
                    ...state.activeGame,
                    players: state.activeGame.players.map(player => {
                        if (player.id === action.playerId){                            
                            return {
                                ...player,
                                playedCards: state.activeGame.blackCard.requiredAnswers 
                            };
                        }
                        else {
                            return player;
                        }
                    })
                }    
            }

        case GameKeys.ROUND_STATUS_CHANGED:
            return {
                ...state,
                activeGame: {
                    ...state.activeGame,
                    roundStatus: action.roundStatus
                }
            }

        case GameKeys.CZAR_PICKING_CARDS:
            return {
                ...state,
                activeGame: {
                    ...state.activeGame,
                    roundsSelectedCards: action.roundsSelectedCards
                }
            }

        case GameKeys.ROUND_FINISHED:
            return {
                ...state,
                activeGame: {
                    ...state.activeGame,
                    roundResult: action.roundResult                 
                }
            }

        default:
            return state;
    }
}