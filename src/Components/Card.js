import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext';

const Card = ({ data, darkMode }) => {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState({});
  const [userPic, setUserPic] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserPic(parsedUser.photoURL || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=40");
    } else {
      setUserPic("https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=40");
    }
  }, []);

  const readMore = (url) => {
    window.open(url);
  };

  // Function to extract important words or phrases from the description
  const extractKeywords = (text, maxLength = 50) => {
    if (!text) return "";
    const keywords = text.split(' ').slice(0, 100);
    const summary = keywords.join(' ');
    return summary.length > maxLength ? `${summary.substring(0, maxLength)}...` : summary;
  };

  // Handle adding a new comment
  const handleAddComment = (index, newComment) => {
    setComments((prevComments) => {
      const updatedComments = { ...prevComments };
      if (!updatedComments[index]) {
        updatedComments[index] = [];
      }
      updatedComments[index].push({ comment: newComment, userPic });
      return updatedComments;
    });
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

                {/* Comments Section */}
                {user && user.isSubscribed ? (
                  <div className="mt-4">
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Comments</h3>

                    {/* Render existing comments */}
                    <div className="mt-2">
                      {comments[index] && comments[index].length > 0 ? (
                        <ul className="list-disc pl-5">
                          {comments[index].map((comment, i) => (
                            <li key={i} className="flex items-start mt-2">
                              {/* User Avatar */}
                              <img
                                src={comment.photoURL || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=40"}
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full mr-3"
                                loading="lazy"
                              />
                              <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{comment.comment}</p>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No comments yet</p>
                      )}
                    </div>

                    {/* Add a new comment */}
                    <div className="mt-4">
                      <textarea
                        className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
                        placeholder="Add a comment..."
                        rows="3"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && e.shiftKey === false) {
                            e.preventDefault();
                            const newComment = e.target.value.trim();
                            if (newComment) {
                              handleAddComment(index, newComment);
                              e.target.value = '';
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <p className={`mt-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Subscribe to add comments.
                  </p>
                )}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Card;
