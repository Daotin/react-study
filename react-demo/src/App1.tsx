import {
  useReducer,
  useRef,
  forwardRef,
  useImperativeHandle,
  createContext,
  useContext,
  JSX,
  ReactElement,
  ReactNode,
  FunctionComponent as FC,
} from "react";
import { produce } from "immer";
import "./App.css";

const countContext = createContext<number>(123);

function Bbb() {
  return (
    <div>
      Bbb Component
      <Ccc />
    </div>
  );
}

const Ccc: FC = () => {
  const count = useContext(countContext);
  return <div>CCC Component {count}</div>;
};

function App(): JSX.Element {
  return (
    <div className="App">
      <countContext.Provider value={456}>
        App Component
        <Bbb />
      </countContext.Provider>
    </div>
  );
}

export default App;
