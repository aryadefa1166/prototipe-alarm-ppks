import React from 'react';
import { Shield, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Login = () => {
  const { login } = useApp();

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-usu to-usu-dark">
      <div className="bg-white/95 backdrop-blur-md w-full max-w-sm rounded-3xl p-8 shadow-2xl border border-white/20 animate-[fade-in_0.5s_ease-out]">
        
        {/* Header Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-usu rounded-2xl flex items-center justify-center shadow-lg mb-4 transform rotate-3 hover:rotate-0 transition-all duration-300">
            <Shield className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-usu-dark tracking-tight">SVARNA</h1>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mt-1">Sistem Keamanan Terpadu</p>
        </div>

        {/* Pilihan Login */}
        <div className="space-y-4">
          <p className="text-sm text-gray-400 text-center mb-2">Pilih akses masuk:</p>
          
          {/* Tombol Mahasiswa */}
          <button 
            onClick={() => login('mhs')}
            className="group w-full p-4 bg-gray-50 hover:bg-white border border-gray-200 hover:border-usu rounded-2xl flex items-center justify-between transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div className="text-left">
              <span className="block font-bold text-gray-800 group-hover:text-usu transition-colors">Mahasiswa</span>
              <span className="text-[10px] text-gray-500">Masuk dengan Portal USU</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-200 group-hover:bg-usu group-hover:text-white flex items-center justify-center transition-all">
              <ArrowRight size={16} />
            </div>
          </button>

          {/* Tombol Satgas */}
          <button 
            onClick={() => login('satgas')}
            className="group w-full p-4 bg-gray-50 hover:bg-white border border-gray-200 hover:border-usu rounded-2xl flex items-center justify-between transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div className="text-left">
              <span className="block font-bold text-gray-800 group-hover:text-usu transition-colors">Satgas PPKS</span>
              <span className="text-[10px] text-gray-500">Dashboard Monitoring</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-200 group-hover:bg-usu group-hover:text-white flex items-center justify-center transition-all">
              <ArrowRight size={16} />
            </div>
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-gray-400">© 2026 Universitas Sumatera Utara</p>
        </div>
      </div>
    </div>
  );
};

export default Login;