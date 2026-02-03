import React, { useState } from 'react';
import { Heart, MessageCircle, Send, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ForumFeed() {
  const { user, forumPosts, addPost, toggleLike, addComment } = useApp();
  const [text, setText] = useState('');
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addPost(text); 
      setText('');
    }
  };

  const handleCommentSubmit = (postId) => {
    if (commentText.trim()) {
        addComment(postId, commentText);
        setCommentText('');
    }
  };

  return (
    <div className="pb-20 space-y-6">
      {/* Input Post Utama */}
      <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
        <textarea 
          value={text} onChange={e => setText(e.target.value)}
          className="w-full bg-slate-50 p-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-usu resize-none mb-2"
          placeholder="Bagikan informasi keamanan..." rows="2"
        />
        <div className="flex justify-end">
           <button onClick={handleSubmit} className="bg-usu text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-usu-dark transition">Kirim <Send size={12}/></button>
        </div>
      </div>

      {/* Posts */}
      {forumPosts.map(post => {
        const isLiked = post.likes.includes(user?.id);
        return (
          <div key={post.id} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-3">
               <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center"><User size={16}/></div>
               <div><p className="text-sm font-bold">{post.user}</p><p className="text-[10px] text-slate-400">{post.time}</p></div>
            </div>
            
            <p className="text-sm text-slate-700 mb-4">{post.text}</p>
            
            <div className="flex items-center gap-4 border-t pt-3 border-slate-50">
               <button onClick={() => toggleLike(post.id)} className={`flex items-center gap-1 text-xs font-bold transition-colors ${isLiked ? 'text-red-500' : 'text-slate-400 hover:text-red-400'}`}>
                  <Heart size={16} fill={isLiked ? "currentColor" : "none"} /> {post.likes.length}
               </button>
               <button onClick={() => setActiveCommentId(activeCommentId === post.id ? null : post.id)} className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-usu">
                  <MessageCircle size={16} /> {post.comments.length} Komentar
               </button>
            </div>

            {/* Area Komentar */}
            {activeCommentId === post.id && (
                <div className="mt-4 pt-3 border-t border-slate-50 animate-[fade-in_0.2s]">
                    {post.comments.length > 0 && (
                        <div className="space-y-2 mb-3 pl-2 border-l-2 border-slate-100">
                            {post.comments.map((c, idx) => (
                                <div key={idx} className="bg-slate-50 p-2 rounded-lg text-xs">
                                    <span className="font-bold text-slate-700">{c.user}: </span>
                                    <span className="text-slate-600">{c.text}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="flex gap-2">
                        <input 
                            value={commentText} onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Tulis komentar..."
                            className="flex-1 bg-slate-50 px-3 py-2 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-usu"
                            onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit(post.id)}
                        />
                        <button onClick={() => handleCommentSubmit(post.id)} className="p-2 bg-slate-200 rounded-lg text-slate-600 hover:bg-usu hover:text-white">
                            <Send size={14} />
                        </button>
                    </div>
                </div>
            )}
          </div>
        )
      })}
    </div>
  );
}