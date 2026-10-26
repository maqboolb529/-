import React, { useState } from 'react';
import { 
  GraduationCap, 
  Award, 
  Scale, 
  Landmark, 
  Compass, 
  Feather, 
  Languages, 
  BookText, 
  Globe, 
  Layers,
  BookMarked
} from 'lucide-react';
import { Book, BookCategory } from '../types/book';
import { BookCard } from './BookCard';
import { EXACT_9_CATEGORIES } from './CategoryChipsBar';

interface CategoriesViewProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
  onReadBook: (book: Book, e?: React.MouseEvent) => void;
  onToggleFavorite: (bookId: string, e: React.MouseEvent) => void;
  initialCategory?: BookCategory | 'تمام کتب';
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  books,
  onSelectBook,
  onReadBook,
  onToggleFavorite,
  initialCategory = 'تمام کتب',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<BookCategory | 'تمام کتب'>(initialCategory);

  const categoryCounts = books.reduce((acc, b) => {
    acc[b.category] = (acc[b.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const filteredBooks = books.filter((book) => {
    return selectedCategory === 'تمام کتب' || book.category === selectedCategory;
  });

  return (
    <div className="space-y-8 animate-in fade-in pb-20" dir="rtl">
      <div>
        <h1 className="text-2xl font-extrabold text-[#0d4a2e] font-serif tracking-tight">
          زمرہ جات کتب خانہ (Categories)
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 font-serif mt-0.5">
          مستند دینی، اصلاحی، ادبی، فقہی اور فکری کتب کے زمرے
        </p>
      </div>

      {/* Grid of the 9 Category Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {EXACT_9_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const Icon = cat.icon;
          const count = cat.id === 'تمام کتب' 
            ? books.length 
            : (categoryCounts[cat.id] || 0);

          return (
            <div
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`p-4 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? 'bg-[#0d4a2e] text-[#c5a059] border-[#c5a059] shadow-lg shadow-[#0d4a2e]/20 scale-[1.02]'
                  : 'bg-white hover:bg-emerald-50/50 text-stone-800 border-stone-200 hover:border-[#c5a059]/60'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-2xl ${isSelected ? 'bg-white/10 text-[#c5a059]' : 'bg-[#0d4a2e]/10 text-[#0d4a2e]'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full font-serif ${
                  isSelected ? 'bg-[#c5a059] text-[#0d4a2e]' : 'bg-stone-100 text-stone-600'
                }`}>
                  {count} کتب
                </span>
              </div>

              <div>
                <h3 className="font-bold text-sm sm:text-base font-serif leading-snug">
                  {cat.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filtered Books Heading & Grid */}
      <div className="pt-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#0d4a2e] font-serif">
            {selectedCategory === 'تمام کتب' ? 'تمام کتب' : selectedCategory}
            <span className="text-xs font-sans font-bold px-2 py-0.5 rounded-full bg-stone-200 text-stone-700 mr-2">
              {filteredBooks.length}
            </span>
          </h2>
        </div>

        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
            {filteredBooks.map((book) => (
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
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-stone-300 p-8">
            <BookMarked className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-base font-bold font-serif text-stone-700">اس زمرہ میں کوئی کتاب موجود نہیں ہے</h3>
          </div>
        )}
      </div>

    </div>
  );
};
