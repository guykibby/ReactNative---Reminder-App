import React, { useState } from "react";

import { View, Text } from "react-native";
import { useEffect } from "react";
import TaskPanel from "./components/TaskPanel";
import AddTask from "./components/AddTask";
import { getStorage, updateStorage } from "./api/localStorage";

export default function App() {
  const [taskList, setTaskList] = useState([]);
  // console.log("taskList: " + taskList);

  let isMounted = false;

  useEffect(() => {
    isMounted = true;
    console.warn("app mounted");
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={{ height: "100%" }}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-around",
          marginTop: 50,
          height: "100%",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
          }}
        >
          Reminders
        </Text>
        <AddTask setTaskList={setTaskList} />
        <View
          style={{
            backgroundColor: "white",
            flex: 1,
          }}
        >
          <TaskPanel taskList={taskList} setTaskList={setTaskList} />
        </View>
      </View>
    </View>
  );
}
