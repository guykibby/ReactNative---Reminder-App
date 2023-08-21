import { useEffect } from "react";
import { registerForNotifications } from "./api/notification";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import { getStorage, updateStorage } from "./api/localStorage";

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    registerForNotifications();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage">
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
