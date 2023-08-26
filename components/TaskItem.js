import { View, Text, StyleSheet } from "react-native";
import { format } from "date-fns";
import { FontAwesome5 } from "@expo/vector-icons";

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
        <FontAwesome5
          name="grip-lines-vertical"
          size={40}
          color="black"
          // style={{ height: 30 }}
        />
      </View>
    </View>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  container: {
    // margin: 5,
    // backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "green",
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
    // paddingLeft: "5%",
    // width: "85%",
    // height: "100%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  taskName: {
    fontSize: 18,
    padding: 3,
    textAlign: "center",
    // fontWeight: "bold",
    // backgroundColor: "yellow",
  },
  taskDate: {
    fontSize: 15,
    // backgroundColor: "yellow",
  },
});
