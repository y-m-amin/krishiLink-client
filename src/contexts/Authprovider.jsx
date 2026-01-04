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
import instance from '../api/axios';
import { jwtDecode } from 'jwt-decode';




const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

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

        (async () => {
          try {
            if (currentUser) {
              const userInfo = {
                name: currentUser.displayName || 'Unnamed User',
                email: currentUser.email,
                photo: currentUser.photoURL || '',
              };

              await instance.post('/users', userInfo);

              const res = await instance.post('/jwt', { email: currentUser.email });

              const token = res.data.token;
              localStorage.setItem('token', token);

              //  decode role
              const decoded = jwtDecode(token);
              setRole(decoded?.role || 'user');
            } else {
              localStorage.removeItem('token');
              setRole(null);
            }
          } catch (err) {
            console.error('Auth bootstrap error:', err?.response?.data || err);
            localStorage.removeItem('token');
            setRole(null);
          } finally {
            setLoading(false);
          }
        })();
      });

      return () => unsubscribe();
    }, []);



  const authInfo = {
    createUser,
    signInUser,
    signInWithGoogle,
    signOutUser,
    user,
    role,
    loading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
