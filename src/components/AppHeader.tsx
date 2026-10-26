import React from 'react';
import { Search, BookOpen, User, X, LogIn } from 'lucide-react';
import { UserProfile } from '../types/book';

interface AppHeaderProps {
  user: UserProfile | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  user,
  searchQuery,
  setSearchQuery,
  onOpenAuth,
  onOpenProfile,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#0d4a2e] text-white shadow-md border-b border-[#c5a059]/40" dir="rtl">
      {/* Top Greeting & Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-2.5">
        <div className="flex items-center justify-between gap-3">
          
          {/* Logo with Islamic Calligraphy styling */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#c5a059] to-[#997732] p-0.5 shadow-md shadow-black/20 shrink-0">
              <div className="w-full h-full bg-[#0d4a2e] rounded-[14px] flex items-center justify-center text-[#c5a059] group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-lg sm:text-xl font-bold font-serif text-[#c5a059] tracking-wide leading-tight">
                  مکتبہ حکیم الامت
                </h1>
                <span className="text-[10px] bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/40 px-1.5 py-0.2 rounded font-sans hidden sm:inline">
                  دار العلوم ایڈیشن
                </span>
              </div>
              <p className="text-[11px] text-emerald-100/80 font-serif leading-none mt-0.5">
                {user ? `السلام علیکم، ${user.name}` : 'السلام علیکم، خوش آمدید'}
              </p>
            </div>
          </div>

          {/* User Profile Avatar / Sign-In Button */}
          <div>
            {user ? (
              <button
                onClick={onOpenProfile}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-[#c5a059]/40 transition-colors cursor-pointer"
                title="پروفائل دیکھیں"
              >
                <div className="w-7 h-7 rounded-full overflow-hidden border border-[#c5a059] bg-[#083320] flex items-center justify-center text-xs font-bold text-[#c5a059]">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span>{user.name.charAt(0)}</span>
                  )}
                </div>
                <span className="text-xs font-bold text-white hidden sm:inline max-w-[100px] truncate">
                  {user.name}
                </span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#c5a059] hover:bg-[#b08b45] text-[#0d4a2e] font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>لاگ ان</span>
              </button>
            )}
          </div>

        </div>

        {/* Urdu Search Bar: "کتاب تلاش کریں..." */}
        <div className="mt-3 relative">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 absolute right-3.5 text-stone-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="کتاب تلاش کریں... (مثلاً: بہشتی زیور، آسان ترجمہ قرآن، الہدایہ، اقبال)"
              className="w-full pr-10 pl-9 py-2.5 bg-white text-stone-800 placeholder-stone-400 rounded-2xl text-xs sm:text-sm border border-[#c5a059]/30 focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/30 focus:outline-hidden transition-all shadow-inner font-serif"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 text-stone-400 hover:text-stone-600 p-0.5 rounded-full hover:bg-stone-100"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
