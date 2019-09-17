import * as React from "react";
import { ChatMessage } from "../../../models/ChatMessage";
import { Input, InputGroup, InputGroupAddon, Button, InputGroupButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { ThunkDispatch } from "redux-thunk";
import { IChatState } from "../../../redux/store/IStoreStates";
import { AnyAction, compose } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { sendChatMessage } from "../../../socket/actions/chatActions";

interface IProps {
    socket: SocketIOClient.Socket,
    chatHistory: ChatMessage[],
    defaultScope: string
    availableScopes: string[]
    sendMessage: (message: string, scope: string) => void
}

interface IState {
    currentMessage: string
    currentScope: string,
    splitButtonOpen: boolean
}

export class ChatBox extends React.Component<IProps, IState> {
    
    chatBox: any;
    constructor(props: IProps) {
        super(props);
        this.chatBox = React.createRef<HTMLTextAreaElement>();
        this.state = {
            currentMessage: '',
            currentScope: props.defaultScope,
            splitButtonOpen: false
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
            this.props.sendMessage(this.state.currentMessage, this.state.currentScope);
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

    toggleSplit = () => {
        this.setState({
          splitButtonOpen: !this.state.splitButtonOpen
        });
    }

    setScope = (scope: string) => () => {
        this.setState({
            currentScope: scope
        })
    }

    render(){
        return (
            <div className="form-group">                    
                <textarea 
                    ref={chatBox => this.chatBox = chatBox} 
                    className="form-control" 
                    rows={3} 
                    readOnly={true}
                    value={this.props.chatHistory.map(x => `[${x.scope}] ${x.date} ${x.sender} : ${x.message}`).join("\n")}
                />
                <InputGroup>
                    <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.splitButtonOpen} toggle={this.toggleSplit}>
                        <DropdownToggle caret={true}>
                        {this.state.currentScope}
                        </DropdownToggle>
                        <DropdownMenu>
                        {this.props.availableScopes.map(scope => <DropdownItem key={scope} onClick={this.setScope(scope)}>{scope}</DropdownItem>)}
                        </DropdownMenu>
                    </InputGroupButtonDropdown>
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
        sendMessage: (chatMessage: string, scope: string) => sendChatMessage(props.socket, chatMessage, scope)
    };
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(ChatBox) as React.ComponentType<any>;