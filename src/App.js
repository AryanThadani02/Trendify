import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Newsapp from './Components/Newsapp';
import SubscriptionPage from './Components/Subscription'; // Import your subscription page component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Newsapp />} />
        <Route path="/subscription" element={<SubscriptionPage />} /> {/* Add the subscription route */}
      </Routes>
    </Router>
  );
}

export default App;
