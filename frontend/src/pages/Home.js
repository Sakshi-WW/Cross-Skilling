import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-primary-600">FinShark</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Your trusted partner in stock portfolio management. Build wealth with confidence
            through intelligent investment tracking and analysis.
          </p>
          <div className="flex justify-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/stocks"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 text-base font-semibold"
                >
                  Browse Stocks
                </Link>
                <Link
                  to="/portfolio"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 text-base font-semibold"
                >
                  My Portfolio
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 text-base font-semibold"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-8 py-3 text-base font-semibold"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-gray-200 p-6 hover:border-gray-400 text-center">
            <div className="bg-primary-100 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-8 h-8 text-primary-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Track Performance</h3>
            <p className="text-gray-600 text-sm">
              Monitor your stock portfolio in real-time with detailed analytics and insights.
            </p>
          </div>

          <div className="bg-white border border-gray-200 p-6 hover:border-gray-400 text-center">
            <div className="bg-primary-100 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-8 h-8 text-primary-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Build Wealth</h3>
            <p className="text-gray-600 text-sm">
              Grow your investments with smart portfolio management and dividend tracking.
            </p>
          </div>

          <div className="bg-white border border-gray-200 p-6 hover:border-gray-400 text-center">
            <div className="bg-primary-100 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-8 h-8 text-primary-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Community Insights</h3>
            <p className="text-gray-600 text-sm">
              Share thoughts and read comments from other investors on stocks.
            </p>
          </div>
        </div>

        {/* Trust Section */}
        <div className="mt-24 bg-primary-600 border-t-4 border-primary-800 p-10 text-white">
          <h2 className="text-2xl font-bold mb-3 text-center">Trusted by Smart Investors</h2>
          <p className="text-base opacity-90 mb-6 text-center">
            Join thousands of users managing their portfolios with confidence
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto text-center">
            <div>
              <p className="text-3xl font-bold mb-1">10K+</p>
              <p className="text-sm opacity-90">Active Users</p>
            </div>
            <div>
              <p className="text-3xl font-bold mb-1">$500M+</p>
              <p className="text-sm opacity-90">Assets Tracked</p>
            </div>
            <div>
              <p className="text-3xl font-bold mb-1">50K+</p>
              <p className="text-sm opacity-90">Stocks Analyzed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
