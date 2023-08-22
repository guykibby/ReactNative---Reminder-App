import {
  fireEvent,
  render,
  screen,
  cleanup,
  waitFor,
} from "@testing-library/react-native";
// import { Alert } from "react-native";
// import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomePage from "./HomePage";

jest.mock("@react-native-community/datetimepicker", () => {
  const mockComponent = (props) => {
    const mockOnChange = (event, date) => {
      props.onChange(event, date);
    };

    return <mock-datetimepicker onChange={mockOnChange} {...props} />;
  };

  return mockComponent;
});

// jest.mock("expo-notifications");
// jest.mock("@react-native-async-storage/async-storage");
// jest.mock("react-native", () => {
//   const rn = jest.requireActual("react-native");
//   rn.Alert.alert = jest.fn();
//   return rn;
// });

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe("HomePage tests", () => {
  afterEach(() => {
    cleanup();
    // jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it("should retrieve the saved task list from local storage when initiated", async () => {
    await waitFor(async () => {
      render(<HomePage />);
    });

    expect(AsyncStorage.getItem.mock.calls[0]).toEqual(["reminder-list"]);

    // const taskItem1 = screen.getByTestId("taskItem0");
    // expect(taskItem1.props.children).toBe("Task 1");
  });
  it("deletes a task from local storage when the delete button is pushed", async () => {
    await waitFor(async () => {
      render(<HomePage />);
    });

    // fireEvent(taskItem1, "onSwipe", { dx: -50 });

    const buttonDelete1 = screen.getByTestId("deleteButton0");
    fireEvent.press(buttonDelete1);

    expect(AsyncStorage.setItem.mock.calls[0]).toEqual([
      "reminder-list",
      '[{"name":"Task 2","timestamp":"2023-08-21T08:53:59.706Z"}]',
    ]);
  });
  it("adds a task to local storage when user adds task", async () => {
    await waitFor(async () => {
      render(<HomePage />);
    });
    // fireEvent(taskItem1, "onSwipe", { dx: -50 });

    const taskInput = screen.getByPlaceholderText("Enter task name...");
    expect(taskInput).toBeTruthy();
    fireEvent.changeText(taskInput, "Task 3");
    expect(taskInput.props.value).toBe("Task 3");

    const addButton = screen.getByText("Add");
    fireEvent.press(addButton);

    const mockDatePicker = screen.getByTestId("dateTimePicker");
    mockDatePicker.props.onChange(
      { type: "set" },
      new Date("2023-08-21T08:53:59.706Z")
    );
    mockDatePicker.props.onChange(
      { type: "set" },
      new Date("2023-08-21T08:53:59.706Z")
    );
    expect(AsyncStorage.setItem.mock.calls[0]).toEqual([
      "reminder-list",
      '[{"name":"Task 1","timestamp":"2023-08-21T08:46:48.789Z"},{"name":"Task 2","timestamp":"2023-08-21T08:53:59.706Z"},{"name":"Task 3","timestamp":"2023-08-21T08:53:59.706Z"}]',
    ]);
  });
  //   it("adds a task to local storage when user adds task", async () => {
  //     let debugFunction;

  //     await waitFor(async () => {
  //       const { debug } = render(<HomePage />);
  //       debugFunction = debug;
  //     });

  //     // fireEvent(taskItem1, "onSwipe", { dx: -50 });

  //     const taskInput = screen.getByPlaceholderText("Enter task name...");
  //     expect(taskInput).toBeTruthy();
  //     fireEvent.changeText(taskInput, "Task 3");
  //     expect(taskInput.props.value).toBe("Task 3");

  //     const addButton = screen.getByText("Add");
  //     fireEvent.press(addButton);

  //     debugFunction();

  //     // fireEvent.press(buttonDelete1);

  //     // expect(AsyncStorage.setItem.mock.calls[0]).toEqual([
  //     //   "reminder-list",
  //     //   '[{"name":"Task 2","timestamp":"2023-08-21T08:53:59.706Z"}]',
  //     // ]);
  //   });
});
