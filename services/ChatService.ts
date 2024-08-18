import { User, Chat, Message } from "@/types.chat"
import EventEmitter from "eventemitter3"
import uuid from "react-native-uuid";

type MessageEventHandler = (payload: {
  chatId: number,
  message: Message
}) => void

type EventTypes = {
  message: MessageEventHandler
}

class ChatService extends EventEmitter<EventTypes> {
  #chats: Record<string, Chat> = {0: { messages: [], }}

  createMessage = ({ user, text }: { user: User, text: string }): Message => ({
    id: String(uuid.v4()),
    user,
    text,
    dateCreated: new Date,
  })

  send = ({ chatId, message }: { chatId: number, message: Message }) => {
    const chat = this.#chats[chatId]
    if (chat) {
      chat.messages.push(message)
      this.emit("message", { chatId, message })
    }
  }

  fetchAllMessages = ({ chatId }: { chatId: number }): Message[] => {
    return this.#chats[chatId]?.messages || []
  }
}

const chatService = new ChatService

export default chatService