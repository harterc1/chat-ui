import { User } from "@/types.chat";
import { useContext } from "react";
import AuthContext from "./AuthContext";

const useAuthContext = (): User | undefined => useContext(AuthContext)

export default useAuthContext