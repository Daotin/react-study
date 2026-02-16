import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useControllableValue } from "ahooks";
import CalenderHeader from "./calenderHeader";
import CalenderMonth from "./calenderMonth";
import "./index.scss";
import classNames from "classnames";
import LocaleContent from "./LocaleContext";
export interface CalenderProps {
  value?: Dayjs;
  defaultValue?: Dayjs;
  curMonth?: Dayjs;
  style?: React.CSSProperties;
  className?: string;
  onChange?: (date: Dayjs) => void;

  // 附加内容
  dateInnerContent?: (date: Dayjs) => React.ReactNode;
  // 替换内容
  dateRender?: (date: Dayjs) => React.ReactNode;
  // 国际化
  locale?: string;
  // 今天
  onToday?: () => void;
  // 上个月
  onPrev?: () => void;
  // 下个月
  onNext?: () => void;
}

function Calender(props: CalenderProps) {
  const [value, setValue] = useControllableValue(props, {
    defaultValue: props.defaultValue || dayjs(),
  });

  const [curMonth, setCurMonth] = useState<Dayjs>(value || dayjs());

  useEffect(() => {
    if (value) {
      setCurMonth(value);
      // console.log("curMonth", curMonth, value);
    }
  }, [value]);

  const handleChange = (newDate: Dayjs) => {
    setValue(newDate);
    setCurMonth(newDate);
  };

  const handlePrev = () => {
    setCurMonth((curMonth || dayjs()).subtract(1, "month"));
    props.onPrev?.();
  };

  const handleNext = () => {
    setCurMonth((curMonth || dayjs()).add(1, "month"));
    props.onNext?.();
  };

  const handleToday = () => {
    const today = dayjs();
    setCurMonth(today);
    setValue(today);
    props.onToday?.();
  };

  const mergedProps: CalenderProps = {
    ...props,
    value,
    curMonth,
    onChange: handleChange,
    onPrev: handlePrev,
    onNext: handleNext,
    onToday: handleToday,
  };

  return (
    <LocaleContent.Provider
      value={{ locale: mergedProps.locale || navigator.language }}
    >
      <div
        className={classNames("calendar-container", mergedProps.className)}
        style={mergedProps.style}
      >
        <CalenderHeader {...mergedProps} />
        <CalenderMonth {...mergedProps} />
      </div>
    </LocaleContent.Provider>
  );
}

export default Calender;
