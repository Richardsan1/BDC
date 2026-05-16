import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { auth as authApi, getToken, setToken, clearToken } from '../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  const carregarSessao = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setUsuario(null);
      setCarregando(false);
      return;
    }
    try {
      const data = await authApi.me();
      setUsuario(data.usuario || data);
    } catch {
      clearToken();
      setUsuario(null);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarSessao();
  }, [carregarSessao]);

  const login = async (email, senha) => {
    const data = await authApi.login({ email, senha });
    if (data.token) setToken(data.token);
    setUsuario(data.usuario);
    return data.usuario;
  };

  const registrar = async (payload) => {
    return authApi.register(payload);
  };

  const sair = async () => {
    try {
      await authApi.logout();
    } catch {
      // ignora
    }
    clearToken();
    setUsuario(null);
  };

  const value = { usuario, carregando, login, registrar, sair, recarregar: carregarSessao };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
}
