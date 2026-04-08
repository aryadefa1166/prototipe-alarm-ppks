import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Users, ShieldAlert, ArrowRight } from 'lucide-react';

export default function Auth() {
  const { login } = useApp();

  // O(1) Action: Langsung tembak data dummy ke state tanpa validasi
  const handleSimulasiLogin = (role) => {
    const dummyUser = role === 'civitas' 
      ? { id: '121400000', name: 'Civitas Akademika' } // Teks diperbarui
      : { id: '198000000', name: 'Satgas PPK USU' }; // Teks diperbarui
    
    login(dummyUser, role);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-4xl w-full bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* PANEL KIRI: Branding Visual (TEMA HIJAU USU) */}
        <div className="md:w-5/12 bg-slate-900 p-10 text-white flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-600/30 to-slate-900 z-0"></div>
          
          <div className="relative z-10 flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-600/30">
              <Shield size={24} className="text-white" />
            </div>
            <span className="font-bold tracking-widest text-sm text-slate-300">INSTRUMEN PENELITIAN</span>
          </div>

          <div className="relative z-10 mt-auto">
            <h1 className="text-4xl font-black mb-4 leading-tight">
              ALARM <span className="text-emerald-500">PPK.</span>
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Sistem Pelaporan Kekerasan Seksual Berbasis Alarm Digital Respons Langsung.
            </p>
            
            <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span>Aman</span>
              <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
              <span>Rahasia</span>
              <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
              <span>Satu Sentuhan</span>
            </div>
          </div>
        </div>

        {/* PANEL KANAN: Tombol Bypass Simulasi */}
        <div className="md:w-7/12 p-10 md:p-14 bg-white flex flex-col justify-center">
          <div className="mb-10 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-400">
              <Shield size={32} />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">
              Pilih Peran Simulasi
            </h2>
            <p className="text-slate-500 text-sm px-4">
              Silakan pilih sudut pandang yang ingin Anda uji coba pada purwarupa ini.
            </p>
          </div>

          <div className="space-y-4">
            {/* Tombol Login Mahasiswa/Civitas (Tema Hijau) */}
            <button 
              onClick={() => handleSimulasiLogin('civitas')}
              className="w-full bg-white border-2 border-slate-100 hover:border-emerald-200 hover:bg-emerald-50 text-slate-700 p-5 rounded-2xl transition-all flex items-center text-left group"
            >
              <div className="w-12 h-12 bg-slate-100 group-hover:bg-emerald-100 rounded-xl flex items-center justify-center text-slate-500 group-hover:text-emerald-600 transition-colors mr-4">
                <Users size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-800 group-hover:text-emerald-700 text-lg">Civitas Akademika</h3>
                <p className="text-xs text-slate-500">Simulasi sebagai pelapor (Korban/Saksi)</p>
              </div>
              <ArrowRight size={20} className="text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
            </button>

            {/* Tombol Login Admin Satgas */}
            <button 
              onClick={() => handleSimulasiLogin('satgas')}
              className="w-full bg-white border-2 border-slate-100 hover:border-slate-800 hover:bg-slate-900 text-slate-700 hover:text-white p-5 rounded-2xl transition-all flex items-center text-left group shadow-sm hover:shadow-xl"
            >
              <div className="w-12 h-12 bg-slate-100 group-hover:bg-slate-800 rounded-xl flex items-center justify-center text-slate-500 group-hover:text-white transition-colors mr-4">
                <ShieldAlert size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-800 group-hover:text-white text-lg">Satgas PPK</h3>
                <p className="text-xs text-slate-500 group-hover:text-slate-300">Simulasi penerima respons langsung</p>
              </div>
              <ArrowRight size={20} className="text-slate-300 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </button>
          </div>

          <p className="text-center text-[10px] text-slate-400 mt-12 font-medium uppercase tracking-widest">
            Hanya Untuk Keperluan Penelitian PKM
          </p>
        </div>
      </div>
    </div>
  );
}