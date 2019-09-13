import * as React from "react";
import { ChatMessage } from "../../../models/chatMessage";
import { Input, InputGroup, InputGroupAddon, Button } from "reactstrap";
import { ThunkDispatch } from "redux-thunk";
import { IChatState } from "../../../redux/store/IStoreStates";
import { AnyAction, compose } from "redux";
import { chatMessageRecieved } from "./redux/actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { sendChatMessage } from "../../../socket/actions/chatActions";

interface IProps {
    socket: SocketIOClient.Socket,
    chatHistory: ChatMessage[],
    scope: string
    sendMessage: (message: string) => void
}

interface IState {
    currentMessage: string
}

export class ChatBox extends React.Component<IProps, IState> {
    
    chatBox: any;
    constructor(props: IProps) {
        super(props);
        this.chatBox = React.createRef<HTMLTextAreaElement>();
        this.state = {
            currentMessage: ''
        }
    }

    handleCurrentMessageChange = (event: any) => {
        let value = event.target.value;

        this.setState((prevState) => ({
            ...prevState,
            currentMessage: value
        }));
    }

    sendMessage = () => {
        if(this.state.currentMessage){
            this.props.sendMessage(this.state.currentMessage);
            this.setState((prev) => ({
                ...prev,
                currentMessage: ''
            }));
        }
    }

    handleCurrentMessageKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            this.sendMessage();
        }
    }

    render(){
        return (
            <div className="form-group">                    
                <textarea ref={chatBox => this.chatBox = chatBox} 
                    className="form-control" rows={3} 
                    readOnly 
                    value={this.props.chatHistory.map(x => `[${x.scope}] ${x.date} ${x.sender} : ${x.message}`).join("\n")}
                >
                </textarea>
                <InputGroup>
                    <Input placeholder="Message..." value={this.state.currentMessage} onChange={this.handleCurrentMessageChange} onKeyDown={this.handleCurrentMessageKeyDown}/>
                    <InputGroupAddon addonType="append"><Button color="primary" onClick={this.sendMessage}>Send</Button></InputGroupAddon>
                </InputGroup>
            </div>
        );
    }

    componentDidUpdate(){
        this.chatBox.scrollTop = this.chatBox.scrollHeight;
    }
}


function mapStateToProps(state: any) {
    return {
        chatHistory: state.chat.chatHistory
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<IChatState, null, AnyAction>, props: IProps) {
    return {
        sendMessage: (chatMessage: string) => sendChatMessage(props.socket, chatMessage, props.scope)
    };
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(ChatBox) as React.ComponentType<any>;