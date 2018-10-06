import * as gameActions from './gameActions';
import * as lobbyActions from './lobbyActions';

export type GameActions = 
    & gameActions.IUserJoinedGameAction
    & gameActions.IUserLeftGameAction

export type LobbyActions = 
    & lobbyActions.ICreateNewGameAction
    & lobbyActions.ILoadLobbies
    & lobbyActions.ILobbyRemoved