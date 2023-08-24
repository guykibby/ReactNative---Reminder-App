import { View, Text, StyleSheet } from "react-native";
import { format } from "date-fns";

const TaskItem = ({ item, index }) => {
  let itemDate = new Date(item.timestamp);
  // const formattedDate = format(itemDate, "d MMMM, yyyy h:mma");
  // const formattedDate = format(itemDate, "dd MMM yyy h:mma");
  const formattedDate = format(itemDate, "dd/MM/yyyy h:mma");
  return (
    <View style={styles.container}>
      <View style={styles.taskItem}>
        <Text testID={`task${index + 1}Name`}>{item.name}</Text>
        <Text testID={`task${index + 1}Date`}>{formattedDate}</Text>
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
