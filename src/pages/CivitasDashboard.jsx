import React, { useState, useEffect } from 'react';
import { Shield, Phone, Mic, Navigation } from 'lucide-react'; // MapPin dihapus
import { useApp } from '../context/AppContext';

// Komponen Fitur (DIBIARKAN, TAPI DISEMBUNYIKAN DARI NAVBAR)
import EduBot from '../components/Features/EduBot';
import ForumFeed from '../components/Features/ForumFeed';

export default function CivitasDashboard() {
  const { user, isSOS, sosStatus, triggerSOS, stopSOS, logout } = useApp();
  const [activeTab, setActiveTab] = useState('home');

  const [countdown, setCountdown] = useState(3);
  const [isCounting, setIsCounting] = useState(false);

  const startSequence = () => {
    setIsCounting(true);
    setCountdown(3);
  };

  useEffect(() => {
    let timer;
    if (isCounting && countdown > 0) timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    else if (isCounting && countdown === 0) {
      setIsCounting(false);
      triggerSOS();
    }
    return () => clearTimeout(timer);
  }, [isCounting, countdown]);

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <HomeTab isCounting={isCounting} countdown={countdown} startSequence={startSequence} cancelSequence={() => setIsCounting(false)} isSOS={isSOS} sosStatus={sosStatus} stopSOS={stopSOS} user={user} />;
      // Fitur disembunyikan tapi komponen tetap ada di codebase, MapTab dihapus
      case 'bot': return <EduBot />;
      case 'forum': return <ForumFeed />;
      default: return null;
    }
  };

  const getTabLabel = (tab) => {
    if (tab === 'home') return 'Beranda';
    return tab.charAt(0).toUpperCase() + tab.slice(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      {/* --- DESKTOP NAVBAR --- */}
      <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white"><Shield /></div>
           <div>
             <h1 className="font-bold text-slate-800 text-lg leading-none">ALARM PPKS</h1>
             <p className="text-[10px] text-slate-500">Sistem Pelaporan Darurat</p>
           </div>
        </div>
        <nav className="flex bg-slate-100 p-1 rounded-full">
           {/* HANYA MENAMPILKAN HOME */}
           {['home'].map(t => (
             <button key={t} onClick={() => setActiveTab(t)} className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === t ? 'bg-white shadow text-red-600' : 'text-slate-500 hover:text-slate-700'}`}>
               {getTabLabel(t)}
             </button>
           ))}
        </nav>
        <div className="flex items-center gap-4">
           <span className="text-sm font-medium text-slate-600">Halo, {user?.name || 'Civitas'}</span>
           <button onClick={logout} className="px-4 py-2 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100 hover:bg-red-100">Keluar</button>
        </div>
      </header>

      {/* --- MOBILE HEADER --- */}
      <div className="md:hidden flex justify-between items-center p-5 bg-white sticky top-0 z-40 shadow-sm">
         <div className="flex items-center gap-2">
            <Shield className="text-red-600" size={24} />
            <span className="font-bold text-slate-800 text-lg">ALARM PPKS</span>
         </div>
         <button onClick={logout} className="text-xs font-bold text-slate-400">Keluar</button>
      </div>

      <main className="flex-1 p-4 pb-24 md:pb-8 flex justify-center">
        <div className="w-full max-w-2xl animate-[fade-in_0.3s]">
           {renderContent()}
        </div>
      </main>

      {/* --- MOBILE NAVBAR (HANYA 1 MENU) --- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex justify-center z-50 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <NavIcon icon={<Shield />} label="Beranda" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
      </div>
    </div>
  );
}

// --- SUB KOMPONEN ---

const HomeTab = ({ isCounting, countdown, startSequence, cancelSequence, isSOS, sosStatus, stopSOS, user }) => {
  if (isCounting) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center animate-pulse">
      <div className="text-[120px] font-black text-red-500 leading-none mb-6">{countdown}</div>
      <h2 className="text-xl font-bold text-slate-700 mb-8">Tekan Batal jika salah</h2>
      <button onClick={cancelSequence} className="px-10 py-4 bg-slate-200 rounded-full font-bold text-slate-600 text-lg hover:bg-slate-300 transition">
        BATALKAN
      </button>
    </div>
  );

  if (isSOS) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
       <div className={`w-full p-8 rounded-[40px] border-4 relative overflow-hidden ${sosStatus === 'DISPATCHED' ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
          <div className="absolute top-0 left-0 w-full bg-white/50 backdrop-blur p-2 text-xs font-bold uppercase tracking-widest">
             {sosStatus === 'DISPATCHED' ? 'SATGAS MENUJU LOKASI' : 'SINYAL DARURAT AKTIF'}
          </div>

          <div className="mt-8 mb-6">
             {sosStatus === 'DISPATCHED' ? (
                <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto shadow-xl animate-bounce">
                   <Navigation size={48} />
                </div>
             ) : (
                <div className="w-32 h-32 bg-red-500 rounded-full flex items-center justify-center text-white mx-auto shadow-xl animate-pulse">
                   <Mic size={48} />
                </div>
             )}
          </div>

          <h2 className={`text-2xl font-black mb-2 ${sosStatus === 'DISPATCHED' ? 'text-green-700' : 'text-red-600'}`}>
             {sosStatus === 'DISPATCHED' ? 'BANTUAN DATANG!' : 'MEREKAM SUARA...'}
          </h2>
          <p className="text-slate-600 text-sm mb-8 px-4">
             {sosStatus === 'DISPATCHED' 
               ? 'Petugas Satgas PPKS telah menerima lokasi Anda dan sedang bergerak.' 
               : 'Lokasi Anda disiarkan live ke Tim Satgas PPKS. Jangan matikan HP.'}
          </p>

          <div className="flex flex-col gap-3">
             <button className="w-full py-4 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 flex items-center justify-center gap-2 shadow-sm">
                <Phone size={18} /> Hubungi CS Satgas
             </button>
             <button onClick={stopSOS} className="w-full py-4 bg-slate-800 text-white rounded-xl font-bold shadow-lg">
                SAYA SUDAH AMAN
             </button>
          </div>
       </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center pt-12">
       <h2 className="text-2xl font-bold text-slate-800 mb-3">Butuh Bantuan?</h2>
       <p className="text-slate-500 text-sm mb-12 px-8 text-center leading-relaxed">
         Tekan tombol di bawah saat darurat. <br/>
         <span className="font-medium text-red-500">Audio lingkungan akan direkam otomatis sebagai bukti.</span>
       </p>

       <div className="relative mb-12">
          <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-20"></div>
          <button 
            onClick={startSequence} 
            className="w-64 h-64 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-[0_20px_60px_rgba(220,38,38,0.4)] flex flex-col items-center justify-center text-white active:scale-95 transition-transform border-4 border-white/20 relative z-10"
          >
             <Shield size={64} className="mb-2" />
             <span className="text-3xl font-black tracking-[0.2em]">SOS</span>
             <span className="text-[10px] font-medium mt-1 opacity-90 bg-black/10 px-3 py-1 rounded-full">
               Akan aktif dalam 3 detik
             </span>
          </button>
       </div>
    </div>
  );
};

const NavIcon = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 p-2 w-20 ${active ? 'text-red-600' : 'text-slate-300'}`}>
    {React.cloneElement(icon, { size: 24, strokeWidth: active ? 2.5 : 2 })}
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);