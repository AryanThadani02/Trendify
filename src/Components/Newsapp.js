import React, { useEffect, useState, useContext } from 'react';
import Card from './Card';
import Navbar from './Navbar'; // Import the new Navbar component
import { signInWithGoogle } from '../Firebase'; // Import your firebase config file
import { UserContext } from '../UserContext'; // Import the UserContext
import WeeklyDigestSubscription from './WeeklyDigestSubscription';

const Newsapp = () => {
  const [search, setSearch] = useState("technology");
  const [newsData, setNewsData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const { user, signIn, signOut } = useContext(UserContext); // Access user and actions from context

  const API_KEY = "pub_589867ab89a2c81708d78da49df2846921fd6";

  const getData = async () => {
    try {
      const response = await fetch(
        `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=${search}&language=en&category=technology`
      );
      const jsonData = await response.json();
      console.log(jsonData);

      if (jsonData && jsonData.results && Array.isArray(jsonData.results)) {
        setNewsData(jsonData.results);
      } else {
        console.error("No results found or wrong format:", jsonData);
        setNewsData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setNewsData([]);
    }
  };

  useEffect(() => {
    getData();
  }, [search]);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const filterByTopic = (topic) => {
    setSearch(topic);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      console.log(result);
      signIn(result); // Use context's signIn function
    } catch (error) {
      console.error("Error during Google sign-in:", error.message);
    }
  };

  const handleSignOut = () => {
    signOut(); // Use context's signOut function
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} user={user} handleSignIn={handleSignIn} handleSignOut={handleSignOut} />

      <div className="flex flex-col md:flex-row justify-center gap-3 mb-4 mt-4 w-full md:w-auto px-4">
        <input
          type="text"
          placeholder="Search News"
          value={search}
          onChange={handleInput}
          className={`w-full md:w-64 px-3 py-2 text-base md:text-lg rounded ${darkMode ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`}
        />
        <button
          onClick={getData}
          className={`w-full md:w-20 h-10 md:h-auto bg-blue-500 rounded text-white text-base md:text-lg`}
        >
          Search
        </button>
      </div>


      <div className="text-center my-4 font-semibold text-xl md:text-2xl">
        Stay Updated with Trendify
      </div>

      <div className="flex justify-center flex-wrap gap-2 mb-4">
        {["AI", "Robotics", "BlockChain", "CyberSecurity", "Apple"].map((topic) => (
          <button
            key={topic}
            onClick={() => filterByTopic(topic)}
            className="px-4 py-1 bg-red-400 rounded-full text-white text-sm md:text-lg dark:bg-red-500"
          >
            {topic}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-5">
        {Array.isArray(newsData) && newsData.length > 0 ? (
          <Card data={newsData} darkMode={darkMode} />
        ) : (
          <p className="text-red-500 dark:text-gray-300">No news found or still loading...</p>
        )}
      </div>
      <WeeklyDigestSubscription darkMode={darkMode} />
    </div>
  );
};

export default Newsapp;
