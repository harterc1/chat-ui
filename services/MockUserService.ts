
import { User } from "@/types.chat"
import chatService from "./ChatService"

const MOCK_USERS: User[] = [
  {
    username: "barrysanders",
    avatar: require("@/assets/images/mockUsers/barrysanders.png"),
  },
  {
    username: "jinx",
    avatar: require("@/assets/images/mockUsers/jinx.png"),
  },
  {
    username: "davidb3ckham",
    avatar: require("@/assets/images/mockUsers/beckham.png"),
  },
  {
    username: "tom.anderson",
    avatar: require("@/assets/images/mockUsers/tomanderson.jpg"),
  }
]

const MOCK_MESSAGE_TEXT: string[] = [
  "Is anyone going to the game tomorrow?",
  "Hey! how is it going?",
  "Wow. This app is great!",
  "I was just at the gym and the game was on actually. I was in the middle of my set and they were showing replays from when I was practicing when I was younger to compare to the talent today.",
  "Things are looking up 😄",
  "Anyone know if it's going to be sunny in Philadelphia later?",
  "My day is going good. How are you?",
  "Anyone know a good bench workout? I've been doing 5x5, but I think I'm plateauing... 😮‍💨",
  "🏈 Gameday boys! 🏈",
  "Argh I can't wait for the weekend.",
  "Join the Sleeper app before football season starts guys. I need some competition. 💪",
  "Don't forget to stretch",
  "Is it Friday yet?",
  "Anyone there?",
  "❤️ u guys",
  "Anyone know a good burger joint?",
  "I feel sick...",
  "ya",
  "no",
  "Idk maybe..",
  "Hi!",
  "Hello",
]

class MockUserService {
  #interval

  constructor() {
    console.log("hydrating chat...")

    let count = 0
    while (count < 500) {
      this.#sendRandomMessage()
      count++
    }

    console.log("creating interval...")
    this.#interval = setInterval(this.#sendRandomMessage, 1000) // TODO: Randomize interval
  }

  #sendRandomMessage = () => {
    console.log("sending...")
      const user = MOCK_USERS[Math.floor(Math.random() * MOCK_USERS.length)]!
      const text = MOCK_MESSAGE_TEXT[Math.floor(Math.random() * MOCK_MESSAGE_TEXT.length)]!
      chatService.send({ user, chatId: 0, text, })
  }
}

export default MockUserService