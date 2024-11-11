import React, { useEffect, useState } from 'react';
import Card from './Card';

const Newsapp = () => {
  const [search, setSearch] = useState("");
  const [newsData, setNewsData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const API_KEY = "f638d650d4c24dd094e1d208602a4e65";

  const getData = async () => {
    try {
      const response = await fetch(`https://newsdata.io/api/1/news?apikey=pub_589310f75ec51ad1888b626e1f7bd94a45d34&q=technology`);
      const jsonData = await response.json();
      setNewsData(jsonData.results);
      console.log(jsonData.results);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [search]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const filterByTopic = (topic) => {
    setSearch(topic);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <nav className={`flex flex-col md:flex-row items-center justify-between p-4 md:px-8 ${darkMode ? 'bg-gray-800' : 'bg-blue-200'}`}>
        <h1 className="text-xl md:text-2xl font-semibold mb-4 md:mb-0 text-center md:text-left">
          Trendify - Daily Tech & AI News Platform
        </h1>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search News"
            value={search}
            onChange={handleInput}
            className={`w-full md:w-64 px-3 py-2 text-base md:text-lg border-none rounded ${darkMode ? 'bg-black' : 'bg-white'}`}
          />
          <button
            onClick={getData}
            className="w-20 h-10 bg-blue-500 rounded text-white text-base md:text-lg"
          >
            Search
          </button>
        </div>
        {/* Dark Mode Toggle Button */}
        <button
          id="theme-toggle"
          type="button"
          onClick={toggleDarkMode}
          className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 my-2"
        >
          <svg
            id="theme-toggle-dark-icon"
            className={`w-5 h-5 ${darkMode ? 'block' : 'hidden'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
            ></path>
          </svg>
          <svg
            id="theme-toggle-light-icon"
            className={`w-5 h-5 ${darkMode ? 'hidden' : 'block'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </nav>


      <div className="text-center my-4 font-semibold text-xl md:text-2xl">
        Stay Updated with Trendify
      </div>

      <div className="flex justify-center flex-wrap gap-2 mb-4">
        {["AI", "Apple", "Samsung", "Google", "Microsoft"].map((topic) => (
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
        {newsData ? <Card data={newsData} darkMode={darkMode} /> : <p className="text-red-500 dark:text-gray-300"> Loading news... </p>
        }</div>

    </div>
  );
};

export default Newsapp;
