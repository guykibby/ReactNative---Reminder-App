import { View, Text, StyleSheet } from "react-native";

const TaskItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.taskItem}>
        <Text>{item.name}</Text>
        <Text>{item.timestamp.toDateString()}</Text>
        <Text>
          {item.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    </View>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: 50,
    width: "100%",
    flex: 1,
    justifyContent: "center",
  },
  taskItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
