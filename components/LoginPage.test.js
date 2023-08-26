import {
  fireEvent,
  render,
  screen,
  cleanup,
  waitFor,
} from "@testing-library/react-native";
import LoginPage from "./LoginPage";
import { Alert } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

jest.mock("react-native", () => {
  const rn = jest.requireActual("react-native");
  rn.Alert.alert = jest.fn();
  return rn;
});
const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
};

describe("LoginPage", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });
  it("should navigate to HomePage when authentication is successful", async () => {
    await waitFor(async () => {
      render(<LoginPage navigation={mockNavigation} />);
    });

    LocalAuthentication.authenticateAsync.mockResolvedValue({ success: true });

    const loginButton = screen.getByText("LOG IN");
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("HomePage");
    });
  });

  it("should call Alert.alert when authentication fails", async () => {
    await waitFor(async () => {
      render(<LoginPage navigation={mockNavigation} />);
    });

    LocalAuthentication.authenticateAsync.mockResolvedValue({ success: false });

    const loginButton = screen.getByText("LOG IN");
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(Alert.alert.mock.calls[0][0]).toBe(
        "Authentication failed. Please go away!"
      );
    });
  });

  it("should call Alert.alert when user has no device security", async () => {
    await waitFor(async () => {
      render(<LoginPage navigation={mockNavigation} />);
    });

    LocalAuthentication.authenticateAsync.mockResolvedValue({
      error: "not_enrolled",
    });

    const loginButton = screen.getByText("LOG IN");
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(Alert.alert.mock.calls[0][0]).toBe(
        "Please enable lock screen security on device!"
      );
    });
  });
});
