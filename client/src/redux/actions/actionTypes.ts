import * as gameActions from './gameActions';

export type GameActions = 
    gameActions.IStartNewGameAction
    & gameActions.IUserJoinedGameAction
    & gameActions.IUserLeftGameAction