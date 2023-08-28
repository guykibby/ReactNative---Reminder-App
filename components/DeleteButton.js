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
    justifyContent: "center",
    height: "100%",
  },
  backItem: {
    width: "90%",
    height: "84%",
    maxWidth: 500,
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    justifyContent: "flex-end",
    backgroundColor: "grey",
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
});
