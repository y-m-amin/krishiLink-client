import axios from 'axios';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import { auth } from '../firebase/firebase.init';
import { AuthContext } from './AuthContext';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      //console.log('current user', currentUser);

      if (currentUser) {
        const userInfo = {
          name: currentUser.displayName || 'Unnamed User',
          email: currentUser.email,
          photo: currentUser.photoURL || '',
        };

        // Ensure user exists
        axios.post(`${API_BASE_URL}/users`, userInfo).catch(() => {});

        //  Get JWT from backend
        axios
          .post(`${API_BASE_URL}/jwt`, { email: currentUser.email })
          .then((res) => {
            localStorage.setItem('token', res.data.token);
          })
          .catch((err) => {
            console.error('JWT error:', err);
          });
      } else {
        localStorage.removeItem('token');
      }

      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    createUser,
    signInUser,
    signInWithGoogle,
    signOutUser,
    user,
    loading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
