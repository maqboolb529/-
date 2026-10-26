import React from 'react';
import { Heart, Compass, BookOpen } from 'lucide-react';
import { Book } from '../types/book';
import { BookCard } from './BookCard';

interface FavoritesViewProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
  onReadBook: (book: Book, e?: React.MouseEvent) => void;
  onToggleFavorite: (bookId: string, e: React.MouseEvent) => void;
  onExplore: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  books,
  onSelectBook,
  onReadBook,
  onToggleFavorite,
  onExplore,
}) => {
  const favoriteBooks = books.filter((b) => b.isFavorite);

  return (
    <div className="space-y-6 animate-in fade-in pb-20" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0d4a2e] font-serif tracking-tight flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-600 fill-rose-600" />
            پسندیدہ کتب
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 font-serif mt-0.5">
            آپ کے محفوظ کردہ پسندیدہ رسائل و کتب
          </p>
        </div>

        <span className="text-xs font-bold font-serif px-3 py-1 bg-rose-50 text-rose-700 rounded-full border border-rose-200">
          {favoriteBooks.length} کتب
        </span>
      </div>

      {favoriteBooks.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
          {favoriteBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onSelect={onSelectBook}
              onRead={onReadBook}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-300 p-8">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold font-serif text-[#0d4a2e]">ابھی تک کوئی کتاب پسندیدہ میں شامل نہیں ہے</h3>
          <p className="text-xs sm:text-sm text-stone-500 font-serif max-w-md mx-auto mt-1 mb-6">
            کسی بھی کتاب کے سرورق پر دل کے نشان پر کلک کر کے اسے اپنی پسندیدہ فہرست میں محفوظ فرما سکتے ہیں۔
          </p>
          <button
            onClick={onExplore}
            className="px-5 py-2.5 bg-[#0d4a2e] hover:bg-[#083320] text-[#c5a059] rounded-2xl text-xs sm:text-sm font-bold font-serif inline-flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            کتب خانہ براؤز کریں
          </button>
        </div>
      )}
    </div>
  );
};
