import React from 'react';

const Card = ({ data, darkMode }) => {
  const readMore = (url) => {
    window.open(url);
  };

  // Function to extract important words or phrases from the description
  const extractKeywords = (text, maxLength = 50) => {
    if (!text) return ""; // Return empty string if text is null or undefined
    const keywords = text.split(' ').slice(0, 100); // Adjust the number of words
    const summary = keywords.join(' ');
    return summary.length > maxLength ? `${summary.substring(0, maxLength)}...` : summary;
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
                  {extractKeywords(curItem.description)}
                </p>

                {/* Publication Date and Timezone */}
                {curItem.pubDate && (
                  <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Published on: {curItem.pubDate} {curItem.pubDateTZ}
                  </p>
                )}

                {/* Source Information */}
                {curItem.source_name && (
                  <div className="flex items-center mt-2">
                    {curItem.source_icon && (
                      <img
                        src={curItem.source_icon}
                        alt={curItem.source_name}
                        className="w-5 h-5 mr-2"
                        loading="lazy"
                      />
                    )}
                    <a
                      href={curItem.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}
                    >
                      {curItem.source_name}
                    </a>
                  </div>
                )}

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
