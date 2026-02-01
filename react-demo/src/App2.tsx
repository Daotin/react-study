import { useEffect, useState, useRef } from "react";

function App() {
  const [count, setCount] = useState(0);

  function updateCount() {
    setCount(count + 1);
  }

  const countRef = useRef(updateCount);

  // 每次渲染都更新 ref，确保拿到的是最新的 count 值
  countRef.current = updateCount;

  useEffect(() => {
    let t = setInterval(() => countRef.current(), 1000);

    return () => {
      clearInterval(t);
    };
  }, []);

  return <div>{count}</div>;
}

export default App;
