import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import TaskItem from "./TaskItem";
import DeleteButton from "./DeleteButton";
import { SwipeListView } from "react-native-swipe-list-view";
import { setNotificationFor } from "../api/notification";
import { getStorage, updateStorage } from "../api/localStorage";

import AddTask from "./AddTask";

const HomePage = () => {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const savedTasks = await getStorage();
      console.log("savedTasks", savedTasks);
      setTaskList(savedTasks);
    };

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
      <Text style={styles.heading}>Reminders App</Text>
      <AddTask handleAdd={handleAdd} />
      <View style={styles.list}>
        <SwipeListView
          data={taskList}
          renderItem={TaskItem}
          renderHiddenItem={(data) => DeleteButton(data.index, handleDelete)}
          rightOpenValue={-130}
        />
      </View>
    </View>
  );
};

export default HomePage;

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
  list: {
    backgroundColor: "white",
    flex: 1,
  },
});
