import Navigator from "@/components/Navigator";
import { NavigationContainer } from "@react-navigation/native";
import mockUserService from "@/services/MockUserService"
import AuthProvider from "./contexts/auth/AuthProvider";

mockUserService.start()

const App = () => (
  <NavigationContainer>
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  </NavigationContainer>
)

export default App