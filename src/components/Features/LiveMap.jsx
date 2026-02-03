import React from 'react';
import { MapPin } from 'lucide-react';

export default function LiveMap() {
  return (
    <div className="relative w-full h-full min-h-[400px] bg-slate-200 rounded-2xl overflow-hidden border border-slate-300 shadow-inner group">
      
      {/* 1. MENGGUNAKAN GAMBAR PETA USU (Satellite View) */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity duration-500"
        style={{ 
            backgroundImage: 'url("https://www.google.com/maps/vt/data=lyr=s@189&src=apiv3&x=0&y=0&z=17&s=Galileo")', // Placeholder Tekstur Satelit
            // PENTING: Di project asli, ganti URL ini dengan screenshot peta USU yang bagus dari Google Maps
            backgroundColor: '#e5e7eb'
        }} 
      >
        {/* Grid Pattern Overlay supaya terlihat teknis */}
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      </div>
      
      {/* 2. UI PETA */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-lg z-10 border border-white/50">
        <h4 className="text-xs font-bold text-usu uppercase tracking-wider">Zona Kampus USU</h4>
        <p className="text-[10px] text-gray-500">Padang Bulan, Medan</p>
      </div>

      {/* 3. PIN LOKASI (Hardcoded di titik-titik USU) */}
      
      {/* Pin 1: Perpustakaan (Titik User) */}
      <div className="absolute top-[45%] left-[48%] flex flex-col items-center cursor-pointer hover:z-50 group/pin">
        <div className="bg-usu text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg mb-1 opacity-0 group-hover/pin:opacity-100 transition-opacity whitespace-nowrap">
            Posisi Anda (Perpustakaan)
        </div>
        <MapPin className="text-usu drop-shadow-2xl animate-bounce" size={48} fill="#155e37" />
        <div className="w-4 h-1.5 bg-black/30 rounded-full blur-[2px]"></div>
      </div>

      {/* Pin 2: Gedung Fasilkom */}
      <div className="absolute top-[30%] left-[60%] flex flex-col items-center cursor-pointer group/pin">
        <MapPin className="text-gray-500 drop-shadow-lg" size={32} />
        <div className="bg-white text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded shadow mt-1">Fasilkom-TI</div>
      </div>

      {/* Pin 3: Rumah Sakit USU */}
      <div className="absolute bottom-[20%] right-[30%] flex flex-col items-center cursor-pointer group/pin">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow text-red-600 font-bold border border-red-100">
            H
        </div>
        <span className="text-[10px] font-bold text-gray-600 mt-1 bg-white/80 px-1 rounded">RS USU</span>
      </div>

    </div>
  );
}