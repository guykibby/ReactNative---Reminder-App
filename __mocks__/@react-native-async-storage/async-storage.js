import AsyncStorageMock from "@react-native-async-storage/async-storage/jest/async-storage-mock";

AsyncStorageMock.setItem = jest.fn((key, value) => {
  return;
});

AsyncStorageMock.getItem = jest.fn((key) => {
  return "[]";
});

export default AsyncStorageMock;
