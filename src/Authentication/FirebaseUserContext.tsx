import React, { useState, useEffect, createContext, ReactNode } from 'react';
import firebase from 'firebase';

import 'firebase/auth';

interface User {
  displayName: string;
  photoURL: string;
  isAuthenticated: boolean;
  uid: string;
}

export const useFirebaseUser = () => {
  const [user, setUser] = useState({} as User);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser({
          displayName: user?.displayName || '',
          photoURL: user?.photoURL || '',
          isAuthenticated: true,
        } as User);
      } else {
        setUser({} as User);
      }
    });
  }, []);

  return user;
};

export const FirebaseUserContext = createContext({} as User);

export const GlobalFirebaseUserProvider = ({ children }: { children: ReactNode }) => (
  <FirebaseUserContext.Provider value={useFirebaseUser()}>{children}</FirebaseUserContext.Provider>
);
