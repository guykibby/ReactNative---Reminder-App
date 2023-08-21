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
      alert("Failed to get permission for push notification!");
      return;
    }
  } catch (error) {
    alert(
      "An error occurred while getting the permission for you to recieve notifications!"
    );
  }
}

export const setNotificationFor = async ({ timestamp, name }) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Task Due!!!",
        body: { name },
      },
      trigger: timestamp,
    });
  } catch (error) {
    alert(
      "An error occurred while scheduling the notification for this task! sorry :)"
    );
  }
};
