import { useState } from "react";

export default function usePersistedState(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const storedDate = localStorage.getItem(key);
    return storedDate ? JSON.parse(storedDate) : defaultValue;
  });

  const setLocalStorageValue = (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, setLocalStorageValue];
}
