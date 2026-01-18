# react-study

## 一天学会 react

快速学习路径：

1、jsx 语法、useState 和 useEffect 了解下，基础用法和 Vue 对比着学： [https://component-party.dev/](https://component-party.dev/) 。

2、然后敲个 todolist ，期间有什么不会的直接问 gpt

搞完这些就可以说自己会 React 了。

react 文档：https://zh-hans.react.dev/learn

---

> 下面的react状态管理库如何选择？Redux、Dva、React-Toolkit、MobX，zustand，以及 useContext 结合 useReducer 的管理方式

Redux系列：Redux Toolkit > Redux > Dva

推荐尽量选择现代化、社区活跃的库（如 Redux Toolkit 或 Zustand）

最终，react技术栈选择：Vite + React + Ant Design + Zustand + TailwindCSS


react 项目模板：
- slash-admin(1.8k): https://github.com/d3george/slash-admin (需要的依赖好多)
- react-ts-template：https://github.com/huangmingfu/react-ts-template （依赖多，没有ant design，因为考虑到移动端，对应的就是antd mobile了）
- react-app-template：https://github.com/Gzbox/react-app-template （没有Zustand）

---

## React 的不可变数据设计

React 的不可变数据设计是一种处理数据状态的哲学和模式，强调**不要直接修改原始数据，而是通过创建数据的副本来更新状态**。这种设计理念与 React 的高效更新机制密切相关，确保组件能够正确地重新渲染。

- 对于引用数据类型，数据一旦创建，不能直接修改；需要通过生成新数据的方式来更新状态。
- 对于基本数据类型，它们本身就不会被直接修改，而是被重新赋值。因此，对于基本数据类型，不需要像对象或数组那样进行拷贝操作，直接赋值即可。

### 为什么 React 使用不可变数据设计？

1. 提高性能

React 使用 虚拟 DOM 来高效更新 UI：

- 每次状态更新，React 通过比较前后状态的引用来判断是否需要更新组件。
- 如果状态的引用未改变，React 会跳过重新渲染，提高性能。
- 使用不可变数据设计能确保每次更新时生成一个新的引用，从而触发正确的更新。

2. 方便调试

- 不可变数据设计使得状态变更变得更加明确。
- 你可以在状态变更前后轻松比较数据，快速定位问题。
- 例如，调试工具（如 Redux DevTools）依赖这种机制来记录和回溯状态。

3. 数据安全性

- 避免直接修改原始数据可能带来的副作用（如意外更改其他地方引用同一对象的数据）。
- 确保状态变更在预期范围内。

## useEffect

`useEffect` 是 React 中的一个 Hook，用于在函数组件中执行副作用操作。

副作用的意思是：本来函数组件是纯函数，但是现在 useEffect 可以做一些额外的操作（数据获取、订阅、手动更改 DOM 等），这不就是副作用函数了嘛。

`useEffect` 接受两个参数：一个是副作用函数，另一个是依赖项数组。

### 基本用法

```javascript
import React, { useState, useEffect } from 'react';

function MyComponent({ someProp }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('副作用函数执行');

    // 设置一个定时器
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    // 返回清理函数
    return () => {
      console.log('清理函数执行');
      clearInterval(interval); // 清理定时器
    };
  }, [someProp]); // 依赖项数组

  return <div>Count: {count}</div>;
}

export default MyComponent;
```

- 如果`依赖项数组`为空，那么只会在`组件加载`的时候，执行`副作用函数`（==此时，即便通过 setXxx 的方式刷新组件，useEffect 依然不会执行！==），然后在组件卸载的时候执行`清理函数`。
- 如果`依赖项数组`不为空（比如为 someProp），那么当 someProp 发生变化时，`清理函数`会先执行，然后`副作用函数`会重新执行。最后当组件卸载时，`清理函数`又会执行。

## 学习井字棋游戏的 2 点困惑

1、React 的状态更新是异步的，即便是使用 setTimeout 获取的仍是旧的数据。在 vue 中可以使用 nextTick，在 react 中一般的的做法是什么？（不想使用 useEffct）

2、在 vue 中，所有的状态都可以写在对顶层，然后全局可用，但是 react 中，所有的状态，函数都是要由顶层组件传递过去，非常麻烦。比如 Game 需要传递很多便利和函数给 Borad，是我代码设计不合理吗？

在 React 中，如果你想在状态更新后立即获取最新值，有以下几种方法：

- 使用 flushSync

```js
import { flushSync } from 'react-dom';

function handleClickSquare(i) {
  flushSync(() => {
    setSquareArray(newSquareArray);
  });
  // 这里可以立即获取到更新后的值
  console.log(squareArray);
}
```

- 使用状态更新的回调形式

```js
function handleClickSquare(i) {
  setSquareArray(newSquareArray, () => {
    // 在这里可以访问到最新的状态
    if (newWinner) {
      alert(`${newWinner} is winner!`);
    }
  });
}
```

- 使用 useRef 跟踪最新值

```js
function Game() {
  const [squareArray, setSquareArray] = React.useState([]);
  const squareArrayRef = React.useRef(squareArray);

  // 当 squareArray 更新时，更新 ref
  React.useEffect(() => {
    squareArrayRef.current = squareArray;
  }, [squareArray]);

  // 需要获取最新值时，使用 squareArrayRef.current
}
```

2. 关于状态管理

确实，React 的 props 传递可能会显得比较繁琐。对于这个问题，有以下几种解决方案：

- 使用 Context API

```js
// 创建 Context
const GameContext = React.createContext();

function Game() {
  const [squareArray, setSquareArray] = React.useState([]);
  const [nextStep, setNextStep] = React.useState('X');
  // ... 其他状态

  const contextValue = {
    squareArray,
    setSquareArray,
    nextStep,
    setNextStep,
    // ... 其他状态和方法
  };

  return (
    <GameContext.Provider value={contextValue}>
      <div>
        <div>Next step: {nextStep}</div>
        <Board />
        <History />
      </div>
    </GameContext.Provider>
  );
}

// 在子组件中使用 Context
function Board() {
  const { squareArray, setSquareArray, nextStep } = React.useContext(GameContext);
  // ... 组件逻辑
}
```

- 使用状态管理库
  对于较大的应用，可以使用 Redux、Zustand 或 Jotai 等状态管理库
  这些库提供了更强大的全局状态管理能力

- 重构组件结构

```js
// 将相关逻辑封装到自定义 Hook
function useGame() {
  const [squareArray, setSquareArray] = React.useState([]);
  const [nextStep, setNextStep] = React.useState('X');

  const handleMove = React.useCallback((i) => {
    // 处理移动逻辑
  }, []);

  return {
    squareArray,
    nextStep,
    handleMove,
  };
}

// 在组件中使用
function Game() {
  const gameLogic = useGame();
  return (
    <div>
      <Board {...gameLogic} />
    </div>
  );
}
```

## doubleCount 自动是响应式的吗？

```js
function Demo() {
  const [count, setCount] = useState(10);
  const doubleCount = count * 2; // 每次 count 改变时，这行代码都会重新执行
  // ...
}
```

是的，doubleCount 是自动响应式的！
在 React 中，每当组件的状态（比如 count）发生变化时，组件会重新渲染，这时所有在组件函数体内的代码都会重新执行。

### 在 react 组件中什么时候组件重新渲染？

在 React 中，组件重新渲染的情况主要有以下几种：

### 1. 状态（State）变化

```javascript
function Component() {
  const [count, setCount] = useState(0);

  // 调用 setCount 会触发重新渲染
  const handleClick = () => setCount(count + 1);
}
```

### 2. 属性（Props）变化

```javascript
function Child(props) {
  // 当父组件传入的 props 变化时，Child 组件会重新渲染
  return <div>{props.value}</div>;
}

function Parent() {
  const [value, setValue] = useState(0);
  // value 改变会导致 Child 重新渲染
  return <Child value={value} />;
}
```

### 3. 父组件重新渲染

```javascript
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Child /> {/* Parent 重新渲染时，Child 也会重新渲染 */}
    </div>
  );
}
```

### 4. Context 值变化

```javascript
const MyContext = React.createContext();

function Child() {
  const value = useContext(MyContext);
  // Context 值变化时，使用该 Context 的组件会重新渲染
  return <div>{value}</div>;
}
```

### 优化方案：

1. **使用 memo 阻止不必要的重新渲染**

```javascript
const Child = React.memo(function Child(props) {
  // 只有当 props 真正变化时才重新渲染
  return <div>{props.value}</div>;
});
```

2. **使用 useMemo 缓存计算值**

```javascript
function Component() {
  const expensiveValue = useMemo(
    () => {
      // 复杂计算
      return heavyComputation();
    },
    [
      /* 依赖项 */
    ]
  );
}
```

3. **使用 useCallback 缓存函数**

```javascript
function Parent() {
  const handleClick = useCallback(
    () => {
      // 处理点击
    },
    [
      /* 依赖项 */
    ]
  );

  return <Child onClick={handleClick} />;
}
```

4. **合理拆分组件和状态**

```javascript
function Parent() {
  return (
    <div>
      <StaticComponent /> {/* 静态组件不需要重新渲染 */}
      <DynamicComponent /> {/* 只有需要更新的部分重新渲染 */}
    </div>
  );
}
```
