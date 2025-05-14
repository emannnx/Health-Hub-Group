
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { X } from 'lucide-react';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';

const AuthModal = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const authParam = searchParams.get('auth');
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(
    authParam === 'register' ? 'register' : 'login'
  );

  const closeModal = () => {
    searchParams.delete('auth');
    setSearchParams(searchParams);
    navigate('/', { replace: true });
  };

  const switchTab = (tab: 'login' | 'register') => {
    setActiveTab(tab);
    searchParams.set('auth', tab);
    setSearchParams(searchParams);
  };

  if (!authParam) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full shadow-xl">
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex space-x-4">
            <button
              className={`text-lg font-medium ${
                activeTab === 'login' ? 'text-health-blue' : 'text-gray-500'
              }`}
              onClick={() => switchTab('login')}
            >
              Sign In
            </button>
            <button
              className={`text-lg font-medium ${
                activeTab === 'register' ? 'text-health-blue' : 'text-gray-500'
              }`}
              onClick={() => switchTab('register')}
            >
              Register
            </button>
          </div>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'login' ? (
            <LoginForm onSuccess={closeModal} />
          ) : (
            <RegisterForm onSuccess={closeModal} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
