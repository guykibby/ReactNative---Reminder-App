import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import TaskItem from "./TaskItem";
import DeleteButton from "./DeleteButton";
import { SwipeListView } from "react-native-swipe-list-view";
import {
  registerForNotifications,
  setNotificationFor,
} from "../api/notification";
import { getStorage, updateStorage } from "../api/localStorage";
import AddTask from "./AddTask";

const HomePage = () => {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const savedTasks = await getStorage();
      setTaskList(savedTasks);
    };
    registerForNotifications();
    fetchTasks();
  }, []);

  const handleAdd = async (newTask) => {
    const newTaskList = [...taskList, newTask];
    setTaskList(newTaskList);
    await updateStorage(newTaskList);
    await setNotificationFor(newTask);
  };

  const handleDelete = async (index) => {
    const newData = [...taskList];
    newData.splice(index, 1);
    setTaskList(newData);
    await updateStorage(newData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text
          style={{
            fontFamily: "PermanentMarker_400Regular",
            fontSize: 50,
            color: "white",
          }}
        >
          Reminder App
        </Text>
      </View>
      <AddTask handleAdd={handleAdd} />

      <View style={styles.list}>
        <SwipeListView
          data={taskList}
          renderItem={TaskItem}
          renderHiddenItem={(data) => DeleteButton(data.index, handleDelete)}
          rightOpenValue={-100}
          // recalculateHiddenLayout={true}
        />
      </View>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4F6C9B",
    alignItems: "center",
  },
  heading: {
    flex: 1.1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  list: {
    flex: 7,
    width: "100%",
  },
});
