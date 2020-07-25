import React, { useState, useEffect, createContext, ReactNode } from 'react';

import firebase from '../util/firebase';

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
      console.group('onAuthStateChanged');
      console.log(user);
      console.groupEnd();
      if (user) {
        const { displayName, photoURL, uid } = user;
        setUser({
          displayName,
          photoURL,
          uid,
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
