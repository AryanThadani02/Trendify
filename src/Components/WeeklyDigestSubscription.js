import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const WeeklyDigestSubscription = ({ darkMode }) => {
  const article = {
    title: 'Smartphone Prices Set to Rise in 2025 Due to Generative AI and Advanced Tech',
    content: 'Generative AI integration and advanced manufacturing processes are driving smartphone costs higher, with a predicted 5% price increase by 2025.',
    author: 'thehansindia',
    link: 'https://www.thehansindia.com/technology/tech-news/smartphone-prices-set-to-rise-in-2025-due-to-generative-ai-and-advanced-tech-921117',
    imageUrl: 'https://assets.thehansindia.com/h-upload/2024/11/12/1496588-ai.webp'
  };

  const [email, setEmail] = useState('');
  const [isWDSubscribed, setIsWDSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const sendArticleEmail = (userEmail) => {
    const templateParams = {
      user_email: userEmail,
      article_title: article.title,
      article_content: article.content,
      article_author: article.author,
      article_link: article.link,
      article_image: article.imageUrl,
    };

    setLoading(true);
    setError('');

    emailjs
      .send(
        'service_5ssyuw1',    //  Service ID
        'template_sv0y97p',   //  Template ID
        templateParams,
        'ysoPHM0--xGsXGH2s'   //  User ID
      )
      .then(
        (response) => {
          console.log('Email sent successfully', response);
          setIsWDSubscribed(true);
          setLoading(false);
        },
        (error) => {
          console.log('Error sending email', error);
          setError('There was an error subscribing. Please try again later.');
          setLoading(false);
        }
      );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email) {
      sendArticleEmail(email);
    } else {
      setError('Please enter a valid email address.');
    }
  };

  const handleUnsubscribe = () => {
    setIsWDSubscribed(false); // Reset subscription status
    setEmail('');
    setError('');
  };

  return (
    <div
      className={`flex justify-center items-center p-6 transition-colors duration-300 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
    >
      <div className="max-w-md w-full p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Subscribe to Our Weekly Digest</h2>

        {!isWDSubscribed ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-black focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all disabled:bg-blue-400"
            >
              {loading ? 'Sending...' : 'Subscribe'}
            </button>
            {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
          </form>
        ) : (
          <div>
            <p className="text-green-500 mb-4">Thank you for subscribing! The article has been sent to your email.</p>
            <button
              onClick={handleUnsubscribe}
              className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
            >
              Unsubscribe
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyDigestSubscription;
