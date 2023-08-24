import { View, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const DeleteButton = (index, handleDelete) => (
  <View style={styles.container}>
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed ? styles.buttonPressed : styles.buttonNormal,
      ]}
      onPress={() => handleDelete(index)}
      testID={`deleteButton${index}`}
    >
      <MaterialIcons name="delete" />
    </Pressable>
  </View>
);

export default DeleteButton;

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row", justifyContent: "flex-end" },
  button: {
    width: 50,
  },
  buttonNormal: {
    backgroundColor: "aqua",
  },
  buttonPressed: {
    backgroundColor: "blue",
  },
});
