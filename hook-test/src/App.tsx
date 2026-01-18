import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);

  function fetchData() {
    return fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  console.log("xxx");
  useEffect(() => {
    console.log("yyy");
    fetchData().then(() => {
      setCount(100);
    });
  }, []);

  return (
    <div className="App">
      <div onClick={() => setCount(count + 1)}>{count}</div>
    </div>
  );
}

export default App;
