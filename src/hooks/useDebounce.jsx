import { useEffect, useState } from 'react';

const useDebounce = (value, delay) => {
  const [searchTerm, setSearchTerm] = useState(value);

  useEffect(() => {
    // do something

    // value:
    // lần thứ 1 : h => timer = 0
    // lần thứ 2 : he => timer = 1
    // lần thứ 3 : hel
    // lần thứ 4 : hell

    const timer = setTimeout(() => {
      console.log('set timeout');
      setSearchTerm(value);
    }, delay);

    return () => {
      console.log('clear timeout');
      clearTimeout(timer);
    };
  }, [value, delay]);

  return { debouncedValue: searchTerm };
};
export default useDebounce;