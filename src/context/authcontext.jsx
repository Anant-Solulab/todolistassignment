import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Signup method
  const signup = (email, password) => {
    localStorage.setItem('user', JSON.stringify({ email, password }));  
    setUser({ email, password });  
    setIsAuthenticated(true);  
  };

  // Login method
  const login = (email, password) => {
    const savedUser = JSON.parse(localStorage.getItem('user'));  
    if (savedUser && savedUser.email === email && savedUser.password === password) {
      setUser(savedUser);  
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');  
    }
  };

  // Logout method
  const logout = () => {
    localStorage.removeItem('user'); 
    setUser(null);  
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout,signup }}>
      {children}
    </AuthContext.Provider>
  );
};