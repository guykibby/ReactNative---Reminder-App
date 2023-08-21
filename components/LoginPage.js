import { View, Text, Alert, Pressable } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

const LoginScreen = ({ navigation }) => {
  const handlePress = async () => {
    const result = await LocalAuthentication.authenticateAsync();
    if (result.success) {
      navigation.navigate("HomePage");
    } else if (result.error === "not_enrolled") {
      Alert.alert("Please enable lock screen security on device!");
    } else {
      Alert.alert("Authentication failed. Please go away!");
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Pressable onPress={handlePress}>
        <Text>LOGIN</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;
