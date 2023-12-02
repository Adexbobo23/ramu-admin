import React, { useState } from 'react';
import { useRoutes } from 'react-router-dom';
import Themeroutes from './routes/Router';
import AdminLogin from './views/ui/AdminLogin';
// import Logout from './views/ui/Logout';

const App = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const handleAuthentication = () => {
    setIsAdminAuthenticated(true);
  };

  // const handleLogout = () => {
  //   // Perform logout operations (e.g., clear local storage, API call, etc.)
  //   setIsAdminAuthenticated(false);
  // };

  const routing = useRoutes(
    isAdminAuthenticated
      ? Themeroutes
      : [
          {
            path: '/',
            element: <AdminLogin onAuthentication={handleAuthentication} />,
          },
        ]
  );

  return <div className="dark">{routing}</div>;
};

export default App;
