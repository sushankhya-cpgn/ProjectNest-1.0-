import React, { useState } from "react";
import dayjs from "dayjs";
import { generateDate, months } from "../util/calendar";
import cn from "../util/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import styles from "./Calendardisplay.module.css"; // Import CSS file

export default function Calendardisplay() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarWrapper}>
        <div className={styles.calendarHeader}>
          <h1>
            {months[today.month()]}, {today.year()}
          </h1>
          <div className={styles.calendarControls}>
            <GrFormPrevious
              className={styles.calendarControl}
              onClick={() => {
                setToday(today.month(today.month() - 1));
              }}
            />
            <h1
              className={styles.calendarControl}
              onClick={() => {
                setToday(currentDate);
              }}
            >
              Today
            </h1>
            <GrFormNext
              className={styles.calendarControl}
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
            />
          </div>
        </div>
        <div className={styles.calendarGrid}>
          {days.map((day, index) => (
            <h1 key={index} className={styles.calendarDay}>
              {day}
            </h1>
          ))}
        </div>
        <div className={styles.calendarGrid}>
          {generateDate(today.month(), today.year()).map(
            ({ date, currentMonth, today }, index) => (
              <div key={index} className={styles.calendarDate}>
                <h1
                  className={cn(
                    currentMonth ? "" : styles.notCurrentMonth,
                    today ? styles.today : "",
                    selectDate.toDate().toDateString() ===
                      date.toDate().toDateString()
                      ? styles.selectedDate
                      : "",
                    styles.selectedDateHover,
                    styles.calendarDate,
                    styles.selectedDateHover,
                    "rounded-full",
                    "hover:bg-black",
                    "hover:text-white",
                    "transition-all",
                    "cursor-pointer",
                    "select-none"
                  )}
                  onClick={() => {
                    setSelectDate(date);
                  }}
                >
                  {date.date()}
                </h1>
              </div>
            )
          )}
        </div>
      </div>
      <div className={styles.scheduleWrapper}>
        <h1 className={styles.scheduleHeader}>
          Schedule for {selectDate.toDate().toDateString()}
        </h1>
        <p className={styles.scheduleContent}>No meetings for today.</p>
      </div>
    </div>
  );
}
