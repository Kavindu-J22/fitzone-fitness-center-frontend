import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
  const { authToken, login, logout } = useContext(AuthContext);

  // Function to check if the user is authenticated
  const isAuthenticated = () => !!authToken;

  return {
    authToken,
    isAuthenticated,
    login,
    logout
  };
};

export default useAuth;
