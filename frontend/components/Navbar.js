'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { isAuthenticated, logout, getUser } from '@/lib/auth';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setIsAuth(isAuthenticated());
    setUser(getUser());
  }, [pathname]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navLinkClass = (path) => {
    const isActive = pathname === path;
    return `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-[#3399FF] text-white'
        : 'text-amber-100 hover:bg-[#3399FF] hover:text-white'
    }`;
  };

  return (
    <nav className="bg-[#0F1214] shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-[#3399FF] hover:text-[#3399FF] transition-colors"
            >
              TaskFlow
            </Link>
            {isAuth && (
              <div className="hidden sm:ml-10 sm:flex sm:space-x-2">
                <Link href="/dashboard" className={navLinkClass('/dashboard')}>
                  Dashboard
                </Link>
                <Link href="/profile" className={navLinkClass('/profile')}>
                  Profile
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-3">
            {isAuth ? (
              <>
                <span className="hidden sm:inline-block text-sm text-gray-200 font-medium">
                  Hello, {user?.name || 'User'}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-200 hover:text-amber-400 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-[#3399FF] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
