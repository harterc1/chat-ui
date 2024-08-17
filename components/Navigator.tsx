import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chat from "./Chat"

const Main = createNativeStackNavigator()

const Navigator = () => (
  <Main.Navigator>
    <Main.Screen name="Chat" component={Chat} />
  </Main.Navigator>
)

export default Navigator
