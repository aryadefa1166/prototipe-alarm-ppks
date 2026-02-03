import React from 'react';
import { useApp } from '../context/AppContext';
import MobileView from '../pages/MobileView';
import SatgasDashboard from '../pages/SatgasDashboard';
import Login from '../pages/Login';

const MainLayout = () => {
  const { role } = useApp();

  // 1. Belum Login
  if (!role) return <Login />;

  // 2. Role Mahasiswa (Responsive Layout)
  if (role === 'mhs') {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        {/* Tidak ada frame HP lagi, langsung render komponen responsif */}
        <MobileView />
      </div>
    );
  }

  // 3. Role Satgas (Full Dashboard)
  if (role === 'satgas') {
    return <SatgasDashboard />;
  }

  return null;
};

export default MainLayout;