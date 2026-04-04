
"use client";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const SettingsPage: React.FC = () => {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove('auth_token');
    router.push('/auth/login');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <p className="text-gray-700 mb-6">Dentist settings will appear here.</p>
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 text-white py-2 rounded font-semibold hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default SettingsPage;
