import { useState } from 'react';

const useCustonHook = () => {
  const [title, setTitle] = useState('oi');
  return [title, setTitle];
};

export default useCustonHook;
