import React, { useState } from 'react';
import { Shield, ArrowRight, Lock, User, CheckSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Auth() {
  const { register, login } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('civitas');

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    tnc: false
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.username || !formData.password) return setError("Nama Pengguna dan Kata Sandi wajib diisi.");
    
    if (!isLogin) {
      if (!formData.fullName) return setError("Nama Lengkap wajib diisi.");
      if (!formData.tnc) return setError("Anda harus menyetujui Syarat & Ketentuan.");
    }

    const userData = {
      id: formData.username,
      name: isLogin ? (role === 'satgas' ? 'Anggota Satgas' : 'Civitas Akademika') : formData.fullName,
      username: formData.username,
      role: role
    };

    if (isLogin) {
      login(userData, role);
    } else {
      register(userData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#f8f9fa] font-sans">
      <div className="bg-white w-full max-w-md rounded-[40px] p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-1.5 bg-usu"></div>
        
        {/* LOGO DIKEMBALIKAN KE VERSI AWAL (Solid Green + Rotasi) */}
        <div className="flex flex-col items-center mb-8 pt-2">
          <div className="w-16 h-16 bg-usu rounded-2xl flex items-center justify-center shadow-lg mb-4 transform rotate-3 hover:rotate-0 transition-all duration-300">
            <Shield className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">SVARNA</h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Sistem Keamanan USU</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8 relative">
          <button 
            onClick={() => setIsLogin(true)} 
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all duration-300 ${isLogin ? 'bg-white text-usu shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            MASUK
          </button>
          <button 
            onClick={() => setIsLogin(false)} 
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all duration-300 ${!isLogin ? 'bg-white text-usu shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            DAFTAR
          </button>
        </div>

        {/* Role Selector */}
        <div className="flex gap-8 mb-6 justify-center">
            <label className="flex items-center gap-2 cursor-pointer group">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${role === 'civitas' ? 'border-usu' : 'border-slate-300'}`}>
                    {role === 'civitas' && <div className="w-2 h-2 bg-usu rounded-full" />}
                </div>
                <input type="radio" name="role" checked={role === 'civitas'} onChange={() => setRole('civitas')} className="hidden" />
                <span className={`text-sm font-bold ${role === 'civitas' ? 'text-slate-800' : 'text-slate-400 group-hover:text-slate-600'}`}>Civitas</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer group">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${role === 'satgas' ? 'border-usu' : 'border-slate-300'}`}>
                    {role === 'satgas' && <div className="w-2 h-2 bg-usu rounded-full" />}
                </div>
                <input type="radio" name="role" checked={role === 'satgas'} onChange={() => setRole('satgas')} className="hidden" />
                <span className={`text-sm font-bold ${role === 'satgas' ? 'text-slate-800' : 'text-slate-400 group-hover:text-slate-600'}`}>Satgas</span>
            </label>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4 animate-[fade-in_0.3s]">
          {!isLogin && (
            <InputIcon icon={<User />} name="fullName" ph="Nama Lengkap" val={formData.fullName} change={handleChange} />
          )}
          
          <InputIcon icon={<User />} name="username" ph="Nama Pengguna" val={formData.username} change={handleChange} />
          <InputIcon icon={<Lock />} name="password" type="password" ph="Kata Sandi" val={formData.password} change={handleChange} />

          {!isLogin && (
            <label className="flex items-start gap-3 cursor-pointer p-1">
              <div className={`mt-0.5 w-4 h-4 border-2 rounded flex items-center justify-center transition-colors ${formData.tnc ? 'bg-usu border-usu' : 'border-slate-300'}`}>
                 {formData.tnc && <CheckSquare size={10} className="text-white" />}
              </div>
              <input type="checkbox" name="tnc" checked={formData.tnc} onChange={handleChange} className="hidden" />
              <span className="text-[11px] text-slate-500 leading-tight">
                Saya menyetujui <span className="text-usu font-bold">Syarat & Ketentuan</span> penggunaan layanan darurat SVARNA Universitas Sumatera Utara.
              </span>
            </label>
          )}

          {error && <div className="bg-red-50 text-red-500 text-xs font-bold p-3 rounded-xl text-center border border-red-100">{error}</div>}

          <button type="submit" className="w-full bg-usu hover:bg-[#0f4e2d] text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-900/10 transition-all flex justify-center items-center gap-2 mt-4 active:scale-[0.98]">
            {isLogin ? 'MASUK' : 'BUAT AKUN'} <ArrowRight size={18} strokeWidth={3} />
          </button>
        </form>

        <p className="text-center text-[10px] font-medium text-slate-400 mt-8">
          © 2026 Universitas Sumatera Utara
        </p>
      </div>
    </div>
  );
}

const InputIcon = ({ icon, name, ph, val, change, type = "text" }) => (
  <div className="relative group">
    <div className="absolute left-4 top-3.5 text-slate-300 group-focus-within:text-usu transition-colors duration-300">
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <input 
      type={type} name={name} placeholder={ph} value={val} onChange={change}
      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-usu/20 focus:border-usu focus:outline-none text-sm font-bold text-slate-700 placeholder:text-slate-400 placeholder:font-medium transition-all"
    />
  </div>
);