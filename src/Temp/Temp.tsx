import React, { useContext } from 'react';

import firebase, { firebaseFirestore } from '../util/firebase';
import { FirebaseUserContext } from '../Authentication/FirebaseUserContext';

interface Props {}

export const Temp = (props: Props) => {
  const user = useContext(FirebaseUserContext);

  if (user.isAuthenticated) {
    // firebaseFirestore
    //   .collection('todos')
    //   .doc(user.uid)
    //   .set({ todos: ['awesome', 'nice'] });

    firebaseFirestore
      .collection('todos')
      .doc(user.uid)
      .get()
      .then((doc) => {
        console.log(doc.data());
      });

    // firebaseFirestore
    //   .collection('todos')
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       console.log(doc.id);
    //       console.log(doc.data());
    //     });
    //   });
  }
  return <div></div>;
};
