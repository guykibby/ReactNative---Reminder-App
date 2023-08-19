import { useEffect } from "react";
import { registerForNotifications } from "./api/notification";
import TaskPanel from "./components/TaskPanel";
import { getStorage, updateStorage } from "./api/localStorage";

export default function App() {
  useEffect(() => {
    registerForNotifications();
  }, []);

  return <TaskPanel />;
}
