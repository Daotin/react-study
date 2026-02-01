import { useEffect, useState, useRef, useMemo } from "react";

interface CalenderProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (dateStr: string) => void;
}

function useMergeState<T>(
  defaultStateValue: T,
  props?: {
    value?: T;
    defaultValue?: T;
  },
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const hasValue = useMemo(() => {
    return props?.value !== undefined;
  }, [props?.value]);

  const [state, setState] = useState<T>(
    hasValue ? props!.value! : (props?.defaultValue ?? defaultStateValue),
  );

  const mergeValue = useMemo(() => {
    return hasValue ? props!.value! : state;
  }, [hasValue, props?.value, state]);

  return [mergeValue, setState];
}

function Calender(props: CalenderProps) {
  const [mergeValue, setDate] = useMergeState(new Date(), {
    value: props.value,
    defaultValue: props.defaultValue,
  });

  function onClick(dateStr: string) {
    setDate(new Date(dateStr));
    props.onChange?.(dateStr);
  }

  return (
    <div>
      {mergeValue?.toLocaleDateString()}
      <hr />
      <div onClick={() => onClick("2026-02-01")}>2026-02-01</div>
      <div onClick={() => onClick("2026-02-02")}>2026-02-02</div>
      <div onClick={() => onClick("2026-02-03")}>2026-02-03</div>
    </div>
  );
}

function App() {
  // const [date, setDate] = useState<Date>(new Date("2025-12-31"));
  return (
    <Calender
      // value={date}
      defaultValue={new Date("2024-12-31")}
      onChange={(dateStr) => {
        console.log("selected date:", dateStr);
        // setDate(new Date(dateStr));
      }}
    />
  );
}

export default App;
