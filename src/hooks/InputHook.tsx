import React, {
  ChangeEvent, useCallback, useRef, useState,
} from 'react';

export type InputHook = {
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  isFocused: boolean,
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>,
  ref: React.MutableRefObject<any>,
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void
}

const useInput = (initialValue = ''): InputHook => {
  const [value, setValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef(null);

  const onChangeValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    e.preventDefault();
  }, [value]);

  return {
    value, setValue, ref, onChangeValue, isFocused, setIsFocused,
  };
};

export default useInput;
