import React, { useState, useEffect, useMemo } from 'react';
import { AppHeader } from './components/AppHeader';
import { CategoryChipsBar } from './components/CategoryChipsBar';
import { UrduBooksSlider } from './components/UrduBooksSlider';
import { BookCard } from './components/BookCard';
import { BookDetailModal } from './components/BookDetailModal';
import { PdfReaderModal } from './components/PdfReaderModal';
import { AuthModal } from './components/AuthModal';
import { BottomNavBar } from './components/BottomNavBar';
import { CategoriesView } from './components/CategoriesView';
import { FavoritesView } from './components/FavoritesView';
import { ReadingListView } from './components/ReadingListView';
import { ProfileView } from './components/ProfileView';

import { booksService } from './services/booksService';
import { authService } from './services/authService';
import { Book, BookCategory, UserProfile } from './types/book';
import { Search, BookOpen, Heart, Library } from 'lucide-react';

export default function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [user, setUser] = useState<UserProfile | null>(authService.getCurrentUser());
  const [isLoading, setIsLoading] = useState(true);

  // Navigation & Search
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<BookCategory | 'تمام کتب'>('تمام کتب');

  // Modals
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [readingBook, setReadingBook] = useState<Book | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Initialize books and subscribe to auth
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const data = await booksService.getAllBooks();
        setBooks(data);
      } catch (err) {
        console.error('Failed to load books:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();

    const unsubscribe = authService.subscribe((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  // Toggle favorite
  const handleToggleFavorite = async (bookId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const isFav = await booksService.toggleFavorite(bookId);
    setBooks((prev) =>
      prev.map((b) => (b.id === bookId ? { ...b, isFavorite: isFav } : b))
    );
    if (selectedBook && selectedBook.id === bookId) {
      setSelectedBook((prev) => (prev ? { ...prev, isFavorite: isFav } : null));
    }
  };

  // Update reading progress
  const handleUpdateProgress = async (bookId: string, page: number) => {
    await booksService.updateReadingProgress(bookId, page);
    setBooks((prev) =>
      prev.map((b) =>
        b.id === bookId
          ? { ...b, lastReadPage: page, lastReadTimestamp: Date.now() }
          : b
      )
    );
    if (selectedBook && selectedBook.id === bookId) {
      setSelectedBook((prev) =>
        prev ? { ...prev, lastReadPage: page, lastReadTimestamp: Date.now() } : null
      );
    }
  };

  // Toggle bookmark
  const handleToggleBookmark = async (bookId: string, page: number) => {
    const bookmarks = await booksService.toggleBookmark(bookId, page);
    setBooks((prev) =>
      prev.map((b) => (b.id === bookId ? { ...b, bookmarks } : b))
    );
    if (selectedBook && selectedBook.id === bookId) {
      setSelectedBook((prev) => (prev ? { ...prev, bookmarks } : null));
    }
    if (readingBook && readingBook.id === bookId) {
      setReadingBook((prev) => (prev ? { ...prev, bookmarks } : null));
    }
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    return books.reduce((acc, b) => {
      acc[b.category] = (acc[b.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [books]);

  // Section 1: "نئی شامل شدہ کتب" (New Added Books)
  const newAddedBooks = useMemo(() => {
    return books.filter((b) => b.isNew || b.publishedYear?.includes('جدید')).slice(0, 8);
  }, [books]);

  // Section 2: "سب سے زیادہ پڑھی جانے والی" (Most Read / Popular)
  const popularBooks = useMemo(() => {
    return [...books].sort((a, b) => (b.readsCount || 0) - (a.readsCount || 0)).slice(0, 8);
  }, [books]);

  // Filtered books for grid
  const filteredBooks = useMemo(() => {
    return books.filter((b) => {
      const matchSearch =
        !searchQuery.trim() ||
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCat =
        selectedCategory === 'تمام کتب' || b.category === selectedCategory;

      return matchSearch && matchCat;
    });
  }, [books, searchQuery, selectedCategory]);

  const favoritesCount = useMemo(() => books.filter((b) => b.isFavorite).length, [books]);
  const inProgressCount = useMemo(
    () => books.filter((b) => b.lastReadPage && b.lastReadPage > 1).length,
    [books]
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9f7] text-[#1c2921] font-serif antialiased" dir="rtl">
      
      {/* 1. Header with Salam and Urdu Search Bar */}
      <AppHeader
        user={user}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenProfile={() => setActiveTab('profile')}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5">
        
        {isLoading ? (
          <div className="py-28 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full border-4 border-[#0d4a2e]/20 border-t-[#0d4a2e] animate-spin mb-4" />
            <h3 className="font-bold text-[#0d4a2e] text-lg font-serif">مکتبہ حکیم الامت کھل رہا ہے...</h3>
            <p className="text-xs text-stone-500 font-serif mt-1">کتب کا ذخیرہ لوڈ ہو رہا ہے</p>
          </div>
        ) : (
          <>
            {/* TAB 1: HOME SCREEN (صفحہ اول) */}
            {activeTab === 'home' && (
              <div className="space-y-6 animate-in fade-in pb-20">
                
                {/* Search Feedback Banner if active */}
                {searchQuery.trim() && (
                  <div className="p-4 bg-[#0d4a2e]/5 rounded-2xl border border-[#c5a059]/40 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-[#0d4a2e]" />
                      <span className="text-xs sm:text-sm font-bold text-[#0d4a2e]">
                        نتائج برائے تلاش: <span className="underline">"{searchQuery}"</span>
                      </span>
                    </div>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-xs font-bold text-[#c5a059] hover:underline"
                    >
                      تلاش ختم کریں
                    </button>
                  </div>
                )}

                {/* 9 Category Chips (Scroll horizontally) */}
                {!searchQuery && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h2 className="text-xs font-bold font-serif text-[#0d4a2e]">
                        اہم زمرہ جات (Categories)
                      </h2>
                      <button
                        onClick={() => setActiveTab('categories')}
                        className="text-xs font-bold text-[#c5a059] hover:underline"
                      >
                        تمام 9 زمرے &larr;
                      </button>
                    </div>
                    <CategoryChipsBar
                      selectedCategory={selectedCategory}
                      onSelectCategory={setSelectedCategory}
                      categoryCounts={categoryCounts}
                    />
                  </div>
                )}

                {/* Section 1: نئی شامل شدہ کتب (New Added Books slider) */}
                {!searchQuery && selectedCategory === 'تمام کتب' && (
                  <UrduBooksSlider
                    title="نئی شامل شدہ کتب"
                    subtitle="تازہ ترین شامل کیے گئے اسلامی و ادبی متون"
                    iconType="sparkles"
                    books={newAddedBooks}
                    onSelect={(book) => setSelectedBook(book)}
                    onRead={(book, e) => {
                      if (e) e.stopPropagation();
                      setReadingBook(book);
                    }}
                  />
                )}

                {/* Section 2: سب سے زیادہ پڑھی جانے والی (Most Read / Popular slider) */}
                {!searchQuery && selectedCategory === 'تمام کتب' && (
                  <UrduBooksSlider
                    title="سب سے زیادہ پڑھی جانے والی"
                    subtitle="قارئینِ مکتبہ کے پسندیدہ اور معروف ترین کتب و رسائل"
                    iconType="flame"
                    books={popularBooks}
                    onSelect={(book) => setSelectedBook(book)}
                    onRead={(book, e) => {
                      if (e) e.stopPropagation();
                      setReadingBook(book);
                    }}
                  />
                )}

                {/* Section 3: تمام کتب (Grid view of all books) */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-[#0d4a2e] font-serif tracking-tight flex items-center gap-2">
                        <span>
                          {selectedCategory === 'تمام کتب' ? 'تمام کتبِ مکتبہ' : `${selectedCategory} کی کتب`}
                        </span>
                        <span className="text-xs font-sans font-bold px-2 py-0.5 rounded-full bg-[#0d4a2e]/10 text-[#0d4a2e]">
                          {filteredBooks.length}
                        </span>
                      </h2>
                      <p className="text-xs text-stone-500 font-serif">
                        سرورق، عنوانِ کتاب اور مصنف کے نام کے ساتھ فہرست
                      </p>
                    </div>
                  </div>

                  {filteredBooks.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
                      {filteredBooks.map((book) => (
                        <BookCard
                          key={book.id}
                          book={book}
                          onSelect={(b) => setSelectedBook(b)}
                          onRead={(b, e) => {
                            if (e) e.stopPropagation();
                            setReadingBook(b);
                          }}
                          onToggleFavorite={handleToggleFavorite}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-300 p-8">
                      <BookOpen className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                      <h3 className="text-base font-bold text-stone-700 font-serif">کوئی کتاب نہیں ملی</h3>
                      <p className="text-xs text-stone-500 font-serif max-w-sm mx-auto mt-1 mb-4">
                        آپ کی تلاش کے مطابق کوئی نتیجہ نہیں ملا۔ براہ کرم کوئی دوسرا لفظ تلاش کریں۔
                      </p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('تمام کتب');
                        }}
                        className="px-4 py-2 bg-[#0d4a2e] text-[#c5a059] rounded-xl text-xs font-bold font-serif"
                      >
                        تمام کتب دکھائیں
                      </button>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* TAB 2: زمرہ جات (Categories View) */}
            {activeTab === 'categories' && (
              <CategoriesView
                books={books}
                onSelectBook={(b) => setSelectedBook(b)}
                onReadBook={(b, e) => {
                  if (e) e.stopPropagation();
                  setReadingBook(b);
                }}
                onToggleFavorite={handleToggleFavorite}
              />
            )}

            {/* TAB 3: زیرِ مطالعہ (My Reading List) */}
            {activeTab === 'reading' && (
              <ReadingListView
                books={books}
                onSelectBook={(b) => setSelectedBook(b)}
                onReadBook={(b) => setReadingBook(b)}
                onExplore={() => setActiveTab('home')}
              />
            )}

            {/* TAB 4: پسندیدہ (Favorites View) */}
            {activeTab === 'favorites' && (
              <FavoritesView
                books={books}
                onSelectBook={(b) => setSelectedBook(b)}
                onReadBook={(b, e) => {
                  if (e) e.stopPropagation();
                  setReadingBook(b);
                }}
                onToggleFavorite={handleToggleFavorite}
                onExplore={() => setActiveTab('home')}
              />
            )}

            {/* TAB 5: پروفائل (Profile View) */}
            {activeTab === 'profile' && (
              <ProfileView
                user={user}
                books={books}
                onLogout={async () => {
                  await authService.logout();
                }}
                onOpenAuth={() => setIsAuthOpen(true)}
                onNavigateToFavorites={() => setActiveTab('favorites')}
                onNavigateToReading={() => setActiveTab('reading')}
              />
            )}
          </>
        )}
      </main>

      {/* Book Detail Modal */}
      {selectedBook && (
        <BookDetailModal
          book={selectedBook}
          isOpen={true}
          onClose={() => setSelectedBook(null)}
          onRead={(book) => {
            setSelectedBook(null);
            setReadingBook(book);
          }}
          onToggleFavorite={(id) => handleToggleFavorite(id)}
        />
      )}

      {/* Built-in PDF Reader Modal (Online reading only, no download) */}
      {readingBook && (
        <PdfReaderModal
          book={readingBook}
          isOpen={true}
          onClose={() => setReadingBook(null)}
          onUpdateProgress={handleUpdateProgress}
          onToggleBookmark={handleToggleBookmark}
        />
      )}

      {/* User Authentication Modal (Login / Signup / Forgot Password) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(u) => setUser(u)}
      />

      {/* Android Bottom Navigation Bar */}
      <BottomNavBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        favoritesCount={favoritesCount}
        inProgressCount={inProgressCount}
      />

    </div>
  );
}
