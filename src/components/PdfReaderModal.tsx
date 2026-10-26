import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Sun, 
  Moon, 
  Coffee, 
  Bookmark, 
  BookmarkCheck, 
  Maximize2, 
  Minimize2, 
  Type, 
  Sliders, 
  BookOpen, 
  ShieldCheck,
  List
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Book } from '../types/book';

interface PdfReaderModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateProgress: (bookId: string, page: number) => void;
  onToggleBookmark: (bookId: string, page: number) => void;
}

export type ReaderThemeMode = 'light' | 'sepia' | 'dark';

export const PdfReaderModal: React.FC<PdfReaderModalProps> = ({
  book,
  isOpen = true,
  onClose,
  onUpdateProgress,
  onToggleBookmark,
}) => {
  // Always call all hooks unconditionally at the very top
  const [currentPage, setCurrentPage] = useState<number>(book?.lastReadPage || 1);
  const [theme, setTheme] = useState<ReaderThemeMode>('light');
  const [fontSize, setFontSize] = useState<number>(19);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showBookmarksList, setShowBookmarksList] = useState(false);
  const [viewMode, setViewMode] = useState<'text' | 'pdf'>(book?.pdfUrl ? 'pdf' : 'text');

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Sync page & viewMode if book changes
  useEffect(() => {
    if (book) {
      setCurrentPage(book.lastReadPage || 1);
      setViewMode(book.pdfUrl ? 'pdf' : 'text');
    }
  }, [book?.id, book?.pdfUrl]);

  // Aakhri Safha Yaad Rakhe (auto save last page to database)
  useEffect(() => {
    if (book && currentPage) {
      onUpdateProgress(book.id, currentPage);
    }
  }, [currentPage, book?.id]);

  // Scroll to top when page changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [currentPage]);

  // Unconditionally return null if not open or no book
  if (!isOpen || !book) return null;

  const totalPages = book.pages || 100;
  const isBookmarked = book.bookmarks?.includes(currentPage) || false;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      if (nextPage === totalPages) {
        confetti({ particleCount: 70, spread: 60 });
      }
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Render text content for current page
  const getCurrentPageContent = (): string => {
    if (!book.sampleChapters || book.sampleChapters.length === 0) {
      return `صفحہ نمبر ${currentPage} از ${book.title}\n\n${book.description}\n\nیہ کتاب مکتبہ حکیم الامت کے ڈیجیٹل سرور پر آن لائن مطالعہ کے لیے محفوظ کی گئی ہے۔ حقوق کی حفاظت کی خاطر ڈاؤنلوڈ کی اجازت نہیں ہے۔`;
    }

    const chapterIndex = Math.min(
      book.sampleChapters.length - 1,
      Math.floor(((currentPage - 1) / totalPages) * book.sampleChapters.length)
    );
    const chapter = book.sampleChapters[chapterIndex];
    return chapter ? `${chapter.title}\n\n${chapter.content}` : book.description;
  };

  const currentChapter = book.sampleChapters && book.sampleChapters.length > 0
    ? book.sampleChapters[Math.min(book.sampleChapters.length - 1, Math.floor(((currentPage - 1) / totalPages) * book.sampleChapters.length))]
    : null;

  // Theme Colors
  const getThemeStyles = () => {
    switch (theme) {
      case 'sepia':
        return {
          bg: 'bg-[#fcf5e5] text-[#3d2f1f]',
          bar: 'bg-[#f4e6ca] border-[#e4cf9f] text-[#3d2f1f]',
          accent: 'text-[#8b6528]',
        };
      case 'dark':
        return {
          bg: 'bg-[#121a15] text-[#e0e8e3]',
          bar: 'bg-[#1b2620] border-[#293d32] text-[#f0f5f2]',
          accent: 'text-[#c5a059]',
        };
      case 'light':
      default:
        return {
          bg: 'bg-[#ffffff] text-[#1c2921]',
          bar: 'bg-[#0d4a2e] border-[#c5a059]/40 text-white',
          accent: 'text-[#c5a059]',
        };
    }
  };

  const themeStyles = getThemeStyles();

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 flex flex-col ${themeStyles.bg} select-text transition-colors duration-200 animate-in fade-in`}
      dir="rtl"
    >
      {/* Top Header Bar */}
      <header className={`px-4 py-2.5 border-b flex items-center justify-between gap-3 ${themeStyles.bar} transition-colors z-20`}>
        {/* Right side: Close & Book Title in Urdu */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            title="مطالعہ بند کریں"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="min-w-0">
            <h2 className="font-bold text-xs sm:text-sm font-serif truncate">
              {book.title}
            </h2>
            <p className="text-[11px] opacity-80 font-serif truncate">
              {currentChapter ? currentChapter.title : book.author}
            </p>
          </div>
        </div>

        {/* Center: View Switcher or Protected Badge */}
        {book.pdfUrl ? (
          <div className="flex items-center bg-black/15 dark:bg-white/10 rounded-2xl p-1 text-xs font-serif">
            <button
              onClick={() => setViewMode('pdf')}
              className={`px-3 py-1 rounded-xl transition-all cursor-pointer ${
                viewMode === 'pdf' ? 'bg-[#c5a059] text-[#0d4a2e] font-bold shadow-xs' : 'opacity-80 hover:opacity-100'
              }`}
            >
              پی ڈی ایف نسخہ
            </button>
            <button
              onClick={() => setViewMode('text')}
              className={`px-3 py-1 rounded-xl transition-all cursor-pointer ${
                viewMode === 'text' ? 'bg-[#c5a059] text-[#0d4a2e] font-bold shadow-xs' : 'opacity-80 hover:opacity-100'
              }`}
            >
              سلیس مطالعہ
            </button>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 text-xs font-serif">
            <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>محفوظ آن لائن ریڈر</span>
          </div>
        )}

        {/* Left Controls: Bookmark, Font, Day/Night, Fullscreen */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Safha Mehfooz (Bookmark - صفحہ محفوظ کریں) */}
          <button
            onClick={() => onToggleBookmark(book.id, currentPage)}
            className={`p-2 rounded-xl transition-all cursor-pointer flex items-center gap-1 text-xs font-serif ${
              isBookmarked ? 'bg-[#c5a059] text-[#0d4a2e] font-bold' : 'hover:bg-white/10 opacity-80'
            }`}
            title={isBookmarked ? 'صفحہ محفوظ ہے' : 'صفحہ محفوظ کریں (بک مارک)'}
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4 fill-current" /> : <Bookmark className="w-4 h-4" />}
            <span className="hidden sm:inline">
              {isBookmarked ? 'محفوظ شدہ' : 'صفحہ محفوظ کریں'}
            </span>
          </button>

          {/* Bookmarks List */}
          <button
            onClick={() => setShowBookmarksList(!showBookmarksList)}
            className={`p-2 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition-colors relative ${
              showBookmarksList ? 'bg-black/20 dark:bg-white/20' : ''
            }`}
            title="محفوظ کردہ صفحات کی فہرست"
          >
            <List className="w-4 h-4" />
            {book.bookmarks && book.bookmarks.length > 0 && (
              <span className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-[#c5a059] text-[#0d4a2e] text-[9px] font-bold flex items-center justify-center font-sans">
                {book.bookmarks.length}
              </span>
            )}
          </button>

          {/* Day / Night / Font Settings Toggle */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition-colors ${
              showSettings ? 'bg-black/20 dark:bg-white/20' : ''
            }`}
            title="فونٹ اور موڈ کی ترتیبات"
          >
            <Sliders className="w-4 h-4" />
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition-colors hidden sm:inline-flex"
            title={isFullscreen ? 'عام اسکرین' : 'فل اسکرین'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Reading Progress Line */}
      <div className="w-full bg-black/10 h-1 overflow-hidden">
        <div
          className="bg-[#c5a059] h-full transition-all duration-300"
          style={{ width: `${Math.min(100, Math.round((currentPage / totalPages) * 100))}%` }}
        />
      </div>

      {/* Settings Drawer (Font Size, Day/Night Mode) */}
      {showSettings && (
        <div className={`p-4 border-b ${themeStyles.bar} flex flex-wrap items-center justify-between gap-4 text-xs z-30 shadow-md font-serif`}>
          {/* Day / Night Mode Controls */}
          <div className="flex items-center gap-2">
            <span className="font-bold opacity-80">مطالعہ موڈ:</span>
            <div className="flex items-center bg-black/10 dark:bg-white/10 p-1 rounded-xl gap-1">
              <button
                onClick={() => setTheme('light')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-all ${
                  theme === 'light' ? 'bg-white text-stone-900 shadow-xs' : 'opacity-70'
                }`}
              >
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                دن کا موڈ
              </button>
              <button
                onClick={() => setTheme('sepia')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-all ${
                  theme === 'sepia' ? 'bg-[#fcf5e5] text-[#3d2f1f] shadow-xs' : 'opacity-70'
                }`}
              >
                <Coffee className="w-3.5 h-3.5 text-amber-700" />
                زردی مائل
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-all ${
                  theme === 'dark' ? 'bg-stone-900 text-stone-100 shadow-xs' : 'opacity-70'
                }`}
              >
                <Moon className="w-3.5 h-3.5 text-[#c5a059]" />
                رات کا موڈ
              </button>
            </div>
          </div>

          {/* Font Size (خط کا سائز) */}
          <div className="flex items-center gap-2">
            <span className="font-bold opacity-80">خط کا سائز:</span>
            <div className="flex items-center bg-black/10 dark:bg-white/10 p-1 rounded-xl gap-1">
              <button
                onClick={() => setFontSize(Math.max(15, fontSize - 2))}
                className="px-3 py-1 rounded-lg font-bold hover:bg-black/10 dark:hover:bg-white/10"
                title="خط چھوٹا کریں"
              >
                الف -
              </button>
              <span className="px-2 font-mono font-bold">{fontSize}</span>
              <button
                onClick={() => setFontSize(Math.min(30, fontSize + 2))}
                className="px-3 py-1 rounded-lg font-bold hover:bg-black/10 dark:hover:bg-white/10"
                title="خط بڑا کریں"
              >
                الف +
              </button>
            </div>
          </div>

          <button
            onClick={() => setShowSettings(false)}
            className="px-3 py-1 bg-[#c5a059] text-[#0d4a2e] rounded-lg font-bold mr-auto"
          >
            مکمل
          </button>
        </div>
      )}

      {/* Bookmarks List View */}
      {showBookmarksList && (
        <div className={`p-4 border-b ${themeStyles.bar} text-xs z-30 shadow-md font-serif`}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-sm flex items-center gap-1.5 text-[#c5a059]">
              <Bookmark className="w-4 h-4 fill-current" />
              محفوظ شدہ صفحات ({book.bookmarks?.length || 0})
            </span>
            <button
              onClick={() => setShowBookmarksList(false)}
              className="p-1 rounded hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {book.bookmarks && book.bookmarks.length > 0 ? (
            <div className="flex flex-wrap gap-2 pt-1">
              {book.bookmarks.map((bmPage) => (
                <button
                  key={bmPage}
                  onClick={() => {
                    setCurrentPage(bmPage);
                    setShowBookmarksList(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 transition-colors cursor-pointer ${
                    bmPage === currentPage
                      ? 'bg-[#c5a059] text-[#0d4a2e] border-[#c5a059] font-bold'
                      : 'bg-white/80 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border-stone-200 dark:border-stone-700'
                  }`}
                >
                  <span>صفحہ {bmPage}</span>
                  <span className="text-[10px] opacity-75 font-sans">
                    ({Math.round((bmPage / totalPages) * 100)}%)
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <p className="opacity-70 py-1">
              کوئی صفحہ محفوظ نہیں ہے۔ اوپر دیئے گئے "صفحہ محفوظ کریں" بٹن پر کلک کر کے کسی بھی صفحہ کو محفوظ فرمائیں۔
            </p>
          )}
        </div>
      )}

      {/* Reading Canvas */}
      <main className="flex-1 overflow-hidden relative flex justify-center">
        {viewMode === 'pdf' && book.pdfUrl ? (
          <div className="w-full h-full bg-stone-900 flex flex-col items-center justify-center">
            <iframe
              src={`${book.pdfUrl}#page=${currentPage}&toolbar=0&navpanes=0`}
              title={book.title}
              className="w-full h-full border-none"
            />
          </div>
        ) : (
          <div
            ref={contentRef}
            className="flex-1 overflow-y-auto px-4 sm:px-12 py-8 flex justify-center scroll-smooth"
          >
            <div
              className="max-w-2xl w-full min-h-full flex flex-col justify-between"
              style={{
                fontSize: `${fontSize}px`,
                lineHeight: 2.3,
              }}
            >
            {/* Page Body */}
            <div>
              {currentChapter && (
                <div className="mb-6 pb-3 border-b border-black/10 dark:border-white/10">
                  <span className="text-xs uppercase tracking-wider font-bold opacity-60 block mb-1 font-serif text-[#c5a059]">
                    باب {Math.min(book.sampleChapters?.length || 1, Math.floor(((currentPage - 1) / totalPages) * (book.sampleChapters?.length || 1)) + 1)}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif tracking-tight text-[#0d4a2e] dark:text-[#c5a059]">
                    {currentChapter.title}
                  </h3>
                </div>
              )}

              <div className="whitespace-pre-wrap font-serif leading-loose space-y-4">
                {getCurrentPageContent()}
              </div>
            </div>

            {/* End of Page marker */}
            <div className="pt-12 pb-4 text-center text-xs opacity-60 flex items-center justify-center gap-2 font-serif">
              <span>—</span>
              <span>صفحہ {currentPage} از {totalPages}</span>
              <span>—</span>
            </div>
          </div>
        </div>
        )}

        {/* Side Next / Prev Floating Arrow Buttons */}
        <button
          onClick={handleNextPage}
          disabled={currentPage >= totalPages}
          className={`absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 backdrop-blur-xs transition-opacity ${
            currentPage >= totalPages ? 'opacity-0 pointer-events-none' : 'opacity-80 hover:opacity-100'
          }`}
          title="اگلا صفحہ"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handlePrevPage}
          disabled={currentPage <= 1}
          className={`absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 backdrop-blur-xs transition-opacity ${
            currentPage <= 1 ? 'opacity-0 pointer-events-none' : 'opacity-80 hover:opacity-100'
          }`}
          title="پچھلا صفحہ"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </main>

      {/* Bottom Footer Bar: Scrubber, Navigation, Last Page Memory Status */}
      <footer className={`px-4 sm:px-8 py-3 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${themeStyles.bar} z-20 font-serif`}>
        {/* Next / Previous Buttons */}
        <div className="flex items-center gap-2 order-2 sm:order-1">
          <button
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            className="px-3.5 py-1.5 rounded-xl border border-black/20 dark:border-white/20 hover:bg-black/10 dark:hover:bg-white/10 text-xs font-bold flex items-center gap-1 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
            <span>پچھلا صفحہ</span>
          </button>

          <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className="px-4 py-1.5 rounded-xl bg-[#c5a059] text-[#0d4a2e] hover:bg-[#b08b45] text-xs font-bold flex items-center gap-1 shadow-xs disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          >
            <span>اگلا صفحہ</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Center Slider Scrubber */}
        <div className="w-full sm:max-w-md flex items-center gap-3 order-1 sm:order-2">
          <span className="text-xs font-bold min-w-[3.5rem] text-left font-serif">
            صفحہ {currentPage}
          </span>
          <input
            type="range"
            min={1}
            max={totalPages}
            value={currentPage}
            onChange={(e) => setCurrentPage(parseInt(e.target.value, 10))}
            className="w-full accent-[#c5a059] cursor-pointer h-1.5 bg-black/20 dark:bg-white/20 rounded-lg appearance-none"
          />
          <span className="text-xs opacity-75 min-w-[3.5rem] font-serif">
            کل {totalPages}
          </span>
        </div>

        {/* Right Info: "Aakhri Safha Yaad Rakhe" status */}
        <div className="text-[11px] opacity-80 hidden md:block order-3">
          ✓ آخری صفحہ خود بخود محفوظ ہے
        </div>
      </footer>
    </div>
  );
};
