import moment from "moment";

const LOCAL_STORAGE_KEY = "TODO_TASK";

// @type Task {
//   id: Number;
//   label: String;
//   isDone: Boolean;
//   datetime: Date;
// }

export const createTask = (text, date) => {
  let dataTask = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  dataTask = JSON.parse(dataTask || "[]");
  const newId = Math.max(...dataTask.map(_task => _task.id))
  const newTask = {
    id: newId + 1,
    label: text,
    isDone: false,
    datetime: date.toDate().toISOString()
  };
  dataTask.push(newTask);
  _storeTask(dataTask);
  return newTask;
};

export const updateTask = (data, id) => {
  let dataTask = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  dataTask = JSON.parse(dataTask || "[]");
  const taskIndex = dataTask.findIndex((_task) => _task.id === id);
  if (taskIndex > -1) {
    dataTask[taskIndex] = {
      ...dataTask[taskIndex],
      ...data
    };
    _storeTask(dataTask);
    return true;
  }
  return false;
};

export const getTask = (limit, skip, searchText, filter = {}, startDate, endDate) => {
  let dataTask = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  dataTask = JSON.parse(dataTask || "[]");
  const start = limit * skip;
  const end = start + limit;
  if (start > dataTask.length) {
    return undefined;
  }
  if (searchText) {
    dataTask = dataTask.filter(
      (_task) => _task.label.indexOf(searchText) > -1
    );
  }
  let result = [];
  if (filter && Object.keys(filter).length > 0) {
    for (let key in filter) {
      for (let task of dataTask) {
        if (key === 'isDone' && filter[key] === undefined) {
          result.push(task);
        } else if (task[key] === filter[key]) {
          result.push(task);
        }
      }
    }
  } else {
    result = dataTask;
  }

  if (startDate) {
    result = result.filter(_task => {
      if (moment(startDate).toISOString() <= new Date(_task.datetime).toISOString()) {
        return true
      }
      return false;
    });
  }

  if (endDate) {
    result = result.filter(_task => {
      if (moment(endDate).toISOString() >= new Date(_task.datetime).toISOString()) {
        return true
      }
      return false;
    });
  }
  result.sort((a, b) => a.id - b.id);
  result = result.slice(start, end);
  return { dataTask: result, total: result.length };
};

export const checkIsDoneAllTask = (startDate, endDate) => {
  let dataTask = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  dataTask = JSON.parse(dataTask || "[]");

  if (startDate) {
    dataTask = dataTask.filter(_task => {
      if (moment(startDate).toISOString() <= new Date(_task.datetime).toISOString()) {
        return true
      }
      return false;
    });
  }

  if (endDate) {
    dataTask = dataTask.filter(_task => {
      if (moment(endDate).toISOString() >= new Date(_task.datetime).toISOString()) {
        return true
      }
      return false;
    });
  }

  const dataTaskDone = dataTask.filter(_task => _task.isDone);
  return (dataTask.length > 0 && dataTask.length === dataTaskDone.length);
}

const _storeTask = (dataTask) => {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataTask));
};

export const deleteTask = (id) => {
  let dataTask = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  dataTask = JSON.parse(dataTask || "[]");
  dataTask = dataTask.filter(_task => _task.id !== id);
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataTask))
}