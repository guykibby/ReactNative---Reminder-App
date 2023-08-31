import { View, Text, Alert, Pressable, StyleSheet } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useFonts } from "expo-font";

const LoginPage = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    PermanentMarker_400Regular: require("../assets/PermanentMarker-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  const handlePress = async () => {
    // navigation.navigate("HomePage");
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
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Reminders App</Text>
      </View>
      <View style={styles.body}>
        <Pressable style={styles.loginButton} onPress={handlePress}>
          <Text style={styles.loginButtonText}>LOG IN</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4F6C9B",
    justifyContent: "space-between",
  },
  heading: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  headingText: {
    fontFamily: "PermanentMarker_400Regular",
    fontSize: 40,
    color: "white",
    marginTop: 3,
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButton: {
    width: 250,
    height: 70,
    backgroundColor: "#FB4D3D",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  loginButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
});
