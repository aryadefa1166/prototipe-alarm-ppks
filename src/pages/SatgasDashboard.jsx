import React from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Bell, LogOut, Users, Activity, ShieldAlert } from 'lucide-react';

export default function SatgasDashboard() {
  const { isSOS, logout } = useApp();

  return (
    <div className="min-h-screen flex bg-slate-100 font-sans text-slate-900">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-usu-dark text-white flex flex-col shadow-2xl z-20">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold tracking-tight">SVARNA</h1>
          <p className="text-xs text-green-300 font-medium tracking-wider">SATGAS COMMAND CENTER</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem icon={<Activity />} label="Realtime Monitoring" active />
          <SidebarItem icon={<MapPin />} label="Peta Geofencing" />
          <SidebarItem icon={<Users />} label="Data Mahasiswa" />
          <SidebarItem icon={<ShieldAlert />} label="Laporan Masuk" badge={isSOS ? "1" : "0"} />
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={logout} className="flex items-center gap-3 text-red-300 hover:text-white hover:bg-red-600/20 w-full p-3 rounded-lg transition-all">
            <LogOut size={18} /> 
            <span className="font-medium">Keluar Sistem</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 overflow-hidden flex flex-col h-screen">
        
        {/* HEADER */}
        <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Area Universitas Sumatera Utara</h2>
            <p className="text-sm text-slate-500">Selasa, 3 Februari 2026 • Medan, ID</p>
          </div>
          <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-full border border-slate-200">
            <div className={`w-3 h-3 rounded-full ${isSOS ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
            <span className="text-sm font-bold text-slate-600">SYSTEM {isSOS ? 'ALERT' : 'NORMAL'}</span>
          </div>
        </header>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
          
          {/* MAP AREA (KIRI) */}
          <div className="col-span-8 bg-white rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden group">
            {/* Simulasi Peta */}
            <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
              <div className="text-center opacity-40">
                <MapPin size={48} className="mx-auto mb-2 text-slate-400" />
                <span className="font-bold text-slate-500">[ GOOGLE MAPS API INTEGRATION ]</span>
                <p className="text-xs">Peta Wilayah Kampus USU</p>
              </div>
            </div>
            
            {/* Titik Lokasi Korban (Muncul jika SOS Aktif) */}
            {isSOS && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10">
                <span className="relative flex h-12 w-12">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-12 w-12 bg-danger border-4 border-white shadow-xl items-center justify-center text-white">
                    <ShieldAlert size={20} />
                  </span>
                </span>
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-xl shadow-xl border border-red-100 whitespace-nowrap z-20">
                  <p className="text-xs font-bold text-danger">SOS DETECTED</p>
                  <p className="text-[10px] text-slate-500">Area Perpustakaan</p>
                </div>
              </div>
            )}
          </div>

          {/* NOTIFICATION PANEL (KANAN) */}
          <div className="col-span-4 flex flex-col gap-4">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex-1 flex flex-col">
              <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Bell size={20} className="text-slate-400" /> Live Feed Laporan
              </h3>
              
              {isSOS ? (
                <div className="bg-red-50 border border-red-100 p-5 rounded-2xl animate-[slide-in_0.3s_ease-out] shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-danger text-white text-[10px] font-bold px-2 py-1 rounded tracking-wide">URGENT</span>
                    <span className="text-xs text-red-400 font-mono">Just Now</span>
                  </div>
                  <p className="font-bold text-slate-800 text-lg leading-tight">Sinyal SOS Diterima</p>
                  <div className="mt-3 space-y-1 text-sm text-slate-600">
                    <p>👤 <strong>Mahasiswa:</strong> Aryadefa (121401123)</p>
                    <p>📍 <strong>Lokasi:</strong> Area Perpustakaan USU</p>
                    <p>🔋 <strong>Baterai:</strong> 42%</p>
                  </div>
                  <button className="w-full mt-4 bg-danger text-white py-3 rounded-xl text-sm font-bold shadow-lg shadow-red-500/30 hover:bg-red-700 transition">
                    KERAHKAN UNIT TERDEKAT
                  </button>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-400 border-2 border-dashed border-slate-100 rounded-xl">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                    <Activity size={24} />
                  </div>
                  <p className="text-sm font-medium">Sistem Monitoring Aktif</p>
                  <p className="text-xs opacity-70">Menunggu sinyal masuk...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const SidebarItem = ({ icon, label, active, badge }) => (
  <div className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-white/10 text-white shadow-lg backdrop-blur-sm border border-white/5' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}>
    <div className="flex items-center gap-3">
      {React.cloneElement(icon, { size: 20 })}
      <span className="text-sm font-medium">{label}</span>
    </div>
    {badge && (
      <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg animate-pulse">
        {badge}
      </span>
    )}
  </div>
);