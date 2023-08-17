import TaskItem from "./TaskItem";
import DeleteButton from "./DeleteButton";
import { SwipeListView } from "react-native-swipe-list-view";

const TaskPanel = ({ taskList, setTaskList }) => {
  const handleDelete = (index) => {
    const newData = [...taskList];
    newData.splice(index, 1);
    setTaskList(newData);
  };

  return (
    <SwipeListView
      data={taskList}
      renderItem={TaskItem}
      renderHiddenItem={(data) => DeleteButton(data.index, handleDelete)}
      rightOpenValue={-130}
    />
  );
};

export default TaskPanel;
