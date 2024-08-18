import { User } from "@/types.chat"
import { createContext } from "react"

const AuthContext = createContext<User | undefined>(undefined)

export default AuthContext