import React, { useReducer } from "react";
import moment from "moment";
import "./calendar.css";
import { reducer, initialState, dispatchUpdateState } from './Utils'

const weekdayshort = moment.weekdaysShort();

export default function Calendar({
  filter, setFilter
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const daysInMonth = () => {
    return state.dateObject.daysInMonth();
  };

  const year = () => {
    return state.dateObject.format("Y");
  };

  const currentDay = () => {
    return parseInt(state.dateObject.format("D"));
  };

  const firstDayOfMonth = () => {
    let dateObject = state.dateObject;
    let firstDay = moment(dateObject).startOf("month").format("d"); // Day of week 0...1..5...6
    return firstDay;
  };

  const month = () => {
    return state.dateObject.format("MMMM");
  };

  const showMonth = () => {
    dispatch(dispatchUpdateState({
      showMonthTable: !state.showMonthTable,
      showDateTable: !state.showDateTable
    }));
  };

  const setMonth = (month) => {
    let monthNo = state.allmonths.indexOf(month);
    let dateObject = Object.assign({}, state.dateObject);
    dateObject = moment(dateObject).set("month", monthNo);
    dispatch(dispatchUpdateState({
      dateObject: dateObject,
      showMonthTable: !state.showMonthTable,
      showDateTable: !state.showDateTable
    }));
  };

  const MonthList = (props) => {
    let months = [];
    props.data.forEach((data) => {
      months.push(
        <td
          key={Math.random()}
          className="calendar-month"
          onClick={(e) => {
            setMonth(data);
          }}
        >
          <span>{data}</span>
        </td>
      );
    });
    let rows = [];
    let cells = [];

    months.forEach((row, i) => {
      if (i % 3 !== 0 || i === 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);
    let monthlist = rows.map((d) => {
      return <tr key={Math.random()}>{d}</tr>;
    });

    return (
      <table className="calendar-month">
        <thead>
          <tr>
            <th colSpan="4">Chọn tháng</th>
          </tr>
        </thead>
        <tbody>{monthlist}</tbody>
      </table>
    );
  };

  const showYearTable = (e) => {
    dispatch(dispatchUpdateState({
      showYearTable: !state.showYearTable,
      showDateTable: !state.showDateTable
    }));
  };

  const onPrev = () => {
    let curr = "";
    if (state.showYearTable === true) {
      curr = "year";
    } else {
      curr = "month";
    }
    dispatch(dispatchUpdateState({
      dateObject: state.dateObject.subtract(1, curr)
    }));
  };

  const onNext = () => {
    let curr = "";
    if (state.showYearTable === true) {
      curr = "year";
    } else {
      curr = "month";
    }
    dispatch(dispatchUpdateState({
      dateObject: state.dateObject.add(1, curr)
    }));
  };

  const setYear = (year) => {
    let dateObject = Object.assign({}, state.dateObject);
    dateObject = moment(dateObject).set("year", year);
    dispatch(dispatchUpdateState({
      dateObject: dateObject,
      showMonthTable: !state.showMonthTable,
      showYearTable: !state.showYearTable
    }));
  };

  function getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("YYYY"));
      currentDate = moment(currentDate).add(1, "year");
    }
    return dateArray;
  }

  const YearTable = (props) => {
    let months = [];
    let nextten = moment().set("year", props).add("year", 12).format("Y");

    let tenyear = getDates(props, nextten);

    tenyear.forEach((data) => {
      months.push(
        <td
          key={Math.random()}
          className="calendar-month"
          onClick={() => {
            setYear(data);
          }}
        >
          <span>{data}</span>
        </td>
      );
    });
    let rows = [];
    let cells = [];

    months.forEach((row, i) => {
      if (i % 3 !== 0 || i === 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);
    let yearlist = rows.map((d) => {
      return <tr key={Math.random()}>{d}</tr>;
    });

    return (
      <table className="calendar-month">
        <thead>
          <tr>
            <th colSpan="4">Chọn năm</th>
          </tr>
        </thead>
        <tbody>{yearlist}</tbody>
      </table>
    );
  };

  const onDayClick = (e, d) => {
    dispatch(dispatchUpdateState({
      selectedDay: d
    }));
  };

  let weekdayshortname = weekdayshort.map((day) => {
    return <th key={Math.random()}>{day}</th>;
  });

  let blanks = [];
  for (let i = 0; i < firstDayOfMonth(); i++) {
    blanks.push(<td className="calendar-day empty">{""}</td>);
  }
  let daysInMonthArray = [];
  for (let d = 1; d <= daysInMonth(); d++) {
    let isCurrentDay = d === currentDay() ? "today" : "";
    daysInMonthArray.push(
      <td key={Math.random()} className={`calendar-day ${isCurrentDay}`}>
        <span
          onClick={(e) => {
            onDayClick(e, d);
          }}
        >
          {d}
        </span>
      </td>
    );
  }
  var totalSlots = [...blanks, ...daysInMonthArray];
  let rows = [];
  let cells = [];

  totalSlots.forEach((row, i) => {
    if (i % 7 !== 0) {
      cells.push(row);
    } else {
      rows.push(cells);
      cells = [];
      cells.push(row);
    }
    if (i === totalSlots.length - 1) {
      // let insertRow = cells.slice();
      rows.push(cells);
    }
  });

  let daysinmonth = rows.map((d) => {
    return <tr className="calendar-date-body" key={Math.random()}>{d}</tr>;
  });

  return (
    <div className="tail-datetime-calendar">
      <div className="calendar-navi">
        <span
          onClick={(e) => {
            onPrev();
          }}
          className="calendar-button button-prev"
        />
        {!state.showMonthTable && (
          <span
            onClick={showMonth}
            className="calendar-label"
          >
            {month()}
          </span>
        )}
        <span
          className="calendar-label"
          onClick={showYearTable}
        >
          {year()}
        </span>
        <span
          onClick={onNext}
          className="calendar-button button-next"
        />
      </div>

      <div className="calendar-date">
        {state.showYearTable && <YearTable props={year()} />}
        {state.showMonthTable && (
          <MonthList data={moment.months()} />
        )}
      </div>

      {state.showDateTable && (
        <div className="calendar-date">
          <table className="calendar-day">
            <thead>
              <tr>{weekdayshortname}</tr>
            </thead>
            <tbody>{daysinmonth}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}
