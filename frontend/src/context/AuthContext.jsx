import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      // Decode token or fetch user details here if needed. 
      // For simplicity, we stored user details in localStorage too.
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await axios.post(
        "https://taskplanet-social-zi9m.onrender.com/api/auth/login",
        { email, password },
      );
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      return true;
    } catch (err) {
      console.error('Login error', err.response?.data?.message || err.message);
      throw err;
    }
  };

  const signup = async (username, email, password) => {
    try {
      await axios.post(
        "https://taskplanet-social-zi9m.onrender.com/api/auth/signup",
        { username, email, password },
      );
      return true;
    } catch (err) {
      console.error('Signup error', err.response?.data?.message || err.message);
      throw err;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
