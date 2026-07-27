import React from "react";
import { useState } from "react";

const ToDoList = () => {
  const [currentHold, setCurrentHold] = useState("");
  const [tasks, setTasks] = useState([])

  const getNewTask = (event) => {
    setCurrentHold(event.target.value);
  };

  const assignNewTask = () => {
    setTasks([...tasks, currentHold])
  };

  return (
    <>
      <h1>ToDo List</h1>
      <input type="text" onChange={getNewTask} />
      <button onClick={assignNewTask}>Add to list</button>
      <ul>
        {tasks.map((task, index) => (
            <li key={index}>{task}</li>
        ))}
      </ul>
    </>
  );
};

export default ToDoList;
