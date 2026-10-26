import { Book } from '../types/book';

export const initialBooksData: Book[] = [
  // 1. حکیم الامت اشرف علی تھانوی
  {
    id: 'thanvi-bahishti-zewar',
    title: 'بہشتی زیور (مکمل و مدلل)',
    author: 'حکیم الامت مولانا اشرف علی تھانویؒ',
    category: 'حکیم الامت اشرف علی تھانوی',
    description: 'برصغیر پاک و ہند کا وہ شہرہ آفاق اسلامی و فقہی شاہکار جو ہر مسلمان گھرانے کی بنیادی ضرورت ہے۔ اس میں عقائد، طہارت، نماز، روزہ، زکوٰۃ، حج، نکاح، طلاق، معاملات اور اخلاق و آداب کے تفصیلی اور مستند مسائل بیان کیے گئے ہیں۔',
    pages: 640,
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800',
    readsCount: 14200,
    rating: 5.0,
    isFavorite: true,
    lastReadPage: 18,
    lastReadTimestamp: Date.now() - 3600000 * 2,
    bookmarks: [18, 45],
    publishedYear: 'اشاعت: مکتبہ تھانوی',
    publisher: 'ادارہ اسلامیات، لاہور',
    isNew: true,
    isPopular: true,
    sampleChapters: [
      {
        title: 'حصہ اول: عقائد کا بیان',
        content: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
الحمد لله رب العالمين والصلاة والسلام على رسوله محمد وآله وصحبه أجمعين۔

ایمان کا بیان:
مسلمان ہونے کے واسطے سب سے اول جس چیز کی ضرورت ہے وہ ایمان ہے یعنی دل سے سچے دل سے یقین لانا اور زبان سے اقرار کرنا کہ اللہ تعالیٰ ایک ہے، اس کا کوئی شریک نہیں، وہ سب کا پیدا کرنے والا، سب کا مالک اور رازق ہے۔

رسول اللہ صلی اللہ علیہ وسلم اللہ کے برحق رسول اور آخری نبی ہیں۔ آپ کے بعد کوئی نیا نبی نہیں آ سکتا۔ جو شخص اس کے خلاف عقیدہ رکھے وہ اسلام کے دائرے سے خارج ہے۔`
      },
      {
        title: 'حصہ دوم: طہارت اور وضو کے مسائل',
        content: `وضو کے فرائض:
وضو میں چار چیزیں فرض ہیں:
1. منہ دھونا (پیشانی کے بالوں سے ٹھوڑی کے نیچے تک اور ایک کان کی لو سے دوسرے کان کی لو تک)۔
2. دونوں ہاتھ کہنیوں سمیت دھونا۔
3. چوتھائی سر کا مسح کرنا۔
4. دونوں پاؤں ٹخنوں سمیت دھونا۔

اگر ان میں سے ایک بال برابر جگہ بھی خشک رہ گئی تو وضو نہیں ہوگا اور نماز درست نہیں ہوگی۔`
      }
    ]
  },
  {
    id: 'thanvi-munajaat-maqbool',
    title: 'مناجاتِ مقبول (مع حاشیہ)',
    author: 'حکیم الامت مولانا اشرف علی تھانویؒ',
    category: 'حکیم الامت اشرف علی تھانوی',
    description: 'قرآن کریم اور احادیثِ مبارکہ سے منتخب کی گئی پرتاثیر اور جامع دعاؤں کا روزمرہ وظیفہ جو سات منزلوں پر تقسیم کیا گیا ہے تاکہ ہر روز ایک منزل آسانی سے تلاوت کی جا سکے۔',
    pages: 180,
    coverUrl: 'https://images.unsplash.com/photo-1584281722572-88d407adcb53?auto=format&fit=crop&q=80&w=800',
    readsCount: 9800,
    rating: 4.9,
    isFavorite: true,
    lastReadPage: 5,
    bookmarks: [5],
    publishedYear: 'مستند طباعت',
    publisher: 'مکتبہ معارف القرآن، کراچی',
    isNew: false,
    isPopular: true,
    sampleChapters: [
      {
        title: 'منزل اول: یوم الجمعہ (جمعہ کا دن)',
        content: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
اللَّهُمَّ إِنِّي أَسْأَلُكَ الثَّبَاتَ فِي الأَمْرِ، وَالْعَزِيمَةَ عَلَى الرُّشْدِ، وَأَسْأَلُكَ مُوجِبَاتِ رَحْمَتِكَ، وَعَزَائِمَ مَغْفِرَتِكَ، وَأَسْأَلُكَ شُكْرَ نِعْمَتِكَ، وَحُسْنَ عِبَادَتِكَ۔

اے اللہ! میں تجھ سے دین کے معاملے میں ثابت قدمی مانگتا ہوں، اور ہدایت پر پختگی کا طلبگار ہوں۔ میں تجھ سے تیری رحمت کے اسباب، تیری بخشش کے قطعی وعدے، تیری نعمتوں کا شکر اور تیری بہترین عبادت کی توفیق مانگتا ہوں۔`
      }
    ]
  },
  {
    id: 'thanvi-altaqashuf',
    title: 'التکشف عن مہمات التصوف',
    author: 'حکیم الامت مولانا اشرف علی تھانویؒ',
    category: 'حکیم الامت اشرف علی تھانوی',
    description: 'سلوک و احسان اور تصوفِ اسلامی کو قرآن و سنت کی روشنی میں مدون کرنے والی ایک بے نظیر کتاب جس میں تصوف کے اصطلاحات اور روحانی مدارج کی حکیمانہ تشریح فرمائی گئی ہے۔',
    pages: 450,
    coverUrl: 'https://images.unsplash.com/photo-1507842229451-7971b32932e3?auto=format&fit=crop&q=80&w=800',
    readsCount: 6300,
    rating: 4.95,
    isFavorite: false,
    publishedYear: '1330ھ',
    publisher: 'ادارۃ التالیفات اشرفیہ، ملتان',
    isNew: false,
    isPopular: false,
    sampleChapters: [
      {
        title: 'مقدمہ: حقیقتِ تصوف',
        content: `تصوف محض چند رسوم اور اوراد و وظائف کا نام نہیں بلکہ یہ ظاہر و باطن کو شریعتِ محمدیہ کے مطابق سنوارنے اور رذائلِ اخلاق سے پاک کر کے فضائل سے آراستہ کرنے کا علم ہے۔`
      }
    ]
  },

  // 2. شیخ الاسلام مفتی محمد تقی عثمانی
  {
    id: 'taqi-asan-tarjuma-quran',
    title: 'آسان ترجمہ قرآن (مع تشریحات)',
    author: 'شیخ الاسلام مفتی محمد تقی عثمانی مدظلہ',
    category: 'شیخ الاسلام مفتی محمد تقی عثمانی',
    description: 'عصرِ حاضر کا سب سے مقبول، سلیس اور مستند اردو ترجمہ و تفسیری حواشی۔ انتہائی آسان، عام فہم اور باوقار انداز میں قرآنی تعلیمات اور احکام کو واضح کیا گیا ہے۔',
    pages: 1250,
    coverUrl: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800',
    readsCount: 28500,
    rating: 5.0,
    isFavorite: true,
    lastReadPage: 32,
    lastReadTimestamp: Date.now() - 3600000,
    bookmarks: [1, 32],
    publishedYear: 'طبع جدید',
    publisher: 'مکتبہ معارف القرآن، کراچی',
    isNew: true,
    isPopular: true,
    sampleChapters: [
      {
        title: 'سورۃ الفاتحۃ (مکیہ)',
        content: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
(1) شروع اللہ کے نام سے جو سب پر مہربان ہے، بہت رحم والا ہے۔
(2) تمام تعریفیں اللہ ہی کے لیے ہیں جو تمام جہانوں کا پروردگار ہے۔
(3) جو سب پر مہربان ہے، بہت رحم والا ہے۔
(4) جو جزا اور سزا کے دن کا مالک ہے۔
(5) ہم صرف تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد مانگتے ہیں۔
(6) ہمیں سیدھے راستے کی ہدایت فرما۔
(7) ان لوگوں کے راستے کی جن پر تو نے انعام فرمایا، نہ کہ ان کے راستے کی جن پر تیرا غضب نازل ہوا اور نہ گمراہوں کے راستے۔

تشریحی نوٹ:
سورۃ الفاتحہ قرآن کریم کا خلاصہ اور دعا کا کامل ترین طریقہ سکھاتی ہے کہ پہلے رب تعالیٰ کی حمد و ثناء بیان کی جائے، پھر اس سے صراطِ مستقیم کی توفیق طلب کی جائے۔`
      }
    ]
  },
  {
    id: 'taqi-islam-modern-economics',
    title: 'اسلام اور جدید معاشی مسائل',
    author: 'شیخ الاسلام مفتی محمد تقی عثمانی مدظلہ',
    category: 'شیخ الاسلام مفتی محمد تقی عثمانی',
    description: 'جدید بینکاری، سود کے متبادل غیر سودی مالیاتی نظام، اسلامی تمویل (Islamic Finance) اور معیشت کے عصری چیلنجز پر مستند ترین تحقیقی کتاب۔',
    pages: 520,
    coverUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800',
    readsCount: 11400,
    rating: 4.9,
    isFavorite: false,
    publishedYear: '2018',
    publisher: 'مکتبہ معارف القرآن',
    isNew: false,
    isPopular: true,
    sampleChapters: [
      {
        title: 'باب اول: سود کی حرمت اور اس کے معاشی اثرات',
        content: `اسلام نے سود کو اس لیے حرام قرار دیا کہ یہ دولت کو چند ہاتھوں میں مرکوز کرتا ہے اور انسانیت کے درمیان رحم، باہمی ہمدردی اور شراکت داری کی بنیادوں کو منہدم کر دیتا ہے۔`
      }
    ]
  },
  {
    id: 'taqi-zikr-o-fikr',
    title: 'ذکر و فکر (اصلاحی مضامین)',
    author: 'شیخ الاسلام مفتی محمد تقی عثمانی مدظلہ',
    category: 'شیخ الاسلام مفتی محمد تقی عثمانی',
    description: 'امتِ مسلمہ کے دلوں کو بیدار کرنے، دین کی محبت پیدا کرنے اور اصلاحِ باطن کے رہنما خطوط پر مشتمل مضامین کا پرتاثیر مجموعہ۔',
    pages: 380,
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800',
    readsCount: 8900,
    rating: 4.85,
    isFavorite: true,
    publishedYear: '2020',
    publisher: 'مکتبہ معارف القرآن',
    isNew: true,
    isPopular: false,
    sampleChapters: [
      {
        title: 'مضمون: وقت کی قدر اور زندگی کی قیمت',
        content: `انسان کی اصل پونجی اس کی سانسیں اور گھڑیاں ہیں۔ جو گھڑی گزر گئی وہ دوبارہ ہاتھ نہیں آ سکتی۔ عقلمند وہ ہے جو فانی وقت کو باقی رہنے والی نیکیوں میں صرف کرے۔`
      }
    ]
  },

  // 3. درس نظامی
  {
    id: 'dars-hidayah',
    title: 'الہدایۃ فی شرح بدایۃ المبتدی (فقہ حنفی)',
    author: 'امام علامہ علی بن ابی بکر المرغینانیؒ',
    category: 'درس نظامی',
    description: 'درسِ نظامی موقوف علیہ اور دورہ حدیث کے طلبہ کے لیے فقہ حنفی کا سب سے عظیم اور جامع متن، جس میں احکامِ شرعیہ کے دلائل و تفریعات عقلی و نقلی براہین کے ساتھ بیان ہوئی ہیں۔',
    pages: 850,
    coverUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=800',
    readsCount: 16700,
    rating: 5.0,
    isFavorite: true,
    lastReadPage: 12,
    bookmarks: [12],
    publishedYear: 'طبع مکتبۃ البشری',
    publisher: 'دار العلوم دیوبند و مکتبۃ البشری، کراچی',
    isNew: false,
    isPopular: true,
    sampleChapters: [
      {
        title: 'کتاب الطہارۃ: باب المیاہ (پانیوں کا بیان)',
        content: `قَالَ رَحِمَهُ اللَّهُ: الطَّهَارَةُ شَرْطٌ لِصِحَّةِ الصَّلَاةِ، وَالأَصْلُ فِيهِ قَوْلُهُ تَعَالَى: ﴿وَثِيَابَكَ فَطَهِّرْ﴾۔
الماء المطلق هو الذي يجوز به الوضوء وإزالة النجاسة وهو ماء المطر وماء البحر وماء البئر وماء النهر وماء العيون۔`
      }
    ]
  },
  {
    id: 'dars-qudoori',
    title: 'مختصر القدوری (مع حل لغات و تشریح)',
    author: 'امام ابو الحسین احمد بن محمد القدوریؒ',
    category: 'درس نظامی',
    description: 'فقہ حنفی کے متونِ اربعہ میں سرفہرست کتاب جس کا درسِ نظامی کے ابتدائی سالوں میں خصوصی اہتمام ہوتا ہے۔ مسائلِ فقہیہ کا نہایت متقن اور آسان مجموعہ۔',
    pages: 420,
    coverUrl: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=800',
    readsCount: 13900,
    rating: 4.9,
    isFavorite: false,
    publishedYear: 'مستند تصحیح',
    publisher: 'قدیمی کتب خانہ، کراچی',
    isNew: true,
    isPopular: true,
    sampleChapters: [
      {
        title: 'کتاب البیوع (خرید و فروخت کے مسائل)',
        content: `البيع ينعقد بالإيجاب والقبول إذا كانا بلفظين يعبر بهما عن الماضي۔
خرید و فروخت ایجاب اور قبول سے منعقد ہوتی ہے جب وہ دونوں لفظ ماضی کے ہوں۔`
      }
    ]
  },
  {
    id: 'dars-usool-shashi',
    title: 'اصول الشاشی (علم اصول الفقہ)',
    author: 'علامہ نظام الدین الشاشیؒ',
    category: 'درس نظامی',
    description: 'اصولِ فقہ کا مستند اور فکری متن جس میں کتاب اللہ، سنتِ رسول، اجماع اور قیاس سے احکام کشید کرنے کے اصول و قواعد سکھائے گئے ہیں۔',
    pages: 260,
    coverUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800',
    readsCount: 8200,
    rating: 4.8,
    isFavorite: false,
    publishedYear: 'طبع جدید',
    publisher: 'مکتبۃ العلم، لاہور',
    isNew: false,
    isPopular: false,
    sampleChapters: [
      {
        title: 'بحث الخاص والعام',
        content: `أصول الفقه أربعة: كتاب الله تعالى، وسنة رسوله صلى الله عليه وسلم، وإجماع الأمة، والقياس۔ والخاص لفظ وضع لمعنى معلوم على الانفراد۔`
      }
    ]
  },

  // 4. علماء دیوبند
  {
    id: 'deoband-maarif-quran',
    title: 'معارف القرآن (جلد اول تا ہشتم)',
    author: 'مفتی اعظم پاکستان مفتی محمد شفیع عثمانیؒ',
    category: 'علماء دیوبند',
    description: 'برصغیر پاک و ہند کی سب سے مستند اور معتبر اردو تفسیر جو روزمرہ کے مسائل کے حل اور قرآنی ہدایت کا جامع مرقع ہے۔ اکابرین دیوبند کا تفسیری شاہکار۔',
    pages: 1400,
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
    readsCount: 32000,
    rating: 5.0,
    isFavorite: true,
    lastReadPage: 40,
    bookmarks: [40],
    publishedYear: 'مکمل سیٹ',
    publisher: 'ادارہ معارف القرآن، کراچی',
    isNew: true,
    isPopular: true,
    sampleChapters: [
      {
        title: 'سورۃ البقرۃ: آیات متقین کی صفات',
        content: `﴿ذَٰلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ هُدًى لِّلْمُتَّقِينَ﴾
یہ وہ کتاب ہے جس میں کوئی شک نہیں، ہدایت ہے ان پرہیزگاروں کے لیے جو غیب پر ایمان لاتے ہیں، نماز قائم کرتے ہیں اور ہمارے دیے ہوئے رزق سے خرچ کرتے ہیں۔`
      }
    ]
  },
  {
    id: 'deoband-aap-beeti',
    title: 'آپ بیتی (حضرت شیخ الحدیثؒ)',
    author: 'حضرت شیخ الحدیث مولانا محمد زکریا کاندھلویؒ',
    category: 'علماء دیوبند',
    description: 'حضرت شیخ الحدیث مولانا محمد زکریا صاحب کی دل سوز اور سبق آموز خود نوشت، جس میں اکابرِ دیوبند کی سادگی، اخلاص، علم و عمل اور عشقِ خدا و رسول کی روشن داستانیں ہیں۔',
    pages: 580,
    coverUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=800',
    readsCount: 9400,
    rating: 4.9,
    isFavorite: false,
    publishedYear: '1970',
    publisher: 'مکتبہ شیخ الحدیث، سہارنپور',
    isNew: false,
    isPopular: true,
    sampleChapters: [
      {
        title: 'فصل: اکابر کی صحبت اور سچی طلب',
        content: `علم کی اصل برکت اکابر کی صحبت اور ان کے احوال کی مشاہدہ سے ملتی ہے۔ محض کتابیں چاٹنے سے وہ نور حاصل نہیں ہوتا جو کسی مردِ باخدا کی ایک نگاہِ التفات سے ملتا ہے۔`
      }
    ]
  },

  // 5. سیاسی
  {
    id: 'siyasi-tehreek-pakistan',
    title: 'تحریکِ پاکستان اور علمائے دیوبند',
    author: 'شیخ الاسلام مفتی محمد تقی عثمانی مدظلہ',
    category: 'سیاسی',
    description: 'تحریکِ آزادی، قیامِ پاکستان اور نفاذِ شریعت کی جدوجہد میں حضرت شیخ الاسلام شبیر احمد عثمانیؒ، مفتی محمد شفیعؒ اور علمائے دیوبند کے تاریخ ساز اور جلی کردار کی مستند دستاویز۔',
    pages: 320,
    coverUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=800',
    readsCount: 7800,
    rating: 4.85,
    isFavorite: false,
    publishedYear: '2016',
    publisher: 'مکتبہ دار العلوم، کراچی',
    isNew: true,
    isPopular: false,
    sampleChapters: [
      {
        title: 'قراردادِ مقاصد اور علمائے کرام کا مؤقف',
        content: `مارچ 1949ء میں منظور ہونے والی قراردادِ مقاصد پاکستان کے اسلامی تشخص کا بنیادی پتھر ہے، جس کی تیاری میں حضرت مولانا شبیر احمد عثمانیؒ نے تاریخ ساز کردار ادا کیا۔`
      }
    ]
  },
  {
    id: 'siyasi-nizam-e-hukoomat',
    title: 'اسلام کا نظامِ حکومت و سیاست',
    author: 'مولانا حفظ الرحمن سیوہارویؒ',
    category: 'سیاسی',
    description: 'اسلامی ریاست کے اصول، خلافت، شوریٰ کا نظام، حکمرانوں کے حقوق و فرائض اور شہری حقوق کا قرآنی و فقہی جائزہ۔',
    pages: 410,
    coverUrl: 'https://images.unsplash.com/photo-1507842229451-7971b32932e3?auto=format&fit=crop&q=80&w=800',
    readsCount: 6100,
    rating: 4.75,
    isFavorite: false,
    publishedYear: 'کلاسیک ایڈیشن',
    publisher: 'نثار آرٹ پریس، لاہور',
    isNew: false,
    isPopular: false,
    sampleChapters: [
      {
        title: 'شوریٰ کا مقام اور عدل کا قیام',
        content: `اسلام میں حاکمیتِ مطلقہ صرف اور صرف اللہ تعالیٰ کی ذاتِ بابرکات کے لیے مخصوص ہے۔ زمین پر انسان اس کا خلیفہ اور امانت دار ہے۔`
      }
    ]
  },

  // 6. شاعری
  {
    id: 'shairi-kulliyat-iqbal',
    title: 'کلیاتِ اقبال (مکمل اردو کلام)',
    author: 'علامہ ڈاکٹر محمد اقبالؒ',
    category: 'شاعری',
    description: 'شاعرِ مشرق علامہ اقبال کا شاہکار مجموعہ کلام: بانگِ درا، بالِ جبریل، ضربِ کلیم اور ارمغانِ حجاز۔ خودی، عشقِ رسول اور ملتِ بیضا کی عظمت کا جاوداں نغمہ۔',
    pages: 620,
    coverUrl: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=800',
    readsCount: 19500,
    rating: 5.0,
    isFavorite: true,
    lastReadPage: 25,
    bookmarks: [25],
    publishedYear: 'مستند طباعت',
    publisher: 'اقبال اکیڈمی پاکستان',
    isNew: true,
    isPopular: true,
    sampleChapters: [
      {
        title: 'شکوہ اور جوابِ شکوہ',
        content: `دل سے جو بات نکلتی ہے اثر رکھتی ہے
پر نہیں، طاقتِ پرواز مگر رکھتی ہے
قدسی الاصل ہے، رفعت پہ نظر رکھتی ہے
خاک سے اٹھتی ہے، گردوں پہ گزر رکھتی ہے!

عقل ہے تیری سپر، عشق ہے شمشیر تری
مرے درویش! خلافت ہے جہاں گیر تری
ماسوا اللہ کے لیے آگ ہے تکبیر تری
تو مسلماں ہو تو تقدیر ہے تدبیر تری!`
      }
    ]
  },

  // 7. عربی
  {
    id: 'arabi-seerah-nabawiyyah',
    title: 'السيرة النبوية (لابن هشام)',
    author: 'الإمام عبد الملك بن هشامؒ',
    category: 'عربی',
    description: 'سیرتِ طیبہ نبویہ صلی اللہ علیہ وسلم کا سب سے قدیم اور معتبر عربی مصدر و مرجع۔ ولادتِ باسعادت سے وصالِ مبارک تک تمام غزوات اور وقائع کا امین۔',
    pages: 720,
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800',
    readsCount: 12100,
    rating: 4.95,
    isFavorite: false,
    publishedYear: 'تحقیق مصطفی السقا',
    publisher: 'دار الکتب العلمیۃ، بیروت',
    isNew: false,
    isPopular: true,
    sampleChapters: [
      {
        title: 'ذكر نسب رسول الله صلى الله عليه وسلم',
        content: `هو محمد بن عبد الله بن عبد المطلب بن هاشم بن عبد مناف بن قصي بن كلاب بن مرة بن كعب بن لؤي بن غالب بن فهر بن مالك بن النضر بن كنانة بن خزيمة بن مدركة بن إلياس بن مضر بن نزار بن معد بن عدنان۔`
      }
    ]
  },

  // 8. اردو
  {
    id: 'urdu-seerat-khatam-anbiya',
    title: 'سیرتِ خاتم الانبیاء ﷺ',
    author: 'مفتی اعظم مولانا مفتی محمد شفیعؒ',
    category: 'اردو',
    description: 'سیرتِ نبوی صلی اللہ علیہ وسلم پر اردو زبان میں تحریر کی گئی سب سے زیادہ پڑھی جانے والی، مستند، سلیس اور دل نشین کتاب جو ہر مسلمان کے ایمان کو تازگی بخشتی ہے۔',
    pages: 240,
    coverUrl: 'https://images.unsplash.com/photo-1584281722572-88d407adcb53?auto=format&fit=crop&q=80&w=800',
    readsCount: 22000,
    rating: 5.0,
    isFavorite: true,
    lastReadPage: 15,
    bookmarks: [15],
    publishedYear: 'طبع مکتبہ معارف القرآن',
    publisher: 'مکتبہ معارف القرآن، کراچی',
    isNew: true,
    isPopular: true,
    sampleChapters: [
      {
        title: 'فصل: اخلاقِ نبوی اور رحمتِ عالمین',
        content: `آپ صلی اللہ علیہ وسلم اخلاق کے اس بلند ترین مقام پر فائز تھے جس کی گواہی خود رب کائنات نے قرآن مجید میں دی: ﴿وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ﴾۔ آپ نے کبھی کسی سے ذاتی انتقام نہیں لیا، اور برائی کا بدلہ ہمیشہ احسان سے دیا۔`
      }
    ]
  },

  // 9. انگلش
  {
    id: 'english-noble-quran-taqi',
    title: 'The Noble Qur\'an: Meaning & Commentary',
    author: 'Justice (R) Mufti Muhammad Taqi Usmani',
    category: 'انگلش',
    description: 'The authoritative English translation and explanatory notes of the Holy Qur\'an by Mufti Muhammad Taqi Usmani. Pure, accurate, modern English reflecting orthodox Islamic tradition.',
    pages: 1100,
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
    readsCount: 15400,
    rating: 4.95,
    isFavorite: false,
    publishedYear: 'English Edition',
    publisher: 'Maktaba Ma\'ariful Qur\'an, Karachi',
    isNew: true,
    isPopular: true,
    sampleChapters: [
      {
        title: 'Surah Al-Fatihah (The Opening)',
        content: `In the name of Allah, the Most-Merciful, the Very-Merciful.
[1] All praise is for Allah, Lord of all worlds,
[2] The Most-Merciful, the Very-Merciful,
[3] Master of the Day of Judgment.
[4] You alone we worship, and from You alone we seek help.
[5] Guide us along the Straight Path,
[6] The Path of those You have blessed—not those who incurred wrath, nor those who went astray.`
      }
    ]
  }
];
