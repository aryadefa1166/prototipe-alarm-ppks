import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // State untuk Role (null = belum login, 'mhs' = mahasiswa, 'satgas' = admin)
  const [role, setRole] = useState(null); 
  
  // State untuk Status Darurat (SOS)
  const [isSOS, setIsSOS] = useState(false);
  
  // State untuk Tab Navigasi di Mobile
  const [activeTab, setActiveTab] = useState('home');

  // Login & Logout Logic
  const login = (selectedRole) => setRole(selectedRole);
  const logout = () => {
    setRole(null);
    setIsSOS(false);
    setActiveTab('home');
  };
  
  // SOS Logic
  const triggerSOS = () => setIsSOS(true);
  const cancelSOS = () => setIsSOS(false);

  return (
    <AppContext.Provider value={{ 
      role, 
      isSOS, 
      activeTab, 
      setActiveTab, 
      login, 
      logout, 
      triggerSOS, 
      cancelSOS 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);