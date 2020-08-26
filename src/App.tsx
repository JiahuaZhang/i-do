import React from 'react';
import { RecoilRoot } from 'recoil';

import Sets from './Set/Sets';
import { GlobalSetProvider } from './Set/SetContext';
import { Authentication } from './Authentication/Authentication';
import { TodoAppLayout } from './TodoApp/TodoAppLayout';

function App() {
  return (
    <RecoilRoot>
      <Authentication />
      <TodoAppLayout />
      <GlobalSetProvider>
        <Sets />
      </GlobalSetProvider>
    </RecoilRoot>
  );
}

export default App;
