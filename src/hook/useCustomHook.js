import { useState } from 'react';

const useCustomHook = () => {
  const [title, setTitle] = useState('oi');
  const [showSearch, setShowSearch] = useState(true);
  return { title,
    setTitle,
    showSearch,
    setShowSearch };
};

export default useCustomHook;
