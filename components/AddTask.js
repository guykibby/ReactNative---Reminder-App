import { useState } from "react";
import { Text, TextInput, View, Pressable, StyleSheet } from "react-native";
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
          placeholder="Add Task"
          style={styles.inputText}
          value={taskName}
          onChangeText={(e) => setTaskName(e)}
        ></TextInput>
      </View>
      <Pressable style={styles.addButton} onPress={openDatePicker}>
        <Text style={styles.buttonText}>ADD</Text>
      </Pressable>
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
    width: "90%",
    maxWidth: 500,
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  input: {
    flex: 5,
    height: "65%",
    paddingHorizontal: "4%",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 5,
  },
  inputText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  addButton: {
    flex: 3,
    height: "65%",
    backgroundColor: "#03CAA4",
    color: "white",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
});
