import { MOCK_APP_USER } from "@/mockData";
import AuthContext from "./AuthContext";
import { ReactNode } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => (
  <AuthContext.Provider value={MOCK_APP_USER}>
    { children }
  </AuthContext.Provider>
)

export default AuthProvider