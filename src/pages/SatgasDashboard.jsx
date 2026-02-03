import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Bell, LogOut, Users, Activity, Radio, Phone, CheckCircle, Shield, Search, Filter } from 'lucide-react';

export default function SatgasDashboard() {
  const { isSOS, sosStatus, dispatchUnit, stopSOS, logout } = useApp();
  const [tab, setTab] = useState('monitor');

  // Dummy Data Civitas (Dosen, Staf, Mahasiswa)
  const civitasData = [
    { id: '19800101200501', name: 'Dr. Budi Santoso', role: 'Dosen', unit: 'Fasilkom-TI', status: 'Aman' },
    { id: '121401123', name: 'Aryadefa', role: 'Mahasiswa', unit: 'Fasilkom-TI', status: isSOS ? 'DARURAT (SOS)' : 'Aman' },
    { id: '19950520201903', name: 'Siti Aminah, S.Kom', role: 'Staf Tendik', unit: 'Fakultas Hukum', status: 'Aman' },
    { id: '121402099', name: 'Rahmat Hidayat', role: 'Mahasiswa', unit: 'Fakultas Teknik', status: 'Aman' },
    { id: '19751212200002', name: 'Prof. Dr. Hendra', role: 'Dosen', unit: 'Fakultas Kedokteran', status: 'Aman' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      
      {/* --- HEADER (Desain sama dengan Civitas Dashboard) --- */}
      <header className="px-8 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-usu rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-900/20">
             <Shield size={20} />
           </div>
           <div>
             <h1 className="font-bold text-usu text-lg leading-none tracking-tight">UNIT PPK USU</h1>
             <p className="text-[10px] text-slate-500 font-medium">Panel Admin & Monitoring</p>
           </div>
        </div>

        {/* Navigasi Tengah */}
        <nav className="hidden md:flex bg-slate-100 p-1.5 rounded-full">
           <button 
             onClick={() => setTab('monitor')} 
             className={`px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${tab === 'monitor' ? 'bg-white shadow-sm text-usu' : 'text-slate-500 hover:text-slate-700'}`}
           >
             <Activity size={16} /> Monitoring
           </button>
           <button 
             onClick={() => setTab('data')} 
             className={`px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${tab === 'data' ? 'bg-white shadow-sm text-usu' : 'text-slate-500 hover:text-slate-700'}`}
           >
             <Users size={16} /> Data Civitas
           </button>
        </nav>

        {/* Status System & Logout */}
        <div className="flex items-center gap-4">
           <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold border ${isSOS ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-emerald-50 text-emerald-600 border-emerald-200'}`}>
              <div className={`w-2 h-2 rounded-full ${isSOS ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
              {isSOS ? 'ALARM BAHAYA' : 'SISTEM ONLINE'}
           </div>
           <button onClick={logout} className="px-4 py-2 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100 hover:bg-red-100 transition-colors flex items-center gap-2">
             <LogOut size={14} /> Keluar
           </button>
        </div>
      </header>

      {/* --- CONTENT AREA --- */}
      <main className="flex-1 p-6 md:p-8 max-w-[1600px] mx-auto w-full">
        
        {/* Header Halaman */}
        <div className="flex justify-between items-end mb-8">
           <div>
              <h2 className="text-2xl font-bold text-slate-800">
                {tab === 'monitor' ? 'Pusat Komando' : 'Database Civitas Akademika'}
              </h2>
              <p className="text-sm text-slate-500 mt-1">Universitas Sumatera Utara</p>
           </div>
           
           {/* Notifikasi Floating jika ada SOS */}
           {isSOS && (
              <div className="bg-red-600 text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-red-500/30 flex items-center gap-3 animate-bounce">
                 <Radio className="animate-spin" /> DARURAT AKTIF: PERLU TINDAKAN!
              </div>
           )}
        </div>

        {tab === 'monitor' ? (
          <div className="grid grid-cols-12 gap-6 h-[75vh]">
             {/* MAP SECTION */}
             <div className="col-span-12 lg:col-span-8 bg-white rounded-[32px] overflow-hidden relative border border-slate-200 shadow-sm group">
                {/* Gambar Peta Lokal */}
                <img 
                  src="/peta-usu.png" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  alt="Peta Kampus USU" 
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://placehold.co/1200x800?text=Peta+Tidak+Ditemukan";
                  }}
                />
                
                {/* Overlay Info Peta */}
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-2xl shadow-lg border border-white/50">
                  <h4 className="text-xs font-bold text-usu uppercase tracking-wider flex items-center gap-2">
                    <MapPin size={14} /> Area Kampus USU
                  </h4>
                </div>

                {/* PIN LOKASI KORBAN (Hanya muncul jika SOS) */}
                {isSOS && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 cursor-pointer">
                     <div className="bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-bold mb-3 shadow-xl animate-bounce whitespace-nowrap border-2 border-white">
                        SOS: Fasilkom-TI
                     </div>
                     <div className="relative">
                        <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-50 w-full h-full scale-150"></div>
                        <div className="bg-white p-2 rounded-full shadow-2xl relative z-10">
                           <MapPin size={32} className="text-red-600 fill-current" />
                        </div>
                     </div>
                  </div>
                )}
             </div>

             {/* NOTIFICATION / CONTROL PANEL */}
             <div className="col-span-12 lg:col-span-4 flex flex-col h-full">
                <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-200 flex-1 flex flex-col relative overflow-hidden">
                   
                   <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-slate-700 flex items-center gap-2">
                        <Bell size={20} className="text-slate-400" /> Laporan Masuk
                      </h3>
                      <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded-lg">Real-time</span>
                   </div>
                   
                   {isSOS ? (
                     <div className="bg-red-50 border border-red-100 p-6 rounded-3xl relative z-10 flex-1 flex flex-col animate-[slide-up_0.5s]">
                        <div className="flex justify-between items-start mb-4">
                           <span className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-[10px] font-bold border border-red-200 flex items-center gap-1">
                             <Radio size={12} /> URGENT
                           </span>
                           <span className="text-xs text-slate-400 font-medium">Baru saja</span>
                        </div>
                        
                        <h4 className="text-2xl font-black text-slate-800 mb-2 leading-tight">Panggilan Darurat!</h4>
                        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                          Terdeteksi sinyal SOS dari <span className="font-bold text-slate-800">Civitas Akademika</span> di area Fasilkom-TI. Audio lingkungan sedang direkam.
                        </p>

                        <div className="mt-auto space-y-3">
                          {sosStatus === 'ACTIVE' ? (
                            <button 
                              onClick={dispatchUnit} 
                              className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl shadow-xl shadow-red-500/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                            >
                               <Radio size={20} /> KERAHKAN TIM PATROLI
                            </button>
                          ) : (
                            <div className="space-y-3">
                               <div className="bg-emerald-100 text-emerald-800 p-4 rounded-2xl text-xs font-bold text-center border border-emerald-200 flex items-center justify-center gap-2">
                                  <CheckCircle size={18} /> TIM SEDANG MENUJU LOKASI
                               </div>
                               <button 
                                 onClick={stopSOS} 
                                 className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-2xl text-xs transition-colors"
                               >
                                  SELESAIKAN KASUS (RESET)
                               </button>
                            </div>
                          )}
                          
                          <button className="w-full py-3 bg-white border border-slate-200 hover:bg-slate-50 rounded-2xl text-xs font-bold text-slate-600 flex items-center justify-center gap-2 transition-colors">
                             <Phone size={16} /> HUBUNGI PELAPOR
                          </button>
                        </div>
                     </div>
                   ) : (
                     <div className="flex-1 flex flex-col items-center justify-center text-slate-300 opacity-60 border-2 border-dashed border-slate-100 rounded-3xl m-2">
                        <Shield size={64} className="mb-4 text-slate-200" />
                        <p className="text-sm font-bold">Monitoring Aktif</p>
                        <p className="text-xs">Menunggu laporan masuk...</p>
                     </div>
                   )}
                </div>
             </div>
          </div>
        ) : (
          <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 overflow-hidden">
             
             {/* Toolbar Tabel */}
             <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <div className="relative">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                   <input 
                     type="text" 
                     placeholder="Cari NIP/NIM/Nama..." 
                     className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-usu/20 transition-all w-64"
                   />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                   <Filter size={14} /> Filter Unit
                </button>
             </div>

             <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                   <tr>
                     <th className="p-6">Identitas (NIP/NIM)</th>
                     <th className="p-6">Nama Lengkap</th>
                     <th className="p-6">Peran</th>
                     <th className="p-6">Fakultas / Unit</th>
                     <th className="p-6">Status Keamanan</th>
                   </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-50">
                   {civitasData.map((s, i) => (
                     <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-6 font-mono text-slate-500 font-medium">{s.id}</td>
                        <td className="p-6 font-bold text-slate-700">{s.name}</td>
                        <td className="p-6">
                           <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                             s.role === 'Dosen' ? 'bg-purple-50 text-purple-600' :
                             s.role === 'Mahasiswa' ? 'bg-blue-50 text-blue-600' :
                             'bg-orange-50 text-orange-600'
                           }`}>
                             {s.role}
                           </span>
                        </td>
                        <td className="p-6 text-slate-600">{s.unit}</td>
                        <td className="p-6">
                           <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                             s.status.includes('DARURAT') 
                               ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' 
                               : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                           }`}>
                             {s.status}
                           </span>
                        </td>
                     </tr>
                   ))}
                </tbody>
             </table>
             <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                <p className="text-[10px] text-slate-400 font-medium">Menampilkan 5 dari 24.000+ Data Civitas Akademika USU</p>
             </div>
          </div>
        )}
      </main>
    </div>
  );
}