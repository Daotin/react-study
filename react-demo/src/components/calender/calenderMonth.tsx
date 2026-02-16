import React, { useContext } from "react";
import "./calenderMonth.scss";
import { CalenderProps } from ".";
import LocaleContent from "./LocaleContext";
import locales from "./locale";
import dayjs from "dayjs";
import cs from "classnames";

export interface CalenderMonthProps extends CalenderProps {}

function CalenderMonth(props: CalenderMonthProps) {
  const { dateInnerContent, dateRender, value, curMonth } = props;
  const currentValue = curMonth || value || dayjs();

  const localeContext = useContext(LocaleContent);
  const CalendarLocale = locales[localeContext.locale];

  const months = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  // 渲染天数
  function renderDays() {
    // 获取当前月天数
    const daysInMonth = currentValue.daysInMonth();
    // 获取当前月第一天是星期几
    const firstDayOfMonth = currentValue.startOf("month").day();
    // 上个月天数
    const prevMonthDays = currentValue.subtract(1, "month").daysInMonth();
    const totalCells = 6 * 7; // 固定6行7列

    return Array.from({ length: totalCells }, (_, index) => {
      const currentMonthStartIndex = firstDayOfMonth;
      // console.log("currentMonthStartIndex", currentMonthStartIndex);
      const currentMonthEndIndex = firstDayOfMonth + daysInMonth - 1;
      // console.log("currentMonthEndIndex", currentMonthEndIndex);

      if (index < currentMonthStartIndex) {
        const day = prevMonthDays - (currentMonthStartIndex - index - 1);
        const dayDate = currentValue.subtract(1, "month").date(day);
        return dateRender ? (
          dateRender(dayDate)
        ) : (
          <div
            key={`prev-${day}`}
            className="calendar-month-day is-outside"
            onClick={() => {
              props.onChange?.(dayDate);
            }}
          >
            {day}
            {dateInnerContent?.(dayDate)}
          </div>
        );
      }

      if (index > currentMonthEndIndex) {
        const day = index - currentMonthEndIndex;
        const dayDate = currentValue.add(1, "month").date(day);
        return dateRender ? (
          dateRender(dayDate)
        ) : (
          <div
            key={`next-${day}`}
            className="calendar-month-day is-outside"
            onClick={() => {
              props.onChange?.(dayDate);
            }}
          >
            {day}
            {dateInnerContent?.(dayDate)}
          </div>
        );
      }

      const day = index - currentMonthStartIndex + 1;
      const dayDate = currentValue.date(day);
      return dateRender ? (
        dateRender(dayDate)
      ) : (
        <div
          key={`current-${day}`}
          className={cs("calendar-month-day", {
            "is-selected": value?.isSame(dayDate, "day"),
          })}
          onClick={() => {
            props.onChange?.(dayDate);
          }}
        >
          {day}
          {dateInnerContent?.(dayDate)}
        </div>
      );
    });
  }

  return (
    <div className="calendar-month">
      <div className="calendar-month-weekdays">
        {months.map((month) => {
          return <div key={month}>{CalendarLocale.week[month]}</div>;
        })}
      </div>
      <div className="calendar-month-days">{renderDays()}</div>
    </div>
  );
}

export default CalenderMonth;
