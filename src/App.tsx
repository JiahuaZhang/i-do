import React from 'react';

import Sets from './Set/Sets';
import { GlobalSetProvider } from './Set/SetContext';
import { Authentication } from './Authentication/Authentication';
import { GlobalFirebaseUserProvider } from './Authentication/FirebaseUserContext';
import { TodoAppLayout } from './TodoApp/TodoAppLayout';

function App() {
  return (
    <GlobalFirebaseUserProvider>
      <Authentication />
      <TodoAppLayout />
      <GlobalSetProvider>
        <Sets />
      </GlobalSetProvider>
    </GlobalFirebaseUserProvider>
  );
}

export default App;
