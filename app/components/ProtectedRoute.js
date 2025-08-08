'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

export default function ProtectedRoute({ children, routeName = "this page" }) {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      toast.error(`Please login to access ${routeName}!`, {
        duration: 4000,
      });
      router.push('/login');
    }
  }, [isLoggedIn, isLoading, router, routeName]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null; // Will redirect to login
  }

  return children;
}
