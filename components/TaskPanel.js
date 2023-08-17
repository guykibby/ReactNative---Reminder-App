import TaskItem from "./TaskItem";
import DeleteButton from "./DeleteButton";
import { SwipeListView } from "react-native-swipe-list-view";

const TaskPanel = ({ taskList, setTaskList }) => {
  const closeRow = (rowMap, key) => {
    if (rowMap[key]) {
      rowMap[key].closeRow();
    }
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  return (
    <SwipeListView
      data={taskList}
      renderItem={TaskItem}
      renderHiddenItem={(data, rowMap) =>
        DeleteButton(data, rowMap, (rowMap, deleteThis) => {
          closeRow(rowMap, deleteThis);
          const newData = [...taskList];
          const i = newData.findIndex((rowItem) => rowItem.key === deleteThis);
          newData.splice(i, 1);
          setTaskList(newData);
        })
      }
      rightOpenValue={-130}
      previewRowKey={"0"}
      previewOpenValue={-40}
      previewOpenDelay={3000}
      onRowDidOpen={onRowDidOpen}
    />
  );
};

export default TaskPanel;
