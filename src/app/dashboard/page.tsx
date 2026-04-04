import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="text-gray-700">Welcome to your private dashboard, Dr. Maha Chaouch!</p>
      </div>
    </div>
  );
};

export default DashboardPage;
