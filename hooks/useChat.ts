import { Message } from "@/types.chat"
import { useCallback, useEffect, useRef, useState } from "react"

import chatService from "@/services/ChatService"
import useInterval from "./useInterval"
import useAuthContext from "@/contexts/auth/useAuthContext"

type MessageWithIndex = {
  message: Message
  indexWithinGroup: number
}

const getMessageWithIndex = (message: Message, prevMessage?: MessageWithIndex): MessageWithIndex => {
  let indexWithinGroup = 0
  if (prevMessage && message.user.username === prevMessage.message.user.username) {
    indexWithinGroup = prevMessage.indexWithinGroup + 1
  }
  return { message, indexWithinGroup }
}

const getMessagesWithIndices = (messages: Message[], prevMessages: MessageWithIndex[]) : MessageWithIndex[] => {
  let prevMessage = prevMessages[0]
  let newMessages: MessageWithIndex[] = []
  messages.forEach((message: Message) => {
    prevMessage = getMessageWithIndex(message, prevMessage)
    newMessages.push(prevMessage)
  })
  return newMessages
}

type UseChatReturn = {
  messages: MessageWithIndex[],
  send: (text: string) => void
}

const useChat = (chatId: number): UseChatReturn => {

  const user = useAuthContext()

  const [messages, setMessages] = useState<MessageWithIndex[]>(
    getMessagesWithIndices(
      chatService.fetchAllMessages({ chatId }),
      [],
    )
  )
  const messageQueue = useRef<Message[]>([])

  useEffect(() => {
    const onMessage = ({ chatId: messageChatId, message }: {chatId: number, message: Message}) => {
      if (messageChatId === chatId && user?.username !== message.user.username) {
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
      const newMessages = getMessagesWithIndices(messageQueue.current, messages)
      setMessages([...newMessages, ...messages])
      messageQueue.current = []
    }
  }, 1000)

  const send = useCallback((text: string) => {
    console.log("sending", text, "as", user)
    if (!user) { return }

    const message = chatService.createMessage({ user, text })

    // Immediately update state so user has instant feedback
    setMessages([
      getMessageWithIndex(message, messages[0]),
      ...messages,
    ])

    chatService.send({ message, chatId })
  }, [user, chatId, messages])

  return { send, messages }
}

export default useChat