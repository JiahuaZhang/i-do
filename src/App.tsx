import React from 'react';

import Sets from './Set/Sets';
import { GlobalSetProvider } from './Set/SetContext';

function App() {
  return (
    <GlobalSetProvider>
      <Sets />
    </GlobalSetProvider>
  );
}

export default App;
