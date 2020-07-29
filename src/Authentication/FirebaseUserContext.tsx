import { useState, useEffect } from 'react';

import firebase from '../util/firebase';
import { createGenericContext } from '../util/createGenericContext';

interface User {
  displayName: string;
  photoURL: string;
  isAuthenticated: boolean;
  uid: string;
}

const useFirebaseUser = () => {
  const [user, setUser] = useState({} as User);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
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

export const {
  GenericContext: FirebaseUserContext,
  GenericContextProvider: GlobalFirebaseUserProvider,
} = createGenericContext(useFirebaseUser);
