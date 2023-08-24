import { Alert } from "react-native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function registerForNotifications() {
  try {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert("Failed to get permission for push notification!");
      return;
    }
  } catch (error) {
    Alert.alert("Unable to send notifications! Sorry.");
  }
}

export const setNotificationFor = async ({ timestamp, name, key }) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: name,
      },
      trigger: timestamp,
    });
  } catch (error) {
    Alert.alert("Unable to schedule a notification for this task! Sorry.");
  }
};
