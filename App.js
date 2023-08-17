import React, { useState } from "react";

import { View, Text } from "react-native";
import { useEffect } from "react";
import TaskPanel from "./components/TaskPanel";
import AddTodo from "./components/AddTodo";
import { getStorage, updateStorage } from "./api/localStorage";

export default function App() {
  const [listData, setListData] = useState([]);
  // console.log("listData: " + listData);

  const datePickerMode = (currentMode) => {
    setShowDatePicker(true);
    setDateTimePickerMode(currentMode);
  };

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
        <AddTodo setListData={setListData} />
        <View
          style={{
            backgroundColor: "white",
            flex: 1,
          }}
        >
          <TaskPanel listData={listData} setListData={setListData} />
        </View>
      </View>
    </View>
  );
}
