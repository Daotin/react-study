import { useState } from "react";
import MyCalender from "./components/calender/index";
import "./App.css";
import dayjs from "dayjs";

function App() {
  const [date, setDate] = useState<dayjs.Dayjs>(dayjs("2026-2-16"));
  return (
    <div className="App">
      <MyCalender
        // defaultValue={dayjs("2026-2-16")}
        value={date}
        className="aaa"
        locale="zh-CN"
        // style={{ backgroundColor: "lightpink" }}
        dateInnerContent={(date) => {
          if (date.date() === 18) {
            return <div style={{ color: "red" }}>🎂生日快乐</div>;
          }
        }}
        // dateRender={(date) => {
        //   return <div>{dayjs(date).format("YYYY-MM-DD")}</div>;
        // }}
        onChange={(newDate) => {
          console.log("newDate", newDate);
          setDate(newDate);
        }}
        onToday={() => {
          console.log("today click");
        }}
        onPrev={() => {
          console.log("prev click");
        }}
        onNext={() => {
          console.log("next click");
        }}
      />
    </div>
  );
}

export default App;
