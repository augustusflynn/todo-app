import React, { useCallback, useEffect, useState } from "react";
import "./todoapp.css";
import * as Utils from "./scripts";

export default function TodoApp({
  filter, setFilter,
  displaySetting
}) {
  const [tasks, setTasks] = useState([]);
  const onSubmit = (e) => {
    e.preventDefault();
    const inputNode = e.target["todo-text"];
    const newTaskText = inputNode.value;
    const newTask = Utils.createTask(newTaskText);
    setTasks((prev) => [newTask, ...prev]);
    inputNode.value = "";
  };

  const onCheckTask = (newVal, id) => {
    let isSuccess = Utils.updateTask({ isDone: newVal }, id);
    if (isSuccess) {
      onGetTask(filter);
    }
  };

  const onGetTask = useCallback((filter) => {
    let dataTask = Utils.getTask(
      filter.limit,
      filter.skip,
      filter.searchText,
      filter.filter
    );
    setTasks(dataTask);
  }, []);

  useEffect(() => {
    onGetTask(filter);
  }, [onGetTask, filter]);

  return (
    <div className="todo-app">
      {
        displaySetting.indexOf("D") > -1 && (
          <form onSubmit={onSubmit}>
            <input id="todo-text" placeholder="Nhập gì đó ..." required />
            <button type="submit">Tạo</button>
          </form>
        )
      }

      <ul>
        {tasks.map((task) => (
          <li id={task.id} key={task.id}>
            <span>{task.label}</span>
            <input
              type="checkbox"
              checked={task.isDone}
              onChange={(e) => onCheckTask(e.target.checked, task.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
