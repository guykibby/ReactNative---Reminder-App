import { View, Text, StyleSheet } from "react-native";
import { format } from "date-fns";
// import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const TaskItem = ({ item, index }) => {
  let itemDate = new Date(item.timestamp);
  const formattedDate = format(itemDate, "dd/MM/yyyy     h:mm a");
  return (
    <View style={styles.container}>
      <View style={styles.taskItem}>
        <View style={styles.taskSection}>
          <Text style={styles.taskName} testID={`task${index + 1}Name`}>
            {item.name}
          </Text>
          <Text style={styles.taskDate} testID={`task${index + 1}Date`}>
            {formattedDate}
          </Text>
        </View>
        {/* <FontAwesome5
          name="grip-lines-vertical"
          size={40}
          color="black"
          // style={{ height: 30 }}
        /> */}
        <Feather name="more-vertical" size={24} color="black" />
      </View>
    </View>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: 105,
  },
  taskItem: {
    width: "90%",
    height: "84%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 2,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 15,
  },
  taskSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  taskName: {
    fontSize: 18,
    padding: 3,
    textAlign: "center",
  },
  taskDate: {
    fontSize: 15,
  },
});
