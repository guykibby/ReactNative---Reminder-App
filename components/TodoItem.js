import { View, Text } from "react-native";
import React from "react";

const TodoItem = ({ item }) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        height: 50,
        flex: 1,
        justifyContent: "center",
      }}
    >
      <View style={{ width: "100%", flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
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
    </View>
  );
};

export default TodoItem;
