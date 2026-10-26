import React from 'react';
import { Home, Library, Heart, User, BookOpen } from 'lucide-react';

interface BottomNavBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  favoritesCount: number;
  inProgressCount: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  setActiveTab,
  favoritesCount,
  inProgressCount,
}) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#c5a059]/30 shadow-lg px-2 sm:px-6 py-2" dir="rtl">
      <div className="max-w-md sm:max-w-xl mx-auto flex items-center justify-around">
        
        {/* 1. صفحہ اول (Home) */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all cursor-pointer ${
            activeTab === 'home'
              ? 'text-[#0d4a2e] font-bold scale-105'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <div className={`p-1.5 rounded-xl ${activeTab === 'home' ? 'bg-[#0d4a2e] text-[#c5a059]' : ''}`}>
            <Home className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-serif">صفحہ اول</span>
        </button>

        {/* 2. زمرہ جات (Categories) */}
        <button
          onClick={() => setActiveTab('categories')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all cursor-pointer ${
            activeTab === 'categories'
              ? 'text-[#0d4a2e] font-bold scale-105'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <div className={`p-1.5 rounded-xl ${activeTab === 'categories' ? 'bg-[#0d4a2e] text-[#c5a059]' : ''}`}>
            <Library className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-serif">زمرہ جات</span>
        </button>

        {/* 3. زیرِ مطالعہ (My Reading List) */}
        <button
          onClick={() => setActiveTab('reading')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all cursor-pointer relative ${
            activeTab === 'reading'
              ? 'text-[#0d4a2e] font-bold scale-105'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <div className={`p-1.5 rounded-xl ${activeTab === 'reading' ? 'bg-[#0d4a2e] text-[#c5a059]' : ''}`}>
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-serif">زیرِ مطالعہ</span>
          {inProgressCount > 0 && (
            <span className="absolute top-1 right-3 w-4 h-4 rounded-full bg-[#0d4a2e] text-[#c5a059] border border-white text-[9px] font-bold flex items-center justify-center font-sans">
              {inProgressCount}
            </span>
          )}
        </button>

        {/* 4. پسندیدہ (Favorites) */}
        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all cursor-pointer relative ${
            activeTab === 'favorites'
              ? 'text-[#0d4a2e] font-bold scale-105'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <div className={`p-1.5 rounded-xl ${activeTab === 'favorites' ? 'bg-[#0d4a2e] text-[#c5a059]' : ''}`}>
            <Heart className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-serif">پسندیدہ</span>
          {favoritesCount > 0 && (
            <span className="absolute top-1 right-3 w-4 h-4 rounded-full bg-rose-600 text-white border border-white text-[9px] font-bold flex items-center justify-center font-sans">
              {favoritesCount}
            </span>
          )}
        </button>

        {/* 5. پروفائل (Profile) */}
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all cursor-pointer ${
            activeTab === 'profile'
              ? 'text-[#0d4a2e] font-bold scale-105'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <div className={`p-1.5 rounded-xl ${activeTab === 'profile' ? 'bg-[#0d4a2e] text-[#c5a059]' : ''}`}>
            <User className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-serif">پروفائل</span>
        </button>

      </div>
    </nav>
  );
};
