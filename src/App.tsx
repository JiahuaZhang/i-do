import React from 'react';

import Sets from './Set/Sets';
import { GlobalSetProvider } from './Set/SetContext';
import { Authentication } from './Authentication/Authentication';
import { GlobalFirebaseUserProvider } from './Authentication/FirebaseUserContext';

function App() {
  return (
    <GlobalFirebaseUserProvider>
      <Authentication />
      <GlobalSetProvider>
        <Sets />
      </GlobalSetProvider>
    </GlobalFirebaseUserProvider>
  );
}

export default App;
