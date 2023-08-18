import { useState } from "react";
import { TextInput, View, Button, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddTask = ({ setTaskList }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState("date");

  const handleSubmit = (dateTime) => {
    const newTask = {
      name: taskName,
      timestamp: dateTime,
      key: new Date().getTime().toString(),
    };
    setTaskList((prevListData) => [...prevListData, newTask]);

    setDatePickerMode("date");
    setTaskName("");
  };

  const openDatePicker = () => {
    setTaskDate(new Date());
    setShowDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <TextInput
          placeholder="Enter task name..."
          style={styles.text}
          value={taskName}
          onChangeText={(e) => setTaskName(e)}
        ></TextInput>
      </View>
      <Button title="Add" onPress={openDatePicker}></Button>
      {showDatePicker ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={taskDate}
          mode={datePickerMode}
          onChange={(event, selectedValue) => {
            setShowDatePicker(false);
            if (selectedValue) {
              const currenttaskDate = new Date(selectedValue);
              if (datePickerMode === "date") {
                setTaskDate(currenttaskDate);
                setDatePickerMode("time");
                setShowDatePicker(true);
              } else if (datePickerMode === "time") {
                const newDate = new Date(taskDate);
                newDate.setHours(
                  currenttaskDate.getHours(),
                  currenttaskDate.getMinutes()
                );
                handleSubmit(newDate);
              }
            }
          }}
        />
      ) : null}
    </View>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 40,
    flexDirection: "row",
  },
  input: { flexGrow: 1 },
  text: { width: "100%", height: "100%" },
});
