import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import { CalendarMonth, CalendarDate } from "./components/calendar";
import TodoApp from "./components/todoapp";
import './styles.css'

function App() {
  const [displaySetting, setDisplaySetting] = useState("M") // "M" || "D{date}" 
  const [filter, setFilter] = React.useState({
    limit: 20,
    skip: 0,
    filter: {},
    searchText: "",
    startDate: new Date(),
    endDate: new Date()
  });

  const props = {
    filter: filter,
    setFilter: setFilter,
    setDisplaySetting: setDisplaySetting,
    displaySetting: displaySetting
  }

  return (
    <>
      {
        displaySetting.indexOf("M") > -1 ? (
          <CalendarMonth {...props} />
        ) : (
          <CalendarDate {...props} />
        )
      }
      <TodoApp {...props} />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <App />
);
