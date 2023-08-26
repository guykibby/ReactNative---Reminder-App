import { View, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const DeleteButton = (index, handleDelete) => (
  <View style={styles.container}>
    <View style={styles.backItem}>
      <Pressable
        style={styles.button}
        onPress={() => handleDelete(index)}
        testID={`deleteButton${index}`}
      >
        <MaterialIcons name="delete" size={40} />
      </Pressable>
    </View>
  </View>
);

export default DeleteButton;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    // backgroundColor: "yellow",
    // flex: 1,
    // flexDirection: "row",
    justifyContent: "center",
    // paddingRight: "5%",
    height: "100%",
  },
  backItem: {
    width: "90%",
    height: "84%",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    justifyContent: "flex-end",
    backgroundColor: "#DDD",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 15,
  },
  button: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1,
    borderColor: "black",
    backgroundColor: "#FB4D3D",
    borderWidth: 2,
    borderRadius: 15,
  },
  // icon: {
  //   height: "100%",
  //   aspectRatio: 1,
  // },
});
