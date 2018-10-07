import * as gameActions from './gameActions';
import * as lobbyActions from './lobbyActions';

export type GameActions = 
    & gameActions.IJoinedGame

export type LobbyActions = 
    & lobbyActions.ICreateNewGameAction
    & lobbyActions.ILoadLobbies
    & lobbyActions.ILobbyRemoved