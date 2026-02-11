import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { portfolioAPI } from '../services/api';
import StockCard from '../components/StockCard';
import { useAuth } from '../context/AuthContext';

const Portfolio = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalValue: 0,
    totalStocks: 0,
    totalDividends: 0,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchPortfolio();
  }, [isAuthenticated]);

  const fetchPortfolio = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await portfolioAPI.getPortfolio();
      setPortfolio(response.data);
      calculateStats(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login');
      } else {
        setError('Failed to load portfolio');
      }
    }
    setLoading(false);
  };

  const calculateStats = (stocks) => {
    const totalValue = stocks.reduce((sum, stock) => sum + (stock.purchase || 0), 0);
    const totalDividends = stocks.reduce((sum, stock) => sum + (stock.lastDiv || 0), 0);
    
    setStats({
      totalValue,
      totalStocks: stocks.length,
      totalDividends,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin h-10 w-10 border-2 border-gray-300 border-t-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Portfolio</h1>
          <p className="text-gray-600">Track and manage your investments</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-primary-500 border-b-4 border-primary-700 p-6 text-white">
            <p className="text-sm opacity-90 mb-1">Total Stocks</p>
            <p className="text-3xl font-bold">{stats.totalStocks}</p>
          </div>
          <div className="bg-primary-600 border-b-4 border-primary-800 p-6 text-white">
            <p className="text-sm opacity-90 mb-1">Portfolio Value</p>
            <p className="text-3xl font-bold">${stats.totalValue.toFixed(2)}</p>
          </div>
          <div className="bg-primary-700 border-b-4 border-primary-900 p-6 text-white">
            <p className="text-sm opacity-90 mb-1">Total Dividends</p>
            <p className="text-3xl font-bold">${stats.totalDividends.toFixed(2)}</p>
          </div>
        </div>

        {/* Portfolio Stocks */}
        {portfolio.length === 0 ? (
          <div className="bg-white border border-gray-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <svg
                className="mx-auto h-16 w-16 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Your portfolio is empty
              </h3>
              <p className="text-gray-600 mb-6">
                Start building your wealth by adding stocks to your portfolio
              </p>
              <button
                onClick={() => navigate('/stocks')}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 font-medium"
              >
                Browse Stocks
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.map((stock) => (
              <StockCard
                key={stock.id}
                stock={stock}
                inPortfolio={true}
                onPortfolioUpdate={fetchPortfolio}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
