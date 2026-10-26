import React from 'react';
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
  Layers 
} from 'lucide-react';
import { BookCategory } from '../types/book';

export interface CategoryMeta {
  id: BookCategory | 'تمام کتب';
  title: string;
  icon: React.ElementType;
}

export const EXACT_9_CATEGORIES: CategoryMeta[] = [
  { id: 'تمام کتب', title: 'تمام کتب', icon: Layers },
  { id: 'درس نظامی', title: 'درس نظامی', icon: GraduationCap },
  { id: 'حکیم الامت اشرف علی تھانوی', title: 'حکیم الامت اشرف علی تھانوی', icon: Award },
  { id: 'شیخ الاسلام مفتی محمد تقی عثمانی', title: 'شیخ الاسلام مفتی محمد تقی عثمانی', icon: Scale },
  { id: 'علماء دیوبند', title: 'علماء دیوبند', icon: Landmark },
  { id: 'سیاسی', title: 'سیاسی', icon: Compass },
  { id: 'شاعری', title: 'شاعری', icon: Feather },
  { id: 'عربی', title: 'عربی', icon: Languages },
  { id: 'اردو', title: 'اردو', icon: BookText },
  { id: 'انگلش', title: 'انگلش', icon: Globe },
];

interface CategoryChipsBarProps {
  selectedCategory: BookCategory | 'تمام کتب';
  onSelectCategory: (cat: BookCategory | 'تمام کتب') => void;
  categoryCounts?: Record<string, number>;
}

export const CategoryChipsBar: React.FC<CategoryChipsBarProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts = {},
}) => {
  return (
    <div className="py-2 overflow-x-auto scrollbar-none no-scrollbar" dir="rtl">
      <div className="flex items-center gap-2 pb-1 min-w-max">
        {EXACT_9_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const Icon = cat.icon;
          const count = cat.id === 'تمام کتب' 
            ? Object.values(categoryCounts).reduce((a, b) => a + b, 0)
            : (categoryCounts[cat.id] || 0);

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-xs border ${
                isSelected
                  ? 'bg-[#0d4a2e] text-[#c5a059] border-[#c5a059] shadow-[#0d4a2e]/25 ring-2 ring-[#c5a059]/40'
                  : 'bg-white hover:bg-emerald-50/50 text-stone-700 border-stone-200/80 hover:border-[#c5a059]/50'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#c5a059]' : 'text-[#0d4a2e]'}`} />
              <span className="font-serif text-xs sm:text-sm tracking-wide">{cat.title}</span>
              {count > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-sans font-bold ${
                  isSelected ? 'bg-[#c5a059] text-[#0d4a2e]' : 'bg-stone-100 text-stone-600'
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
