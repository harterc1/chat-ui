import Navigator from "@/components/Navigator";
import { NavigationContainer } from "@react-navigation/native";
import MockUserService from "@/services/MockUserService"
import AuthProvider from "./contexts/auth/AuthProvider";

new MockUserService

const App = () => (
  <NavigationContainer>
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  </NavigationContainer>
)

export default App