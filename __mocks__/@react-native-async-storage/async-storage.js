import AsyncStorageMock from "@react-native-async-storage/async-storage/jest/async-storage-mock";

AsyncStorageMock.setItem = jest.fn((key, value) => {
  return;
});

AsyncStorageMock.getItem = jest.fn((key) => {
  return '[{"name":"Task 1","timestamp":"2023-08-21T08:46:48.789Z"},{"name":"Task 2","timestamp":"2023-08-21T08:53:59.706Z"}]';
});

export default AsyncStorageMock;
