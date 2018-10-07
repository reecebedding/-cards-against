import { combineReducers } from 'redux';
import lobby from './lobbyReducer';

const rootReducer = combineReducers({
    lobby
});

export default rootReducer;