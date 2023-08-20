import { useEffect } from "react";
import { registerForNotifications } from "./api/notification";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TaskPanel from "./components/TaskPanel";
import { getStorage, updateStorage } from "./api/localStorage";

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    registerForNotifications();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TaskPanel"
          component={TaskPanel}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
