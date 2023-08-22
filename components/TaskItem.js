import { View, Text, StyleSheet } from "react-native";
import { format } from "date-fns";

const TaskItem = ({ item, index }) => {
  let itemDate = new Date(item.timestamp);
  // const formattedDate = format(itemDate, "d MMMM, yyyy h:mma");
  const formattedDate = format(itemDate, "dd MMM yyy HH:mm");
  // const formattedDate = format(itemDate, "MMM dd yyyy HH:mm");
  return (
    <View style={styles.container}>
      <View style={styles.taskItem}>
        <Text testID={`taskItem${index}`}>{item.name}</Text>
        <Text>{formattedDate}</Text>
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
