import chatService from "./ChatService"
import { MOCK_MESSAGE_TEXT, MOCK_USERS } from "@/mockData"

class MockUserService {
  constructor() {
    let count = 0
    while (count < 500) {
      this.#sendRandomMessage()
      count++
    }

    this.#startRandomMessageInterval()
  }

  #startRandomMessageInterval = () => {
    this.#sendRandomMessage()
    setTimeout(this.#startRandomMessageInterval, Math.floor(Math.random() * 4000))
  }

  #sendRandomMessage = () => {
      const user = MOCK_USERS[Math.floor(Math.random() * MOCK_USERS.length)]!
      const text = MOCK_MESSAGE_TEXT[Math.floor(Math.random() * MOCK_MESSAGE_TEXT.length)]!
      const message = chatService.createMessage({ user, text })
      chatService.send({ message, chatId: 0  })
  }
}

export default MockUserService