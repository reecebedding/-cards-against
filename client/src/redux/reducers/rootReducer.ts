import { combineReducers } from 'redux';
import lobby from './lobbyReducer';
import game from './gameReducer';

const rootReducer = combineReducers({
    lobby,
    game
});

export default rootReducer;