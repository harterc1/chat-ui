import { Message, MessageWithIndex } from "@/types.chat"
import { useCallback, useEffect, useRef, useState } from "react"

import chatService from "@/services/ChatService"
import useInterval from "./useInterval"
import useAuthContext from "@/contexts/auth/useAuthContext"
import { getMessagesWithIndices, getMessageWithIndex } from "@/app/utils"

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
        // TODO: Test message order queueing/dequeueing
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