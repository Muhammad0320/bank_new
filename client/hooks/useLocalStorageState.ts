import { useEffect, useState } from 'react';

export const useLocalStorageState = (initialState: boolean, key: string) => {
  const [value, setValue] = useState<boolean>(function () {
    const storageItem = localStorage.getItem(key);

    return storageItem ? JSON.parse(storageItem) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );
  
  return [value, setValue];
};
