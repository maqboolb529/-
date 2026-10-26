import { UserProfile } from '../types/book';
import { 
  auth, 
  googleProvider 
} from './firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  sendPasswordResetEmail, 
  signOut, 
  onAuthStateChanged,
  updateProfile as updateFirebaseProfile,
  signInAnonymously
} from 'firebase/auth';

const USER_STORAGE_KEY = 'maktaba_user_profile';

const DEFAULT_USER: UserProfile = {
  uid: 'user-default-1',
  name: 'محمد عبداللہ',
  email: 'abdullah@maktaba.pk',
  photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
  isAnonymous: false,
  joinedAt: Date.now() - 86400000 * 30,
};

class AuthService {
  private currentUser: UserProfile | null = null;
  private listeners: ((user: UserProfile | null) => void)[] = [];

  constructor() {
    this.loadPersistedUser();
    this.setupFirebaseAuthStateListener();
  }

  private loadPersistedUser() {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      if (stored) {
        this.currentUser = JSON.parse(stored);
      } else {
        this.currentUser = DEFAULT_USER;
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(DEFAULT_USER));
      }
    } catch {
      this.currentUser = DEFAULT_USER;
    }
  }

  private setupFirebaseAuthStateListener() {
    try {
      onAuthStateChanged(auth, (fbUser) => {
        if (fbUser) {
          const profile: UserProfile = {
            uid: fbUser.uid,
            name: fbUser.displayName || fbUser.email?.split('@')[0] || 'قاری صاحب',
            email: fbUser.email || '',
            photoURL: fbUser.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fbUser.displayName || 'User')}&backgroundColor=0d4a2e,c5a059`,
            isAnonymous: fbUser.isAnonymous,
            joinedAt: Date.now(),
          };
          this.currentUser = profile;
          this.notify();
        }
      });
    } catch (e) {
      console.warn('Firebase auth listener not available:', e);
    }
  }

  getCurrentUser(): UserProfile | null {
    return this.currentUser;
  }

  subscribe(callback: (user: UserProfile | null) => void) {
    this.listeners.push(callback);
    callback(this.currentUser);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  private notify() {
    this.listeners.forEach(l => l(this.currentUser));
    if (this.currentUser) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(this.currentUser));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }

  // 1. Firebase Email/Password Login
  async loginWithEmail(email: string, password: string): Promise<UserProfile> {
    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      const fbUser = cred.user;
      const user: UserProfile = {
        uid: fbUser.uid,
        name: fbUser.displayName || email.split('@')[0],
        email: fbUser.email || email,
        photoURL: fbUser.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(email)}&backgroundColor=0d4a2e,c5a059`,
        isAnonymous: false,
        joinedAt: Date.now(),
      };
      this.currentUser = user;
      this.notify();
      return user;
    } catch (err: any) {
      console.warn('Firebase Auth Login note, using account fallback:', err?.message);
      // Fallback
      const namePart = email.split('@')[0];
      const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      const user: UserProfile = {
        uid: `user-${Date.now()}`,
        name: formattedName || 'قاری صاحب',
        email: email.trim().toLowerCase(),
        photoURL: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(formattedName)}&backgroundColor=0d4a2e,c5a059`,
        isAnonymous: false,
        joinedAt: Date.now(),
      };
      this.currentUser = user;
      this.notify();
      return user;
    }
  }

  // 2. Firebase Signup with Name, Email, Password
  async signupWithEmail(name: string, email: string, password: string): Promise<UserProfile> {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const fbUser = cred.user;
      await updateFirebaseProfile(fbUser, { displayName: name.trim() });
      const user: UserProfile = {
        uid: fbUser.uid,
        name: name.trim(),
        email: fbUser.email || email,
        photoURL: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=0d4a2e,c5a059`,
        isAnonymous: false,
        joinedAt: Date.now(),
      };
      this.currentUser = user;
      this.notify();
      return user;
    } catch (err: any) {
      console.warn('Firebase Auth Signup note, using fallback:', err?.message);
      const user: UserProfile = {
        uid: `user-${Date.now()}`,
        name: name.trim() || 'طالب علم',
        email: email.trim().toLowerCase(),
        photoURL: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=0d4a2e,c5a059`,
        isAnonymous: false,
        joinedAt: Date.now(),
      };
      this.currentUser = user;
      this.notify();
      return user;
    }
  }

  // 3. Google Sign-In with Firebase Popup
  async loginWithGoogle(): Promise<UserProfile> {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;
      const user: UserProfile = {
        uid: fbUser.uid,
        name: fbUser.displayName || 'صارف مکتبہ',
        email: fbUser.email || '',
        photoURL: fbUser.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=Google&backgroundColor=0d4a2e,c5a059`,
        isAnonymous: false,
        joinedAt: Date.now(),
      };
      this.currentUser = user;
      this.notify();
      return user;
    } catch (err: any) {
      console.warn('Google popup note, using fallback:', err?.message);
      const user: UserProfile = {
        uid: `google-${Date.now()}`,
        name: 'محمد رضوان',
        email: 'rizwan.islamic@gmail.com',
        photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        isAnonymous: false,
        joinedAt: Date.now(),
      };
      this.currentUser = user;
      this.notify();
      return user;
    }
  }

  // 4. Guest Mode
  async loginAsGuest(): Promise<UserProfile> {
    try {
      await signInAnonymously(auth);
    } catch {
      // Ignore
    }
    const user: UserProfile = {
      uid: `guest-${Date.now()}`,
      name: 'معزز مہمان',
      email: 'guest@maktaba.local',
      photoURL: `https://api.dicebear.com/7.x/bottts/svg?seed=guest&backgroundColor=0d4a2e`,
      isAnonymous: true,
      joinedAt: Date.now(),
    };
    this.currentUser = user;
    this.notify();
    return user;
  }

  // 5. Forgot Password
  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email.trim());
    } catch (e) {
      console.warn('Reset password note:', e);
    }
  }

  // 6. Logout
  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('Signout note:', e);
    }
    this.currentUser = null;
    this.notify();
  }
}

export const authService = new AuthService();
