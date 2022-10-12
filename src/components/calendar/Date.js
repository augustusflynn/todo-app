import moment from 'moment';
import React, { useEffect, useRef } from 'react'
import "./calendar.css"

function Date({
  setDisplaySetting,
  currentDateObj, setCurrentDateObj
}) {
  const timer = useRef()

  const onPrev = () => {
    setCurrentDateObj(prev => moment(prev.subtract(1, 'day')))
  }

  const onNext = () => {
    setCurrentDateObj(prev => moment(prev.add(1, 'day')))
  }

  useEffect(() => {
    let interValId = setInterval(() => {
      const hour = moment().get("hour")
      const minute = moment().get("minute")
      const second = moment().get("second")
      let currentTime = `${hour < 10 ? "0" + hour : hour}:${minute < 10 ? "0" + minute : minute}:${second < 10 ? "0" + second : second}`
      timer.current.innerHTML = currentTime
    }, 1000)

    return () => {
      clearInterval(interValId)
    }
  }, [])


  return (
    <div className="tail-datetime-calendar">
      <div className="calendar-navi">
        <span
          onClick={onPrev}
          className="calendar-button button-prev"
        />
        <span
          className="calendar-label"
          onClick={() => {
            setDisplaySetting(`M`)
          }}
        >
          Quay lại
        </span>
        <span
          onClick={onNext}
          className="calendar-button button-next"
        />
      </div>
      <div className="calendar-detail-date">
        <div className='month'>{currentDateObj.get("month")}/{currentDateObj.get("year")}</div>
        <div className='date'>{currentDateObj.get("D")}</div>
        <div ref={timer} className="time" />
      </div>
    </div>
  )
}

export default Date