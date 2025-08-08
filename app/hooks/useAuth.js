'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

export function useAuth() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const authToken = Cookies.get('authToken');
      const localAuth = localStorage.getItem("isloggIn") === "true";
      setIsLoggedIn(!!authToken && localAuth);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = (token, username) => {
    Cookies.set('authToken', token);
    Cookies.set('username', username);
    localStorage.setItem("isloggIn", "true");
    localStorage.setItem("user", username);
    setIsLoggedIn(true);
    toast.success('Login successful!');
  };

  const logout = () => {
    Cookies.remove('authToken');
    Cookies.remove('username');
    localStorage.removeItem("isloggIn");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    toast.success('Logged out successfully!');
    router.push('/login');
  };

  const requireAuth = (routeName) => {
    if (!isLoggedIn) {
      toast.error(`Please login to access ${routeName}!`, {
        duration: 4000,
      });
      router.push('/login');
      return false;
    }
    return true;
  };

  return {
    isLoggedIn,
    isLoading,
    login,
    logout,
    requireAuth
  };
}
