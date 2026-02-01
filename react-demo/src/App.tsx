import { useReducer, useRef, forwardRef, useImperativeHandle } from "react";
import { produce } from "immer";
import "./App.css";

interface ChildRef {
  childFocus: () => void;
}

interface Action {
  type: string;
  num: number;
}

interface State {
  a: {
    c: {
      e: number;
      f: number;
    };
    d: number;
  };
  b: number;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add":
      return produce(state, (draft) => {
        draft.a.c.e += action.num;
      });
    // return {
    //   ...state,
    //   a: {
    //     ...state.a,
    //     c: {
    //       ...state.a.c,
    //       e: state.a.c.e + action.num,
    //     },
    //   },
    // };
    case "sub":
      return produce(state, (draft) => {
        draft.a.c.e -= action.num;
      });
    default:
      return produce(state, (draft) => {});
  }
}

const Child = forwardRef<ChildRef>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    childFocus: () => {
      console.log("Custom focus method called");
      inputRef.current?.focus();
    },
  }));
  return <input ref={inputRef} type="text" />;
});

function App() {
  const [countObj, setCountObj] = useReducer(reducer, 0, (params) => {
    return {
      a: {
        c: {
          e: params + 10,
          f: 0,
        },
        d: 0,
      },
      b: 0,
    };
  });

  const inputRef = useRef<ChildRef>(null);

  return (
    <div className="App">
      <header className="App-header">{countObj.a.c.e}</header>
      <button onClick={() => setCountObj({ type: "add", num: 1 })}>Add</button>
      <button onClick={() => setCountObj({ type: "sub", num: 1 })}>
        Subtract
      </button>

      <br />

      <Child ref={inputRef} />
      <button onClick={() => inputRef.current?.childFocus()}>聚焦</button>
    </div>
  );
}

export default App;
