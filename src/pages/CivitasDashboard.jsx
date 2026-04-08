import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AlertCircle, Mic, MapPin, LogOut, Fingerprint } from 'lucide-react';

export default function CivitasDashboard() {
  const { isSOS, sosStatus, triggerSOS, logout } = useApp();
  const [holdProgress, setHoldProgress] = useState(0);
  let holdTimer = null;

  // Logika O(1): Timer untuk mencegah false-alarm (Tekan & Tahan)
  const handleTouchStart = () => {
    if (isSOS) return;
    setHoldProgress(0);
    holdTimer = setInterval(() => {
      setHoldProgress((prev) => {
        if (prev >= 100) {
          clearInterval(holdTimer);
          triggerSOS();
          return 100;
        }
        return prev + 5; // Durasi hold disimulasikan sekitar 2 detik
      });
    }, 100);
  };

  const handleTouchEnd = () => {
    clearInterval(holdTimer);
    if (!isSOS) setHoldProgress(0);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* HEADER MINIMALIS */}
      <header className="p-6 bg-white/80 backdrop-blur-md flex justify-between items-center shadow-sm z-10 sticky top-0">
        <div>
          <h1 className="font-black text-xl text-slate-800 tracking-tight">ALARM PPKS.</h1>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Mode Pelaporan Darurat</p>
        </div>
        <button onClick={logout} className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors font-bold text-xs flex items-center gap-2">
          <LogOut size={16} /> Keluar
        </button>
      </header>

      {/* KONTEN UTAMA: FOKUS PADA TOMBOL */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        
        {/* Efek Visual Saat Darurat Aktif */}
        {isSOS && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-red-500/20 rounded-full animate-ping"></div>
          </div>
        )}

        {/* Indikator Latar Belakang (GPS & Audio) */}
        <div className="mb-12 flex gap-3 relative z-10">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm text-xs font-bold ${isSOS ? 'bg-red-50 border-red-200 text-red-600 animate-pulse' : 'bg-white border-slate-200 text-slate-600'}`}>
            <MapPin size={14} /> GPS Aktif
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm text-xs font-bold ${isSOS ? 'bg-red-50 border-red-200 text-red-600 animate-pulse' : 'bg-white border-slate-200 text-slate-600'}`}>
            <Mic size={14} /> Rekam Audio Siaga
          </div>
        </div>

        {/* TOMBOL RAKSASA (PANIC BUTTON) */}
        <div className="relative z-10 flex flex-col items-center">
          <button
            onMouseDown={handleTouchStart}
            onMouseUp={handleTouchEnd}
            onMouseLeave={handleTouchEnd}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className={`w-64 h-64 md:w-72 md:h-72 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-300 relative overflow-hidden group border-4 ${
              isSOS 
                ? 'bg-red-600 border-red-400 scale-110 shadow-red-500/50 cursor-default' 
                : 'bg-slate-900 border-slate-700 hover:bg-slate-800 active:scale-95 shadow-slate-900/30'
            }`}
          >
            {/* Animasi Loading saat ditahan */}
            {!isSOS && (
              <div 
                className="absolute bottom-0 left-0 w-full bg-red-600 transition-all duration-100 ease-linear"
                style={{ height: `${holdProgress}%` }}
              ></div>
            )}

            <div className="relative z-10 flex flex-col items-center">
               {isSOS ? (
                 <>
                   <AlertCircle size={64} className="text-white mb-2 animate-spin-slow" />
                   <span className="text-2xl font-black text-white tracking-widest">DARURAT</span>
                   <span className="text-white/90 text-xs mt-2 font-bold bg-red-800/50 px-3 py-1 rounded-full">Sinyal Terkirim</span>
                 </>
               ) : (
                 <>
                   <Fingerprint size={72} className="text-white mb-2 opacity-80" />
                   <span className="text-xl font-black text-white tracking-widest mt-2">TEKAN TAHAN</span>
                   <span className="text-slate-300 text-[10px] mt-2 font-medium uppercase tracking-widest">Untuk Kirim Sinyal SOS</span>
                 </>
               )}
            </div>
          </button>
        </div>

        {/* PESAN STATUS */}
        <div className="mt-16 text-center max-w-sm relative z-10 bg-white/60 backdrop-blur p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h2 className={`text-lg font-black mb-2 uppercase tracking-wide ${isSOS ? 'text-red-600' : 'text-slate-800'}`}>
            {isSOS 
              ? (sosStatus === 'DISPATCHED' ? 'Tim Satgas Menuju Lokasi!' : 'Mencari Bantuan...') 
              : 'Sistem Siaga Melindungi'}
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            {isSOS 
              ? 'Sistem sedang merekam audio sekitar dan mengirimkan koordinat Anda ke Satgas PPKS secara real-time. Identitas Anda aman.'
              : 'Sistem merahasialkan identitas Anda. Jika Anda atau rekan Anda dalam bahaya, tekan dan tahan tombol di atas.'}
          </p>
        </div>
      </main>
    </div>
  );
}