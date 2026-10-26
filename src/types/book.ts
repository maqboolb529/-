export type BookCategory =
  | 'درس نظامی'
  | 'حکیم الامت اشرف علی تھانوی'
  | 'شیخ الاسلام مفتی محمد تقی عثمانی'
  | 'علماء دیوبند'
  | 'سیاسی'
  | 'شاعری'
  | 'عربی'
  | 'اردو'
  | 'انگلش';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
  isAnonymous?: boolean;
  joinedAt?: number;
}

export interface Book {
  id: string;
  title: string;              // عنوان کتاب
  author: string;             // مصنف
  category: BookCategory;     // زمرہ
  description: string;        // مختصر تعارف
  pages: number;              // کل صفحات
  coverUrl: string;           // سرورق تصویر
  pdfUrl?: string;            // پی ڈی ایف ربط برائے آن لائن مطالعہ
  sampleChapters?: {
    title: string;
    content: string;
  }[];
  readsCount: number;         // تعداد مطالعہ
  rating: number;             // درجہ بندی
  isFavorite?: boolean;       // پسندیدہ
  lastReadPage?: number;      // آخری پڑھا گیا صفحہ
  lastReadTimestamp?: number; // وقت مطالعہ
  bookmarks?: number[];       // محفوظ کردہ صفحات
  publishedYear?: string;     // اشاعت
  publisher?: string;         // ناشر
  isNew?: boolean;            // نئی شامل شدہ
  isPopular?: boolean;        // سب سے زیادہ پڑھی جانے والی
}

export interface CategoryItem {
  id: BookCategory;
  title: string;
  iconName: string;
  description: string;
}
