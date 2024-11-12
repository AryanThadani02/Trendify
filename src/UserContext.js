import React, { createContext, useState, useEffect } from 'react';
import { signInWithGoogle } from './Firebase';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.displayName && parsedUser.photoURL) {
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Failed to parse stored user data", error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const handleSignIn = async () => {
    try {
      const userData = await signInWithGoogle();
      const userToStore = {
        displayName: userData.displayName,
        photoURL: userData.photoURL,
        email: userData.email,
        isSubscribed: false, // Add subscription status here
      };
      localStorage.setItem('user', JSON.stringify(userToStore));
      setUser(userToStore);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const toggleSubscription = () => {
    if (user) {
      const updatedUser = { ...user, isSubscribed: !user.isSubscribed };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  return (
    <UserContext.Provider value={{ user, handleSignIn, handleSignOut, toggleSubscription, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
