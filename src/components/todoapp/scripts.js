const LOCAL_STORAGE_KEY = "TODO_TASK";

// @type Task {
//   id: Number;
//   label: String;
//   isDone: Boolean;
//   datetime: Date;
// }

export const createTask = (text) => {
  let dataTask = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  dataTask = JSON.parse(dataTask || "[]");
  const newTask = {
    id: dataTask.length,
    label: text,
    isDone: false
  };
  dataTask.unshift(newTask);
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

export const getTask = (limit, skip, searchText, filter = {}) => {
  let dataTask = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  dataTask = JSON.parse(dataTask || "[]");
  const start = limit * skip;
  const end = start + limit;
  if (searchText) {
    dataTask = dataTask.filter(
      (_task) => _task.label.localeCompare(searchText) > -1
    );
  }
  let result = [];
  if (filter && Object.keys(filter).length > 0) {
    for (let key in filter) {
      for (let task of dataTask) {
        if (task[key] === filter[key]) {
          result.push(task);
        }
      }
    }
  } else {
    result = dataTask;
  }
  result.sort((a, b) => a.id - b.id);
  result = result.slice(start, end);
  return result;
};

const _storeTask = (dataTask) => {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataTask));
};
