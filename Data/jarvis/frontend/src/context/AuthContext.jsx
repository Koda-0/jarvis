import { createContext, useContext, useState } from 'react';
import { login as apiLogin, logout as apiLogout, getStoredUser } from '../services/authService';

const Ctx = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(getStoredUser);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await apiLogin(email, password);
      setUser({ email, role: 'admin', name: 'Administrator' });
      return data;
    } finally { setLoading(false); }
  };

  const logout = () => { apiLogout(); setUser(null); };

  return (
    <Ctx.Provider value={{ user, login, logout, loading, isAuth: !!user }}>
      {children}
    </Ctx.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
