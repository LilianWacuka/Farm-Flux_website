import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function NavigationBar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logoutUser = () => {
    localStorage.removeItem('token');
    logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-[#3fa63f] text-white">
      {/* Desktop Navigation */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <h1 className="font-bold text-xl">FARM PROJECT</h1>

          {/* Desktop Menu Items - hidden on mobile */}
          <div className="hidden md:flex gap-6">
            {user ? (
              <>
                <Link to="/dashboard" className="hover:text-green-200 transition-colors font-bold text-xl">
                  Dashboard
                </Link>
                <Link to="/transaction" className="hover:text-green-200 transition-colors font-bold text-xl">
                  Transaction
                </Link>
                <Link to="/report" className="hover:text-green-200 transition-colors font-bold text-xl">
                  Reports
                </Link>
                <button 
                  onClick={logoutUser} 
                  className="hover:text-green-200 transition-colors font-bold text-xl"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-green-200 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="hover:text-green-200 transition-colors">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button - shows on mobile only */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-green-700 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - shows on mobile when open */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-green-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600"
                >
                  Dashboard
                </Link>
                <Link
                  to="/transaction"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600"
                >
                  Transaction
                </Link>
                <Link
                  to="/report"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600"
                >
                  Reports
                </Link>
                <button
                  onClick={logoutUser}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-green-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}