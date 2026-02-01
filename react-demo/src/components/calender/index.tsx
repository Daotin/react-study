import { useState, useRef, forwardRef, useImperativeHandle } from "react";
// import { useMergeState } from "../../hooks/useMergeState";
import { useControllableValue } from "ahooks";
import "./index.css";

interface CalenderProps {
  defaultValue?: Date;
  value?: Date;
  onChange?: (date: Date) => void;
}

function Calender(props: CalenderProps) {
  const [date, setDate] = useControllableValue<Date>(props, {
    defaultValue: new Date(),
  });

  // 切换月份
  function handleMonth(direction: "prev" | "next") {
    if (direction === "prev") {
      const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
      setDate(prevMonth);
    } else {
      const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      setDate(nextMonth);
    }
  }
  // 点击日期
  function handleDateClick(day: number) {
    const curDate = new Date(date.getFullYear(), date.getMonth(), day);
    setDate(curDate);
    // props.onChange?.(curDate);
  }

  // 获取当月的天数
  function renderDays(year: number, month: number) {
    const days = new Date(year, month + 1, 0).getDate(); // 获取当月天数
    const firstDay = new Date(year, month, 1).getDay(); // 获取当月第一天是星期几
    const today = new Date();

    const isToday = (day: number) => {
      return (
        today.getFullYear() === year &&
        today.getMonth() === month &&
        today.getDate() === day
      );
    };

    const isSelected = (day: number) => {
      return (
        date &&
        date.getFullYear() === year &&
        date.getMonth() === month &&
        date.getDate() === day
      );
    };

    return (
      <>
        {/* 补齐上个月的空白天数 */}
        {Array.from({ length: firstDay }, (_, index) => (
          <div key={`blank-${index}`}></div>
        ))}
        {/* 当月的天数 */}
        {Array.from({ length: days }, (_, index) => (
          <div
            key={index + 1}
            className={
              isToday(index + 1)
                ? "today"
                : isSelected(index + 1)
                  ? "selected"
                  : ""
            }
            onClick={() => handleDateClick(index + 1)}
          >
            {index + 1}
          </div>
        ))}
      </>
    );
  }
  return (
    <div className="calendar-container">
      <div className="header">
        <button onClick={() => handleMonth("prev")}>{"<"}</button>
        <span>
          {date.getFullYear()}年{date.getMonth() + 1}月
        </span>
        <button onClick={() => handleMonth("next")}>{">"}</button>
      </div>
      <div className="content">
        <div>日</div>
        <div>一</div>
        <div>二</div>
        <div>三</div>
        <div>四</div>
        <div>五</div>
        <div>六</div>
        {renderDays(date.getFullYear(), date.getMonth())}
      </div>
    </div>
  );
}

export default Calender;
