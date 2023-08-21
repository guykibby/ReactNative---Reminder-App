import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "reminder-list";

export const getStorage = async () => {
  try {
    const rawData = await AsyncStorage.getItem(STORAGE_KEY);
    return rawData ? JSON.parse(rawData) : [];
  } catch (error) {
    console.error("Error fetching from AsyncStorage:", error);
    return [];
  }
};

export const updateStorage = async (taskList) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(taskList));
  } catch (error) {
    console.error("Error saving to AsyncStorage:", error);
  }
};
