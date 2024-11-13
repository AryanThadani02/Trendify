import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Newsapp from './Components/Newsapp';
import SubscriptionPage from './Components/Subscription';
import { UserProvider, UserContext } from './UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    toast.warn("Please sign in to access this page.", {
      position: "top-center",
      autoClose: 3000,
    });

    return <Navigate to="/" />;
  }
  return children;
};

export default App;
