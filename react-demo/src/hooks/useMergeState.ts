import { useEffect, useState, useRef, useMemo } from "react";

export function useMergeState<T>(
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
