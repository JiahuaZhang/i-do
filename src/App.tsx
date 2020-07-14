import React from 'react';

import Sets from './Set/Sets';
import { GlobalSetProvider } from './Set/SetContext';
import { Authentication } from './Authentication/Authentication';

function App() {
  return (
    <div>
      <Authentication />
      <GlobalSetProvider>
        <Sets />
      </GlobalSetProvider>
    </div>
  );
}

export default App;
