import { Message } from "@/types.chat"
import { useEffect, useRef, useState } from "react"

import chatService from "@/services/ChatService"
import useInterval from "./useInterval"

const useChat = (chatId: number) => {
  const [messages, setMessages] = useState<Message[]>(chatService.fetchAllMessages({ chatId })) // TODO: pagination
  const messageQueue = useRef<Message[]>([])

  // useEffect(() => {
  //   // const onMessage = (message: Message) => newMessages.current.push(message)
  //   const onMessage = ({ chatId: messageChatId, message }: {chatId: number, message: Message}) => {
  //     if (messageChatId === chatId) {
  //       // setMessages([message, ...messages])
  //       newMessages.current.push(message)
  //     }
  //   }
  //   chatService.on("message", onMessage)

  //   return () => {
  //     chatService.off("message", onMessage)
  //   }
  // }, [messages])

  useEffect(() => {
    // const onMessage = (message: Message) => newMessages.current.push(message)
    const onMessage = ({ chatId: messageChatId, message }: {chatId: number, message: Message}) => {
      if (messageChatId === chatId) {
        // setMessages([message, ...messages])
        messageQueue.current.push(message)
      }
    }
    chatService.on("message", onMessage)

    return () => {
      chatService.off("message", onMessage)
    }
  }, [])

  /**
   * Deque messages at a fixed interval:
   *  - Throttles how frequently the UI re-renders
   *  - Allows the `useEffect` above to not have to unsubscribe/resubscribe
   *    for message events on every message state update.
   *  
   *  Note: make sure the interval time specified is
   *        longer than any animation durations in the UI to prevent
   *        overlapping/conflicting animation behavior.
   */
  useInterval(() => {
    if (messageQueue.current.length) {
      setMessages([...messageQueue.current, ...messages])
      messageQueue.current = []
    }
  }, 3000)

  return messages
}

export default useChat