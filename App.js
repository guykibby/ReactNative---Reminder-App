import React, { useState } from "react";

import { View, Text } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { useEffect } from "react";
import TodoItem from "./components/TodoItem";
import TodoItemButtons from "./components/TodoItemButtons";
import AddTodo from "./components/AddTodo";
import { getStorage, updateStorage } from "./api/localStorage";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function App() {
  const [listData, setListData] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateTimePickerMode, setDateTimePickerMode] = useState("date");
  const [taskName, setTaskName] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const addTask = (dateTime) => {
    const newData = [...listData];
    newData.push({
      name: taskName,
      timestamp: dateTime,
      key: new Date().getTime().toString(),
    });
    setListData(newData);
    setDateTimePickerMode("date");
  };

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
        <AddTodo
          add={(name) => {
            // TIP: handles add button being pressed
            setTaskName(name);
            setSelectedDate(new Date());
            setShowDatePicker(true);
          }}
        />
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

      {showDatePicker ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate}
          mode={dateTimePickerMode}
          onChange={(event, selectedValue) => {
            setShowDatePicker(false);

            if (selectedValue) {
              const currentSelectedDate = new Date(selectedValue);
              if (dateTimePickerMode === "date") {
                setSelectedDate(currentSelectedDate);
                setDateTimePickerMode("time");
                setShowDatePicker(true);
              } else if (dateTimePickerMode === "time") {
                const newDate = new Date(selectedDate);
                newDate.setHours(
                  currentSelectedDate.getHours(),
                  currentSelectedDate.getMinutes()
                );
                addTask(newDate);
              }
            } else {
              setDateTimePickerMode("date");
            }
          }}
        />
      ) : null}
    </View>
  );
}
