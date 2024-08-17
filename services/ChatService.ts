import { User, Chat, Message } from "@/types.chat"
import EventEmitter from "eventemitter3"
import uuid from 'react-native-uuid';

class ChatService extends EventEmitter {
  #chats: Record<string, Chat> = {0: { messages: [], }}

  send = ({ user, chatId, text }: { user: User, chatId: number, text: string }) => {
    const chat = this.#chats[chatId]
    if (chat) {
      console.log(`sending message ${text} to chat ${chatId}...`)
      const message = {
        id: String(uuid.v4()),
        user,
        text,
        dateCreated: new Date,
      }
      chat.messages.push(message)
      this.emit("message", { chatId, message })
    }
  }

  fetchMessages = ({ chatId }: { chatId: number }): Message[] => {
    return this.#chats[chatId]?.messages || []
  }
}

const chatService = new ChatService

export default chatService