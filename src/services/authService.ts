import { UserProfile } from '../types/book';

const USER_STORAGE_KEY = 'maktaba_user_profile';

const DEFAULT_USER: UserProfile = {
  uid: 'user-default-1',
  name: 'محمد عبداللہ',
  email: 'abdullah@example.com',
  photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
  isAnonymous: false,
  joinedAt: Date.now() - 86400000 * 30,
};

class AuthService {
  private currentUser: UserProfile | null = null;
  private listeners: ((user: UserProfile | null) => void)[] = [];

  constructor() {
    this.loadPersistedUser();
  }

  private loadPersistedUser() {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      if (stored) {
        this.currentUser = JSON.parse(stored);
      } else {
        // Set default logged in user so user immediately sees their name in the Salam
        this.currentUser = DEFAULT_USER;
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(DEFAULT_USER));
      }
    } catch {
      this.currentUser = DEFAULT_USER;
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

  // 1. Email/Password Login
  async loginWithEmail(email: string, _password: string): Promise<UserProfile> {
    // Generate/lookup user
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

  // 2. Signup with Name, Email, Password
  async signupWithEmail(name: string, email: string, _password: string): Promise<UserProfile> {
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

  // 3. Google Sign-In
  async loginWithGoogle(): Promise<UserProfile> {
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

  // 4. Guest Mode
  async loginAsGuest(): Promise<UserProfile> {
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
    // Simulates sending reset email
    console.log(`Password reset link sent to: ${email}`);
    await new Promise(r => setTimeout(r, 600));
  }

  // 6. Update Profile
  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    if (!this.currentUser) throw new Error('No user logged in');
    this.currentUser = { ...this.currentUser, ...updates };
    this.notify();
    return this.currentUser;
  }

  // 7. Logout
  async logout(): Promise<void> {
    this.currentUser = null;
    this.notify();
  }
}

export const authService = new AuthService();
