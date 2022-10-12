import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import { CalendarMonth, CalendarDate } from "./components/calendar";
import TodoApp from "./components/todoapp";
import './styles.css'
import moment from "moment";

function App() {
  const [displaySetting, setDisplaySetting] = useState("M") // "M{date}" || "D{date}" 
  const [filter, setFilter] = React.useState({
    limit: 20,
    skip: 0,
    filter: {},
    searchText: "",
    startDate: moment().startOf('month').toDate(),
    endDate: moment().endOf('month').toDate()
  });
  const [currentDateObj, setCurrentDateObj] = useState(moment())

  const props = {
    filter: filter,
    setFilter: setFilter,
    setDisplaySetting: setDisplaySetting,
    displaySetting: displaySetting,
    currentDateObj: currentDateObj,
    setCurrentDateObj: setCurrentDateObj
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
