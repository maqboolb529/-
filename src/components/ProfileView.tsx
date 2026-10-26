import React from 'react';
import { User, LogOut, Heart, BookOpen, Clock, ShieldCheck, Mail, Calendar, LogIn } from 'lucide-react';
import { UserProfile, Book } from '../types/book';

interface ProfileViewProps {
  user: UserProfile | null;
  books: Book[];
  onLogout: () => void;
  onOpenAuth: () => void;
  onNavigateToFavorites: () => void;
  onNavigateToReading: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  books,
  onLogout,
  onOpenAuth,
  onNavigateToFavorites,
  onNavigateToReading,
}) => {
  const favoritesCount = books.filter(b => b.isFavorite).length;
  const inProgressCount = books.filter(b => b.lastReadPage && b.lastReadPage > 1).length;
  const totalPagesRead = books.reduce((acc, b) => acc + (b.lastReadPage || 0), 0);

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20 animate-in fade-in" dir="rtl">
      
      {/* Profile Card */}
      <div className="bg-white rounded-3xl border-2 border-[#c5a059]/40 p-6 sm:p-8 shadow-xl shadow-[#0d4a2e]/5 relative overflow-hidden">
        {/* Decorative Golden Pattern Header */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-r from-[#0d4a2e] to-[#083320] border-b-2 border-[#c5a059]" />

        <div className="relative pt-8 flex flex-col sm:flex-row items-center sm:items-end gap-5">
          {/* Avatar Photo */}
          <div className="w-24 h-24 rounded-3xl border-4 border-white shadow-xl overflow-hidden bg-[#0d4a2e] flex items-center justify-center shrink-0">
            {user?.photoURL ? (
              <img src={user.photoURL} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-[#c5a059]" />
            )}
          </div>

          <div className="flex-1 text-center sm:text-right">
            <h2 className="text-2xl font-bold font-serif text-[#0d4a2e]">
              {user ? user.name : 'معزز مہمان'}
            </h2>
            <p className="text-xs text-stone-500 font-serif flex items-center justify-center sm:justify-start gap-1 mt-1" dir="ltr">
              <Mail className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>{user?.email || 'guest@maktaba.local'}</span>
            </p>
            {user?.isAnonymous && (
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-800 font-serif font-bold">
                مہمان اکاؤنٹ
              </span>
            )}
          </div>

          {/* Action button: Logout or Login */}
          <div>
            {user ? (
              <button
                onClick={onLogout}
                className="px-4 py-2 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold font-serif flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4 rotate-180" />
                <span>لاگ آؤٹ</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-5 py-2.5 rounded-2xl bg-[#0d4a2e] hover:bg-[#083320] text-[#c5a059] border border-[#c5a059] text-xs font-bold font-serif flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>لاگ ان کریں</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Reading Statistics Cards */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <div 
          onClick={onNavigateToReading}
          className="bg-white p-4 rounded-2xl border border-stone-200 hover:border-[#c5a059] cursor-pointer transition-colors text-center shadow-xs"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0d4a2e] flex items-center justify-center mx-auto mb-2">
            <BookOpen className="w-5 h-5" />
          </div>
          <p className="text-xl font-bold text-[#0d4a2e] font-sans">{inProgressCount}</p>
          <p className="text-xs text-stone-600 font-serif mt-0.5">زیرِ مطالعہ کتب</p>
        </div>

        <div 
          onClick={onNavigateToFavorites}
          className="bg-white p-4 rounded-2xl border border-stone-200 hover:border-[#c5a059] cursor-pointer transition-colors text-center shadow-xs"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-2">
            <Heart className="w-5 h-5" />
          </div>
          <p className="text-xl font-bold text-rose-600 font-sans">{favoritesCount}</p>
          <p className="text-xs text-stone-600 font-serif mt-0.5">پسندیدہ کتب</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 text-center shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-[#c5a059]/15 text-[#c5a059] flex items-center justify-center mx-auto mb-2">
            <Clock className="w-5 h-5" />
          </div>
          <p className="text-xl font-bold text-stone-800 font-sans">{totalPagesRead}</p>
          <p className="text-xs text-stone-600 font-serif mt-0.5">پڑھے گئے صفحات</p>
        </div>
      </div>

      {/* About Maktaba */}
      <div className="bg-[#0d4a2e] text-white p-6 rounded-3xl border-2 border-[#c5a059]/50 shadow-lg relative overflow-hidden">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-2xl bg-[#c5a059]/20 border border-[#c5a059] flex items-center justify-center text-[#c5a059]">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg font-serif text-[#c5a059]">مکتبہ حکیم الامت - Maktaba Hakim ul Ummat</h3>
            <p className="text-xs text-emerald-100/80 font-serif">آن لائن محفوظ اسلامی کتب خانہ</p>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-emerald-100/90 leading-loose font-serif">
          یہ کتب خانہ حکیم الامت حضرت مولانا اشرف علی تھانویؒ، شیخ الاسلام مفتی تقی عثمانی صاحب، درسِ نظامی اور اکابرینِ دیوبند کی مستند کتب کے مطالعہ کے لیے وقف ہے۔ تمام کتب بلا معاوضہ آن لائن مطالعہ کے لیے دستیاب ہیں۔
        </p>
      </div>

    </div>
  );
};
