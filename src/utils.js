import { Navigate } from "react-router-dom";
import { useAuth } from "./authProvider";
import { useState } from "react";

export function shallowEqual(object1, object2) {
	const keys1 = Object.keys(object1);
	const keys2 = Object.keys(object2);
	if (keys1.length !== keys2.length) {
		return false;
	}
	for (let key of keys1) {
		if (object1[key] !== object2[key]) {
		return false;
		}
	}
	return true;
}

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

export const ProtectedRoute = ({ children }) => {
	const auth = useAuth();
  
	if (!auth || !auth.user) {
		return <Navigate to="/login" />;
	}

	return children;
};