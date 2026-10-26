import React from 'react';
import { BookOpen, Clock, ArrowLeft, Compass } from 'lucide-react';
import { Book } from '../types/book';

interface ReadingListViewProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
  onReadBook: (book: Book) => void;
  onExplore: () => void;
}

export const ReadingListView: React.FC<ReadingListViewProps> = ({
  books,
  onSelectBook,
  onReadBook,
  onExplore,
}) => {
  const readingBooks = books
    .filter((b) => b.lastReadPage && b.lastReadPage > 1)
    .sort((a, b) => (b.lastReadTimestamp || 0) - (a.lastReadTimestamp || 0));

  return (
    <div className="space-y-6 animate-in fade-in pb-20" dir="rtl">
      <div>
        <h1 className="text-2xl font-extrabold text-[#0d4a2e] font-serif tracking-tight flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-[#c5a059]" />
          زیرِ مطالعہ کتب (مطالعہ جاری رکھیں)
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 font-serif mt-0.5">
          آپ کا آخری پڑھا گیا صفحہ خود بخود یاد رکھا گیا ہے
        </p>
      </div>

      {readingBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {readingBooks.map((book) => {
            const progress = book.pages && book.lastReadPage
              ? Math.min(100, Math.round((book.lastReadPage / book.pages) * 100))
              : 0;

            return (
              <div
                key={book.id}
                className="bg-white rounded-3xl border border-stone-200 p-4 hover:border-[#c5a059] hover:shadow-lg transition-all flex gap-4 group"
              >
                {/* Book Cover */}
                <div
                  onClick={() => onSelectBook(book)}
                  className="w-24 sm:w-28 aspect-[2/3] rounded-2xl overflow-hidden shadow-md shrink-0 cursor-pointer relative bg-stone-100 border border-[#c5a059]/40"
                >
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-y-0 right-0 w-2 bg-gradient-to-l from-black/40 to-transparent pointer-events-none" />
                </div>

                {/* Info & Progress */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <span className="text-[10px] font-bold font-serif px-2.5 py-0.5 rounded-full bg-[#0d4a2e]/10 text-[#0d4a2e]">
                      {book.category}
                    </span>

                    <h3
                      onClick={() => onSelectBook(book)}
                      className="font-bold text-[#0d4a2e] text-sm sm:text-base font-serif line-clamp-2 mt-1.5 cursor-pointer hover:underline"
                    >
                      {book.title}
                    </h3>

                    <p className="text-xs text-stone-600 mt-0.5 font-serif truncate">
                      {book.author}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="my-2">
                    <div className="flex items-center justify-between text-xs font-bold font-serif text-stone-700 mb-1">
                      <span className="text-[#0d4a2e]">{progress}% مطالعہ مکمل</span>
                      <span className="text-stone-500 font-sans text-[11px]">
                        صفحہ {book.lastReadPage} / {book.pages}
                      </span>
                    </div>

                    <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden border border-stone-200">
                      <div
                        className="bg-[#0d4a2e] h-full rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 font-serif">
                    <span className="text-[11px] text-stone-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>{book.lastReadTimestamp ? new Date(book.lastReadTimestamp).toLocaleDateString('ur-PK') : 'حالیہ'}</span>
                    </span>

                    <button
                      onClick={() => onReadBook(book)}
                      className="px-4 py-1.5 bg-[#0d4a2e] hover:bg-[#083320] text-[#c5a059] rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                    >
                      <span>مطالعہ جاری رکھیں</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-300 p-8">
          <BookOpen className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h3 className="text-base font-bold font-serif text-[#0d4a2e]">ابھی تک کوئی کتاب زیرِ مطالعہ نہیں ہے</h3>
          <p className="text-xs sm:text-sm text-stone-500 font-serif max-w-sm mx-auto mt-1 mb-6">
            جب آپ مکتبہ میں کسی بھی کتاب کا مطالعہ شروع کریں گے، تو آپ کا آخری صفحہ یہاں محفوظ رہے گا۔
          </p>
          <button
            onClick={onExplore}
            className="px-5 py-2.5 bg-[#0d4a2e] hover:bg-[#083320] text-[#c5a059] rounded-2xl text-xs sm:text-sm font-bold font-serif inline-flex items-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            کتابیں دریافت کریں
          </button>
        </div>
      )}
    </div>
  );
};
