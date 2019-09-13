import { combineReducers } from 'redux';
import lobby from './lobbyReducer';
import game from './gameReducer';
import chat from './chatReducer';

const rootReducer = combineReducers({
    lobby,
    game,
    chat
});

export default rootReducer;