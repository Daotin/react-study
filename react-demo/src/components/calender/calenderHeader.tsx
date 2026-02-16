import { useContext } from "react";
import dayjs from "dayjs";
import "./calenderHeader.scss";
import { CalenderProps } from ".";
import locales from "./locale";
import LocaleContent from "./LocaleContext";

export interface CalenderHeaderProps extends CalenderProps {}

function CalenderHeader(props: CalenderHeaderProps) {
  const { curMonth, onPrev, onNext, onToday } = props;
  const localeContext = useContext(LocaleContent);
  const display = (curMonth ?? dayjs()).format(
    locales[localeContext.locale].formatMonth,
  );

  return (
    <div className="calendar-header">
      <button className="calendar-header-arrow" onClick={onPrev} type="button">
        ←
      </button>
      <div className="calendar-header-title">{display}</div>
      <button className="calendar-header-arrow" onClick={onNext} type="button">
        →
      </button>
      <button className="calendar-header-today" onClick={onToday} type="button">
        {locales[localeContext.locale].today}
      </button>
    </div>
  );
}

export default CalenderHeader;
