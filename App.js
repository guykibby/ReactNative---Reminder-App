import { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import * as Notifications from "expo-notifications";
import {
  registerForNotifications,
  setNotificationFor,
} from "./api/notification";
import TaskPanel from "./components/TaskPanel";
import AddTask from "./components/AddTask";
import { getStorage, updateStorage } from "./api/localStorage";

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    registerForNotifications().then((token) => setExpoPushToken(token));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response.notification.request.content.data);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reminders</Text>
      <AddTask setTaskList={setTaskList} />
      <View style={styles.panel}>
        <TaskPanel taskList={taskList} setTaskList={setTaskList} />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Text>Your expo push token: {expoPushToken}</Text>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text>
            Title: {notification && notification.request.content.title}{" "}
          </Text>
          <Text>Body: {notification && notification.request.content.body}</Text>
          <Text>
            Data:{" "}
            {notification && JSON.stringify(notification.request.content.data)}
          </Text>
        </View>
        <Button
          title="Press to schedule a notification"
          onPress={async () => {
            const trigger = new Date();
            trigger.setSeconds(trigger.getSeconds() + 2);
            const newTask = {
              name: "Test",
              timestamp: trigger,
            };
            await setNotificationFor(newTask);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    marginTop: 50,
    height: "100%",
  },
  heading: {
    textAlign: "center",
    fontSize: 20,
  },
  panel: {
    backgroundColor: "white",
    flex: 1,
  },
});
