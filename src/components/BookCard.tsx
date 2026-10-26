import React from 'react';
import { Heart, BookOpen, Star } from 'lucide-react';
import { Book } from '../types/book';

interface BookCardProps {
  book: Book;
  onSelect: (book: Book) => void;
  onRead: (book: Book, e?: React.MouseEvent) => void;
  onToggleFavorite: (bookId: string, e: React.MouseEvent) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  onSelect,
  onRead,
  onToggleFavorite,
}) => {
  const progressPercent = book.pages && book.lastReadPage
    ? Math.min(100, Math.round((book.lastReadPage / book.pages) * 100))
    : 0;

  return (
    <div
      onClick={() => onSelect(book)}
      className="group relative flex flex-col bg-white rounded-2xl border border-stone-200/90 hover:border-[#c5a059] hover:shadow-xl hover:shadow-[#0d4a2e]/10 transition-all duration-300 overflow-hidden cursor-pointer p-3"
      dir="rtl"
    >
      {/* Cover Image Container */}
      <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-[#0d4a2e]/5 shadow-inner group-hover:scale-[1.02] transition-transform duration-300">
        <img
          src={book.coverUrl}
          alt={book.title}
          loading="lazy"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800';
          }}
        />

        {/* Book Spine Shadow Overlay */}
        <div className="absolute inset-y-0 right-0 w-3 bg-gradient-to-l from-black/40 via-black/10 to-transparent pointer-events-none" />

        {/* Category Badge */}
        <div className="absolute top-2 right-2">
          <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-[#0d4a2e]/90 text-[#c5a059] border border-[#c5a059]/40 backdrop-blur-xs font-serif">
            {book.category}
          </span>
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => onToggleFavorite(book.id, e)}
          className={`absolute top-2 left-2 p-1.5 rounded-full backdrop-blur-md transition-all shadow-md cursor-pointer ${
            book.isFavorite
              ? 'bg-rose-600 text-white'
              : 'bg-white/90 text-stone-600 hover:text-rose-600 hover:bg-white'
          }`}
          title={book.isFavorite ? 'پسندیدہ سے نکالیں' : 'پسندیدہ میں شامل کریں'}
        >
          <Heart className={`w-3.5 h-3.5 ${book.isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Reading Progress Indicator */}
        {progressPercent > 0 && (
          <div className="absolute bottom-0 inset-x-0 bg-[#083320]/90 backdrop-blur-xs px-2.5 py-1 flex items-center justify-between text-[10px] text-white font-mono">
            <span className="text-[#c5a059] font-bold">{progressPercent}% مطالعہ</span>
            <span className="text-stone-300">صفحہ {book.lastReadPage}</span>
          </div>
        )}

        {/* Quick Read Overlay Button on hover */}
        <div className="absolute inset-0 bg-[#0d4a2e]/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3">
          <button
            onClick={(e) => onRead(book, e)}
            className="w-full py-2 bg-[#c5a059] hover:bg-[#b08b45] text-[#0d4a2e] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all font-serif"
          >
            <BookOpen className="w-3.5 h-3.5" />
            مطالعہ شروع کریں
          </button>
        </div>
      </div>

      {/* Book Information: Cover, Book Name in Urdu, Author Name */}
      <div className="mt-2.5 flex flex-col flex-1 text-right">
        <h3 className="font-bold text-stone-900 text-sm font-serif line-clamp-2 leading-snug group-hover:text-[#0d4a2e] transition-colors">
          {book.title}
        </h3>

        <p className="text-xs text-[#0d4a2e] line-clamp-1 mt-1 font-serif font-medium">
          {book.author}
        </p>

        <div className="mt-auto pt-2 flex items-center justify-between text-[11px] text-stone-500 border-t border-stone-100 font-serif">
          <span>{book.pages} صفحات</span>
          <span className="text-amber-600 flex items-center gap-0.5">
            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
            {book.rating ? book.rating.toFixed(1) : '5.0'}
          </span>
        </div>
      </div>
    </div>
  );
};
