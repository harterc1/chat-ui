
import { User } from "@/types.chat"
import chatService from "./ChatService"

const MOCK_USERS: User[] = [
  {
    username: "barrysanders",
    avatar: require("@/assets/images/mockUsers/barrysanders.jpeg"),
  }
]

const DEFAULT_USER = MOCK_USERS[0]!

class MockUserService {
  #interval

  constructor() {
    console.log("creating interval...")
    this.#interval = setInterval(() => {
      console.log("sending...")
      chatService.send({ user: DEFAULT_USER, chatId: 0, text: "hello?" })
    }, 1000)
  }
}

export default MockUserService