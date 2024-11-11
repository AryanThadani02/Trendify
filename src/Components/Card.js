import React from 'react';

const Card = ({ data, darkMode }) => {
  const readMore = (url) => {
    window.open(url);
  };

  return (
    <div className="flex justify-center flex-wrap gap-10 mt-5">
      {data.map((curItem, index) => {
        if (!curItem.image_url) {
          return null;
        } else {
          return (
            <div
              key={index}
              className={`max-w-sm rounded-lg shadow-lg border border-gray-200 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            >
              <img
                src={curItem.image_url}
                alt={curItem.title}
                className="w-full h-48 rounded-t-lg"
                loading="lazy"
              />
              <div className="p-4">
                <a
                  href={curItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} hover:border-b-2 hover:border-gray-800`}
                >
                  {curItem.title}
                </a>
                <p
                  className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  {curItem.description}
                </p>
                <button
                  onClick={() => readMore(curItem.link)}
                  className={`mt-4 px-3 py-1 rounded-lg ${darkMode ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                  Read More
                </button>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Card;
