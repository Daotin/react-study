import {
  useReducer,
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import MyCalender from "./components/calender/index";

function App() {
  const [date, setDate] = useState<Date>(new Date("2026-6-16"));
  return (
    <div className="App">
      <MyCalender
        value={date}
        onChange={(newDate) => {
          console.log("changed.", newDate);
          setDate(newDate);
        }}
      />

      <div>选择的日期：{date?.toLocaleDateString()}</div>
    </div>
  );
}

export default App;
