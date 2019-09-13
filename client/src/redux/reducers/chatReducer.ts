import * as actions from '../../components/Shared/Chat/redux/actions';
import { IChatState } from '../store/IStoreStates'
import { chatState } from '../store/initialStates'
import { ChatKeys } from '../../components/Shared/Chat/redux/keys';

type ChatActions = 
     actions.IChatMessageRecieved
     

export default function chatReducer(state = chatState, action: ChatActions): IChatState {
    switch (action.type) {

        case ChatKeys.RECIEVED_CHAT_MESSAGE:
            return {
                ...state,
                chatHistory: [
                    ...state.chatHistory,
                    action.chatMessage
                ]
            }

        default:
            return state;
    }
}