import React, { useState } from "react";
import { Navigate } from 'react-router-dom';
import Navbar from "./Navbar"; // Import Navbar component

const SubscriptionPage = ({ user, handleSignIn, handleSignOut }) => {
  const [darkMode, setDarkMode] = useState(false);

  if (!user) {
    return <Navigate to="/" />;
  }

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-white'}`}>
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        user={user}
        handleSignIn={handleSignIn}
        handleSignOut={handleSignOut}
      />

      <div className={`text-center py-8 ${darkMode ? 'bg-black' : 'bg-white'}`}>
        <h2 className={`text-3xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>Upgrade to Premium</h2>
        <p className={`text-lg mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>
          Unlock exclusive features and stay ahead with Trendify's Premium
          subscription.
        </p>

        <div className={`p-6 rounded-lg shadow-lg mb-6 ${darkMode ? 'bg-gray-700' : 'bg-blue-100'}`}>
          <h3 className="text-2xl font-semibold mb-4">Premium Subscription Benefits</h3>
          <ul className={`list-disc list-inside text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <li>Access to exclusive tech news and updates</li>
            <li>Ad-free browsing experience</li>
            <li>Priority support and notifications</li>
            <li>Customizable news feeds based on your interests</li>
            <li>Access to advanced analytics and insights</li>
          </ul>
        </div>

        <div className="flex justify-center gap-4">
          <button
            className="px-6 py-2 bg-green-500 text-white rounded-lg text-lg"
            onClick={() => alert("Redirecting to payment page")}
          >
            Subscribe Now
          </button>
          <button
            className="px-6 py-2 bg-yellow-500 text-white rounded-lg text-lg"
            onClick={() => alert("Redirecting to upgrade page")}
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
