'use client'; // 👈 Must be the first line

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isOwner: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    // Check local storage safely
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('isOwner');
      
      if (stored === 'true') {
        // 👇 THE FIX: Wrap in setTimeout to avoid the "synchronous" error.
        // This pushes the update to the next render cycle, keeping React happy.
        setTimeout(() => {
          setIsOwner(true);
        }, 0);
      }
    }
  }, []);

  const login = () => {
    setIsOwner(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('isOwner', 'true');
    }
  };

  const logout = () => {
    setIsOwner(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isOwner');
    }
  };

  return (
    <AuthContext.Provider value={{ isOwner, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}