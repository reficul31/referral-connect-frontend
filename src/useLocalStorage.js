import { useState } from "react";

export const useLocalStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value && value !== "null") {
        return value;
      } else {
        window.localStorage.setItem(keyName, defaultValue);
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue) => {
    try {
        if (newValue === null) {
            window.localStorage.removeItem(keyName, newValue);
        } else {
            window.localStorage.setItem(keyName, newValue);
        }
    } catch (err) {}
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};