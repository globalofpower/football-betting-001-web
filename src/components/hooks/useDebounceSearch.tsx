import { useEffect, useState } from 'react';

const useDebounceSearch = (value:any,delay:any) => {
  const [debounceValue,setDebounceValue] = useState('');
  useEffect(()=>{
    const valueHandler = setTimeout(() => {
        setDebounceValue(value);
    },delay);
    return () => clearTimeout(valueHandler);
  },[value,delay]);
  return debounceValue;
}

export default useDebounceSearch
