import React, { useState } from 'react';
import { Refresh } from './Refresh';
import { Example } from './Example';

interface Props {}

export const Temp = (props: Props) => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Refresh onClick={() => setCount((c) => c + 1)} />
      <Example key={count} />
    </>
  );
};
