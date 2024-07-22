

import Login from "./src/screens/Login/Login";
import Registre from "./src/screens/Registre/Registre";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import { Text, View } from "react-native";
import Drawer from "./src/screens/Drawer/Drawer";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

function App() {
  const [login, setLogin] = useState(false)

  useEffect(() => {
    const checkToken = async () => {

      try {
        const token = await AsyncStorage.getItem("login");
        if (token) {
          console.log("token has")
          setLogin(true);
        } else {
          setLogin(false);
          console.log("token has not")
        }
      }
      catch (error) {
        console.error('Error checking token:', error);
      }

    }
    checkToken()
  }, [])

  return (

    <NavigationContainer>
      <Stack.Navigator>
        {!login &&
          <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        }
        <Stack.Screen options={{ headerShown: false }} name="Drawer" component={Drawer} />
        <Stack.Screen options={{ headerShown: false }} name="Registre" component={Registre} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}


export default App;
