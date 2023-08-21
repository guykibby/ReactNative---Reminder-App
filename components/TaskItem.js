import { View, Text, StyleSheet } from "react-native";

const TaskItem = ({ item }) => {
  let itemDate = new Date(item.timestamp);
  return (
    <View style={styles.container}>
      <View style={styles.taskItem}>
        <Text>{item.name}</Text>
        <Text>{itemDate.toDateString()}</Text>
        <Text>
          {itemDate.toLocaleTimeString([], {
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
