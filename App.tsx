import Navigator from "@/components/Navigator";
import { NavigationContainer } from "@react-navigation/native";
import MockUserService from "@/services/MockUserService"

new MockUserService

const App = () => (
  <NavigationContainer>
    <Navigator />
  </NavigationContainer>
)

export default App