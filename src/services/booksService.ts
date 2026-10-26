import { Book, BookCategory } from '../types/book';
import { initialBooksData } from './initialBooksData';

const BOOKS_STORAGE_KEY = 'maktaba_books_data_v2';
const USER_PROGRESS_KEY = 'maktaba_user_progress';

class BooksService {
  private books: Book[] = [];

  constructor() {
    this.init();
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
    return book.isFavorite;
  }

  async updateReadingProgress(bookId: string, page: number): Promise<void> {
    const book = this.books.find(b => b.id === bookId);
    if (!book) return;

    book.lastReadPage = page;
    book.lastReadTimestamp = Date.now();
    book.readsCount = (book.readsCount || 0) + 1;
    this.save();
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
    return book.bookmarks;
  }

  private save() {
    try {
      localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(this.books));
    } catch (e) {
      console.warn('Failed to save books:', e);
    }
  }
}

export const booksService = new BooksService();
