import React from 'react';
import { X, BookOpen, Heart, Star, Bookmark, ShieldCheck, Share2 } from 'lucide-react';
import { Book } from '../types/book';

interface BookDetailModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onRead: (book: Book) => void;
  onToggleFavorite: (bookId: string) => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  isOpen,
  onClose,
  onRead,
  onToggleFavorite,
}) => {
  if (!isOpen || !book) return null;

  const progressPercent = book.pages && book.lastReadPage
    ? Math.min(100, Math.round((book.lastReadPage / book.pages) * 100))
    : 0;

  const handleShare = async () => {
    const text = `${book.title} - مصنف: ${book.author} | مطالعہ فرمائیں آن لائن مکتبہ حکیم الامت پر`;
    if (navigator.share) {
      try {
        await navigator.share({ title: book.title, text, url: window.location.href });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(`${book.title} - ${book.author}`);
      alert('کتاب کا نام کاپی ہو گیا!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in" dir="rtl">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-[#c5a059]/40 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-[#0d4a2e] text-white">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-[#c5a059] text-[#0d4a2e] font-serif">
              {book.category}
            </span>
            <span className="text-xs text-emerald-100/90 font-serif">
              مستند طباعت
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start">
            
            {/* Book Cover with Islamic Frame */}
            <div className="shrink-0 w-44 sm:w-48 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl shadow-[#0d4a2e]/20 relative bg-stone-100 border-2 border-[#c5a059]">
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800';
                }}
              />
              <div className="absolute inset-y-0 right-0 w-3 bg-gradient-to-l from-black/40 to-transparent pointer-events-none" />
            </div>

            {/* Book Details */}
            <div className="flex-1 flex flex-col min-w-0 text-center sm:text-right">
              
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1.5">
                <div className="flex items-center text-amber-500 font-bold text-sm">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400 ml-1" />
                  <span>{book.rating ? book.rating.toFixed(1) : '5.0'}</span>
                </div>
                <span className="text-stone-300">•</span>
                <span className="text-xs text-stone-500 font-serif">
                  {book.readsCount?.toLocaleString()} قارئین نے پڑھا
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0d4a2e] font-serif tracking-tight leading-tight">
                {book.title}
              </h1>

              <p className="text-sm sm:text-base text-stone-700 font-serif mt-1 font-semibold">
                مصنف: <span className="text-[#0d4a2e]">{book.author}</span>
              </p>

              {/* Meta Chips */}
              <div className="grid grid-cols-3 gap-2.5 my-4 p-3 bg-stone-50 rounded-2xl border border-stone-200 text-xs font-serif">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">زمرہ</span>
                  <span className="font-bold text-stone-800">{book.category}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">کل صفحات</span>
                  <span className="font-bold text-stone-800">{book.pages}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">سیکیورٹی</span>
                  <span className="font-bold text-[#0d4a2e] flex items-center justify-center sm:justify-start gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0d4a2e]" />
                    محفوظ آن لائن
                  </span>
                </div>
              </div>

              {/* Reading Progress Indicator */}
              {progressPercent > 0 && (
                <div className="mb-4 p-3 bg-emerald-50/80 rounded-2xl border border-[#0d4a2e]/20">
                  <div className="flex items-center justify-between text-xs text-[#0d4a2e] font-bold font-serif mb-1">
                    <span>زیرِ مطالعہ</span>
                    <span>{progressPercent}% (صفحہ {book.lastReadPage} از {book.pages})</span>
                  </div>
                  <div className="w-full bg-[#0d4a2e]/10 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-[#0d4a2e] h-full rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Required Two Main Buttons: "مطالعہ شروع کریں" and "پسندیدہ میں شامل کریں" */}
              <div className="flex items-center gap-3 mt-auto pt-2">
                
                {/* 1. مطالعہ شروع کریں (Read Now) */}
                <button
                  onClick={() => { onClose(); onRead(book); }}
                  className="flex-1 py-3 px-6 bg-[#0d4a2e] hover:bg-[#083320] text-[#c5a059] rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#0d4a2e]/20 hover:shadow-[#0d4a2e]/30 transition-all cursor-pointer font-serif border border-[#c5a059]/40"
                >
                  <BookOpen className="w-5 h-5 text-[#c5a059]" />
                  <span>{book.lastReadPage && book.lastReadPage > 1 ? `مطالعہ جاری رکھیں (صفحہ ${book.lastReadPage})` : 'مطالعہ شروع کریں'}</span>
                </button>

                {/* 2. پسندیدہ میں شامل کریں (Add to Favorite) */}
                <button
                  onClick={() => onToggleFavorite(book.id)}
                  className={`py-3 px-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-2 font-serif text-xs sm:text-sm font-bold ${
                    book.isFavorite
                      ? 'bg-rose-50 border-rose-300 text-rose-600'
                      : 'bg-white border-stone-200 text-stone-700 hover:text-rose-600 hover:border-rose-200'
                  }`}
                  title={book.isFavorite ? 'پسندیدہ سے نکالیں' : 'پسندیدہ میں شامل کریں'}
                >
                  <Heart className={`w-4 h-4 ${book.isFavorite ? 'fill-current' : ''}`} />
                  <span className="hidden sm:inline">
                    {book.isFavorite ? 'پسندیدہ کتب میں شامل ہے' : 'پسندیدہ میں شامل کریں'}
                  </span>
                </button>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="p-3 rounded-2xl border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors"
                  title="شیئر کریں"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

          {/* Mukhtasar Taaruf (مختصر تعارف) */}
          <div className="pt-4 border-t border-stone-200">
            <h3 className="text-base font-bold text-[#0d4a2e] font-serif mb-2 flex items-center gap-1.5">
              <span>مختصر تعارف</span>
            </h3>
            <p className="text-stone-700 text-sm sm:text-base leading-loose font-serif whitespace-pre-line bg-stone-50/60 p-4 rounded-2xl border border-stone-200/60">
              {book.description}
            </p>
          </div>

          {/* Security & Protection Notice (Explaining Online-Only PDF) */}
          <div className="p-3.5 rounded-2xl bg-[#0d4a2e]/5 border border-[#c5a059]/30 text-xs text-stone-600 flex items-center gap-2.5 font-serif">
            <ShieldCheck className="w-4 h-4 text-[#0d4a2e] shrink-0" />
            <span>
              کتب کی حفاظت اور حقوق کی پاسداری کے پیشِ نظر تمام کتب صرف آن لائن مطالعہ کے لیے فراہم کی گئی ہیں۔
            </span>
          </div>

          {/* Publisher Details */}
          {book.publisher && (
            <div className="text-xs text-stone-500 pt-2 border-t border-stone-100 flex items-center justify-between font-serif">
              <span>ناشر: <strong>{book.publisher}</strong></span>
              {book.bookmarks && book.bookmarks.length > 0 && (
                <span className="flex items-center gap-1 text-amber-700">
                  <Bookmark className="w-3.5 h-3.5 fill-amber-500" />
                  {book.bookmarks.length} صفحات محفوظ ہیں
                </span>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
