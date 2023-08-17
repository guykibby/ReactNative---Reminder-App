import TodoItem from "./TodoItem";
import TodoItemButtons from "./TodoItemButtons";
import { SwipeListView } from "react-native-swipe-list-view";

const TaskPanel = ({ listData, setListData }) => {
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
      data={listData}
      renderItem={TodoItem}
      renderHiddenItem={(data, rowMap) =>
        TodoItemButtons(data, rowMap, (rowMap, deleteThis) => {
          closeRow(rowMap, deleteThis);
          const newData = [...listData];
          const i = newData.findIndex((rowItem) => rowItem.key === deleteThis);
          newData.splice(i, 1);
          setListData(newData);
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
