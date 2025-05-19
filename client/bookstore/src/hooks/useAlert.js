import { useState, useCallback } from 'react';

export const useAlert = () => {
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  const showAlert = useCallback((message, type = 'success') => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert((prev) => ({ ...prev, show: false }));
    }, 3000);
  }, []);

  return [alert, showAlert, setAlert];
};