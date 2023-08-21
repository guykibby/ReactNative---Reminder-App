import {
  fireEvent,
  render,
  screen,
  cleanup,
  waitFor,
} from "@testing-library/react-native";
import App from "./App";
import { Alert } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
// Mock a successful authentication:
// LocalAuthentication.authenticateAsync.mockResolvedValue({ success: true });

// Or, mock a failed authentication:

jest.mock("expo-local-authentication");
jest.mock("expo-notifications");
jest.mock("react-native", () => {
  const rn = jest.requireActual("react-native");
  rn.Alert.alert = jest.fn();
  return rn;
});

describe("LoginPage", () => {
  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  it("renders Alert instead of Hompage if user fails authentication", async () => {
    await waitFor(async () => {
      const app = render(<App />);
    });
    LocalAuthentication.authenticateAsync.mockResolvedValue({ success: false });
    const button = screen.getByText("LOGIN");
    await waitFor(() => {
      fireEvent.press(button);
    });

    expect(screen.queryByText("Reminders App")).toBeNull();

    expect(Alert.alert.mock.calls[0][0]).toBe(
      "Authentication failed. Please go away!"
    );
  });

  it("renders Alert instead of Hompage if user has no device security", async () => {
    await waitFor(async () => {
      const app = render(<App />);
    });
    LocalAuthentication.authenticateAsync.mockResolvedValue({
      error: "not_enrolled",
    });
    const button = screen.getByText("LOGIN");
    await waitFor(() => {
      fireEvent.press(button);
    });

    expect(screen.queryByText("Reminders App")).toBeNull();

    expect(Alert.alert.mock.calls[0][0]).toBe(
      "Please enable lock screen security on device!"
    );
  });
  it("renders the HomePage if the User passes authentication", async () => {
    await waitFor(async () => {
      const app = render(<App />);
    });
    LocalAuthentication.authenticateAsync.mockResolvedValue({ success: true });
    const button = screen.getByText("LOGIN");
    await waitFor(() => {
      fireEvent.press(button);
    });

    expect(screen.getByText("Reminders App")).toBeTruthy();
  });
});
