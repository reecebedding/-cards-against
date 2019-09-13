export class ChatMessageDTO {
    date: number = Date.now()
    sender: string = ''
    message: string = ''
    scope: string
}