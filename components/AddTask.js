import { useState } from "react";
import { TextInput, View, Button, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddTask = ({ handleAdd }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState("date");

  const openDatePicker = () => {
    setTaskDate(new Date());
    setDatePickerMode("date");
    setShowDatePicker(true);
  };

  const processDateTimeSelection = (event, selectedValue) => {
    const dateTime = new Date(selectedValue);
    if (datePickerMode === "date") {
      setDatePickerMode("time");
      setTaskDate(dateTime);
    } else if (datePickerMode === "time") {
      taskDate.setHours(dateTime.getHours(), dateTime.getMinutes());
      const newTask = {
        name: taskName,
        timestamp: taskDate,
      };
      setShowDatePicker(false);
      setTaskName("");
      handleAdd(newTask);
    }
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
          onChange={processDateTimeSelection}
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
