import React, { useState } from "react";

import { View, Text } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { useEffect } from "react";
import TodoItem from "./components/TodoItem";
import TodoItemButtons from "./components/TodoItemButtons";
import AddTodo from "./components/AddTodo";
import { getStorage, updateStorage } from "./api/localStorage";

export default function App() {
  const [listData, setListData] = useState([]);
  console.log("listData: " + listData);

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

  const closeRow = (rowMap, key) => {
    if (rowMap[key]) {
      rowMap[key].closeRow();
    }
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

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
          <SwipeListView
            data={listData}
            renderItem={TodoItem}
            renderHiddenItem={(data, rowMap) =>
              TodoItemButtons(data, rowMap, (rowMap, deleteThis) => {
                closeRow(rowMap, deleteThis);
                const newData = [...listData];
                const i = newData.findIndex(
                  (rowItem) => rowItem.key === deleteThis
                );
                newData.splice(i, 1);
                setListData(newData);
              })
            }
            rightOpenValue={-130}
            previewRowKey={"0"}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowDidOpen={onRowDidOpen}
          />
        </View>
      </View>
    </View>
  );
}
