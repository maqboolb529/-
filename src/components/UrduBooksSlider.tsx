import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft, Sparkles, BookOpen, Star, Flame } from 'lucide-react';
import { Book } from '../types/book';

interface UrduBooksSliderProps {
  title: string;
  subtitle?: string;
  iconType?: 'sparkles' | 'flame';
  books: Book[];
  onSelect: (book: Book) => void;
  onRead: (book: Book, e?: React.MouseEvent) => void;
}

export const UrduBooksSlider: React.FC<UrduBooksSliderProps> = ({
  title,
  subtitle,
  iconType = 'sparkles',
  books,
  onSelect,
  onRead,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'right' | 'left') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  if (books.length === 0) return null;

  return (
    <div className="relative mb-8" dir="rtl">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-2xl bg-[#0d4a2e]/10 text-[#0d4a2e] border border-[#c5a059]/30">
            {iconType === 'flame' ? (
              <Flame className="w-4 h-4 fill-[#c5a059] text-[#c5a059]" />
            ) : (
              <Sparkles className="w-4 h-4 text-[#c5a059]" />
            )}
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold font-serif text-[#0d4a2e] tracking-wide flex items-center gap-2">
              <span>{title}</span>
            </h2>
            {subtitle && (
              <p className="text-[11px] text-stone-500 font-serif">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Scroll Arrows */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => scroll('right')}
            className="p-1.5 sm:p-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 transition-colors shadow-xs cursor-pointer"
            title="پچھلا"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('left')}
            className="p-1.5 sm:p-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 transition-colors shadow-xs cursor-pointer"
            title="اگلا"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div
        ref={scrollRef}
        className="flex items-stretch gap-3.5 overflow-x-auto pb-3 scroll-smooth scrollbar-none no-scrollbar snap-x snap-mandatory"
      >
        {books.map((book) => (
          <div
            key={book.id}
            onClick={() => onSelect(book)}
            className="snap-start shrink-0 w-[240px] sm:w-[260px] bg-white rounded-3xl border border-stone-200 hover:border-[#c5a059] hover:shadow-lg transition-all duration-300 p-3 flex flex-col justify-between cursor-pointer group"
          >
            <div className="flex gap-3">
              {/* Cover Preview */}
              <div className="relative w-20 aspect-[2/3] rounded-xl overflow-hidden shrink-0 shadow-md bg-stone-100 border border-[#c5a059]/40">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800';
                  }}
                />
                <div className="absolute inset-y-0 right-0 w-1.5 bg-gradient-to-l from-black/40 to-transparent" />
              </div>

              {/* Details */}
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <span className="text-[9px] font-bold font-serif px-2 py-0.5 rounded-full bg-[#0d4a2e]/10 text-[#0d4a2e] inline-block mb-1">
                    {book.category}
                  </span>

                  <h3 className="font-bold text-[#0d4a2e] text-xs sm:text-sm font-serif line-clamp-2 leading-snug group-hover:underline">
                    {book.title}
                  </h3>

                  <p className="text-[11px] text-stone-600 line-clamp-1 mt-1 font-serif">
                    {book.author}
                  </p>
                </div>

                <div className="text-[10px] text-stone-500 font-serif mt-2 flex items-center justify-between">
                  <span>{book.pages} صفحات</span>
                  <span className="text-amber-600 font-bold flex items-center">
                    <Star className="w-2.5 h-2.5 fill-amber-500 mr-0.5" />
                    {book.rating ? book.rating.toFixed(1) : '5.0'}
                  </span>
                </div>
              </div>
            </div>

            {/* Read Button */}
            <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[10px] text-stone-500 font-serif">
                {book.readsCount?.toLocaleString()} مطالعہ
              </span>
              <button
                onClick={(e) => onRead(book, e)}
                className="px-3 py-1 bg-[#0d4a2e] hover:bg-[#083320] text-[#c5a059] rounded-xl text-xs font-bold font-serif flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
              >
                <BookOpen className="w-3 h-3" />
                مطالعہ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
