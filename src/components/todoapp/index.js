import React, { useCallback, useEffect, useState } from "react";
import "./todoapp.css";
import * as Utils from "./scripts";
import moment from "moment";

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

  const onGetTask = useCallback((currentFilter = filter) => {
    const res = Utils.getTask(
      currentFilter.limit,
      currentFilter.skip,
      currentFilter.searchText,
      currentFilter.filter,
      currentFilter.startDate,
      currentFilter.endDate
    );
    if (!res) {
      return;
    }
    setTasks(res.dataTask)
    setTotal(res.total)
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    onGetTask();
  }, [onGetTask]);

  const onScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const newSkip = filter.skip + 1
    if (
      scrollTop + clientHeight === scrollHeight &&
      filter.limit * newSkip < total
    ) {
      setFilter(prev => ({ ...prev, skip: newSkip }))
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
      setTasks(prev => ([...prev, ...res.dataTask]))
    }
  }

  const onChangeFilter = (newFilter) => {
    setFilter(newFilter)
    onGetTask(newFilter)
  }

  return (
    <div className="todo-app">
      <div className="todo-app-filter">
        <div className="title">Bộ lọc</div>
        <div className="status-wrapper">
          <div className="status">
            <input
              type="checkbox"
              id="all"
              checked={filter.filter.isDone === undefined}
              onChange={() => {
                onChangeFilter({
                  ...filter,
                  filter: {
                    isDone: undefined
                  }
                })
              }}
            />
            <label htmlFor="all">
              Toàn bộ
            </label>
          </div>
          <div className="status">
            <input
              type="checkbox"
              id="done"
              checked={filter.filter.isDone === true}
              onChange={() => {
                onChangeFilter({
                  ...filter,
                  filter: {
                    isDone: true
                  }
                })
              }}
            />
            <label htmlFor="done">
              Đã xong
            </label>
          </div>
          <div className="status">
            <input
              id="doing"
              type="checkbox"
              checked={filter.filter.isDone === false}
              onChange={(e) => {
                onChangeFilter({
                  ...filter,
                  filter: {
                    isDone: false
                  }
                })
              }}
            />
            <label htmlFor="doing">
              Chưa xong
            </label>
          </div>
        </div>
        <div className="search">
          <input
            placeholder="Tìm kiếm"
            type="search"
            onKeyDown={e => {
              if (e.key === "Enter") {
                onChangeFilter({
                  ...filter,
                  searchText: e.target.value
                })
              }
            }}
          />
        </div>
      </div>

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
            {
              displaySetting === "M" && (
                <span>- {moment(task.datetime).format("DD/MM/YYYY")}</span>
              )
            }
          </li>
        ))}
      </ul>
    </div>
  );
}
