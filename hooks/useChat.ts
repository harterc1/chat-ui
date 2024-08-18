import { Message } from "@/types.chat"
import { useEffect, useRef, useState } from "react"

import chatService from "@/services/ChatService"
import useInterval from "./useInterval"

type MessageWithIndex = {
  message: Message
  indexWithinGroup: number
}

const getMessageWithIndex = (message: Message, prevMessage?: MessageWithIndex): MessageWithIndex => {
  let indexWithinGroup = 0
  console.log("converting with message", message, "prevMessage", prevMessage)
  if (prevMessage && message.user.username === prevMessage.message.user.username) {
    indexWithinGroup = prevMessage.indexWithinGroup + 1
  }
  return { message, indexWithinGroup }
}

const convertToMessagesWithIndices = (messages: Message[], prevMessages: MessageWithIndex[]) : MessageWithIndex[] => {
  let prevMessage = prevMessages[0]
  let newMessages: MessageWithIndex[] = []
  messages.forEach((message: Message) => {
    prevMessage = getMessageWithIndex(message, prevMessage)
    newMessages.push(prevMessage)
  })
  return newMessages
}

const useChat = (chatId: number) => {
  const [messages, setMessages] = useState<MessageWithIndex[]>(
    convertToMessagesWithIndices(chatService.fetchAllMessages({ chatId }), [])

  )
  const messageQueue = useRef<Message[]>([])

  useEffect(() => {
    const onMessage = ({ chatId: messageChatId, message }: {chatId: number, message: Message}) => {
      if (messageChatId === chatId) {
        messageQueue.current.push(message)
      }
    }
    chatService.on("message", onMessage)

    return () => {
      chatService.off("message", onMessage)
    }
  }, [])

  useInterval(() => {
    if (messageQueue.current.length) {
      const newMessages = convertToMessagesWithIndices(messageQueue.current, messages)
      setMessages([...newMessages, ...messages])
      messageQueue.current = []
    }
  }, 3000)

  return messages
}

export default useChat