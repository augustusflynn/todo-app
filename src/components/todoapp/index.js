import React, { useCallback, useEffect, useState } from "react";
import "./todoapp.css";
import * as Utils from "./scripts";

export default function TodoApp({
  filter, setFilter,
  displaySetting,
  currentDateObj
}) {
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0)

  const onSubmit = (e) => {
    e.preventDefault();
    const inputNode = e.target["todo-text"];
    const newTaskText = inputNode.value;
    const newTask = Utils.createTask(newTaskText, currentDateObj);
    setTasks((prev) => [...prev, newTask]);
    inputNode.value = "";
  };

  const onCheckTask = (newVal, id) => {
    let isSuccess = Utils.updateTask({ isDone: newVal }, id);
    if (isSuccess) {
      onGetTask(filter);
    }
  };

  const onGetTask = useCallback((filter, cb) => {
    const res = Utils.getTask(
      filter.limit,
      filter.skip,
      filter.searchText,
      filter.filter,
      filter.startDate,
      filter.endDate
    );
    if (!res) {
      return;
    }

    setTasks(prev => prev.length > 0 ? ([...prev, ...res.dataTask]) : res.dataTask)
    setTotal(res.total)
  }, []);

  useEffect(() => {
    console.log(filter)
    onGetTask(filter);
  }, [onGetTask, filter, displaySetting]);

  const onScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const newSkip = filter.skip + 1
    if (
      scrollTop + clientHeight === scrollHeight &&
      filter.limit * newSkip < total
    ) {
      setFilter(prev => ({ ...prev, skip: newSkip }))
    }
  }

  return (
    <div className="todo-app">
      {
        displaySetting.indexOf("D") > -1 && (
          <form className="todo-app-form" onSubmit={onSubmit}>
            <input id="todo-text" placeholder="Nhập gì đó ..." required />
            <button type="submit">Tạo</button>
          </form>
        )
      }

      <ul className="task-list" onScroll={onScroll}>
        {tasks.reverse().map((task) => (
          <li id={task.id} key={task.id} className="task">
            <input
              type="checkbox"
              checked={task.isDone}
              onChange={(e) => onCheckTask(e.target.checked, task.id)}
            />
            <span>{task.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
