/*
 TEST INPUT:

 https://i.ebayimg.com/images/g/ZL8AAOSwmbRjZNMO/s-l1200.webp
 https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6IO6cYbTqsVXQKnpJRQ8B3QsBb-vEmyqNiQ&s
 https://t3.ftcdn.net/jpg/02/95/44/22/360_F_295442295_OXsXOmLmqBUfZreTnGo9PREuAPSLQhff.jpg
 https://thumbs.dreamstime.com/b/funny-face-baby-27701492.jpg

*/

import { User } from "./types.chat"

export const MOCK_APP_USER: User = {
  username: "tom.anderson",
  avatar: require("@/assets/images/mockUsers/tomanderson.jpg"),
}

export const MOCK_USERS: User[] = [
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
]

export const MOCK_MESSAGE_TEXT = [
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
  "Join before football season starts guys. I need some competition. 💪",
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
  "The ol' pig skin https://operations.nfl.com/media/2948/the-ball-football.jpg?mode=max&width=995",
  "https://images.theconversation.com/files/38926/original/5cwx89t4-1389586191.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=926&fit=clip",
  "I want to move to Florida! https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,h_625,q_55,w_500/v1/clients/visitflorida/Hutchinson_Island_Ross_Witham_Beach_Ground_05_2023_NPI_Productions__908eaee7-5a19-49c7-9096-15757cecb184.jpg .. or at least I used to. https://nypost.com/wp-content/uploads/sites/2/2024/06/florida-falling-favor-movers-choose-83385261.jpg?quality=75&strip=all&w=1024",
  "Good doge :) https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/rockcms/2022-01/210602-doge-meme-nft-mb-1715-8afb7e.jpg"
]