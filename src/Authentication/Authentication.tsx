/**@jsx jsx */
import { jsx, keyframes } from '@emotion/react';
import { useState, useRef } from 'react';
import { GoogleOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

import { useEscape } from '../util/useEscape';
import firebase from '../util/firebase';
import { userState, usePersistUser } from '../state/user';
import { useRecoilValue } from 'recoil';

interface Props {}

const googleProvider = new firebase.auth.GoogleAuthProvider();

const gradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const Authentication = (props: Props) => {
  const user = useRecoilValue(userState);
  const [showLogout, setShowLogout] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  useEscape(imageRef, () => setShowLogout(false));
  usePersistUser();

  return (
    <div
      css={{
        display: 'grid',
        justifyContent: 'end',
        '& > *': { marginRight: '.5rem', marginTop: '.5rem', cursor: 'pointer' },
      }}>
      {user.isAuthenticated ? (
        <div style={{ position: 'relative' }}>
          <img
            ref={imageRef}
            onClick={() => setShowLogout((status) => !status)}
            src={user.photoURL}
            style={{ width: '4rem', position: 'relative', zIndex: 1 }}
            alt='user'
          />
          <motion.button
            onClick={() => firebase.auth().signOut()}
            initial={false}
            animate={showLogout ? 'show' : 'hide'}
            variants={{
              show: {
                x: 0,
                opacity: 1,
              },
              hide: {
                x: '125%',
                y: '50%',
                opacity: 0,
                transition: {
                  ease: 'backIn',
                },
              },
            }}
            css={{
              position: 'absolute',
              right: '100%',
              marginRight: '1rem',
              fontSize: '1.5rem',
              minWidth: '8rem',
              color: 'white',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              background: '#f28181',
              '&:hover': {
                color: 'white',
                background:
                  'linear-gradient(90deg, rgba(242,129,129,1) 0%, rgba(228,134,42,1) 50%, rgba(238,241,0,1) 100%)',
                animation: `${gradient} 1.5s ease infinite`,
                backgroundSize: '250% 100%',
              },
              '&:focus': {
                outline: 'none',
              },
            }}>
            log out
          </motion.button>
        </div>
      ) : (
        <button
          css={{
            color: 'white',
            background: '#00a1f1',
            fontSize: '1.5rem',
            border: 'none',
            borderRadius: '20px',
            padding: '.5rem',
            '&:focus': {
              outline: 'none',
            },
            '&:hover': {
              background:
                'linear-gradient(281deg, rgba(129,242,213,1) 0%, rgba(42,219,228,1) 50%, rgba(0,161,241,1) 100%)',
              animation: `${gradient} 1.5s ease infinite`,
              backgroundSize: '250% 100%',
            },
          }}
          onClick={() => firebase.auth().signInWithPopup(googleProvider)}>
          <GoogleOutlined style={{ marginRight: '.3rem' }} />
          Login with Google
        </button>
      )}
    </div>
  );
};
