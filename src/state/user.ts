import { atom, useSetRecoilState } from 'recoil';

import firebase from '../util/firebase';
import { useEffect } from 'react';

interface User {
  displayName: string;
  photoURL: string;
  isAuthenticated: boolean;
  uid: string;
}

export const userState = atom({
  key: 'userState',
  default: {} as User,
});

export const usePersistUser = () => {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;
        setUser({ displayName, photoURL, uid, isAuthenticated: true } as User);
      } else {
        setUser({} as User);
      }
    });
  }, [setUser]);
};
