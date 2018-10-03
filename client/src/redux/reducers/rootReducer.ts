import { combineReducers } from 'redux';
import game from './gameReducer';
import lobby from './lobbyReducer';

const rootReducer = combineReducers({
    game,
    lobby
});

export default rootReducer;