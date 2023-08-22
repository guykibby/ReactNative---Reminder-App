import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const STORAGE_KEY = "reminder-list";

export const getStorage = async () => {
  try {
    const rawData = await AsyncStorage.getItem(STORAGE_KEY);
    return rawData ? JSON.parse(rawData) : [];
  } catch (error) {
    Alert.alert("Unable to retrieve tasks from device storage, sorry");
    return [];
  }
};

export const updateStorage = async (taskList) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(taskList));
  } catch (error) {
    Alert.alert("Unable to save tasks to device storage, sorry");
  }
};
