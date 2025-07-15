import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { LogIn, LogOut, Loader } from 'lucide-react';

interface AdminLoginProps {
  isDarkMode: boolean;
  onLoginSuccess: (avatarUrl: string) => void;
  onLogout: () => void;
  isAdmin: boolean;
  avatarUrl: string;
}

const AdminLogin: React.FC<AdminLoginProps> = ({
  isDarkMode,
  onLoginSuccess,
  onLogout,
  isAdmin,
  avatarUrl,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      if (user) {
        // Check if user is an admin
        const { data: adminData, error: adminError } = await supabase
          .from('admins')
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (adminError) throw adminError;

        if (adminData) {
          // Set avatar URL based on email
          const initials = getInitialsFromEmail(email);
          const avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${initials}`;
          onLoginSuccess(avatar);
          setShowLogin(false);
          setEmail('');
          setPassword('');
        } else {
          throw new Error('User is not an administrator');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      onLogout();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during logout');
    } finally {
      setIsLoading(false);
    }
  };

  const getInitialsFromEmail = (email: string): string => {
    if (email === 'yashdubey262@gmail.com') return 'YD';
    if (email === '22BDO10031@cuchd.in') return 'AP';
    return email.split('@')[0].substring(0, 2).toUpperCase();
  };

  return (
    <div className="relative">
      {isAdmin ? (
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="p-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white transition-colors overflow-hidden"
          title="Logout"
        >
          {isLoading ? (
            <Loader className="animate-spin" size={20} />
          ) : (
            <div className="w-5 h-5 rounded-full overflow-hidden">
              <img
                src={avatarUrl}
                alt="Admin"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </button>
      ) : (
        <>
          <button
            onClick={() => setShowLogin(!showLogin)}
            className="p-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
            title="Admin Login"
          >
            <LogIn size={20} />
          </button>

          {showLogin && (
            <div className={`absolute right-0 top-12 w-72 p-4 rounded-lg shadow-lg z-50 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      isDarkMode
                        ? 'bg-gray-700 text-white border-gray-600'
                        : 'bg-white text-gray-900 border-gray-300'
                    } focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      isDarkMode
                        ? 'bg-gray-700 text-white border-gray-600'
                        : 'bg-white text-gray-900 border-gray-300'
                    } focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                    required
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex items-center justify-center gap-2 py-2 rounded-md ${
                    isDarkMode
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : 'bg-emerald-600 hover:bg-emerald-700'
                  } text-white transition-colors`}
                >
                  {isLoading ? (
                    <Loader className="animate-spin" size={20} />
                  ) : (
                    'Login'
                  )}
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminLogin;
