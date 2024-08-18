import { Message, MessageWithIndex } from "@/types.chat"
import { useCallback, useEffect, useRef, useState } from "react"

import chatService from "@/services/ChatService"
import useInterval from "./useInterval"
import useAuthContext from "@/contexts/auth/useAuthContext"
import { getMessagesWithIndices, getMessageWithIndex } from "@/utils"

type UseChatReturn = {
  messages: MessageWithIndex[],
  send: (text: string) => void
}

/**
 * Allows a view to observe messages coming in from our `ChatService`.
 * 
 * - Throttles messages to avoid re-render bursts
 * - Instantly stores the app user's for immediate user feedback
 * - Encapsulates each message with an `indexWithinGroup` to allow
 *    the UI to determine which messages are to be rendered with headers (the sender's avatar, username, etc.)
 * 
 * Returns:
 * - A `send` function tied to the current app user
 * - The `messages` array for the specified chat
 */
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
        messageQueue.current.unshift(message)
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