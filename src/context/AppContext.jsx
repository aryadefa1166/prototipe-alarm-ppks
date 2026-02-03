import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // --- STATE USER & AUTH ---
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [role, setRole] = useState(localStorage.getItem('role') || null);
  
  // --- STATE DARURAT ---
  const [isSOS, setIsSOS] = useState(false);
  const [sosStatus, setSosStatus] = useState('STANDBY'); // STANDBY, ACTIVE, DISPATCHED, SAFE
  const [audioBlob, setAudioBlob] = useState(null);
  
  // Audio & Recorder Refs
  const sirenAudio = useRef(new Audio('https://cdn.pixabay.com/audio/2021/08/04/audio_0625c1539c.mp3'));
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // --- DATA DUMMY ---
  const [forumPosts, setForumPosts] = useState([
    { id: 1, user: 'Mahasiswa Hukum', text: 'Lampu jalan di Pintu 4 mati total. Harap hati-hati.', time: '2m lalu', likes: [], comments: [] },
    { id: 2, user: 'Anak Fasilkom', text: 'Patroli Satgas malam ini terlihat di sekitar Pendopo. Aman.', time: '1j lalu', likes: ['dummy-id'], comments: [] },
  ]);

  const [chatHistory, setChatHistory] = useState([
    { sender: 'bot', text: 'Halo! Saya SVARNA Bot. Ada yang bisa saya bantu? (Lapor, Hukum, Konseling)' }
  ]);

  // --- 1. AUTHENTICATION LOGIC ---
  const register = (userData) => {
    const newUser = { ...userData, id: Date.now().toString() };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    setRole(userData.role);
  };

  const login = (userData, selectedRole) => {
    setUser(userData);
    setRole(selectedRole);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('role', selectedRole);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.clear();
    stopSOS();
  };

  // --- 2. SOS SYSTEM ---
  useEffect(() => {
    const syncState = () => {
      const storageSOS = localStorage.getItem('isSOS') === 'true';
      const storageStatus = localStorage.getItem('sosStatus');
      
      if (storageSOS !== isSOS) setIsSOS(storageSOS);
      if (storageStatus && storageStatus !== sosStatus) setSosStatus(storageStatus);
      
      if (storageSOS && role === 'satgas') {
        sirenAudio.current.loop = true;
        sirenAudio.current.play().catch(e => console.log("Autoplay blocked"));
      } else if (!storageSOS) {
        sirenAudio.current.pause();
        sirenAudio.current.currentTime = 0;
      }
    };

    window.addEventListener('storage', syncState);
    return () => window.removeEventListener('storage', syncState);
  }, [isSOS, role, sosStatus]);

  const triggerSOS = () => {
    setIsSOS(true);
    setSosStatus('ACTIVE');
    localStorage.setItem('isSOS', 'true');
    localStorage.setItem('sosStatus', 'ACTIVE');
    sirenAudio.current.loop = true;
    sirenAudio.current.play();
    startRecording();
  };

  const dispatchUnit = () => {
    setSosStatus('DISPATCHED');
    localStorage.setItem('sosStatus', 'DISPATCHED');
  };

  const stopSOS = () => {
    setIsSOS(false);
    setSosStatus('SAFE');
    localStorage.setItem('isSOS', 'false');
    localStorage.setItem('sosStatus', 'SAFE');
    sirenAudio.current.pause();
    sirenAudio.current.currentTime = 0;
    stopRecording();
  };

  // --- 3. AUDIO RECORDING ---
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
      };
      mediaRecorderRef.current.start();
    } catch (err) {
      console.error("Mic Error:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  // --- 4. SMART BOT ---
  const sendMessage = (text) => {
    const userMsg = { sender: 'user', text };
    setChatHistory(prev => [...prev, userMsg]);

    setTimeout(() => {
      let reply = "Maaf, saya kurang paham. Silakan hubungi CS Satgas.";
      const lower = text.toLowerCase();
      const knowledge = [
        { keys: ['halo', 'hai', 'pagi'], ans: "Halo! Tetap waspada. Ada yang bisa saya bantu?" },
        { keys: ['lapor', 'aduan', 'korban'], ans: "Untuk kondisi darurat, tekan tombol SOS. Untuk laporan tertulis, gunakan fitur 'Lapor' di Portal USU." },
        { keys: ['hukum', 'uu', 'pasal'], ans: "Dasar hukum: Permendikbudristek No. 30 Tahun 2021 & UU TPKS. Korban berhak atas perlindungan." },
        { keys: ['takut', 'trauma', 'konseling'], ans: "Layanan Psikolog tersedia gratis di Fakultas Psikologi. Kami siap mendengar." },
        { keys: ['makasih'], ans: "Sama-sama. Jaga diri ya!" }
      ];
      const match = knowledge.find(k => k.keys.some(key => lower.includes(key)));
      if (match) reply = match.ans;
      setChatHistory(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 800);
  };

  // --- 5. FORUM LOGIC (FIXED) ---
  const toggleLike = (postId) => {
    if (!user) return;
    setForumPosts(posts => posts.map(post => {
      if (post.id === postId) {
        const isLiked = post.likes.includes(user.id);
        const newLikes = isLiked ? post.likes.filter(id => id !== user.id) : [...post.likes, user.id];
        return { ...post, likes: newLikes };
      }
      return post;
    }));
  };

  const addPost = (text) => {
    if (!text.trim()) return;
    const newPost = { 
      id: Date.now(), 
      user: user?.name || 'Anonim', 
      text, 
      time: 'Baru saja', 
      likes: [], 
      comments: [] 
    };
    setForumPosts([newPost, ...forumPosts]);
  };

  const addComment = (postId, text) => {
    if (!user) return;
    setForumPosts(posts => posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, { user: user.name, text }] // Pakai nama User asli
        };
      }
      return post;
    }));
  };

  return (
    <AppContext.Provider value={{ 
      user, role, isSOS, sosStatus, login, logout, register,
      triggerSOS, stopSOS, dispatchUnit,
      forumPosts, addPost, toggleLike, addComment, 
      chatHistory, sendMessage 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);