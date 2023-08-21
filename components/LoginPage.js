import { View, Text, Alert, Pressable } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

const LoginScreen = ({ navigation }) => {
  const supportsAndEnrolledInBiometrics = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      Alert.alert(
        "Device Incompatibility",
        "Your device does not support biometric authentication."
      );
      return false;
    }

    const bioEnabled = await LocalAuthentication.isEnrolledAsync();
    if (!bioEnabled) {
      Alert.alert(
        "Biometrics Not Setup",
        "You have not set up biometric authentication on this device."
      );
      return false;
    }

    return true;
  };

  const authenticate = async () => {
    const result = await LocalAuthentication.authenticateAsync();

    if (result.success) {
      navigation.navigate("HomePage");
    } else {
      Alert.alert("Authentication failed. Please try again.");
    }
  };

  const handlePress = async () => {
    const isSupported = await supportsAndEnrolledInBiometrics();
    console.log(isSupported);
    if (isSupported) {
      await authenticate();
    } else {
      Alert.alert(
        "Youre device has no screen lock protection, please set one up."
      );
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
