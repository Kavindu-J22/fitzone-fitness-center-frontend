import React, { createContext, useState, useEffect } from 'react';

// Create context
export const RoleContext = createContext();

// RoleProvider component that wraps your app
export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  // Check if role is available in localStorage on initial load
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const setUserRole = (role) => {
    setRole(role);
    localStorage.setItem('role', role); // Store role in localStorage
  };

  const removeUserRole = () => {
    setRole(null);
    localStorage.removeItem('role'); // Remove role from localStorage
  };

  return (
    <RoleContext.Provider value={{ role, setUserRole, removeUserRole }}>
      {children}
    </RoleContext.Provider>
  );
};
