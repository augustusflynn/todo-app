import React from "react";
import ReactDOM from "react-dom/client";

import { CalendarMonth } from "./components/calendar";
import TodoApp from "./components/todoapp";

function App() {
  const [filter, setFilter] = React.useState({
    limit: 20,
    skip: 0,
    filter: {},
    searchText: "",
    startDate: new Date(),
    endDate: new Date()
  });

  return (
    <>
      <CalendarMonth filter={filter} setFilter={setFilter} />
      <TodoApp filter={filter} setFilter={setFilter} />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <App />
);
