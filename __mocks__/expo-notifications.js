export const setNotificationHandler = jest.fn();

export const scheduleNotificationAsync = jest.fn();

export const getPermissionsAsync = jest
  .fn()
  .mockResolvedValue({ status: "granted" });

export const requestPermissionsAsync = jest
  .fn()
  .mockResolvedValue({ status: "granted" });
