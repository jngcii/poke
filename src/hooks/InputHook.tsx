import React, {
  ChangeEvent, useCallback, useRef, useState,
} from 'react';

export type InputHook = {
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  ref: React.MutableRefObject<any>,
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void
}

const useInput = (initialValue = ''): InputHook => {
  const [value, setValue] = useState(initialValue);
  const ref = useRef(null);

  const onChangeValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    e.preventDefault();
  }, [value]);

  return {
    value, setValue, ref, onChangeValue,
  };
};

export default useInput;
