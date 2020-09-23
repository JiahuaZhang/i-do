import React, { useState } from 'react';
import { Refresh } from './Refresh';
import { Example } from './Example';

interface Props {}

export const Temp = (props: Props) => {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        border: '1px solid orange',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(250deg, #7b2ff7, #f107a3)',
        padding: 0,
        margin: 0,
      }}>
      <Refresh onClick={() => setCount((c) => c + 1)} />
      <Example key={count} />
    </div>
  );
};
