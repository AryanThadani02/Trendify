import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Newsapp from './Components/Newsapp';
import SubscriptionPage from './Components/Subscription';
import { UserProvider, UserContext } from './UserContext'; // Import UserProvider
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the toast styles

function App() {
  return (
    <UserProvider>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Newsapp />} />
          <Route
            path="/subscription"
            element={
              <PrivateRoute>
                <SubscriptionPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

// PrivateRoute component to protect the subscription page
const PrivateRoute = ({ children }) => {
  const { user } = React.useContext(UserContext);

  if (!user) {
    // If not logged in, show a toast and redirect to home page
    toast.warn("Please sign in to access this page.", {
      position: "top-center",
      autoClose: 3000, // Toast auto closes after 3 seconds
    });

    return <Navigate to="/" />;
  }
  return children;
};

export default App;
