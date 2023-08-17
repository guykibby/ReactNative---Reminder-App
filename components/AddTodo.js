import React, { useState } from "react";
import { TextInput, View, Button, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 40,
    flexDirection: "row",
  },
  newContainer: { flexGrow: 1 },
  text: { width: "100%", height: "100%" },
});

const AddTodo = ({ setListData }) => {
  const [taskName, setTaskName] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateTimePickerMode, setDateTimePickerMode] = useState("date");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const addTask = (dateTime) => {
    const newTask = {
      name: taskName,
      timestamp: dateTime,
      key: new Date().getTime().toString(),
    };
    setListData((prevListData) => [...prevListData, newTask]);
    setDateTimePickerMode("date");
    setTaskName("");
  };

  const newAdd = () => {
    setSelectedDate(new Date());
    setShowDatePicker(true);
  };

  const newAddName = (e) => {
    setTaskName(e);
  };

  return (
    <View style={styles.container}>
      <View style={styles.newContainer}>
        <TextInput
          placeholder="Enter task name..."
          style={styles.text}
          value={taskName}
          onChangeText={(e) => newAddName(e)}
        ></TextInput>
      </View>
      <Button title="Add" onPress={newAdd}></Button>
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
};

export default AddTodo;
