import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import TaskPanel from "./components/TaskPanel";
import AddTask from "./components/AddTask";
import { getStorage, updateStorage } from "./api/localStorage";

export default function App() {
  const [taskList, setTaskList] = useState([]);

  let isMounted = false;

  useEffect(() => {
    isMounted = true;
    console.warn("app mounted");
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reminders</Text>
      <AddTask setTaskList={setTaskList} />
      <View style={styles.panel}>
        <TaskPanel taskList={taskList} setTaskList={setTaskList} />
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
