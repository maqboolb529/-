import { Book } from '../types/book';
import { initialBooksData } from './initialBooksData';
import { db, auth, testConnection } from './firebase';
import { collection, onSnapshot, doc, setDoc, getDocs } from 'firebase/firestore';
import { backblazeService } from './backblazeService';

const BOOKS_STORAGE_KEY = 'maktaba_books_data_v2';

class BooksService {
  private books: Book[] = [];
  private listeners: ((books: Book[]) => void)[] = [];

  constructor() {
    this.init();
    this.setupFirestoreSync();
  }

  private init() {
    try {
      const stored = localStorage.getItem(BOOKS_STORAGE_KEY);
      if (stored) {
        this.books = JSON.parse(stored);
      } else {
        this.books = initialBooksData;
        localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(initialBooksData));
      }
    } catch {
      this.books = initialBooksData;
    }
  }

  // Real-time synchronization with Firebase Firestore
  private async setupFirestoreSync() {
    try {
      await testConnection();
      const booksColRef = collection(db, 'books');

      onSnapshot(booksColRef, (snapshot) => {
        if (!snapshot.empty) {
          const remoteBooks: Book[] = snapshot.docs.map(docSnap => {
            const data = docSnap.data();
            const b2PdfUrl = data.pdfFileName
              ? backblazeService.getPdfUrl(data.pdfFileName)
              : data.pdfUrl || '';

            return {
              id: docSnap.id,
              title: data.title || 'بلا عنوان',
              author: data.author || '',
              category: data.category || 'اردو',
              description: data.description || '',
              pages: data.pages || 100,
              coverUrl: data.coverUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800',
              pdfUrl: b2PdfUrl,
              readsCount: data.readsCount || 0,
              rating: data.rating || 5.0,
              isFavorite: false,
              publishedYear: data.publishedYear || '',
              publisher: data.publisher || '',
              isNew: data.isNew ?? true,
              isPopular: data.isPopular ?? false,
              sampleChapters: data.sampleChapters || [],
            };
          });

          // Merge with local progress
          this.books = remoteBooks.map(rb => {
            const local = this.books.find(lb => lb.id === rb.id);
            return {
              ...rb,
              isFavorite: local?.isFavorite || false,
              lastReadPage: local?.lastReadPage || 1,
              bookmarks: local?.bookmarks || [],
            };
          });

          this.save();
          this.notify();
        }
      }, (err) => {
        console.warn('Firestore books listener note:', err);
      });
    } catch (e) {
      console.warn('Firestore sync setup note:', e);
    }
  }

  subscribe(callback: (books: Book[]) => void) {
    this.listeners.push(callback);
    callback(this.books);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  private notify() {
    this.listeners.forEach(l => l(this.books));
  }

  async getAllBooks(): Promise<Book[]> {
    return this.books;
  }

  async getBookById(id: string): Promise<Book | null> {
    return this.books.find(b => b.id === id) || null;
  }

  async toggleFavorite(bookId: string): Promise<boolean> {
    const book = this.books.find(b => b.id === bookId);
    if (!book) return false;

    book.isFavorite = !book.isFavorite;
    this.save();
    this.notify();

    // Sync to Firestore if user logged in
    const user = auth.currentUser;
    if (user) {
      try {
        const favRef = doc(db, 'users', user.uid, 'favorites', bookId);
        await setDoc(favRef, {
          bookId,
          isFavorite: book.isFavorite,
          updatedAt: Date.now()
        }, { merge: true });
      } catch (e) {
        console.warn('Favorite sync to Firestore note:', e);
      }
    }

    return book.isFavorite;
  }

  async updateReadingProgress(bookId: string, page: number): Promise<void> {
    const book = this.books.find(b => b.id === bookId);
    if (!book) return;

    book.lastReadPage = page;
    book.lastReadTimestamp = Date.now();
    book.readsCount = (book.readsCount || 0) + 1;
    this.save();
    this.notify();

    // Sync to Firestore if user logged in
    const user = auth.currentUser;
    if (user) {
      try {
        const progRef = doc(db, 'users', user.uid, 'readingProgress', bookId);
        await setDoc(progRef, {
          bookId,
          lastReadPage: page,
          lastReadTimestamp: Date.now(),
          bookmarks: book.bookmarks || []
        }, { merge: true });
      } catch (e) {
        console.warn('Progress sync to Firestore note:', e);
      }
    }
  }

  async toggleBookmark(bookId: string, page: number): Promise<number[]> {
    const book = this.books.find(b => b.id === bookId);
    if (!book) return [];

    if (!book.bookmarks) book.bookmarks = [];
    const index = book.bookmarks.indexOf(page);
    if (index > -1) {
      book.bookmarks.splice(index, 1);
    } else {
      book.bookmarks.push(page);
      book.bookmarks.sort((a, b) => a - b);
    }
    this.save();
    this.notify();

    const user = auth.currentUser;
    if (user) {
      try {
        const progRef = doc(db, 'users', user.uid, 'readingProgress', bookId);
        await setDoc(progRef, {
          bookmarks: book.bookmarks
        }, { merge: true });
      } catch (e) {
        console.warn('Bookmark sync note:', e);
      }
    }

    return book.bookmarks;
  }

  private save() {
    try {
      localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(this.books));
    } catch (e) {
      console.warn('Failed to save books to storage:', e);
    }
  }
}

export const booksService = new BooksService();
