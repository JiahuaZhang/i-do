import React from 'react';
import { RecoilRoot } from 'recoil';

import Sets from './Set/Sets';
import { GlobalSetProvider } from './Set/SetContext';
import { Authentication } from './Authentication/Authentication';
import { TodoAppLayout } from './TodoApp/TodoAppLayout';
import { Temp } from './Temp/Temp';

function App() {
  return (
    <RecoilRoot>
      <Temp />
      {/* <Authentication />
      <TodoAppLayout />
      <GlobalSetProvider>
        <Sets />
      </GlobalSetProvider> */}
    </RecoilRoot>
  );
}

export default App;
