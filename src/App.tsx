import React from 'react';
import { RecoilRoot } from 'recoil';

import { Authentication } from './Authentication/Authentication';
import { TodoAppLayout } from './TodoApp/TodoAppLayout';

function App() {
  return (
    <RecoilRoot>
      <Authentication />
      <TodoAppLayout />
    </RecoilRoot>
  );
}

export default App;
