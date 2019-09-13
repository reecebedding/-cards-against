export enum ChatScope {
    "GLOBAL",
    "GAME"
}

export class ChatMessageModel {
    date: number = Date.now()
    sender: string = ''
    message: string = ''
    scope: ChatScope
}