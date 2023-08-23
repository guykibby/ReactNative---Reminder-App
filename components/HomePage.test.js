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

    const task1Name = screen.getByTestId("task1Name");
    expect(task1Name.props.children).toBe("Task 1");
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
    const task1Name = screen.getByTestId("task1Name");
    expect(task1Name.props.children).toBe("Task 2");
    // const task1Name = screen.queryByTestId("task1Name");
    // expect(task1Name).toBeNull();
  });
  it("adds a task to local storage when user adds task", async () => {
    await waitFor(async () => {
      render(<HomePage />);
    });
    // fireEvent(taskItem1, "onSwipe", { dx: -50 });

    const taskInput = screen.getByPlaceholderText("Enter task name...");
    fireEvent.changeText(taskInput, "Task 3");

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
  it("adds the date and time selected by the user to a new task", async () => {
    await waitFor(async () => {
      render(<HomePage />);
    });
    // fireEvent(taskItem1, "onSwipe", { dx: -50 });

    const taskInput = screen.getByPlaceholderText("Enter task name...");
    fireEvent.changeText(taskInput, "Task 3");

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
    const taskItem3 = screen.getByTestId("task3Date");
    expect(taskItem3.props.children).toBe("21 Aug 2023 18:53");
  });
  //   it("adds a task to local storage when user adds task", async () => {
  //     let debugFunction;

  //     await waitFor(async () => {
  //       const { debug } = render(<HomePage />);
  //       debugFunction = debug;
  //     });

  //     debugFunction();
  //   });
});
