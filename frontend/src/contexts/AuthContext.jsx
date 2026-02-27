import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const navigate = useNavigate();

  function signIn(newToken) {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  }

  function signOut() {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/');
  }

  return (
    <AuthContext.Provider value={{ token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
