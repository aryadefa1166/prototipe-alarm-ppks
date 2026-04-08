import React, { useState, useEffect } from 'react';
import { Shield, Phone, Mic, Navigation } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CivitasDashboard() {
  const { user, isSOS, sosStatus, triggerSOS, stopSOS, logout } = useApp();
  const [countdown, setCountdown] = useState(3);
  const [isCounting, setIsCounting] = useState(false);

  const startSequence = () => {
    setIsCounting(true);
    setCountdown(3);
  };

  useEffect(() => {
    let timer;
    if (isCounting && countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    } else if (isCounting && countdown === 0) {
      setIsCounting(false);
      triggerSOS();
    }
    return () => clearTimeout(timer);
  }, [isCounting, countdown]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      {/* --- DESKTOP HEADER (TEMA HIJAU USU) --- */}
      <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-emerald-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-700/20">
             <Shield size={20} />
           </div>
           <div>
             <h1 className="font-black text-slate-800 text-lg leading-none tracking-tight">ALARM PPK</h1>
             <p className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider mt-0.5">Sistem Pelaporan Darurat</p>
           </div>
        </div>

        {/* PROFIL & LOGOUT DI KANAN */}
        <div className="flex items-center gap-4">
           <span className="text-sm font-bold text-slate-600">Halo, {user?.name || 'Civitas Akademika'}</span>
           <button 
             onClick={logout} 
             className="px-4 py-2 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100 hover:bg-red-100 transition-colors"
           >
             Keluar
           </button>
        </div>
      </header>

      {/* --- MOBILE HEADER --- */}
      <div className="md:hidden flex justify-between items-center p-5 bg-white/90 backdrop-blur-md sticky top-0 z-40 shadow-sm">
         <div className="flex items-center gap-2">
            <Shield className="text-emerald-700" size={24} />
            <span className="font-black text-slate-800 text-lg tracking-tight">ALARM PPK</span>
         </div>
         <button onClick={logout} className="text-xs font-bold text-slate-400 hover:text-red-600 transition-colors">Keluar</button>
      </div>

      {/* --- MAIN CONTENT (SINGLE VIEW) --- */}
      <main className="flex-1 p-4 pb-8 flex justify-center items-center">
        <div className="w-full max-w-2xl animate-[fade-in_0.3s]">
           
           {isCounting ? (
             <div className="min-h-[60vh] flex flex-col items-center justify-center text-center animate-pulse">
               <div className="text-[120px] font-black text-red-500 leading-none mb-6 drop-shadow-xl">{countdown}</div>
               <h2 className="text-xl font-bold text-slate-700 mb-8">Tekan Batal jika salah</h2>
               <button 
                 onClick={() => setIsCounting(false)} 
                 className="px-10 py-4 bg-slate-200 rounded-full font-bold text-slate-600 text-lg hover:bg-slate-300 transition-colors shadow-sm"
               >
                 BATALKAN
               </button>
             </div>
           ) : isSOS ? (
             <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
                <div className={`w-full p-8 rounded-[40px] border-4 relative overflow-hidden shadow-2xl ${sosStatus === 'DISPATCHED' ? 'bg-emerald-50 border-emerald-500 shadow-emerald-500/20' : 'bg-red-50 border-red-500 shadow-red-500/20'}`}>
                   
                   <div className={`absolute top-0 left-0 w-full bg-white/60 backdrop-blur-sm p-2 text-xs font-black uppercase tracking-widest ${sosStatus === 'DISPATCHED' ? 'text-emerald-700' : 'text-red-600'}`}>
                      {sosStatus === 'DISPATCHED' ? 'SATGAS MENUJU LOKASI' : 'SINYAL DARURAT AKTIF'}
                   </div>

                   <div className="mt-8 mb-6">
                      {sosStatus === 'DISPATCHED' ? (
                         <div className="w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto shadow-xl animate-bounce border-4 border-emerald-200">
                            <Navigation size={48} />
                         </div>
                      ) : (
                         <div className="w-32 h-32 bg-red-500 rounded-full flex items-center justify-center text-white mx-auto shadow-xl animate-pulse border-4 border-red-200">
                            <Mic size={48} />
                         </div>
                      )}
                   </div>

                   <h2 className={`text-2xl font-black mb-2 tracking-tight ${sosStatus === 'DISPATCHED' ? 'text-emerald-700' : 'text-red-600'}`}>
                      {sosStatus === 'DISPATCHED' ? 'BANTUAN DATANG!' : 'MEREKAM SUARA...'}
                   </h2>
                   <p className="text-slate-600 text-sm mb-8 px-4 font-medium leading-relaxed">
                      {sosStatus === 'DISPATCHED' 
                        ? 'Petugas Satgas PPK telah menerima lokasi Anda dan sedang bergerak cepat menuju titik koordinat.' 
                        : 'Lokasi Anda disiarkan live ke Tim Satgas PPK. Jangan matikan perangkat.'}
                   </p>

                   <div className="flex flex-col gap-3">
                      <button className="w-full py-4 bg-white border-2 border-slate-100 rounded-2xl font-bold text-slate-700 flex items-center justify-center gap-2 shadow-sm hover:bg-slate-50 transition-colors">
                         <Phone size={18} /> Hubungi CS Satgas
                      </button>
                      <button 
                        onClick={stopSOS} 
                        className="w-full py-4 bg-slate-800 hover:bg-slate-900 text-white rounded-2xl font-bold shadow-lg transition-colors active:scale-95"
                      >
                         SAYA SUDAH AMAN / BATALKAN
                      </button>
                   </div>
                </div>
             </div>
           ) : (
             <div className="flex flex-col items-center pt-8">
                <h2 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">Butuh Bantuan?</h2>
                <p className="text-slate-500 text-sm mb-12 px-8 text-center leading-relaxed font-medium">
                  Tekan tombol di bawah saat darurat. <br/>
                  <span className="text-red-600 font-bold">Audio lingkungan akan direkam otomatis sebagai bukti.</span>
                </p>

                <div className="relative mb-12">
                   {/* Efek Ping (Riak Air) */}
                   <div className="absolute inset-0 bg-red-200 rounded-full animate-ping opacity-30"></div>
                   
                   {/* Tombol SOS Utama (TETAP MERAH) */}
                   <button 
                     onClick={startSequence} 
                     className="w-64 h-64 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-[0_20px_60px_rgba(220,38,38,0.4)] flex flex-col items-center justify-center text-white active:scale-95 transition-transform border-4 border-white/30 relative z-10"
                   >
                      <Shield size={64} className="mb-2" />
                      <span className="text-4xl font-black tracking-[0.15em] ml-2">SOS</span>
                      <span className="text-[10px] font-bold mt-2 opacity-90 bg-black/20 px-3 py-1 rounded-full uppercase tracking-widest border border-white/10">
                        Akan aktif dalam 3 detik
                      </span>
                   </button>
                </div>
             </div>
           )}
        </div>
      </main>
    </div>
  );
}