import React from 'react';
import { useApp } from '../context/AppContext';
import Auth from '../pages/Auth';
import CivitasDashboard from '../pages/CivitasDashboard'; // Nama Baru
import SatgasDashboard from '../pages/SatgasDashboard';   // Nama Baru

export default function MainLayout() {
  const { user, role } = useApp();

  // 1. Belum Login -> Ke Auth
  if (!user) return <Auth />;

  // 2. Role Satgas -> Ke Dashboard Satgas
  if (role === 'satgas') return <SatgasDashboard />;

  // 3. Sisanya (Mhs/Dosen/Staf) -> Ke Dashboard Civitas
  return <CivitasDashboard />;
}