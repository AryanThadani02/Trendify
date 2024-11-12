import React, { createContext, useState, useEffect } from 'react';
import { signInWithGoogle } from './Firebase'; // Import the Firebase sign-in function

// Create UserContext
const UserContext = createContext();

// Create a UserProvider component
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state to show while checking user authentication

  // Simulate user authentication state
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.displayName && parsedUser.photoURL) {
          setUser(parsedUser); // Set the stored user data in state
        }
      } catch (error) {
        console.error("Failed to parse stored user data", error);
        localStorage.removeItem('user'); // Remove invalid user data
      }
    }
    setLoading(false); // Set loading to false after checking user
  }, []);

  const handleSignIn = async () => {
    try {
      const userData = await signInWithGoogle(); // Get user data from Firebase
      const userToStore = {
        displayName: userData.displayName,
        photoURL: userData.photoURL,
        email: userData.email, // Store the email or other relevant details as needed
      };
      localStorage.setItem('user', JSON.stringify(userToStore)); // Save user to localStorage
      setUser(userToStore); // Update state with the user data
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('user'); // Remove user data from localStorage
    setUser(null); // Clear user data from state
  };

  return (
    <UserContext.Provider value={{ user, handleSignIn, handleSignOut, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
