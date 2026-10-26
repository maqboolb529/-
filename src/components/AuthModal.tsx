import React, { useState } from 'react';
import { X, Lock, Mail, User, BookOpen, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { authService } from '../services/authService';
import { UserProfile } from '../types/book';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [tab, setTab] = useState<'login' | 'signup' | 'forgot'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage({ text: 'براہ کرم ای میل اور پاس ورڈ درج کریں', type: 'error' });
      return;
    }
    try {
      setIsLoading(true);
      setMessage(null);
      const user = await authService.loginWithEmail(email, password);
      setMessage({ text: `خوش آمدید، ${user.name}!`, type: 'success' });
      setTimeout(() => {
        onSuccess(user);
        onClose();
      }, 700);
    } catch {
      setMessage({ text: 'لاگ ان میں غلطی واقع ہوئی۔ دوبارہ کوشش کریں۔', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setMessage({ text: 'براہ کرم تمام خانے پُر کریں۔', type: 'error' });
      return;
    }
    try {
      setIsLoading(true);
      setMessage(null);
      const user = await authService.signupWithEmail(name, email, password);
      setMessage({ text: `اکاؤنٹ کامیابی سے بن گیا! خوش آمدید ${user.name}`, type: 'success' });
      setTimeout(() => {
        onSuccess(user);
        onClose();
      }, 700);
    } catch {
      setMessage({ text: 'اکاؤنٹ بنانے میں غلطی واقع ہوئی۔', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setMessage({ text: 'براہ کرم اپنی رجسٹرڈ ای میل درج کریں۔', type: 'error' });
      return;
    }
    try {
      setIsLoading(true);
      await authService.resetPassword(email);
      setMessage({ text: 'پاس ورڈ بحالی کا لنک آپ کی ای میل پر بھیج دیا گیا ہے۔', type: 'success' });
    } catch {
      setMessage({ text: 'ای میل ارسال نہ ہو سکی۔', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const user = await authService.loginWithGoogle();
      onSuccess(user);
      onClose();
    } catch {
      setMessage({ text: 'گوگل لاگ ان ناکام رہا۔', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestSignIn = async () => {
    try {
      setIsLoading(true);
      const user = await authService.loginAsGuest();
      onSuccess(user);
      onClose();
    } catch {
      setMessage({ text: 'مہمان کے طور پر داخلہ نہ ہو سکا۔', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in" dir="rtl">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#c5a059]/30 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Islamic Emblem Banner */}
        <div className="bg-gradient-to-r from-[#0d4a2e] to-[#083320] p-6 text-white text-center relative border-b-2 border-[#c5a059]">
          <button
            onClick={onClose}
            className="absolute left-4 top-4 p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#c5a059]/20 border border-[#c5a059] flex items-center justify-center mb-2 shadow-inner">
            <BookOpen className="w-7 h-7 text-[#c5a059]" />
          </div>

          <h2 className="text-xl font-bold font-serif text-[#c5a059]">مکتبہ حکیم الامت</h2>
          <p className="text-xs text-emerald-100/80 font-serif mt-0.5">آن لائن اسلامی کتب خانہ و مطالعہ گاہ</p>
        </div>

        {/* Auth Mode Tabs */}
        <div className="flex border-b border-stone-200 bg-stone-50 text-xs font-bold">
          <button
            onClick={() => { setTab('login'); setMessage(null); }}
            className={`flex-1 py-3 text-center border-b-2 transition-colors ${
              tab === 'login' ? 'border-[#0d4a2e] text-[#0d4a2e] bg-white' : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            لاگ ان کریں
          </button>
          <button
            onClick={() => { setTab('signup'); setMessage(null); }}
            className={`flex-1 py-3 text-center border-b-2 transition-colors ${
              tab === 'signup' ? 'border-[#0d4a2e] text-[#0d4a2e] bg-white' : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            نیا اکاؤنٹ بنائیں
          </button>
          <button
            onClick={() => { setTab('forgot'); setMessage(null); }}
            className={`flex-1 py-3 text-center border-b-2 transition-colors ${
              tab === 'forgot' ? 'border-[#0d4a2e] text-[#0d4a2e] bg-white' : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            پاس ورڈ بھول گئے
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {message && (
            <div className={`p-3 rounded-xl mb-4 text-xs font-medium flex items-center gap-2 ${
              message.type === 'success' ? 'bg-emerald-50 text-[#0d4a2e] border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}>
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{message.text}</span>
            </div>
          )}

          {/* 1. Login Form */}
          {tab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">ای میل ایڈریس</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@domain.com"
                    className="w-full pr-10 pl-3 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-[#0d4a2e] focus:outline-hidden"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-stone-700">پاس ورڈ</label>
                  <button
                    type="button"
                    onClick={() => setTab('forgot')}
                    className="text-[11px] text-[#c5a059] hover:underline font-medium"
                  >
                    پاس ورڈ بھول گئے؟
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pr-10 pl-3 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-[#0d4a2e] focus:outline-hidden"
                    dir="ltr"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#0d4a2e] hover:bg-[#083320] text-white rounded-xl font-bold text-sm shadow-md shadow-[#0d4a2e]/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{isLoading ? 'لاگ ان ہو رہا ہے...' : 'لاگ ان کریں'}</span>
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
            </form>
          )}

          {/* 2. Signup Form */}
          {tab === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">آپ کا مکمل نام</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثلاً: محمد عبداللہ"
                    className="w-full pr-10 pl-3 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-[#0d4a2e] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">ای میل ایڈریس</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@domain.com"
                    className="w-full pr-10 pl-3 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-[#0d4a2e] focus:outline-hidden"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">پاس ورڈ</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="کم از کم 6 ہندسے"
                    className="w-full pr-10 pl-3 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-[#0d4a2e] focus:outline-hidden"
                    dir="ltr"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#0d4a2e] hover:bg-[#083320] text-white rounded-xl font-bold text-sm shadow-md shadow-[#0d4a2e]/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{isLoading ? 'اکاؤنٹ بن رہا ہے...' : 'نیا اکاؤنٹ بنائیں'}</span>
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
            </form>
          )}

          {/* 3. Forgot Password Form */}
          {tab === 'forgot' && (
            <form onSubmit={handleForgot} className="space-y-4">
              <p className="text-xs text-stone-600 leading-relaxed">
                اپنا رجسٹرڈ ای میل ایڈریس درج کریں۔ ہم آپ کو پاس ورڈ دوبارہ ترتیب دینے کا لنک بھیجیں گے۔
              </p>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">ای میل ایڈریس</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@domain.com"
                    className="w-full pr-10 pl-3 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-[#0d4a2e] focus:outline-hidden"
                    dir="ltr"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#c5a059] hover:bg-[#b08b45] text-white rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{isLoading ? 'بھیجا جا رہا ہے...' : 'پاس ورڈ بحالی کا لنک بھیجیں'}</span>
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-[11px] text-stone-400 font-medium">یا</span>
            <div className="flex-1 h-px bg-stone-200" />
          </div>

          {/* Google Sign-In & Guest Mode */}
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full py-2.5 px-4 bg-white hover:bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-700 flex items-center justify-center gap-2.5 shadow-xs transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>گوگل کے ساتھ لاگ ان کریں</span>
            </button>

            <button
              type="button"
              onClick={handleGuestSignIn}
              className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>بطور مہمان مطالعہ جاری رکھیں</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
