import { Message, MessageWithIndex } from "@/types.chat"

export const extractUrls = (text: string): string[] => {
  const imageUrls = text.match(/(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+/ig)
  return Array.from(new Set(imageUrls || []))
}

export const extractContentTypes = async (urls: string[]): Promise<string[]> => {
  return Promise.all(urls.map(async (url) => {
    try {
      const response = await fetch(url, { method: "HEAD" })
      return response.headers.get("content-type") || ""
    } catch (e) {
      return ""
    }
  }))
}

export const getMessageWithIndex = (message: Message, prevMessage?: MessageWithIndex): MessageWithIndex => {
  let indexWithinGroup = 0
  if (prevMessage && message.user.username === prevMessage.message.user.username) {
    indexWithinGroup = prevMessage.indexWithinGroup + 1
  }
  return { message, indexWithinGroup }
}

export const getMessagesWithIndices = (messages: Message[], prevMessages: MessageWithIndex[]) : MessageWithIndex[] => {
  let prevMessage = prevMessages[0]
  let newMessages: MessageWithIndex[] = []
  messages.forEach((message: Message) => {
    prevMessage = getMessageWithIndex(message, prevMessage)
    newMessages.push(prevMessage)
  })
  return newMessages
}