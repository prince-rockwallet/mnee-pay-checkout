import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { ShippingAddress, ContactInfo } from '@/types';

interface UserInfo {
  email?: string;
  shipping?: ShippingAddress;
  contact?: ContactInfo;
}

interface UserInfoContextValue {
  userInfo: UserInfo;
  setEmail: (email: string) => void;
  setShipping: (shipping: ShippingAddress) => void;
  setContact: (contact: ContactInfo) => void;
  clearUserInfo: () => void;
}

const UserInfoContext = createContext<UserInfoContextValue | undefined>(undefined);

const USER_INFO_STORAGE_KEY = 'mnee-checkout-user-info';

const initialState: UserInfo = {
  email: undefined,
  shipping: undefined,
  contact: undefined,
};

// Load user info from localStorage
const loadUserInfoFromStorage = (): UserInfo => {
  if (typeof window === 'undefined') {
    return initialState;
  }
  try {
    const stored = localStorage.getItem(USER_INFO_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading user info from localStorage:', error);
  }
  return initialState;
};

// Save user info to localStorage
const saveUserInfoToStorage = (userInfo: UserInfo) => {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    localStorage.setItem(USER_INFO_STORAGE_KEY, JSON.stringify(userInfo));
  } catch (error) {
    console.error('Error saving user info to localStorage:', error);
  }
};

export function UserInfoProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserInfo>(loadUserInfoFromStorage);

  // Persist user info to localStorage whenever it changes
  useEffect(() => {
    saveUserInfoToStorage(userInfo);
  }, [userInfo]);

  const setEmail = useCallback((email: string) => {
    setUserInfo(prev => ({ ...prev, email }));
  }, []);

  const setShipping = useCallback((shipping: ShippingAddress) => {
    setUserInfo(prev => ({ ...prev, shipping }));
  }, []);

  const setContact = useCallback((contact: ContactInfo) => {
    setUserInfo(prev => ({ ...prev, contact }));
  }, []);

  const clearUserInfo = useCallback(() => {
    setUserInfo(initialState);
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.removeItem(USER_INFO_STORAGE_KEY);
  }, []);

  const value: UserInfoContextValue = {
    userInfo,
    setEmail,
    setShipping,
    setContact,
    clearUserInfo,
  };

  return (
    <UserInfoContext.Provider value={value}>
      {children}
    </UserInfoContext.Provider>
  );
}

export function useUserInfo() {
  const context = useContext(UserInfoContext);
  if (!context) {
    throw new Error('useUserInfo must be used within UserInfoProvider');
  }
  return context;
}
