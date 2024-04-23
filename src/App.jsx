import "./App.css";
import React, { useEffect, useState } from "react";
import { Title } from "./Component/Title.jsx";
import { Form } from "./Component/Form.jsx";
import { Table } from "./Component/Table.jsx";
import { Hours } from "./Component/Hours.jsx";
import { getAllTask, updateTask } from "./utils/axiosHelper.js";

function App() {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const switchTask = async (_id, type) => {
    const { status } = await updateTask({ _id, type });
    status === "success" && fetchAllTasks();
  };

  const fetchAllTasks = async () => {
    const { status, tasks } = await getAllTask();
    status === "success" && setTaskList(tasks);
  };

  const totalHours = taskList.reduce((total, item) => total + item.hour, 0);

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <Title />

          <Form fetchAllTasks={fetchAllTasks} totalHours={totalHours} />

          <Table
            itemList={taskList}
            switchTask={switchTask}
            fetchAllTasks={fetchAllTasks}
          />

          <Hours totalHours={totalHours} />
        </div>
      </div>
    </>
  );
}

export default App;
