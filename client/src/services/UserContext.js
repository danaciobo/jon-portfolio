import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../services/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authError, setAuthError] = useState(''); // Store authentication errors
  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {

      const unsubscribe = onAuthStateChanged(auth, user => {
        setCurrentUser(user);
        setAuthInitialized(true); // Set to true once we know the user's auth state
      });

    return unsubscribe;
  }, []);

  const handleSignIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setAuthError(''); // Clear previous errors on successful sign-in
    } catch (error) {
      // Handle different error codes and set appropriate messages
      switch (error.code) {
        case 'auth/wrong-password':
          setAuthError('Incorrect password. Please try again.');
          break;
        case 'auth/user-not-found':
          setAuthError('No user found with this email. Please try again.');
          break;
        default:
          setAuthError('Failed to sign in. Please try again later.');
      }
    }
  };

  const handleSignOut = async () => {

    try {
      await signOut(auth);
      setCurrentUser(null);

    } catch(error) {
      console.error("Error signing out:", error)
    }
  }

  const value = {
    currentUser,
    authError,
    handleSignIn,
    handleSignOut,
    authInitialized
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};