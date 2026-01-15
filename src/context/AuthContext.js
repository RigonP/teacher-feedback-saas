import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [apiKey, setApiKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for saved user and API key
    const savedUser = localStorage.getItem('user');
    const savedApiKey = localStorage.getItem('apiKey');
    
    if (savedUser && savedApiKey) {
      setUser(JSON.parse(savedUser));
      setApiKey(savedApiKey);
    }
    setLoading(false);
  }, []);

  const login = (userData, userApiKey) => {
    setUser(userData);
    setApiKey(userApiKey);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('apiKey', userApiKey);
  };

  const logout = () => {
    setUser(null);
    setApiKey(null);
    localStorage.removeItem('user');
    localStorage.removeItem('apiKey');
  };

  const value = {
    user,
    apiKey,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};