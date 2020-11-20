import React, { useState } from 'react';
import { Refresh } from './Refresh';
import { Example } from './Example';

interface Props {}

export const Temp = (props: Props) => {
  const [count, setCount] = useState(0);

  return (
    <div
      style={
        {
          // border: '1px solid orange',
          // width: '100vw',
          // height: '100vh',
          // overflow: 'hidden',
          // display: 'flex',
          // justifyContent: 'center',
          // alignItems: 'center',
          // background: 'black',
          // padding: 0,
          // margin: 0,
          // background: 'black',
        }
      }>
      {/* <Refresh onClick={() => setCount((c) => c + 1)} /> */}
      <Example key={count} />
    </div>
  );
};
