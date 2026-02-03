import React, { useState, useEffect } from 'react';
import { Shield, MapPin, MessageSquare, Users, Bell, Menu, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function StudentDashboard() {
  const { isSOS, triggerSOS, cancelSOS, activeTab, setActiveTab, logout } = useApp();
  const [pressCount, setPressCount] = useState(0);

  // --- LOGIKA HARDWARE TRIGGER (Tombol 'P' 5x) ---
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key.toLowerCase() === 'p') setPressCount(prev => prev + 1);
    };
    window.addEventListener('keydown', handleKey);
    
    // Jika tekan 5x, aktifkan SOS & reset
    if (pressCount >= 5) {
      triggerSOS();
      setPressCount(0);
    }

    // Reset hitungan jika tidak tekan lagi dalam 2 detik
    const timer = setTimeout(() => setPressCount(0), 2000);
    return () => {
      window.removeEventListener('keydown', handleKey);
      clearTimeout(timer);
    }
  }, [pressCount]);

  // --- KOMPONEN KONTEN BERDASARKAN TAB ---
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab isSOS={isSOS} triggerSOS={triggerSOS} cancelSOS={cancelSOS} />;
      case 'map':
        return <PlaceholderTab title="Peta Rawan" icon={<MapPin size={48} />} desc="Peta panas (heatmap) area rawan kekerasan seksual di USU." />;
      case 'bot':
        return <PlaceholderTab title="Edu-Bot" icon={<MessageSquare size={48} />} desc="Chatbot AI untuk konsultasi hukum & psikologis awal." />;
      case 'forum':
        return <PlaceholderTab title="Forum Komunitas" icon={<Users size={48} />} desc="Laporan warga kampus tentang kondisi keamanan terkini." />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* --- RESPONSIVE NAVBAR --- */}
      {/* Tampil di Desktop (Top Nav) */}
      <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-usu p-2 rounded-lg text-white"><Shield size={24} /></div>
          <div>
            <h1 className="font-bold text-usu text-lg">SVARNA</h1>
            <p className="text-xs text-gray-500">Mahasiswa View</p>
          </div>
        </div>
        
        {/* Menu Tengah Desktop */}
        <nav className="flex gap-8">
          <NavText label="Beranda" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <NavText label="Peta Rawan" active={activeTab === 'map'} onClick={() => setActiveTab('map')} />
          <NavText label="Edu-Bot" active={activeTab === 'bot'} onClick={() => setActiveTab('bot')} />
          <NavText label="Forum" active={activeTab === 'forum'} onClick={() => setActiveTab('forum')} />
        </nav>

        <button onClick={logout} className="text-sm font-medium text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition">
          Keluar
        </button>
      </header>

      {/* Tampil di Mobile (Top Header Sederhana) */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white shadow-sm sticky top-0 z-40">
        <span className="font-bold text-usu">SVARNA</span>
        <button onClick={logout} className="text-xs text-gray-400">Keluar</button>
      </div>


      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 bg-slate-50 p-4 md:p-8 flex justify-center">
        <div className="w-full max-w-4xl animate-[fade-in_0.3s_ease-out]">
          {renderContent()}
        </div>
      </main>


      {/* --- MOBILE BOTTOM NAV (Hanya tampil di layar kecil) --- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-between z-50 pb-safe">
        <NavIcon icon={<Shield />} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
        <NavIcon icon={<MapPin />} label="Peta" active={activeTab === 'map'} onClick={() => setActiveTab('map')} />
        <NavIcon icon={<MessageSquare />} label="Bot" active={activeTab === 'bot'} onClick={() => setActiveTab('bot')} />
        <NavIcon icon={<Users />} label="Forum" active={activeTab === 'forum'} onClick={() => setActiveTab('forum')} />
      </div>
      
    </div>
  );
}

// --- SUB-COMPONENTS (Agar kode rapi) ---

const HomeTab = ({ isSOS, triggerSOS, cancelSOS }) => (
  <div className="flex flex-col items-center justify-center min-h-[70vh] md:min-h-[60vh] text-center">
    {isSOS ? (
      // TAMPILAN SAAT SOS AKTIF
      <div className="w-full max-w-md bg-red-50 border-2 border-red-100 rounded-3xl p-8 animate-pulse">
        <div className="w-32 h-32 bg-danger rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-[0_0_50px_rgba(255,59,48,0.5)]">
          <Shield size={64} />
        </div>
        <h2 className="text-3xl font-black text-danger mb-2">DARURAT!</h2>
        <p className="text-gray-600 mb-8">Lokasi Anda sedang disiarkan ke Satgas PPKS & Pengguna sekitar.</p>
        
        <div className="flex flex-col gap-3">
          <button className="w-full py-4 bg-white border border-red-200 text-danger font-bold rounded-xl shadow-sm">
            📞 Hubungi Admin (0812...)
          </button>
          <button onClick={cancelSOS} className="w-full py-4 bg-danger text-white font-bold rounded-xl shadow-lg hover:bg-red-700 transition">
            BATALKAN LAPORAN
          </button>
        </div>
      </div>
    ) : (
      // TAMPILAN NORMAL (STANDBY)
      <div className="w-full max-w-lg">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Apakah Anda dalam Bahaya?</h2>
          <p className="text-slate-500">Tekan tombol di bawah atau tekan 'P' 5x di keyboard.</p>
        </div>

        <button 
          onClick={triggerSOS}
          className="group relative w-64 h-64 mx-auto rounded-full bg-white shadow-2xl flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
        >
          {/* Efek Pinggiran */}
          <div className="absolute inset-0 rounded-full border-[8px] border-red-50 group-hover:border-red-100 transition-colors"></div>
          
          {/* Tombol Merah Inti */}
          <div className="w-52 h-52 bg-gradient-to-b from-red-500 to-danger rounded-full flex flex-col items-center justify-center text-white shadow-inner group-hover:shadow-[0_20px_60px_rgba(255,59,48,0.4)] transition-shadow">
            <Shield size={64} className="mb-2" />
            <span className="text-3xl font-black tracking-widest">SOS</span>
          </div>
        </button>

        <div className="mt-10 grid grid-cols-2 gap-4">
          <InfoCard label="Status Kampus" value="Aman" color="text-green-600" bg="bg-green-50" />
          <InfoCard label="Satgas Aktif" value="8 Orang" color="text-blue-600" bg="bg-blue-50" />
        </div>
      </div>
    )}
  </div>
);

const PlaceholderTab = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-6">
      {icon}
    </div>
    <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
    <p className="text-gray-500 max-w-md">{desc}</p>
    <div className="mt-8 px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg text-sm font-medium border border-yellow-200">
      Fitur ini dalam tahap pengembangan (Prototype)
    </div>
  </div>
);

const NavIcon = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${active ? 'text-usu font-bold' : 'text-gray-400 hover:bg-gray-50'}`}>
    {React.cloneElement(icon, { size: 24, strokeWidth: active ? 3 : 2 })}
    <span className="text-[10px]">{label}</span>
  </button>
);

const NavText = ({ label, active, onClick }) => (
  <button 
    onClick={onClick} 
    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${active ? 'bg-usu/10 text-usu' : 'text-gray-500 hover:text-usu hover:bg-gray-50'}`}
  >
    {label}
  </button>
);

const InfoCard = ({ label, value, color, bg }) => (
  <div className={`p-4 rounded-2xl ${bg} flex flex-col items-center justify-center`}>
    <span className="text-xs text-gray-500 mb-1">{label}</span>
    <span className={`font-bold text-lg ${color}`}>{value}</span>
  </div>
);