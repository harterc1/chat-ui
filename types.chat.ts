export type User = {
  username: string
  avatar: string
}

export type Message = {
  id: string
  user: User
  text: string
  dateCreated: Date
}

export type MessageWithIndex = {
  message: Message
  indexWithinGroup: number
}

export type Chat = {
  messages: Message[]
}